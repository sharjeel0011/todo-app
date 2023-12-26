// Firebase imports
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
        userUid = uid;
        const q = query(collection(db, "todos"), where("uid", "==", uid), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        arr = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        renderTodo();
    } else {
        window.location = 'login.html';
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
const userInput = document.getElementById("userInput");
const todobtn = document.getElementById("button");
todobtn.addEventListener("click", async () => {
    
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

    } catch (e) {
        console.error("Error adding document:", e);
    }
});
function renderTodo() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = '';
  
    arr.forEach((item) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
  
      const listItem = document.createElement("li");
      listItem.textContent = item.title;
  
      const listDiv = document.createElement("div");
      listDiv.classList.add("list");
      listDiv.style.display="none"

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add(`deleteBtn_${item.id}`);
      deleteButton.addEventListener("click", function (event) {
          const todoId = event.currentTarget.classList[0].split('_')[1];
          console.log("Clicked delete button for todo with ID:", todoId);
          deleteTodo(todoId);
      });
  
      // Apply styles to delete button
      deleteButton.style.backgroundColor = "#dc3545";
      deleteButton.style.color = "#fff";
      deleteButton.style.border = "none";
      deleteButton.style.borderRadius = "4px";
      deleteButton.style.padding = "5px 10px";
      deleteButton.style.cursor = "pointer";
  
      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.classList.add(`updateBtn_${item.id}`);
      updateButton.addEventListener("click", function () {
          updateTodo(item.id);
      });
  
      // Apply styles to update button
      updateButton.style.backgroundColor = "#007bff";
      updateButton.style.color = "#fff";
      updateButton.style.border = "none";
      updateButton.style.borderRadius = "4px";
      updateButton.style.padding = "5px 10px";
      updateButton.style.cursor = "pointer";
  
      const iconElement = document.createElement('i');
      iconElement.className = 'fa-solid fa-list-check icon';
      iconElement.addEventListener("click", function () {
        // const listDiv = document.getElementById("listDiv");
        listDiv.style.display = "block"
        iconElement.style.display="none"
        iconElement.style.cursor="pointer"
        console.log("111")
      });
  
      listDiv.appendChild(deleteButton);
      listDiv.appendChild(updateButton);
  
      taskDiv.appendChild(iconElement);
      taskDiv.appendChild(listItem);
      taskDiv.appendChild(listDiv);
  
      todoList.appendChild(taskDiv);
    });
  
    userInput.value = "";
  }
  




// Delete todo functionality
// Delete todo functionality
async function deleteTodo(todoId) {
    console.log("Deleting todo with ID:", todoId);
    if (todoId) {
        const cityRef = doc(db, 'todos', todoId);
        try {
            await deleteDoc(cityRef);
            arr = arr.filter(item => item.id !== todoId);
            renderTodo();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    } else {
        console.error("Invalid todoId");
    }
}


// Update todo functionality
async function updateTodo(todoId) {
    const updateTitel = prompt("Please give a new title:");

    if (updateTitel.length <= 12) {
        const frankDocRef = doc(db, "todos", todoId);

        try {
            await updateDoc(frankDocRef, {
                title: updateTitel
            });
            arr = arr.map(item => (item.id === todoId ? { ...item, title: updateTitel } : item));
            renderTodo();
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    } else {
        alert("Please write only 12 letters");
    }
}

//some my function
const profileImg = document.getElementById("pImg")
profileImg.addEventListener("mouseover",()=>{
    const sbox = document.createElement("div")
    alert("option availabel soon")
})






// Initial render of todos
renderTodo();

