// function showSection(id) {
//   document.querySelectorAll(".about_content").forEach((section) => {
//     section.classList.remove("active");
//   });
//   document.getElementById(id).classList.add("active");
// }

// Script for tab menu open on same page
function showSection(cityName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("about_content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(cityName).style.display = "grid";
  elmnt.style.backgroundColor = "#007994";
}
document.getElementById("active").click();

// let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides((slideIndex += n));
// }

// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }

// Store a slideIndex per slideshow container
let slideIndexes = {};

function plusSlides(n, sliderId) {
  showSlides((slideIndexes[sliderId] += n), sliderId);
}

function currentSlide(n, sliderId) {
  showSlides((slideIndexes[sliderId] = n), sliderId);
}

function initSlides(sliderId) {
  slideIndexes[sliderId] = 1;
  showSlides(1, sliderId);
}

function showSlides(n, sliderId) {
  let slider = document.getElementById(sliderId);
  let slides = slider.getElementsByClassName("mySlides");
  let dots = slider.getElementsByClassName("demo");
  let captionText = slider.querySelector("#caption");

  if (n > slides.length) slideIndexes[sliderId] = 1;
  if (n < 1) slideIndexes[sliderId] = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndexes[sliderId] - 1].style.display = "block";
  dots[slideIndexes[sliderId] - 1].classList.add("active");

  if (captionText) {
    captionText.innerHTML = dots[slideIndexes[sliderId] - 1].alt || "";
  }
}

initSlides("slider1");
initSlides("slider2");
initSlides("slider3");
initSlides("slider4");
