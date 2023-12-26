import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "../config.js";



const email = document.getElementById("email")
const password   = document.getElementById("password")
const btnLogin = document.getElementById("btn-login")
const form = document.getElementById("form")

form.addEventListener('submit', (event) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location = "../home/home.html"

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    email.value = ''
    password.value = ''
})




