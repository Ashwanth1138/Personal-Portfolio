
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeBtn = document.getElementById("themeBtn");
const typing = document.getElementById("typing");
const topBtn = document.getElementById("topBtn");

// Mobile navigation
menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.textContent = isOpen ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Dark and light theme
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  themeBtn.textContent = isLight ? "☾" : "☀";

  try {
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  } catch (error) {
    // Theme still works if browser storage is unavailable.
  }
});

// Restore saved theme
try {
  if (localStorage.getItem("portfolio-theme") === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☾";
  }
} catch (error) {
  // Continue with the default theme.
}

// Typing animation
const words = ["Developer", "Problem Solver", "Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const word = words[wordIndex];

  typing.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (!deleting && charIndex === word.length) {
    deleting = true;
    setTimeout(typeEffect, 1100);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 55);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 250);
  }
}

typeEffect();

// Current year in footer
document.getElementById("year").textContent =
  new Date().getFullYear();

// Back-to-top button
window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 400);
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
