// Slider
const cards = document.querySelectorAll(".cards");
let current = 0;

function updateCards() {
  const width = window.innerWidth;

  // If screen ≤ 700px → stack all cards behind each other
  if (width <= 700) {
    cards.forEach((card, i) => {
      card.style.transition = "transform 0.6s ease, opacity 0.6s ease";
      card.style.transform = "translateX(0) scale(1)";
      card.style.opacity = i === current ? "1" : "0"; // show only current
      card.style.zIndex = i === current ? 3 : 1;
    });
    return; // stop here for mobile layout
  }

  // Normal desktop/tablet behavior
  const baseShift = width > 1024 ? 220 : width > 768 ? 160 : 120;

  const scaleCenter = 1;
  const scaleSide = 0.8;

  cards.forEach((card, i) => {
    card.style.transition = "transform 0.6s ease, opacity 0.6s ease";
    card.style.zIndex = -Math.abs(i - current);

    if (i === current) {
      // Center card
      card.style.transform = `translateX(0) scale(${scaleCenter})`;
      card.style.opacity = "1";
      card.style.zIndex = 3;
    } else if (i === (current - 1 + cards.length) % cards.length) {
      // Left card
      card.style.transform = `translateX(-${baseShift}px) scale(${scaleSide})`;
      card.style.opacity = "0.7";
      card.style.zIndex = 2;
    } else if (i === (current + 1) % cards.length) {
      // Right card
      card.style.transform = `translateX(${baseShift}px) scale(${scaleSide})`;
      card.style.opacity = "0.7";
      card.style.zIndex = 2;
    } else {
      // Hidden cards
      card.style.transform = "translateX(0) scale(0.5)";
      card.style.opacity = "0";
      card.style.zIndex = 1;
    }
  });
}

// Recalculate on resize
window.addEventListener("resize", updateCards);

function nextSlide() {
  current = (current + 1) % cards.length;
  updateCards();
}
function prevSlide() {
  current = (current - 1 + cards.length) % cards.length;
  updateCards();
}
updateCards();

// Automatic and manual slider
let list = document.querySelector(".hero_sliders .hero_list");
let items = document.querySelectorAll(".hero_sliders .hero_list .hero_items");
let dots = document.querySelectorAll(".hero_sliders .dots li");
let prev = document.getElementById("hero_prev");
let next = document.getElementById("hero_next");

let active = 0;
let lengthItems = items.length - 1;

next.onclick = function () {
  if (active + 1 > lengthItems) {
    active = 0;
  } else {
    active = active + 1;
  }
  reloadSlider();
};

prev.onclick = function () {
  if (active - 1 < 0) {
    active = lengthItems;
  } else {
    active = active - 1;
  }
  reloadSlider();
};

let refreshSlider = setInterval(() => {
  next.click();
}, 3000);

function reloadSlider() {
  let checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + "px";
  let lastActiveDot = document.querySelector(".hero_sliders .dots li.active");
  lastActiveDot.classList.remove("active");
  dots[active].classList.add("active");
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    next.click();
  }, 3000);
}

// Countdown to Nov 27, 2026 08:00 SAST (UTC+2)
(function () {
  const dayEl = document.getElementById("cd-days");
  const hourEl = document.getElementById("cd-hours");
  const minEl = document.getElementById("cd-mins");
  const secEl = document.getElementById("cd-secs");
  if (!dayEl || !hourEl || !minEl || !secEl) return;

  const target = new Date("2026-11-27T08:00:00+02:00").getTime();

  function update() {
    const now = Date.now();
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    dayEl.textContent = String(days);
    hourEl.textContent = String(hours).padStart(2, "0");
    minEl.textContent = String(mins).padStart(2, "0");
    secEl.textContent = String(secs).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
})();

// Footer year
(function () {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
