(function () {
  document.documentElement.classList.add("js");
  var replayButtons = document.querySelectorAll("[data-replay]");
  var resetButton = document.querySelector("[data-reset]");
  var analyticsMounted = false;
  var attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var attributionContextKeys = {
    utm_source: "source_platform",
    utm_medium: "source_medium",
    utm_campaign: "campaign",
    utm_content: "source_id",
    utm_term: "term",
  };

  function validAttributionValue(value) {
    if (typeof value !== "string") return null;
    var trimmed = value.trim();
    return /^[A-Za-z0-9._~-]{1,120}$/.test(trimmed) ? trimmed : null;
  }

  function getAttributionContext() {
    var context = {};
    try {
      var search = new URL(window.location.href).searchParams;
      attributionKeys.forEach(function (key) {
        var value = validAttributionValue(search.get(key));
        if (value) context[attributionContextKeys[key]] = value;
      });
    } catch {
      return {};
    }
    return context;
  }

  function trackAnalyticsEvent(eventName, payload) {
    var umami = window.umami;
    if (!umami || typeof umami.track !== "function") return;
    try {
      umami.track(eventName, Object.assign({}, payload, getAttributionContext()));
    } catch {
      // Analytics must never interfere with demo behavior or navigation.
    }
  }

  function getProjectionSurface(link) {
    var surface = link.getAttribute("data-analytics-surface");
    return surface === "hero" || surface === "final_cta" ? surface : null;
  }

  function getProjectionTarget(link) {
    var target = link.getAttribute("data-analytics-target");
    return target === "decision" || target === "hrtech" || target === "health" || target === "legal" ? target : null;
  }

  function pagePath() {
    return window.location.pathname || "/";
  }

  document.querySelectorAll(".replay-button").forEach(function (button) {
    button.setAttribute("data-original-label", button.innerHTML);
  });

  function resetReplay() {
    document.querySelectorAll("[data-replay-state]").forEach(function (card) {
      card.classList.remove("is-replayed");
      card.removeAttribute("data-replay-state");
    });

    document.querySelectorAll(".replay-button").forEach(function (button) {
      button.setAttribute("aria-expanded", "false");
      button.innerHTML = button.getAttribute("data-original-label");
    });

    document.getElementById("replay").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function focusSection(key) {
    var target = document.getElementById("execution-" + key);
    if (!target) return;

    document.querySelectorAll(".execution-card[data-replay-state]").forEach(function (card) {
      card.classList.remove("is-replayed");
      card.removeAttribute("data-replay-state");
    });

    document.querySelectorAll(".replay-button").forEach(function (button) {
      button.setAttribute("aria-expanded", "false");
      button.innerHTML = button.getAttribute("data-original-label");
    });

    target.classList.add("is-replayed");
    target.setAttribute("data-replay-state", "shown");
    target.querySelectorAll(".replay-button").forEach(function (button) {
      button.setAttribute("aria-expanded", "true");
      button.innerHTML = "← Back to all executions";
    });
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  replayButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var key = button.getAttribute("data-replay");
      var target = document.getElementById("execution-" + key);
      if (button.classList.contains("replay-button") && target && target.getAttribute("data-replay-state") === "shown") {
        trackAnalyticsEvent("replay_reset", {
          page_path: pagePath(),
          surface: "execution_card",
        });
        resetReplay();
        return;
      }
      if (!target) return;
      trackAnalyticsEvent("execution_open", {
        page_path: pagePath(),
        execution_key: key,
        surface: button.classList.contains("replay-button") ? "execution_card" : "hero",
      });
      focusSection(key);
    });
  });

  if (resetButton) resetButton.addEventListener("click", function () {
    trackAnalyticsEvent("replay_reset", {
      page_path: pagePath(),
      surface: "toolbar",
    });
    resetReplay();
  });

  function mountLinkAnalytics() {
    if (analyticsMounted) return;
    analyticsMounted = true;
    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target || typeof target.closest !== "function") return;
      var link = target.closest("a[data-analytics-event]");
      if (!link) return;
      var eventName = link.getAttribute("data-analytics-event");
      if (eventName === "projection_open") {
        var projectionSurface = getProjectionSurface(link);
        var projectionTarget = getProjectionTarget(link);
        if (!projectionSurface || !projectionTarget) return;
        trackAnalyticsEvent(eventName, {
          page_path: pagePath(),
          target: projectionTarget,
          surface: projectionSurface,
        });
      } else if (eventName === "github_repo_open") {
        trackAnalyticsEvent(eventName, {
          page_path: pagePath(),
          surface: link.getAttribute("data-analytics-surface") || "header",
          destination: "github_repository",
        });
      }
    });
  }

  mountLinkAnalytics();
}());
