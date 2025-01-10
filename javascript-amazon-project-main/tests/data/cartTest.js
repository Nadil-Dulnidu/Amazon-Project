import { addToCart, loadFromStorage, cart, removeFromCart, updateDelivaryOptions } from "../../data/cart.js";

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

  it('remove a product from the cart', ()=>{

    spyOn(localStorage, 'getItem').and.callFake(()=>{

      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        delivaryOptionId: '1'
      }]);
    });

    loadFromStorage();

    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]));

  });

  it('does nothing if not product in the cart', ()=>{

    spyOn(localStorage, 'getItem').and.callFake(()=>{

      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        delivaryOptionId: '1'
      }]);
    });

    loadFromStorage();

    removeFromCart('does-not-exist');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      delivaryOptionId: '1'
    }]));

  });

});

describe('test suite: updateDelivaryOptions', ()=>{

  beforeEach(()=>{

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(()=>{

      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        delivaryOptionId: '1'
      }]);
    });

    loadFromStorage();
  });

  it('update delivary option of a product', ()=>{

    updateDelivaryOptions('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '1');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

  });

  it('update delivary option of not exist product', ()=>{

    updateDelivaryOptions('83d4ca15-0f35-48f5-b7a3-1ea210004f2e', '1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    
  });

  it('use a delivaryoption id that not exist',()=>{

    updateDelivaryOptions('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '5');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(cart.length).toEqual(1);

  });
});
