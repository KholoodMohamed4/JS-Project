var products = localStorage.getItem('cartItems');
var Fav_products = localStorage.getItem('favItems');
var all_products=document.querySelector('.productsCart');
var CartIcon = document.querySelector('.cartIcon')
var totalPrice = document.querySelector('.totalPrice');
var FavContainer = document.querySelector('.swiper-wrapper')
var FavWord = document.querySelector('.FavWord')

CartIcon.style.display="none"
// Initialize Swiper
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3, // Automatically calculate the number of slides
    spaceBetween: 30, // Adjust the space between products
    grabCursor:true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination:{
        el:".swiper-pagination",
        clickable:true,
        dynamicBullets:true
    }
  });
var product ;
var favPro= JSON.parse(Fav_products);
drawFav();
if(products){
    product =JSON.parse(products);
    drawSelectedProducts(product)
    
}



function drawSelectedProducts(product){
    let item = product.map((i)=>{
        
        if (isNaN(i.count) || i.count <= 0) {
            i.count = 1;
        }
        
        return`
        <div class="col-sm-7 col-md-5 mx-md-2 my-3 d-md-flex justify-content-between pro_item mb-3">
              
            <div class="productDetails d-flex mb-3" >
            <img src="${i.ImgURL}" alt="cart product img" width=90" height="100%">
            <div class="ms-3 ">
                <h4>${i.productName}</h4>
                <p style="color:gray;">${i.Cat}</p>
                <h5 class="pro_price mt-sm-3 mt-0">${i.price} $</h5>
            </div>
            <div class="ms-auto">
            <p class="remove mt-sm-3 mt-0  d-md-none" onClick="RemoveProduct(${i.id})">x</p>
            <p style="font-size: 20px;font-weight: 700;" class="mt-sm-3 mt-0 ms-auto d-md-none"><button class="plus" onClick="increaseProductCount(${i.id})">+</button> <span class="ProductCount">${i.count}</span> <button class="minus" onClick="decreaseProductCount(${i.id})" > - </button></p>
            </div>
            </div>
            
            <p style="font-size: 20px;font-weight: 700;" class="mt-sm-3 mt-0 d-md-block d-none"><button class="plus" onClick="increaseProductCount(${i.id})">+</button> <span class="ProductCount"> ${i.count} </span> <button class="minus" onClick="decreaseProductCount(${i.id})"> - </button></p>
            <button class="remove mt-sm-3 mt-0 d-md-block d-none" onClick="RemoveProduct(${i.id})">x</button>
      </div>
      `
    })
    
    all_products.innerHTML += item.join('');
}


function drawFav(){
    var item = favPro.map((i)=>{
        return`
        <div class="swiper-slide ">
                <div class="box">
                  <div class="img">
                    <img src="${i.ImgURL}" alt="${i.productName}">
                  </div>
                  <div class="info">
                    <h2>${i.productName}</h2>
                    <p>${i.Cat}</p>
                    
                  </div>
                   <i class="heartt fas fa-heart" onClick="RemoveFavProduct(${i.id})"></i>
                </div>
        </div>
      `
    })
    FavContainer.innerHTML += item.join('');
}

var sum = 0;
function total_price() {
  
    product.forEach((i) => {
        sum += parseInt(i.price);
    });

    if(sum===0)
    {
        totalPrice.style.display = "none";
    }
    else
    {
        totalPrice.innerHTML = "Total Price = " + sum + '$';
    }
}
total_price();


function increaseProductCount(itemId) {
    var storedProducts = localStorage.getItem('cartItems');

    if (storedProducts) {
        var products = JSON.parse(storedProducts);

        var productToUpdate = products.find(item => item.id === itemId);

        if (productToUpdate) {

            if(productToUpdate.count < 1 || isNaN( productToUpdate.count))
            {
                productToUpdate.count = 1;
            }
            productToUpdate.count++;
            localStorage.setItem('cartItems', JSON.stringify(products));
            all_products.innerHTML = "";
            drawSelectedProducts(products);
            sum += parseInt(productToUpdate.price) ;
            totalPrice.innerHTML = "Total Price = " + sum + '$';

        }

    }
}


function decreaseProductCount(itemId) {
    var storedProducts = localStorage.getItem('cartItems');

    if (storedProducts) {
        var products = JSON.parse(storedProducts);
        var productToUpdate = products.find(item => item.id === itemId);

        if (productToUpdate && productToUpdate.count > 1) {
            productToUpdate.count--;
            localStorage.setItem('cartItems', JSON.stringify(products));
            all_products.innerHTML = "";
            drawSelectedProducts(products);
            sum -= parseInt(productToUpdate.price) ;
            totalPrice.innerHTML = "Total Price = " + sum + '$';
        } 
        else {
            RemoveProduct(itemId);
            sum -= parseInt(productToUpdate.price) ;
            totalPrice.innerHTML = "Total Price = " + sum + '$';
        }
    }
}
function RemoveProduct(itemId) {
    var storedProducts = localStorage.getItem('cartItems');

    if (storedProducts) {
        var products = JSON.parse(storedProducts);
        var indexToRemove = products.findIndex(item => item.id === itemId);

        if (indexToRemove !== -1) {
            products.splice(indexToRemove, 1);
            localStorage.setItem('cartItems', JSON.stringify(products));
            all_products.innerHTML = "";
            drawSelectedProducts(products);
            

        } else {
            console.error('Product not found in the cart');
        }
    }
}
function RemoveFavProduct(itemId) {

    let index =favPro.findIndex((x)=>{
        return  x.id==itemId
      })
  
      favPro.splice(index,1)
      localStorage.setItem('favItems',JSON.stringify(favPro))

      addEventListener('click',(e)=> e.preventDefault())
      location.reload()
      drawFav()
}



