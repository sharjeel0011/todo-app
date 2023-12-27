import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth,db,storage } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js'

const email = document.getElementById("email")
const passsord = document.getElementById("password")
const img = document.querySelector('#img');
const  userName = document.querySelector('#name');
const  userNumber = document.querySelector('#number');
const  userDateOfBirth = document.querySelector('#dateOfBirth');
const errparagraf = document.getElementById("show-err")

const form = document.getElementById("form")



form.addEventListener('submit', (event) => {
    event.preventDefault();
   const result = createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            const file = img.files[0]
            const storageRef = ref(storage, userName.value);
            uploadBytes(storageRef, file).then(() => {
                getDownloadURL(storageRef).then((url) => {
                   
                    addDoc(collection(db, "users"), {
                    name: userName.value,
                    userPhoneNum :userNumber.value,
                    email: email.value,
                    uid: user.uid,
                    profileUrl: url,
                    dateOfBirth:userDateOfBirth.value,
                    }).then((res) => {
                        console.log(res);
                        window.location = './login/login.html'
                    }).catch((err) => {
                        // console.log(err);
                        // M.toast({html: message})
                    })
                })
            });
            M.toast({html: `You succsessfully create your account : ${ userName.value}`,classes:"green"})

        })
        .catch((error) => {
            const errorMessage = error.message;
            M.toast({html: errorMessage,classes:"red"})
            errparagraf.innerHTML=errorMessage
            console.log(error.message);
          
            
        });


})
//uper last two breket add
const firstPage = document.getElementById("first-page")
const secoundPage = document.getElementById("login1_box")
const btnNextPage = document.getElementById("btn-first-page")

btnNextPage.addEventListener("click", () => {
   secoundPage.style.display = "block";
        firstPage.style.display = "none";
    }
);



