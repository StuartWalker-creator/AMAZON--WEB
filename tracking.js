import {dayjs} from '../dayFn/day.js';
import {cart} from '../data/cart-class.js';
import {getProduct} from '../data/products.js';
import {orders,getMonth} from '../data/orders.js';

/*
const today = new Date();

console.log(today)
console.log(today.toISOString())
console.log(today.toLocaleString())
console.log(today.toUTCString());
const now =today.setDate(0)
const tomorrow = today.setDate(7);



console.log(now)
console.log(tomorrow)
const dateFromEpoch = new Date(1730978679080);

console.log(`today is date ${dateFromEpoch}`)
  */
/*
const today = new Date();
const yesterday= new Date('2024-12-20')

today.toLocaleDateString();

console.log(Math.round((today-yesterday)/(1000*60*60*24)))

const deliveryDate=new Date('2024-12-30')


const difference = Math.round((today-yesterday)/(1000*60*60*24))


const difference2 = Math.round((deliveryDate-yesterday)/(1000*60*60*24))

const finalDiff = (difference/difference2)*100

console.log(finalDiff)
*/
//here begins the realm
 
 const url = new URL(window.location.href);
 
const searchProduct = url.searchParams.get('productId');

const searchOrder = url.searchParams.get('orderId');

let matchingOrder;

orders.forEach((order)=>{
  if (order.id==searchOrder) {
    matchingOrder=order
  }
})

const matchingProduct = getProduct(searchProduct)
 
 let matchingOrderProduct;
 
 matchingOrder.products.forEach((product)=>{
   if (product.productId==searchProduct) {
     matchingOrderProduct=product
   }
 });
 
 let productMonth = new Date( matchingOrderProduct.estimatedDeliveryTime).getMonth();
 
 let productDate = new Date(matchingOrderProduct.estimatedDeliveryTime).getDate();
 
 let productDay = new Date(matchingOrderProduct.estimatedDeliveryTime).getDay();
 
 function getDay(siku){
      switch(siku){
        case 1:
        siku = 'Monday'
        break;
        
        case 2:
        siku = 'Tuesday';
        break;
        
        case 3:
        siku = 'Wednesday'
        break;
        
        case 4:
        siku = 'Thursday';
        break;
        
        case 5:
        siku = 'Friday';
        break;
        
        case 6:
        siku = 'Saturday';
        break;
        
        case 0:
        siku = 'Sunday';
        break;
      }
     return siku
  }
  
  productDay = getDay(productDay)
 
 productMonth=getMonth(productMonth)
 
console.log(url)
 
 console.log(searchProduct)
 
 let html = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${productDay}, ${productMonth} ${productDate}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: 1
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label preparing">
            Preparing
          </div>
          <div class="progress-label <!--current-status--> shipped">
            Shipped
          </div>
          <div class="progress-label delivered">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `
 document.querySelector('.order-tracking').innerHTML=html;
 
 console.log(html)
 
 const today = new Date();
 const orderDate = new Date(matchingOrder.orderTime);
 const deliveryDate = new Date(matchingOrderProduct.estimatedDeliveryTime);
 
const finalDiff = Math.floor(((today-orderDate)/(deliveryDate-orderDate))*100);

console.log(finalDiff)
console.log(typeof finalDiff)
 
 const progress = document.querySelector('.progress-bar')
 progress.style.width=`${finalDiff}%`
  const preparing = document.querySelector('.preparing')
 
 const shipped = document.querySelector('.shipped')
 
 const delivered = document.querySelector('.delivered')
 
 if (finalDiff>=0 && finalDiff<50) {
   preparing.style.color = 'rgb(6, 125, 98)';
   shipped.style.color='black'
 }
 else if (finalDiff>=50&& finalDiff<99) {
   preparing.style.color='black';
   shipped.style.color='rgb(6, 125, 98)'
 }
 else if (finalDiff==100) {
   delivered.style.color='rgb(6, 125, 98)';
   shipped.style.color='black';
   preparing.style.color='black'
 }
 else if (finalDiff<0) {
   delivered.style.color='rgb(0, 0, 0)';
   shipped.style.color='black';
   preparing.style.color='black'
   progress.style.width='0%'
 }
 
 cart.updateCartQuantity()
 
 const searchInput = document.querySelector('.search-bar')
 
const holder = document.querySelector('.ahref')

const button = document.querySelector('.search-button')

if (button) {
  button.addEventListener('click',()=>{
  
  let
  search=searchInput.value;
  
  holder.href=`amazon.html?mySearch=${search}`
 
 })
}
else{
  console.log('the button element invoked at a certain page is not defined in this page')
}
 
 