import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDelivaryOptions } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { delivaryOptions , getDelivaryOptions } from "../../data/delivaryOptions.js";
import { renderPaymentSummery } from "./PaymentSummery.js";

export function renderOrderSummery(){

  let cartSummeryHTML = '';

  cart.forEach(item =>{

    const productId = item.productId;
    const matchingProduct = getProduct(productId);

    const delivaryOptionId = item.delivaryOptionId;
    const delivaryOption = getDelivaryOptions(delivaryOptionId);

    const today = dayjs();
    const delivaryDate = today.add(delivaryOption.delivaryDays, 'days');
    const dateString = delivaryDate.format('dddd, MMMM, D');

    const cartSummery = `
      
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${item.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link"
              data-product-id="${matchingProduct.id}">
                Update 
              </span>
              <input class="quantity-link js-quantity-input-${matchingProduct.id}"> 
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
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

      const today = dayjs();
      const delivaryDate = today.add(delivaryOption.delivaryDays, 'days');
      const dateString = delivaryDate.format('dddd, MMMM, D');

      const priceString = delivaryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(delivaryOption.priceCents)} -`;

      const isChecked = delivaryOption.id === item.delivaryOptionId;

      const text = `
              <div class="delivery-option js-delivary-options" data-product-id="${matchingProduct.id}" data-delivary-option-id="${delivaryOption.id}">
                <input type="radio" ${isChecked ?'checked' :''}
                  class="delivery-option-input"
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

  function updateCartQuantity(){

    const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-checkout-items')
    .innerHTML = `${cartQuantity} items`;

  };

  updateCartQuantity();

  document.querySelector('.js-order-summery')
  .innerHTML = cartSummeryHTML;

  document.querySelectorAll('.js-delete-link')
  .forEach(link => {
    
    link.addEventListener('click', () => {

      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      container.remove();

      updateCartQuantity();

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

      updateCartQuantity();

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