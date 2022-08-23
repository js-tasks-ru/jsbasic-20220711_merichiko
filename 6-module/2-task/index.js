export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.template();
  }

  template() {
    let temp = `
    <div class="card__top">
      <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
      <span class="card__price">€${this.product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
      <div class="card__title">${this.product.name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
    `;

    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = temp;


    let button = card.querySelector('button');
    let id = this.product.id;

    button.addEventListener('click', function(event) {
      button.addEventListener('product-add', function(event) {
        return event.detail;
      });
      button.dispatchEvent(new CustomEvent('product-add', {
        detail: id, 
        bubbles: true 
      }));
    });

    return card;
  }
}