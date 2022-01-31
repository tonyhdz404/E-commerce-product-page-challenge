"use strict";
const content = document.querySelector(".content");
const thumbnailContainer = document.querySelector(
  ".product-images__thumbnails"
);
const imgMain = document.querySelector(".product-images__main__img");
const imgsThumb = document.querySelectorAll(".product-images__thumbnails__img");

//* Changing the Main img when clicking on a thumbnail
thumbnailContainer.addEventListener("click", function (e) {
  const thumbnail = e.target.closest(".product-images__thumbnails__img");
  imgsThumb.forEach((el) => el.classList.remove("active"));
  if (!thumbnail) return;
  const src = thumbnail.getAttribute("src").replace(/(-thumbnail)/, "");
  thumbnail.classList.add("active");
  imgMain.src = src;
});

//* Opens Modal on Main img click
imgMain.addEventListener("click", function (e) {
  console.log("Open modal ");
});
