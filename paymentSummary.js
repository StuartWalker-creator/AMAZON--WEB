import {cart} from './cart-class.js';
import {getProduct} from './products.js';
import {getDeliveryOption} from './deliveryOptions.js';
import {formatCurrency} from './money.js';
import {addOrder} from './orders.js';

export function renderPaymentSummary() {
  
  let productPriceCents = 0;
  let shippingPriceCents = 0;
 
cart.cartItems.forEach( (cartItem)=>{
  const product = getProduct(cartItem.productId);
  
  productPriceCents+=product.priceCents*cartItem.quantity;
  
 const deliveryOption =  getDeliveryOption(cartItem.deliveryOptionId);
 
 shippingPriceCents += deliveryOption.priceCents
})

const totalBeforeTaxCents = productPriceCents+shippingPriceCents;

const taxCents = totalBeforeTaxCents*0.1;

const total = totalBeforeTaxCents+taxCents;

const checkoutQuantity = document.querySelector('.checkout-header-middle-section');

checkoutQuantity.innerText=`Checkout (${cart.cartItems.length} items)`

const paymentSummeryHTML=`       <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.cartItems.length}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money >$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(total)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`
          
   document.querySelector('.payment-summary').innerHTML=paymentSummeryHTML
   
  document.querySelector('.js-place-order').addEventListener('click',async ()=>{
    
     try {
       const response = await fetch('https://supersimplebackend.dev/orders',{
       method:'POST',
       headers:{
       'Content-Type':'application/json'
       },
       body:JSON.stringify({
       cart:cart.cartItems})
     })
    const order = await response.json()
    
    console.log(order)
    
   addOrder(order);
     } catch (error) {
      console.log(error)
     }
     
     window.location.href='orders.html'
   })
}

