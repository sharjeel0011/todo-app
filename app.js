import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./config.js";
const email = document.getElementById("email")
const passsord = document.getElementById("password")
const form = document.getElementById("form")
const img = document.querySelector('#img');

document.getElementById("btn-login").addEventListener("click", ()=>{
    console.log(email.value, password.value);
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        const user = userCredential.user;
       
        window.location = './login/login.html'
        console.log(`user sigin ${email} ${u.id}`)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });

email.value = ''
password.value = ''
})
