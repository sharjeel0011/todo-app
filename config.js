import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCNb805Wetgu_LrSbOsO9pamUbqYCAgK5c",
    authDomain: "try-more-d1e8e.firebaseapp.com",
    projectId: "try-more-d1e8e",
    storageBucket: "try-more-d1e8e.appspot.com",
    messagingSenderId: "861906520979",
    appId: "1:861906520979:web:110a72f8f2ebbdcfd4b666",
    measurementId: "G-9EB03N1G43"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
// export const storage = getStorage(app);