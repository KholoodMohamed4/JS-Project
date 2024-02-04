var products = document.querySelector('.productsContainer');
const select=document.querySelector('.custom-select')
const search=document.querySelector('.search')
let AllPro = [
    {
        id: 1,
        productName: "Utsav Blue",
        Cat: "Dial Watch",
        ImgURL: "Images//f2.jpg",
        price: "6200",
    },
    {
        id: 2,
        productName: "Neo Splash",
        Cat: "Mechanical",
        ImgURL: "Images//f1.jpg",
        price: "6200",
    },
    {
        id: 3,
        productName: "World Time",
        Cat: "Vintage",
        ImgURL: "Images//f3.jpg",
        price: "8080",
    },
    {
        id: 4,
        productName: "Reflex Play",
        Cat: "Sports",
        ImgURL: "Images//f4.jpg",
        price: "4100",
    },
    {
        id: 5,
        productName: "Color Fit",
        Cat: "Classic",
        ImgURL: "Images//f5.jpg",
        price: "7400",
    },
    {
        id: 6,
        productName: "Quantum R12",
        Cat: "Classic",
        ImgURL: "Images//f6.jpg",
        price: "6800",
    },
];

function drawProduct(pro) {
  let x = pro.map((i) => {
    return `
        <div class="col-sm-10 col-md-5 col-lg-3 mx-md-2 my-3">
                  <div class="productItem mx-sm-auto">
                    <img src="${i.ImgURL}" class="mb-3"  alt="Product image" width="100%" height="200">
                    <h4>${i.productName}</h4>
                    <h6>${i.Cat}</h6>
                    <p class="sepPrice"> $${i.price} </p>
                    <i class="heart fas fa-heart" onClick="addToFav(${i.id})"></i>
                    <button class="cartBtn btn  cart-button px-5 text-light" style="background-color: var(--MainColor);" onClick="addToCart(${i.id})">
                       Add to cart 
                    </button>
                  </div>
        </div>
        `
  })

  products.innerHTML = x.join('');
}
drawProduct(AllPro);

var cartCount = document.querySelector('.cartCount');


var getEmail = localStorage.getItem("email");



var hearts = document.querySelectorAll('.heart');

hearts.forEach((heart)=>{
  heart.addEventListener("click",()=>{
  
    if(localStorage.getItem("firstName")  && localStorage.getItem("lastName") && getEmail){
      heart.style.color ="red";
    }
    else{
      window.location = "login.html"
    }
  })
})

let cartProductDiv = document.querySelector(".carts_products div")
let CartItems = localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")) : [];
let favItems = localStorage.getItem("favItems")?JSON.parse(localStorage.getItem("favItems")) : [];
function addToCart(id){
    let choosenItem = AllPro.find((item) => item.id === id );
    cartProductDiv.innerHTML += `<p><img src="${choosenItem.ImgURL}" width="50" height="50" style="margin-right:5px;"> ${choosenItem.productName}</p>`

    CartItems = [...CartItems , choosenItem];
    localStorage.setItem("cartItems" , JSON.stringify(CartItems));
}
function addToFav(id){
  let FavChoosenItem = AllPro.find((item) => item.id === id );
  favItems = [...favItems ,FavChoosenItem];
  localStorage.setItem("favItems" , JSON.stringify(favItems));
}

function searchProducts() {
  if(select.value=='Search by Name'){
    var searchTerm = search.value.toLowerCase();
    var matchingProducts = AllPro.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm)
    );
    products.innerHTML ='';
    drawProduct(matchingProducts);
  }
  else{
    var searchTerm = search.value.toLowerCase();
    var matchingProducts = AllPro.filter((product) =>
      product.Cat.toLowerCase().includes(searchTerm)
    );
    products.innerHTML ='';
    drawProduct(matchingProducts);
  }
}

// استماع لحدث keyup على عنصر البحث
search.addEventListener('keyup', searchProducts);

