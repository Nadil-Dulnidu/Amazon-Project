import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDelivaryOptions } from "../../data/delivaryOptions.js";
import { formatCurrency } from "../../utils/money.js";
import { addOrders } from "../../data/orders.js";

export function renderPaymentSummery(){

  let productPriceCents = 0;
  let shippingPriceCents = 0;
  
  cart.forEach(item => {

    const product = getProduct(item.productId);
    productPriceCents += product.priceCents * item.quantity;

    const delivaryOption = getDelivaryOptions(item.delivaryOptionId);
    shippingPriceCents += delivaryOption.priceCents;

  });

  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax + taxCents;

  const PaymentSummeryHTML = `
  
    <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div class ="js-payment-items"></div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-shipping-price">$${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-total-payment">$${formatCurrency(totalCents)}</div>
      </div>

      <button class="place-order-button button-primary js-place-order">
        Place your order
      </button>
  `;

  document.querySelector('.js-payment-summary')
  .innerHTML = PaymentSummeryHTML;

  const cartQuantity = calculateCartQuantity();
  
  document.querySelector('.js-payment-items')
  .innerHTML = `Items (${cartQuantity}):`;

  document.querySelector('.js-place-order')
  .addEventListener('click', async ()=>{

    try{

      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });

      const order = await response.json();
      addOrders(order);

    }catch(error){

      console.log('unexpected error. Try agian later');

    }

    window.location.href = 'orders.html';
  })
  
};

