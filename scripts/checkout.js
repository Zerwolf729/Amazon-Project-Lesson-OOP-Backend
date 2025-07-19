import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
//import '../data/car.js'
import { loadProducts, loadProductsFetch } from '../data/products.js';
//import '../data/backend-practice.js'
import { loadCart, loadCartFetch } from '../data/cart-class.js';

async function loadPage() {
  try{

    //throw 'error1';

    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);



    /*
    const value = await new Promise((resolve, reject) => {
      //throw 'error2';
      loadCart(() => {
        //reject('error3')
        resolve('value3');
      });
    });
    */
  } catch(error) {
    console.log('Unexpected Error. Please Try Again Later');
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();



