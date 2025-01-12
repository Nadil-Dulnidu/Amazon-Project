import { loadFromStorage, cart} from "../../data/cart.js";
import { renderOrderSummery } from "../../Scripts/checkout/OrderSummery.js";
import { loadProducts, loadProductFetch } from "../../data/products.js";

describe('test suite: renderOrderSummery', () => {

  const product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const product2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

 /*  beforeAll((done)=>{
    loadProducts(() =>{
      done();
    });
  }); */

  beforeAll(done =>{
    loadProductFetch().then(()=>{
      done();
    });
  });

  beforeEach(() => {

    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-checkout-items"></div>
      <div class="js-order-summery"></div>
      <div class="js-payment-summary"></div>
    
      `;

    spyOn(localStorage, 'getItem').and.callFake(() => {

      return JSON.stringify([{
        productId: product1,
        quantity: 2,
        delivaryOptionId: '1'
      },{
        productId: product2,
        quantity: 1,
        delivaryOptionId: '2'
      }]);
    });

    loadFromStorage();

    renderOrderSummery();
  
  });

  afterEach(()=>{

    document.querySelector('.js-test-container').innerHTML = '';

  });

  it('displays the cart', () => {
    
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${product1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${product2}`).innerText).toContain('Quantity: 1');
    expect(document.querySelector(`.js-product-name-${product1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(document.querySelector(`.js-product-name-${product2}`).innerText).toEqual('Intermediate Size Basketball');
    expect(document.querySelector(`.js-product-price-${product1}`).innerText).toEqual('$10.90');
    expect(document.querySelector(`.js-product-price-${product2}`).innerText).toEqual('$20.95');
    

  });

  it('remove a product',() => {

    document.querySelector(`.js-delete-link-${product1}`).click();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${product1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${product2}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(product2);

  });

  it('update deleivary option', () => {

    document.querySelector(`.js-delivary-options-${product1}-${3}`).click();

    expect(document.querySelector(`.js-delivery-option-input-${product1}-${3}`).checked).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(product1);
    expect(cart[0].delivaryOptionId).toEqual('3');
    expect(document.querySelector('.js-shipping-price').innerText).toEqual('$14.98');
    expect(document.querySelector('.js-total-payment').innerText).toEqual('$63.50');
  });
});