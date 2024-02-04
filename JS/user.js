var links = document.querySelector(".Headerinfo");
var User = document.querySelector("#User");
var userInfo = document.querySelector(".UserInfo");
var CartIcon = document.querySelector('.cartIcon');
if (localStorage.getItem("firstName") && localStorage.getItem("lastName")) {
  links.remove();
  userInfo.style.display = "block";
  
  User.innerHTML += localStorage.getItem("firstName") + " " + localStorage.getItem("lastName") ;
  CartIcon.style.display = "block";

}

let ShoppingCart = document.querySelector(".carts_products")
let logoutDiv = document.querySelector('.logout');
let logout = document.querySelector('.logout a');
let check1 = true;
let check2 = true;
function CartOpen(){
    if(check1){
      ShoppingCart.style.display="block";
      check1 = !check1
    }
    else{
      ShoppingCart.style.display="none";
      check1 = !check1
    }
}
CartIcon.addEventListener("click" , CartOpen)
function logoutOpen (){
if(check2){
    logoutDiv.style.display="block";

    check2 = !check2
}
else{
    logoutDiv.style.display="none";
    check2 = !check2
 
}
}
User.onclick = logoutOpen;
logout.addEventListener("click",function(){
localStorage.clear();
setTimeout(() => {
    window.location = "login.html";
} , 1500)
})

var cartCount = document.querySelector('.cartCount');
var cartBtn = document.querySelectorAll(".cartBtn");

cartCount.textContent = JSON.parse(localStorage.getItem('cartItems')).length;

cartBtn.forEach((button)=>{
  button.addEventListener("click", function () {
    if(localStorage.getItem("firstName")  && localStorage.getItem("lastName") && getEmail){
      
      // cartCount.style.display = "block";
      button.style.backgroundColor = "black";
      button.textContent = "Added";
      cartCount.textContent = JSON.parse(localStorage.getItem('cartItems')).length;
     
    }
    else{
      window.location = "login.html"
    }
    
  });
})
