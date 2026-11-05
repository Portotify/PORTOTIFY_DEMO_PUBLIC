import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const demoPath = new URL("docs/assets/demo.js", root);
const indexPath = new URL("docs/index.html", root);

test("the public demo has no analytics provider or tracking runtime", async () => {
  const [source, html] = await Promise.all([
    readFile(demoPath, "utf8"),
    readFile(indexPath, "utf8"),
  ]);

  assert.doesNotMatch(source, /umami|analytics|fetch\(|sendBeacon|XMLHttpRequest|data-analytics-/iu);
  assert.doesNotMatch(html, /cloud\.umami\.is|data-website-id|data-analytics-/iu);
});

test("proof replay and reset branches remain wired", async () => {
  const source = await readFile(demoPath, "utf8");

  assert.match(source, /var replayButtons = document\.querySelectorAll\("\[data-replay\]"\)/u);
  assert.match(source, /replayButtons\.forEach/u);
  assert.match(source, /function resetReplay\(\)/u);
  assert.match(source, /function focusSection\(key\)/u);
  assert.match(source, /resetReplay\(\)/gu);
  assert.match(source, /focusSection\(key\)/u);
  assert.match(source, /data-replay-state/u);
  assert.match(source, /scrollIntoView/u);
  assert.doesNotMatch(source, /preventDefault\(\)/u);
});

test("all four public projection links and JSON artifacts remain available", async () => {
  const html = await readFile(indexPath, "utf8");
  const projections = [
    "data/recorded-production-executions.json",
    "data/hrtech-recorded-production-executions.json",
    "data/health-recorded-production-executions.json",
    "data/legal-recorded-production-executions.json",
  ];

  for (const projection of projections) {
    assert.match(html, new RegExp("href=\"" + projection.replaceAll(".", "\\.") + "\"", "u"));
    await access(new URL("docs/" + projection, root));
  }
});

test("navigation and external evidence links remain explicit", async () => {
  const html = await readFile(indexPath, "utf8");

  assert.match(html, /href="\."/u);
  assert.match(html, /https:\/\/github\.com\/Portotify\/PORTOTIFY_DEMO_PUBLIC/u);
  assert.match(html, /evidence\/README\.md/u);
  assert.match(html, /target="_blank" rel="noopener noreferrer"/u);
});
