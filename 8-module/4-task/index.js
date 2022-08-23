import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = "";
    this.addEventListeners();
  }

  addProduct(product) {
    if (!!product) {
      let cartItem = {
        product: {},
        count: 0,
      };
      let presence = this.cartItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (presence === -1) {
        cartItem.product = product;
        cartItem.count = 1;
        this.cartItems.push(cartItem);
      } else {
        cartItem.product = this.cartItems[presence].product;
        cartItem.count = ++this.cartItems[presence].count;
      }
      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    let presence = this.cartItems.findIndex(
      (item) => item.product.id === productId
    );
    if (amount === 1) {
      ++this.cartItems[presence].count;
    }
    if (amount === -1) {
      --this.cartItems[presence].count;
    }
    if (this.cartItems[presence].count === 0) {
      this.elementRemove = this.cartItems[presence].product.id;
      let body = document.querySelector("body");
      body.querySelectorAll(".cart-product")[presence].remove();
      this.cartItems.splice(presence, 1);
    }

    this.onProductUpdate(this.cartItems[presence]);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach((item) => (totalCount += item.count));
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach((item) => {
      totalPrice += item.product.price * item.count;
    });
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(
            2
          )}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    let rootDiv = document.createElement("div");
    this.cartItems.forEach((item) => {
      rootDiv.append(this.renderProduct(item.product, item.count));
    });
    rootDiv.append(this.renderOrderForm());

    this.modal.setBody(rootDiv);
    this.modal.open();

    document.querySelectorAll(".cart-counter__button_plus").forEach((item) => {
      item.addEventListener("click", (event) => {
        let element = event.target.closest(".cart-product");
        this.updateProductCount(element.dataset.productId, 1);
      });
    });

    document.querySelectorAll(".cart-counter__button_minus").forEach((item) => {
      item.addEventListener("click", (event) => {
        let element = event.target.closest(".cart-product");
        this.updateProductCount(element.dataset.productId, -1);
      });
    });

    document.querySelector(".cart-form").addEventListener("submit", (event) => {
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {
    let modalBody = document.querySelector("body");
    if (this.isEmpty()) {
      modalBody.classList.remove("is-modal-open");
      document.querySelector(".modal").remove();
    }

    if (!!cartItem) {
      let productId = cartItem.product.id;

      if (modalBody.classList.contains("is-modal-open")) {
        let productCount = modalBody.querySelector(
          `[data-product-id="${productId}"] .cart-counter__count`
        );
        let productPrice = modalBody.querySelector(
          `[data-product-id="${productId}"] .cart-product__price`
        );
        let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
        this.renderProduct(cartItem.product, cartItem.count);

        productCount.innerHTML = cartItem.count;

        productPrice.innerHTML = `€${(
          cartItem.product.price * cartItem.count
        ).toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    let form = document.forms[0];
    let formData = new FormData(form);

    form.querySelector("button").classList.add("is-loading");

    const promise = fetch("https://httpbin.org/post", {
      body: formData,
      method: "POST",
    });

    promise.then(() => {
      this.modal.setTitle("Success!");
      this.cartItems = [];
      let template = `
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`;
      let divv = document.createElement("div");
      divv.innerHTML = template;
      this.modal.setBody(divv);
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}