import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const demoPath = new URL("docs/assets/demo.js", root);
const indexPath = new URL("docs/index.html", root);

async function analyticsHarness({ url = "https://portotify.github.io/PORTOTIFY_DEMO_PUBLIC/", umami = true, trackThrows = false } = {}) {
  const source = await readFile(demoPath, "utf8");
  const start = source.indexOf("  var attributionKeys");
  const end = source.indexOf("  function pagePath");
  const analyticsSource = `${source.slice(start, end)}\nglobalThis.__hooks = { getAttributionContext, trackAnalyticsEvent, getProjectionSurface, getProjectionTarget };`;
  const events = [];
  const context = vm.createContext({
    URL,
    window: {
      location: new URL(url),
      ...(umami ? { umami: { track: trackThrows ? () => { throw new Error("analytics unavailable"); } : (name, payload) => events.push({ name, payload }) } } : {}),
    },
  });
  vm.runInContext(analyticsSource, context);
  return { hooks: context.__hooks, events };
}

test("valid UTM values map to the documented context", async () => {
  const harness = await analyticsHarness({ url: "https://portotify.github.io/?utm_source=linkedin&utm_medium=organic-social&utm_campaign=agent-identity&utm_content=li-cmt-20260827-001" });
  assert.deepEqual(JSON.parse(JSON.stringify(harness.hooks.getAttributionContext())), {
    source_platform: "linkedin",
    source_medium: "organic-social",
    campaign: "agent-identity",
    source_id: "li-cmt-20260827-001",
  });
});

test("invalid, oversized, unknown, and absent attribution values are excluded", async () => {
  for (const url of [
    "https://portotify.github.io/?utm_content=%3Cscript%3Ealert(1)%3C%2Fscript%3E",
    `https://portotify.github.io/?utm_source=${"a".repeat(121)}`,
    "https://portotify.github.io/?foo=bar",
    "https://portotify.github.io/",
  ]) {
    const harness = await analyticsHarness({ url });
    assert.deepEqual(JSON.parse(JSON.stringify(harness.hooks.getAttributionContext())), {});
  }
});

test("analytics helper is silent when Umami is unavailable and sends no raw URL data", async () => {
  const absent = await analyticsHarness({ umami: false });
  assert.doesNotThrow(() => absent.hooks.trackAnalyticsEvent("projection_open", { page_path: "/", target: "decision", surface: "hero" }));
  const present = await analyticsHarness({ url: "https://portotify.github.io/?utm_source=linkedin" });
  present.hooks.trackAnalyticsEvent("projection_open", { page_path: "/", target: "decision", surface: "hero" });
  assert.deepEqual(JSON.parse(JSON.stringify(present.events)), [{
    name: "projection_open",
    payload: { page_path: "/", target: "decision", surface: "hero", source_platform: "linkedin" },
  }]);
  assert.doesNotMatch(JSON.stringify(present.events), /document\.referrer|location\.search/u);
  const throwing = await analyticsHarness({ trackThrows: true });
  assert.doesNotThrow(() => throwing.hooks.trackAnalyticsEvent("projection_open", { page_path: "/", target: "decision", surface: "hero" }));
});

test("replay event surfaces and reset branches are explicit", async () => {
  const source = await readFile(demoPath, "utf8");
  assert.match(source, /trackAnalyticsEvent\("execution_open"/u);
  assert.match(source, /execution_key: key/u);
  assert.match(source, /surface: button\.classList\.contains\("replay-button"\) \? "execution_card" : "hero"/u);
  assert.match(source, /trackAnalyticsEvent\("replay_reset"/gu);
  assert.match(source, /surface: "execution_card"/u);
  assert.match(source, /surface: "toolbar"/u);
});

test("projection surface is fail-closed and distinguishes hero from final CTA", async () => {
  const harness = await analyticsHarness();
  const makeLink = (surface) => ({ getAttribute: (name) => name === "data-analytics-surface" ? surface : null });
  assert.equal(harness.hooks.getProjectionSurface(makeLink("hero")), "hero");
  assert.equal(harness.hooks.getProjectionSurface(makeLink("final_cta")), "final_cta");
  assert.equal(harness.hooks.getProjectionSurface(makeLink("sidebar")), null);
  assert.equal(harness.hooks.getProjectionSurface(makeLink(null)), null);
});

test("projection target is fail-closed for explicit allowed values", async () => {
  const harness = await analyticsHarness();
  const makeLink = (target) => ({ getAttribute: (name) => name === "data-analytics-target" ? target : null });
  assert.equal(harness.hooks.getProjectionTarget(makeLink("decision")), "decision");
  assert.equal(harness.hooks.getProjectionTarget(makeLink("legal")), "legal");
  assert.equal(harness.hooks.getProjectionTarget(makeLink("sidebar")), null);
  assert.equal(harness.hooks.getProjectionTarget(makeLink(null)), null);
});

test("projection and GitHub links carry explicit analytics attributes", async () => {
  const html = await readFile(indexPath, "utf8");
  for (const target of ["decision", "hrtech", "health", "legal"]) {
    assert.match(html, new RegExp(`data-analytics-event="projection_open"[^>]*data-analytics-target="${target}"`, "u"));
  }
  assert.match(html, /href="https:\/\/github\.com\/Portotify\/PORTOTIFY_DEMO_PUBLIC" data-analytics-event="github_repo_open" data-analytics-surface="header"/u);
  assert.doesNotMatch((await readFile(demoPath, "utf8")), /preventDefault\(\)/u);
});

test("analytics exceptions are caught and link listener mounting is idempotent", async () => {
  const source = await readFile(demoPath, "utf8");
  assert.match(source, /try \{\s*umami\.track\(/su);
  assert.match(source, /if \(analyticsMounted\) return;/u);
  assert.match(source, /analyticsMounted = true/u);
  assert.match(source, /if \(!target\) return;\s*trackAnalyticsEvent\("execution_open"/su);
});
