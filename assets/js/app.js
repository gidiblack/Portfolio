// scroll to top
var myBtn = document.getElementById("myBtn");
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    myBtn.style.display = "block";
  } else {
    myBtn.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
$(document).ready(function () {
  // toggle mobile nav menu
  $(".menu-toggle").click(function () {
    $(".responsive-nav").toggleClass("unfold");
    $(this).toggleClass("close-menu");
  });
});

// Typing animation for hero headline (#hero-typing)
(function () {
  function typeText(el, text, speed) {
    var i = 0;
    el.textContent = "";
    (function step() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i += 1;
        setTimeout(step, speed);
      }
    })();
  }

  function initHeroTyping() {
    var el = document.getElementById("hero-typing");
    if (!el) return;
    var full = el.getAttribute("data-typing-text") || el.textContent || "";

    // reduced-motion: render immediately
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = full;
      return;
    }

    // small typing speed for professional feel
    var speed = 50;
    el.textContent = "";
    typeText(el, full, speed);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroTyping);
  } else {
    initHeroTyping();
  }
})();
