(function () {
  document.documentElement.classList.add("js");
  var replayButtons = document.querySelectorAll("[data-replay]");
  var resetButton = document.querySelector("[data-reset]");

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
        resetReplay();
        return;
      }
      focusSection(key);
    });
  });

  if (resetButton) resetButton.addEventListener("click", resetReplay);
}());
