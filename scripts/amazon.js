import {cart} from '../data/cart-class.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

  loadProducts(renderProductsGrid);

  function renderProductsGrid() {
    let productsHTML = '';

    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');

    let filteredProducts = products;

    if (search) {
      filteredProducts = products.filter((product) => {
        return product.keywords.some(keyword => keyword.toLowerCase().includes(search.toLowerCase())) ||  product.name.toLowerCase().includes(search.toLowerCase());
      });
    }
    filteredProducts.forEach((product) => {

    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select>
            ${[...Array(10)].map((_, i) =>
              `<option value="${i + 1}" ${i === 0 ? 'selected' : ''}>${i + 1}</option>`).join('')}
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  cart.updateCartQuantity()

  document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    let addedMessageTimeoutId;

    button.addEventListener('click', () => {
      const {productId} = button.dataset;

      cart.addToCart(productId);
      cart.updateCartQuantity();

      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

      if (addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
      }

      addedMessage.classList.add('added-to-cart-visible');

      addedMessageTimeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      }, 2000);
    });
  });

  document.querySelector('.js-search-button')
  .addEventListener('click', () => {
    const search = document.querySelector('.js-search-bar').value;
    window.location.href = `amazon.html?search=${search}`
  });

  document.querySelector('.js-search-bar')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const searchTerm = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?${searchTerm}`
    }
  })
}


