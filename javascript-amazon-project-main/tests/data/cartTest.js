import { addToCart, loadFromStorage, cart } from "../../data/cart.js";

describe('test suite: addToCart', () =>{

  beforeEach(()=>{

    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      
        <select class="js-quantity-selector-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
    `
  });

  afterEach(()=>{

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('adds an exisiting product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {

      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        delivaryOptionId: '1'
      }]);
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        delivaryOptionId: '1'
      }])
    );

  });
  
  it('adds a new product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {

      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        delivaryOptionId: '1'
      }])
    );

  });

});
