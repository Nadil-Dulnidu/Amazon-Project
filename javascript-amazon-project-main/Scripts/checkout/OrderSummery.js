import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDelivaryOptions } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../../utils/money.js";
import { delivaryOptions , getDelivaryOptions, calculateDelivaryDate } from "../../data/delivaryOptions.js";
import { renderPaymentSummery } from "./PaymentSummery.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummery(){

  let cartSummeryHTML = '';

  cart.forEach(item =>{
    const productId = item.productId;
    const matchingProduct = getProduct(productId);
    const delivaryOptionId = item.delivaryOptionId;
    const delivaryOption = getDelivaryOptions(delivaryOptionId);
    const dateString = calculateDelivaryDate(delivaryOption);
    const cartSummery = `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">
          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id} js-product-quantity-${matchingProduct.id}"> 
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${item.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link"
              data-product-id="${matchingProduct.id}">
                Update 
              </span>
              <input class="quantity-link js-quantity-input-${matchingProduct.id}"> 
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link
              js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${delivaryOptionHTML(matchingProduct, item)}
          </div>
        </div>
      </div>
    `;
    cartSummeryHTML += cartSummery;
  });

  function delivaryOptionHTML(matchingProduct , item){
    let html = '';
    delivaryOptions.forEach(delivaryOption => {
      const dateString = calculateDelivaryDate(delivaryOption);
      const priceString = delivaryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(delivaryOption.priceCents)} -`;
      const isChecked = delivaryOption.id === item.delivaryOptionId;
      const text = `
              <div class="delivery-option js-delivary-options js-delivary-options-${matchingProduct.id}-${delivaryOption.id}" data-product-id="${matchingProduct.id}" data-delivary-option-id="${delivaryOption.id}">
                <input type="radio" ${isChecked ?'checked' :''}
                  class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${delivaryOption.id}"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
              </div>
              `;
      html += text;        
    });
    return html;
  };

  renderCheckoutHeader();

  document.querySelector('.js-order-summery')
  .innerHTML = cartSummeryHTML;

  document.querySelectorAll('.js-delete-link')
  .forEach(link => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      renderCheckoutHeader();
      renderPaymentSummery();
    });
  });

  document.querySelectorAll('.js-update-link')
  .forEach(link => {
    link.addEventListener('click', ()=>{
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });

  const saveElement = document.querySelectorAll('.js-save-link');
  saveElement.forEach(link => {
    link.addEventListener('click', ()=>{
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
      const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
      const inputValue = Number(inputElement.value);
      const newQuentity = inputValue;
      if (newQuentity < 0 || newQuentity > 100){
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }
      updateQuantity(productId, newQuentity);
      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuentity;
      renderCheckoutHeader();
      renderPaymentSummery();
    });
  });

  document.querySelectorAll('.js-delivary-options')
  .forEach( element =>{
    element.addEventListener('click', () => {
      const {productId, delivaryOptionId} = element.dataset;
      updateDelivaryOptions(productId, delivaryOptionId);
      renderOrderSummery();
      renderPaymentSummery();
    });
  });
};