import { validDelivaryOptions } from "./delivaryOptions.js";

function Cart(localStorageKey){

  const cart = {

    cartItems: undefined,
  
    loadFromStorage(){
  
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    
    },
  
    saveToStorage(){
  
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
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
    },
  
    removeFromCart(productId){
  
      const newCart = [];
    
      this.cartItems.forEach(item => {
    
        if (item.productId !== productId){
    
          newCart.push(item);
        }
      });
    
      this.cartItems = newCart;
    
      this.saveToStorage();
    },
  
    calculateCartQuantity(){
  
      let cartQuantity = 0;
    
      this.cartItems.forEach( item => {
    
        cartQuantity += item.quantity;
      });
    
      return cartQuantity;
    },
  
    updateQuantity(productId, newQuentity){
  
      let matchingItem;
    
      this.cartItems.forEach(item => {
    
        if (productId === item.productId){
          matchingItem = item;
        }
      });
    
      matchingItem.quantity = newQuentity;
    
      this.saveToStorage();
      
    },
  
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
    
    }
  
  };

  return cart;

};

const cart = Cart('cart-oop');
const businessCart = Cart('business-cart')

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);













