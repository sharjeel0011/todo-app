import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
    auth,
    db
} from "../config.js";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    query,
    where,
    orderBy,
    Timestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Check if the user is logged in
let arr = [];
let userUid;
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    userUid = uid;
    const q = query(collection(db, "todos"), where("uid", "==", uid), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), docId: doc.id });
    });
   
    renderTodo()
  } else {
    window.location = 'login.html'
  }
});

// Sign out functionality
const signOutbtn = document.getElementById("logoutbtn");
signOutbtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        alert("Now you Logout")
        window.location = "../login/login.html";
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
});

// Add data functionality

const todobtn = document.getElementById("button");
todobtn.addEventListener("click", async () => {
const userInput = document.getElementById("userInput");
if(userInput.value === ""){alert("plese write first...")}else{
    try {
        const docRef = await addDoc(collection(db, "todos"), {
            title: userInput.value,
            uid: auth.currentUser.uid,
            timestamp: Timestamp.fromDate(new Date()),
        });
        arr.unshift({
            title: userInput.value,
            uid: auth.currentUser.uid,
            docId: docRef.id,
        });
        renderTodo();
        console.log(arr)

    } catch (e) {
        console.error("Error adding document:", e);
    }
    userInput.value = ""
}});






//its me
function renderTodo() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
        arr.forEach((item) => {
            todoList.innerHTML += `
                <div class="task" ">
                    <p>${item.title}</p>
                    <div class="list" >
                        <button class="deleteBtn" >Delete</button>
                        <button class="EditButton">Edit</button>
                    </div>
                </div>
            `;
        });
        const deleteBtn = document.querySelectorAll('.deleteBtn');
            deleteBtn.forEach((item, index) => {
                item.addEventListener('click', () => {
                    console.log('delete called', index);
                    deleteTodo(index);
                })
            })
            const updateBtn = document.querySelectorAll('.EditButton');
            updateBtn.forEach((item, index) => {
                item.addEventListener('click', () => {
                    console.log('update called', index);
                    updateTodo(index);
                })
            })
    }



function deleteTodo(index) {
    deleteDoc(doc(db, "todos", arr[index].docId))
    .then(() => {
      arr.splice(index, 1);
      renderTodo()
    }).catch((err) => {
      console.log(err);
    })

    console.log('Deleting todo at index:', index);
  }
  
  // Example usage
 
function updateTodo(index) {
    const title = prompt('enter title to update');
    const todosRef = doc(db, "todos", arr[index].docId);
   

    updateDoc(todosRef, {
        title: title
    }).then(() => {
        arr[index].title = title;
        renderTodo()
    }).catch((err) => {
        console.log(err);
    })

    renderTodo()

}

renderTodo();
// //some my function
// const profileImg = document.getElementById("pImg")
// profileImg.addEventListener("mouseover", () => {
//     const sbox = document.createElement("div")
//     alert("option availabel soon")
// })






// Initial render of todos
renderTodo();
