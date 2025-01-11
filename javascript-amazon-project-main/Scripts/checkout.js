import { renderOrderSummery } from "./checkout/OrderSummery.js";
import { renderPaymentSummery } from "./checkout/PaymentSummery.js";
import { loadProducts } from "../data/products.js";
/* import '../data/cart-class.js'; */
/* import '../data/car.js'; */
/* import '../data/backend-practice.js'; */
loadProducts(()=>{
  renderOrderSummery();
  renderPaymentSummery();
});

