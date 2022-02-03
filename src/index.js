"use strict";
const content = document.querySelector(".content");
const thumbnailContainer = document.querySelector(
  ".product-images__thumbnails"
);
const imgMain = document.querySelector(".product-images__main__img");
const imgsThumb = document.querySelectorAll(".product-images__thumbnails__img");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const btnClose = document.querySelector(".modal__close");
const modalThumbnailContainer = document.querySelector(".modal__thumbnails");
const allThumbnails = document.querySelectorAll(".modal__thumbnail");
const btnCart = document.querySelector(".nav__cart-icon");
const cart = document.querySelector(".cart");
const cartQuantity = document.querySelector(".cart-quantity");

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
  console.log("Open modal");
  overlay.classList.remove("hidden");
  const imgClicked = imgMain.getAttribute("src");
  const [slideNum] = imgClicked.match(/\d(?=\.jpg)/);
  console.log(imgClicked, slideNum);
  currentSlide = +slideNum - 1;
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100 + currentSlide * -100}%)`;
  });
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

function goToSlide(slide) {
  currentSlide = slide;
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100 + currentSlide * -100}%)`;
  });
}

//* sliding to next
function nextSlide(currentSlide) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100 + currentSlide * -100}%)`;
  });
  allThumbnails.forEach((el) => {
    el.classList.remove("active-thumb");
    const src = el.getAttribute("src").match(/(?!-)\d(?=-)/)[0] - 1;
    if (src === currentSlide) {
      el.classList.add("active-thumb");
    }
  });
}

function prevSlide(currentSlide) {
  console.log(currentSlide);
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100 + currentSlide * -100}%)`;
  });
  allThumbnails.forEach((el) => {
    el.classList.remove("active-thumb");
    const src = el.getAttribute("src").match(/(?!-)\d(?=-)/)[0] - 1;
    if (src === currentSlide) {
      el.classList.add("active-thumb");
    }
  });
}

//* Closing Modal
btnClose.addEventListener("click", function (e) {
  overlay.classList.add("hidden");
});

//* changing main modal img on thumbnail click
modalThumbnailContainer.addEventListener("click", function (e) {
  const thumbnail = e.target.closest(".modal__thumbnail");
  if (!thumbnail) return;

  const slide = thumbnail.getAttribute("src").match(/(?!-)\d(?=-)/)[0] - 1;
  goToSlide(slide);
  allThumbnails.forEach((el) => {
    el.classList.remove("active-thumb");
    const src = el.getAttribute("src").match(/(?!-)\d(?=-)/)[0] - 1;
    if (src === currentSlide) {
      el.classList.add("active-thumb");
    }
  });
});

//! cart functionality
btnCart.addEventListener("click", function (e) {
  console.log("Cart");
  cart.classList.toggle("cart-hidden");
});

//* Setting up the Quanity
let quantity = 0;
const quantityContainer = document.querySelector(".quantity");
const labelQuantity = document.querySelector(".quantity__quantity");
labelQuantity.innerText = quantity;

//* Updating the Quantity
quantityContainer.addEventListener("click", function (e) {
  const increase = e.target.closest(".quantity__increase");
  const decrease = e.target.closest(".quantity__decrease");
  if (increase) {
    quantity++;
  } else if (decrease) {
    if (quantity <= 0) return;
    quantity--;
  } else {
    return;
  }
  if (quantity === 0) {
    cartQuantity.classList.add("hidden");
  } else {
    cartQuantity.classList.remove("hidden");
    cartQuantity.innerText = quantity;
  }

  labelQuantity.innerText = quantity;
});

//* Adding and item to Cart
const productCart = document.querySelector(".product-cart");
const cartContent = document.querySelector(".cart__content");
//* Listening to Clicks on the add to cart button
productCart.addEventListener("click", function (e) {
  const btnAddToCart = e.target.closest(".product-cart__add-btn");
  if (!btnAddToCart) return;
  console.log("ADD");
  cartContent.innerHTML = "";
  const totalCost = 125 * quantity;
  const cartHTML = `
<div class="cart__content__item">
    <img
      src="./images/image-product-1-thumbnail.jpg"
      alt=""
      class="cart__content__item-img"
    />
    <div class="item-info">
      <span class="item-title"> Fall Limited Edition Sneakers</span>
      <span class="item-quanity">$125.00 x ${quantity} </span>
      <span class="item-cost">$${totalCost}.00</span>
    </div>
    <button class="trash">
      <img
        src="./images/icon-delete.svg"
        alt=""
        class="item-remove"
      />
    </button>
  </div> 
  <button class="cart__content__checkout">Checkout</button>
</div>`;
  cartContent.insertAdjacentHTML("afterbegin", cartHTML);
});

//* Deleting Items from cart
cartContent.addEventListener("click", function (e) {
  const btnDelete = e.target.closest(".trash");
  if (!btnDelete) return;
  cartContent.innerHTML = "";
  cartContent.innerText = "Your cart is empty.";
  quantity = 0;
  labelQuantity.innerText = quantity;
  cartQuantity.innerText = quantity;
  cartQuantity.classList.add("hidden");
});
