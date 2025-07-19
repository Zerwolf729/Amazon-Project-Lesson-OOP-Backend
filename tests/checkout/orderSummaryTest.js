import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {cart} from '../../data/cart-class.js';
import { loadProducts, loadProductsFetch } from '../../data/products.js';

describe('Test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productName1 = 'Black and Gray Athletic Cotton Socks - 6 Pairs';
  const productPrice1 = '$10.90';

  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productName2 = 'Intermediate Size Basketball';
  const productPrice2 = '$20.95';

  beforeAll(async () => {
    await loadProductsFetch()
  });
  
  beforeEach(() => {
    // Reset localStorage setItem spy
    spyOn(localStorage, 'setItem');

    // Inject the DOM structure
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary">
        <div class="js-payment-summary-shipping"></div>
        <div class="js-payment-summary-total"></div>
      </div>
      <div class="js-return-to-home-link"></div>
      <div class="js-checkout-header"></div>
    `;

    // Replace localStorage data with direct cart setup
    cart.cartItems = [
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];

    // Render after setting cart
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
    cart.cartItems = []; // Clean up for next test
  });

  it('Displays the cart correctly', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual(productName1);

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual(productName2);

    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual(productPrice1);

    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual(productPrice2);
  });

  it('Removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual(productName2);

    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual(productPrice2);

    // ✅ Fix: use cart.cartItems instead of cart
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
  });

  it('Updates the delivery option', () => {
    // Simulate clicking on delivery option 3
    const deliveryOptionElement = document.querySelector(`.js-delivery-option-${productId1}-3`);
    if (deliveryOptionElement) {
      deliveryOptionElement.click();
    } else {
      // Fail the test if element is missing
      fail(`Delivery option with id "3" for product ${productId1} not found`);
    }

    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
    ).toEqual(true);

    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

    expect(
      document.querySelector('.js-payment-summary-shipping').innerText
    ).toEqual('$14.98');

    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$63.50');
  });
});
