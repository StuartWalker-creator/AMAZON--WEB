import {products} from './products.js';

import{cart} from './cart-class.js';

import {formatCurrency} from './money.js';

alert('You can contact the developer about any issue or fixation on gmail: stuartwalker041@gmail.com')
function renderProducts(products){
  let html = '';
  
  products.forEach( (product)=>{
    html+=` <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
          <img class="product-rating-stars"
          src="rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          
          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart added-${product.id}">
            <img src="checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
`
  })
  
  const productsDisplay = document.querySelector('.products-grid');
  
  productsDisplay.innerHTML = html
  
document.querySelectorAll('.add-to-cart-button').forEach( (button)=>{
    button.addEventListener('click',()=>{
      
 const productId = button.dataset.productId;
 
      
    cart.addToCart(productId)
     cart.updateCartQuantity()
     
 document.querySelector(`.added-${productId}`).classList.add('is-added')

setTimeout(() => {
  document.querySelector(`.added-${productId}`).classList.remove('is-added')

}, 800)
    })
    cart.updateCartQuantity()
    
 })
};

renderProducts(products);

 const search = document.querySelector('.search-bar');
 
 const url = new URL(window.location.href)
 
const mySearch = url.searchParams.get('mySearch')
 
  document.querySelector('.search-button').addEventListener('click',()=>{
    if (search.value) {
      let newProducts = [];
      
      products.forEach((productDetails)=>{
        if (productDetails.keywords.includes(search.value)|| productDetails.name.includes(search.value)|| productDetails.name.includes(mySearch)) {
          newProducts.push(productDetails)
        }else(
          console.log('its not equal'))
      });
      console.log(newProducts)
     // products = newProducts;
      console.log(products)
     /* products.map((productDetails)=>{
    if (productDetails.keywords.includes(search.value)) {
      console.log(productDetails)
      return productDetails
    }else{
      
    };
    
  })
  */
  
    renderProducts(newProducts)
      
    }
  })
  
 if (mySearch) {
   let newProducts = []
   
   products.forEach((productDetails)=>{
     if (productDetails.name.includes(mySearch)|| productDetails.keywords.includes(mySearch)) {
       newProducts.push(productDetails)
     }
   })
  
   url.searchParams.delete('mySearch');
   
   
   renderProducts(newProducts)
 }else {
  renderProducts(products)
}


