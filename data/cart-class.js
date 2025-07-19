class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    const stored = localStorage.getItem(this.#localStorageKey);
    this.cartItems = stored ? JSON.parse(stored) : [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    const matchingItem = this.cartItems.find(item => item.productId === productId);
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: '1',
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    if (newQuantity < 0 || newQuantity >= 1000) return; // Validasi sederhana
    const matchingItem = this.cartItems.find(item => item.productId === productId);
    if (matchingItem) {
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    }
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = this.cartItems.find(item => item.productId === productId);
    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  }

  calculateCartQuantity() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  updateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((item) => {
      cartQuantity += item.quantity;
    });

    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    if (cartQuantityElement) {
      cartQuantityElement.innerHTML = cartQuantity;
    }
  }

  updateCartQuantityDisplay() {
    const cartQuantityElement = document.querySelector('.cart-quantity');
    if (cartQuantityElement) {
      cartQuantityElement.textContent = this.calculateCartQuantity();
    }
  }

  resetCart() {
    this.cart = [];
    this.saveToStorage();
  }
}

  export const cart = new Cart('cart-oop');
  export const businessCart = new Cart('cart-business');

  export let products = [];

  export function loadCart(fun) {
    const xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      console.log(xhr.response)
      fun();
    });

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }
  
    export async function loadCartFetch() {
      const response = await fetch('https://supersimplebackend.dev/cart');
      const text = await response.text();
      //console.log(text);
      return text;
    }