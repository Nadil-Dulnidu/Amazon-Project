import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";

let cartSummeryHTML = '';

cart.forEach(item =>{

  const productId = item.productId;

  let matchingProduct;

  products.forEach(product => {

    if (product.id === productId){

      matchingProduct = product;
    }
  });

  console.log(matchingProduct);

  const cartSummery = `
    
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  cartSummeryHTML += cartSummery;
});

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

const saveElement = document.querySelectorAll('.js-save-link')

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
  
  });

});
