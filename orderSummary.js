import {cart} from './cart-class.js';

import {products,getProduct} from './products.js';
import {formatCurrency} from './money.js';
import {deliveryOptions, getDeliveryOption} from './deliveryOptions.js';
import {dayjs} from './day.js';
import {renderPaymentSummary} from './paymentSummary.js';

export function renderOrderSummary(){

let cartSummaryHTML = ''

cart.cartItems.forEach( (cartItem)=>{
  
  const productId = cartItem.productId;
  
  const matchingProduct = getProduct(productId);
  
  const deliveryOptionId = cartItem.deliveryOptionId;
  
  let deliveryOption = getDeliveryOption(deliveryOptionId)
  
  const today = dayjs();
  
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    
    const dateString = deliveryDate.format('dddd, MMMM D');
  
 cartSummaryHTML+= ` <div class="cart-item-container
 js-cart-item-container
 js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
   Delivery date:${dateString}
       </div>

  <div class="cart-item-details-grid">
   <img class="product-image"
     src="${matchingProduct.image}">

   <div class="cart-item-details">
  <div class="product-name">
    ${matchingProduct.name}
  </div>
  <div class="product-price">
     $${matchingProduct.getPrice()}
   </div>
   <div class="product-quantity">
    <span>
      Quantity: <span class="quantity-label js-quantity-${productId}">${cartItem.quantity}</span>
    </span>
 <span class="update-quantity-link link-primary update-quantity-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Update
  </span>
  <input type="number" class="quantity-input quantity-input-${matchingProduct.id}"> 
  <span class="save-quantity-link link-primary">Save</span>
  
  <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Delete
  </span>
 </div>
 </div>

 <div class="delivery -options">
   <div class="delivery-options-title">
     Choose a delivery option:
   </div>
     ${deliveryOptionsHTML(matchingProduct,cartItem)}
    </div>
   </div>
  </div>`
});

function deliveryOptionsHTML(matchingProduct,cartItem){
  
  let html = '';
  
 deliveryOptions.forEach((deliveryOption)=>{
    
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    
    const dateString = deliveryDate.format('dddd, MMMM D');
  
  const priceString = deliveryOption.priceCents===0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}-`
  const isChecked = deliveryOption.id===cartItem.deliveryOptionId
  
html+=`  
 <div class="delivery-option js-delivery-option"
 data-product-id="${matchingProduct.id}"
 data-delivery-option-id="${deliveryOption.id}">
   <input type="radio" ${isChecked ?'checked' : ''} class="delivery-option-input"
 name="delivery-option-${matchingProduct.id}">
  <div>
   <div class="delivery-option-date">
      ${dateString}
   </div>
 <div class="delivery-option-price">
 ${priceString} Shipping
    </div>
  </div>
 </div>
      `
  });
  return html
}

document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach( (link)=>{
  link.addEventListener('click',()=>{
 
 let productId = link.dataset.productId;
 
cart.removeFromCart(productId)

const container = document.querySelector(`.js-cart-item-container-${productId}`)

container.remove()

renderPaymentSummary();

console.log(cart.cartItems)
  })
})

document.querySelectorAll('.update-quantity-link').forEach((update)=>{
  
  const productId = update.dataset.productId
 update.addEventListener('click',()=>{
    document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity')
    
    update.classList.add('is-update')
    document.querySelector(`.js-quantity-${productId}`).classList.add('is-update')
    
    document.querySelectorAll('.save-quantity-link').forEach((save)=>{
  save.addEventListener('click',()=>{
    
    const input = document.querySelector(`.quantity-input-${productId}`)
    
    let inputValue = Number(input.value);
    
  console.log(inputValue)
  
  document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity')
  
  if (inputValue) {
  let matchingItem;
  
  cart.cartItems.forEach((cartItem)=>{
    if (cartItem.productId==productId) {
      matchingItem=cartItem;
    }
  })
  matchingItem.quantity=inputValue;
  
  cart.saveToStorage();
  renderOrderSummary();
  renderPaymentSummary();
//  cart.updateCartQuantity()
  console.log(cart.cartItems)
}else{
  console.log('the value is not a number')
}})
})

  })
})



document.querySelectorAll('.js-delivery-option').forEach( (element)=>{
  element.addEventListener('click',()=>{
    const {productId,deliveryOptionId}=element.dataset
    
    cart.updateDeliveryDate(productId,deliveryOptionId)
    renderPaymentSummary();
    renderOrderSummary();
    
    })
  })
}

