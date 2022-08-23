import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.create();
  }

  create() {
    let newCards = this.cards();
    let productGrid = this.tempalate().querySelector(".products-grid__inner");

    newCards.map((element) => {
      productGrid.append(element.elem);
    });

    return productGrid;
  }

  tempalate() {
    let element = createElement(`<div class="products-grid">
    <div class="products-grid__inner">
    </div>
    </div>`);
    return element;
  }

  cards() {
    let cards = this.products.map((element) => {
      return new ProductCard(element);
    });
    return cards;
  }

  updateFilter(filters) {
    let filteredMenu = this.tempalate().querySelector(".products-grid__inner");
    let arrayTemp = this.cards();

    this.filters = Object.assign(this.filters, filters);

    // if (filters.hasOwnProperty("noNuts")) {
    //   this.filters.noNuts = filters.noNuts;
    // }

    // if (filters.hasOwnProperty("vegeterianOnly")) {
    //   this.filters.vegeterianOnly = filters.vegeterianOnly;
    // }

    // if (filters.hasOwnProperty("maxSpiciness")) {
    //   this.filters.maxSpiciness = filters.maxSpiciness;
    // }

    // if (filters.hasOwnProperty("category")) {
    //   this.filters.category = filters.category;
    // } else {
    //   this.filters.category = "";
    // }

    if (this.filters.category) {
      console.log("зашел в фильтр Категории");
      arrayTemp = arrayTemp.filter(
        (item) => item.product.category === this.filters.category
      );
    }

    if (this.filters.noNuts === true) {
      console.log("зашел в фильтр Без орехов");
      arrayTemp = arrayTemp.filter(
        (item) =>
          !item.product.hasOwnProperty("nuts") || item.product.noNuts === false
      );
    }

    if (this.filters.vegeterianOnly === true) {
      console.log("зашел в фильтр Вег");
      arrayTemp = arrayTemp.filter(
        (item) => item.product.vegeterian === this.filters.vegeterianOnly
      );
    }

    if (this.filters.hasOwnProperty("maxSpiciness")) {
      console.log("зашел в фильтр Остроты");
      arrayTemp = arrayTemp.filter(
        (item) => item.product.spiciness <= this.filters.maxSpiciness
      );
    }

    arrayTemp.map((element) => {
      filteredMenu.append(element.elem);
    });

    // let productsGridInner = document.querySelector(".products-grid__inner");

    this.elem.innerHTML = filteredMenu.innerHTML;

    console.log(this.filters);
    console.log(arrayTemp);
  }
}