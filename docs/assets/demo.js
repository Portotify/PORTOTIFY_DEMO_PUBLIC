(function () {
  document.documentElement.classList.add("js");
  var replayButtons = document.querySelectorAll("[data-replay]");
  var resetButton = document.querySelector("[data-reset]");

  function focusSection(key) {
    var target = document.getElementById("execution-" + key);
    if (!target) return;
    document.querySelectorAll(".execution-card[data-replay-state]").forEach(function (card) {
      card.classList.remove("is-replayed");
      card.removeAttribute("data-replay-state");
      card.querySelectorAll("[data-replay]").forEach(function (button) { button.setAttribute("aria-expanded", "false"); });
    });
    target.classList.add("is-replayed");
    target.setAttribute("data-replay-state", "shown");
    target.querySelectorAll("[data-replay]").forEach(function (button) {
      button.setAttribute("aria-expanded", "true");
    });
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  replayButtons.forEach(function (button) {
    button.addEventListener("click", function () { focusSection(button.getAttribute("data-replay")); });
  });

  if (resetButton) resetButton.addEventListener("click", function () {
    document.querySelectorAll("[data-replay-state]").forEach(function (card) {
      card.classList.remove("is-replayed");
      card.removeAttribute("data-replay-state");
      card.querySelectorAll("[data-replay]").forEach(function (button) { button.setAttribute("aria-expanded", "false"); });
    });
    document.getElementById("replay").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}());
