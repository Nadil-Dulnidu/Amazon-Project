import { validDelivaryOptions } from "./delivaryOptions.js";

class Cart {

  cartItems;

  localStorageKey;

  constructor(localStorageKey){

    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
    
  };

  loadFromStorage(){
  
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  
  };

  saveToStorage(){
  
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  };

  addToCart(productId){
  
    let matchingItem;
  
    this.cartItems.forEach(item =>{
  
      if (productId === item.productId){
  
        matchingItem = item;
      }
    });
  
    const selectElement = document.querySelector(`.js-quantity-selector-${productId}`);
  
    const quantity = 1 ||Number(selectElement.value);
  
    if (matchingItem) {
      matchingItem.quantity += quantity;
    }else {
      this.cartItems.push({
        productId: productId,
        quantity: quantity,
        delivaryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  };

  removeFromCart(productId){
  
    const newCart = [];
  
    this.cartItems.forEach(item => {
  
      if (item.productId !== productId){
  
        newCart.push(item);
      }
    });
  
    this.cartItems = newCart;
  
    this.saveToStorage();
  };

  calculateCartQuantity(){
  
    let cartQuantity = 0;
  
    this.cartItems.forEach( item => {
  
      cartQuantity += item.quantity;
    });
  
    return cartQuantity;
  };

  updateQuantity(productId, newQuentity){
  
    let matchingItem;
  
    this.cartItems.forEach(item => {
  
      if (productId === item.productId){
        matchingItem = item;
      }
    });
  
    matchingItem.quantity = newQuentity;
  
    this.saveToStorage();
    
  };

  updateDelivaryOptions(productId, delivaryOptionId){

    let matchingItem;
  
    this.cartItems.forEach(item =>{
  
      if (productId === item.productId){
  
        matchingItem = item;
      }
    });
  
    if (!matchingItem){
  
      return;
    }
  
    if (!validDelivaryOptions(delivaryOptionId)){
  
      return;
    }
  
    matchingItem.delivaryOptionId = delivaryOptionId;
  
    this.saveToStorage();
  
  };
};

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-busunees');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);