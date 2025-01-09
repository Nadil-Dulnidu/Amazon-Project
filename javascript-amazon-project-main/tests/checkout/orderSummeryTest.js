import { loadFromStorage, cart} from "../../data/cart.js";
import { renderOrderSummery } from "../../Scripts/checkout/OrderSummery.js";

describe('test suite: renderOrderSummery', () => {

  beforeEach(() => {

    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-checkout-items"></div>
      <div class="js-order-summery"></div>
      <div class="js-payment-summary"></div>
    
      `;

    spyOn(localStorage, 'getItem').and.callFake(() => {

      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        delivaryOptionId: '1'
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        delivaryOptionId: '2'
      }]);
    });

    loadFromStorage();

    renderOrderSummery();
  
  });

  it('displays the cart', () => {
    
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

    expect(document.querySelector(`.js-product-quantity-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${'15b6fc6f-327a-4ec4-896f-486349e85a3d'}`).innerText).toContain('Quantity: 1');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('remove a product',() => {

    document.querySelector(`.js-delete-link-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).click();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${'15b6fc6f-327a-4ec4-896f-486349e85a3d'}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');

    document.querySelector('.js-test-container').innerHTML = '';

  });
});