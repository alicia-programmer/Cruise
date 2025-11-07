// Cursor follow
const heading = document.querySelector("#heading");
const sensitivity = 30;

window.addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;

  //get mouse position relative to center (range: -0.5 .. 0.5)
  const x = (e.clientX / innerWidth - 0.5) * 2;
  const y = (e.clientY / innerHeight - 0.5) * 2;

  heading.style.transform = `translate(${x * sensitivity}px, ${
    y * sensitivity
  }px)`;
});

// Slider
const cards = document.querySelectorAll(".cards");
let current = 0;

function updateCards() {
  cards.forEach((card, i) => {
    card.style.zIndex = -Math.abs(i - current);

    if (i === current) {
      //   Center card
      card.style.transform = "translateX(0) scale(1)";
      card.style.opacity = "1";
      card.style.zIndex = 3;
    } else if (i === (current - 1 + cards.length) % cards.length) {
      //   Left card
      card.style.transform = "translateX(-220px) scale(0.8)";
      card.style.opacity = "0.7";
      card.style.zIndex = 2;
    } else if (i === (current + 1) % cards.length) {
      //   Right card
      card.style.transform = "translateX(220px) scale(0.8)";
      card.style.opacity = "0.7";
      card.style.zIndex = 2;
    } else {
      //   Hidden card
      card.style.transform = "translateX(0) scale(0.5)";
      card.style.opacity = "0";
      card.style.zIndex = 1;
    }
  });
}

function nextSlide() {
  current = (current + 1) % cards.length;
  updateCards();
}
function prevSlide() {
  current = (current - 1 + cards.length) % cards.length;
  updateCards();
}
updateCards();

// Header Parallax
const header = document.querySelector("#header");
const moveStrength = 0.05;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  header.style.transform = `translateY(${scrollY * moveStrength}px)`;
});

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
