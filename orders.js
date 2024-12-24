import {formatCurrency} from '../scripts/utils/money.js';
import {getProduct} from './products.js';
import {cart} from './cart-class.js';


cart.updateCartQuantity();


export const orders = JSON.parse(localStorage.getItem('order')) || [{
  id:'23-edD-dr45_ui',orderTime:'2024-12-20',totalCostCents:5237,products:[{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',quantity:2,
    estimatedDeliveryTime:'2025-1-12',variation:null
  },{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',quantity:1,
    estimatedDeliveryTime:'2025-1-13',variation:null
  }]
},{
  id:'23-edD-dr45rtt-900_uy_ui',orderTime:'2024-12-1',totalCostCents:8937,products:[{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',quantity:5,
    estimatedDeliveryTime:'2025-1-5',variation:null
  }]}];
  
export function addOrder(order){
    orders.unshift(order)
    
    saveToStorage();
   };
  
  function saveToStorage(){
        localStorage.setItem('order',JSON.stringify(orders))
  };
  
  export function getMonth(month){
  switch (month) {
    case 0:
      month = 'January'
      break;
   case 1:
   month = 'February'
   break;
   
   case 2:
  month = 'March'
break;
    
    case 3:
  month = 'April'
break;  
  
  case 4:
  month = 'May'
break;
    
    case 5:
  month = 'June'
break;
       case 6:
      month = 'July'
    break;
    case 7:
      month = 'August'
    break;

    case 8:
      month = 'September'
    break;

    case 9:
      month = 'October'
    break;

    case 10:
      month = 'November'
    break;

    case 11:
      month = 'December'
    break;
    default:
    console.log('what the hell')
  }
  return month
}
  
  let totalHTML = ''
  
 orders.forEach((order)=>{
  const orderTime = new Date(order.orderTime);
  
 let month = orderTime.getMonth();
  const date = orderTime.getDate();
  
  
  month = getMonth(month)
  
let html='';
   
html=`
   <div class="order-header">
    <div class="order-header-left-section">
      <div class="order-date">
       <div class="order-header-label">Order Placed:
       </div>
     <div>${month} ${date}</div>
 </div>
  <div class="order-total">
    <div class="order-header-label">
        Total:
    </div>
   <div>
     $${formatCurrency(order.totalCostCents)}
   </div>
  </div>
 </div>

 <div class="order-header-right-section">
   <div class="order-header-label">Order ID:
   </div>
   <div>
     ${order.id}
   </div>
  </div>
 </div> `
 
   let myHtml = ''
   
   const orderProducts = order.products;
   orderProducts.forEach((product)=>{
    let matchingProduct = getProduct(product.productId)
    let productMonth = new Date(product.estimatedDeliveryTime).getMonth();
    
    let productDate = new Date(product.estimatedDeliveryTime).getDate()
    
    productMonth=getMonth(productMonth)
     
myHtml+=`
  <div class="product-image-container">
    <img src="${matchingProduct.image}">
  </div>

  <div class="product-details">
    <div class="product-name">
       ${matchingProduct.name}
    </div>
    <div class="product-delivery-date">
     Arriving on: ${productMonth} ${productDate}
    </div>
    <div class="product-quantity">
      Quantity:${product.quantity}
    </div>
    <button data-product-id="${product.productId}" class="buy-again-button button-primary">
      <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again
        </span>
    </button>
  </div>

  <div class="product-actions">
    <a href="tracking.html?productId=${product.productId}&orderId=${order.id}">
       <button class="track-package-button button-secondary">
         Track package
       </button>
      </a>
  </div>`
   })
  const truth = `<div class="order-details-grid">${myHtml}</div>`
  
  html += truth
  
  totalHTML+=`<div class="order-container">${html}</div>` //html
  
})
  
 const body = document.querySelector('.orders-grid')
 if (body) {
   body.innerHTML=totalHTML;
 
 }else{
   console.log('cow')
 }
 
 
 document.querySelectorAll('.buy-again-button').forEach((button)=>{
  button.addEventListener('click',()=>{
    const productIId = button.dataset.productId;
   
    cart.addToCart(productIId)
    
    cart.updateCartQuantity()
  })
})
  const searchInput = document.querySelector('.search-bar')
 
const holder = document.querySelector('.ahref')

const button = document.querySelector('.search-button')
if (button) {
  button.addEventListener('click',()=>{
  
  let
  search=searchInput.value;
  
  holder.href=`amazon.html?mySearch=${search}`
 
})
}else{
  console.log('The button element invoked is not defined at this page')
 }
