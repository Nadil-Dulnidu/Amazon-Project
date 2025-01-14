import { renderOrderSummery } from "./checkout/OrderSummery.js";
import { renderPaymentSummery } from "./checkout/PaymentSummery.js";
import { loadProducts, loadProductFetch } from "../data/products.js";
/* import '../data/cart-class.js'; */
/* import '../data/car.js'; */
/* import '../data/backend-practice.js'; */

async function loadPage() {
  try {
    await loadProductFetch();
  } catch (error) {
    console.log("Unexpected  error. Please try agian later");
  }
  /* await new Promise((resolve) =>{
    loadcart(()=>{
      resolve();
    });
  }); */

  renderOrderSummery();
  renderPaymentSummery();
}

loadPage();

/* new Promise((resolve)=>{
  loadProducts(()=>{
    resolve();
  });
}).then(()=>{
  renderOrderSummery();
  renderPaymentSummery();
}); */

/* loadProductFetch().then(()=>{
  renderOrderSummery();
  renderPaymentSummery();
});
 */
/* new Promise((resolve)=>{
  loadProducts(()=>{
    resolve();
  });
}).then(()=>{
  return new Promise((resolve) =>{
    loadcart(()=>{
      resolve();
    });
  });
}).then(()=>{
  renderOrderSummery();
  renderPaymentSummery();
}); */

// promises with array
/* 
Promise.all([
  new Promise((resolve)=>{
    loadProducts(()=>{
      resolve();
    });
  }),
  new Promise((resolve) =>{
    loadcart(()=>{
      resolve();
    });
  })
]).then(()=>{
  renderOrderSummery();
  renderPaymentSummery();
}); */
