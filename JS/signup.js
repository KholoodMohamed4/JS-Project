var firstName = document.querySelector(".firstName");
var lastName = document.querySelector(".lastName");
var email = document.querySelector(".email");
var password = document.querySelector(".pass");
var confPass = document.querySelector(".confPass")
var register_btn = document.querySelector(".signUp")


register_btn.addEventListener("click" ,  function(e){
    e.preventDefault();
    if(firstName.value==="" || lastName.value===""||email.value==="" ||password.value==="" || confPass.value==="")
    {
        alert("Please Fill The Data")
    }
    else if(password.value!==confPass.value && password.value!=="" && confPass.value!=="")
    {
        alert("Confirm Password is Wrong")
    }
    else
    {
        localStorage.setItem("firstName" ,firstName.value);
        localStorage.setItem("lastName" ,lastName.value);
        localStorage.setItem("email" ,email.value);
        localStorage.setItem("password" ,password.value);
        setTimeout(()=>{
            window.location = "login.html"
        },1000)
    }
})
