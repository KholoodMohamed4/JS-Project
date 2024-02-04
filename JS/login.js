var email = document.querySelector(".email");
var pass = document.querySelector(".pass");
var loginBtn = document.querySelector(".login");

var getEmail = localStorage.getItem("email");
var getPasd = localStorage.getItem("password");

loginBtn.onclick = function(e){
    e.preventDefault();
    if(getEmail && email.value === getEmail && getPasd && getPasd === pass.value){
        setTimeout(()=>{
            window.location = "index.html"
        } , 1000)
    }
    else
    {
        alert("Email Or Password is Wrong");
    }
}