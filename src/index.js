"use strict";
const content = document.querySelector(".content");
const thumbnailContainer = document.querySelector(
  ".product-images__thumbnails"
);
const imgMain = document.querySelector(".product-images__main__img");
const imgsThumb = document.querySelectorAll(".product-images__thumbnails__img");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

//* Changing the Main img when clicking on a thumbnail
thumbnailContainer.addEventListener("click", function (e) {
  const thumbnail = e.target.closest(".product-images__thumbnails__img");
  imgsThumb.forEach((el) => el.classList.remove("active"));
  if (!thumbnail) return;
  const src = thumbnail.getAttribute("src").replace(/(-thumbnail)/, "");
  thumbnail.classList.add("active");
  imgMain.src = src;
});
let currentSlide = 0;
const slides = document.querySelectorAll(".modal__slide");
console.log(currentSlide);
//* Opens Modal on Main img click
imgMain.addEventListener("click", function (e) {
  console.log("Open modal ");
  overlay.classList.remove("hidden");
  const imgClicked = imgMain.getAttribute("src");
  const [slideNum] = imgClicked.match(/\d(?=\.jpg)/);
  console.log(imgClicked, slideNum);
  currentSlide = +slideNum - 1;
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100 + currentSlide * -100}%)`;
  });

  //   const modalHTML = `
  //   <div class="modal__slider">
  //   <div class="modal__slide slide--1">
  //     <img
  //       class="modal__main slide--1"
  //       src="./images/image-product-1.jpg"
  //       alt="Main Image"
  //     />
  //   </div>
  //   <div class="modal__slide slide--2">
  //     <img
  //       class="modal__main"
  //       src="./images/image-product-2.jpg"
  //       alt="Main Image"
  //     />
  //   </div>
  //   <div class="modal__slide slide--3">
  //     <img
  //       class="modal__main"
  //       src="./images/image-product-3.jpg"
  //       alt="Main Image"
  //     />
  //   </div>
  //   <div class="modal__slide slide--4">
  //     <img
  //       class="modal__main"
  //       src="./images/image-product-4.jpg"
  //       alt="Main Image"
  //     />
  //   </div>
  // </div>
  //   <div class="modal__thumbnails">
  //     <img
  //       src="./images/image-product-1-thumbnail.jpg"
  //       alt=""
  //       class="modal__thumbnail ${
  //         activeThumbnail(imgClicked, "./images/image-product-1-thumbnail.jpg")
  //           ? "active"
  //           : ""
  //       }"
  //     />
  //     <img
  //       src="./images/image-product-2-thumbnail.jpg"
  //       alt=""
  //       class="modal__thumbnail ${
  //         activeThumbnail(imgClicked, "./images/image-product-2-thumbnail.jpg")
  //           ? "active"
  //           : ""
  //       }"
  //     />
  //     <img
  //       src="./images/image-product-3-thumbnail.jpg"
  //       alt=""
  //       class="modal__thumbnail ${
  //         activeThumbnail(imgClicked, "./images/image-product-3-thumbnail.jpg")
  //           ? "active"
  //           : ""
  //       }"
  //     />
  //     <img
  //       src="./images/image-product-4-thumbnail.jpg"
  //       alt=""
  //       class="modal__thumbnail ${
  //         activeThumbnail(imgClicked, "./images/image-product-4-thumbnail.jpg")
  //           ? "active"
  //           : ""
  //       }"
  //     />
  //     <button class="modal__btn-next">
  //       <img src="./images/icon-next.svg" alt="" />
  //     </button>
  //     <button class="modal__btn-prev">
  //       <img src="./images/icon-previous.svg" alt="" />
  //     </button>
  //   </div>`;

  //   modal.insertAdjacentHTML("beforeend", modalHTML);
});
//* Close overlay when we click on it
// overlay.addEventListener("click", function (e) {
//   overlay.classList.add("hidden");
//   modal.innerHTML = "";
// });

function activeThumbnail(mainScr, thumbSrc) {
  const src = thumbSrc.replace(/(-thumbnail)/, "");

  if (src === mainScr) return true;
  return false;
}

//! Slider

modal.addEventListener("click", function (e) {
  const btnNext = e.target.closest(".modal__btn-next");
  if (!btnNext) return;
  console.log("slide");
  currentSlide++;
  if (currentSlide > 3) currentSlide = 0;
  nextSlide(currentSlide);
});

modal.addEventListener("click", function (e) {
  const btnPrev = e.target.closest(".modal__btn-prev");
  if (!btnPrev) return;
  console.log("slide");
  currentSlide--;
  if (currentSlide < 0) currentSlide = 3;
  console.log(currentSlide);
  prevSlide(currentSlide);
});
//* sett up slides

//* sliding to next

function nextSlide(currentSlide) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100 + currentSlide * -100}%)`;
  });
}

function prevSlide(currentSlide) {
  console.log(currentSlide);
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100 + currentSlide * -100}%)`;
  });
}
