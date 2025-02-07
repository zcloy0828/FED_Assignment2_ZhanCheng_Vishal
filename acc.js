// Import and configure Firebase
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { 
  getFirestore, 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase configuration (same as in chat.js)
const firebaseConfig = {
  apiKey: "AIzaSyBuPvu6ukKh9laZgqIMPdwuWUV56zoSD2E",
  authDomain: "chat-function-e2d2a.firebaseapp.com",
  projectId: "chat-function-e2d2a",
  storageBucket: "chat-function-e2d2a.firebasestorage.app",
  messagingSenderId: "669713810079",
  appId: "1:669713810079:web:92893089b4bae6cc3098aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Get form elements
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const messageBox = document.getElementById("message-box");

// // Function to display messages
// function showMessage(message, isSuccess = true) {
//   messageBox.innerText = message;
//   messageBox.style.color = isSuccess ? "green" : "red";
//   messageBox.style.fontWeight = "bold";
//   messageBox.style.textAlign = "center";
//   messageBox.style.marginTop = "10px";
// }

// Handle User Registration
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date()
    });

    /*showMessage("✅ Account created successfully! Redirecting...", true);
    console.log("User registered:", user);
*/
    // Redirect after signup
    setTimeout(() => {
      window.location.href = "product.html";
    }, 2000);  // 2-second delay to show message
  } catch (error) {
    showMessage("❌ " + error.message, false);
  }
});

// Handle User Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email2").value;
  const password = document.getElementById("password2").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    //showMessage("✅ Login successful! Redirecting...", true);
    //console.log("User logged in:", user);

    // Redirect after login
    setTimeout(() => {
      window.location.href = "product.html"; // Redirect after login
    }, 2000);
  } catch (error) {
    showMessage("❌ " + error.message, false);
  }
});

// Logout function (if needed later)
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      showMessage("✅ Logged out successfully!", true);
      console.log("User logged out");
    } catch (error) {
      showMessage("❌ " + error.message, false);
    }
  });
}

// Detect user authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user);
  } else {
    console.log("User is logged out");
  }
});

// Toggle between login and register forms
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const formWrapper = document.querySelector(".form-wrapper");

registerBtn.addEventListener("click", () => {
  formWrapper.style.transform = "translateX(-50%)";
  loginBtn.classList.remove("active");
  registerBtn.classList.add("active");
  messageBox.innerText = ""; // Clear messages when switching
});

loginBtn.addEventListener("click", () => {
  formWrapper.style.transform = "translateX(0%)";
  registerBtn.classList.remove("active");
  loginBtn.classList.add("active");
  messageBox.innerText = ""; // Clear messages when switching
});
