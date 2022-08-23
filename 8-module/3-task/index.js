export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
      console.log(this.cartItems);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

let test = new Cart();
let testProduct = {
  name: "Laab kai chicken salad", // название товара
  price: 10, // цена товара
  category: "salads",
  image: "laab_kai_chicken_salad.png",
  id: "laab-kai-chicken-salad",
};

console.log(test.addProduct());
