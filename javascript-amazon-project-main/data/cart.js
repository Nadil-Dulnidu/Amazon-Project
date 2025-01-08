export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
  delivaryOptionId: '2'

}];

function saveToStorage(){

  localStorage.setItem('cart', JSON.stringify(cart));
};

export function addToCart(productId){

  let matchingItem;

  cart.forEach(item =>{

    if (productId === item.productId){

      matchingItem = item;
    }
  });

  const selectElement = document.querySelector(`.js-quantity-selector-${productId}`);

  const quantity = Number(selectElement.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  }else {
    cart.push({
      productId: productId,
      quantity: quantity,
      delivaryOptionId: '1'
    });
  }

  saveToStorage();
};

export function removeFromCart(productId){

  const newCart = [];

  cart.forEach(item => {

    if (item.productId !== productId){

      newCart.push(item);
    }
  });

  cart = newCart;

  saveToStorage();
};

export function calculateCartQuantity(){

  let cartQuantity = 0;

  cart.forEach( item => {

    cartQuantity += item.quantity;
  });

  return cartQuantity;
};

export function updateQuantity(productId, newQuentity){

  let matchingItem;

  cart.forEach(item => {

    if (productId === item.productId){
      matchingItem = item;
    }
  });

  matchingItem.quantity = newQuentity;

  saveToStorage();
};

export function updateDelivaryOptions(productId, delivaryOptionId){

  let matchingItem;

  cart.forEach(item =>{

    if (productId === item.productId){

      matchingItem = item;
    }
  });

  matchingItem.delivaryOptionId = delivaryOptionId;

  saveToStorage();

};