import "https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.2.10/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/8.2.10/firebase-firestore.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyAvitDeakWR3NfFELI43u99axe3FeYBkmQ",
  authDomain: "betools-bbbcc.firebaseapp.com",
  projectId: "betools-bbbcc",
  storageBucket: "betools-bbbcc.appspot.com",
  messagingSenderId: "208819114612",
  appId: "1:208819114612:web:a5b91631b36654c0053721",
  measurementId: "G-40LPYEGYP0",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// const auth = getAuth();

firebase.auth().onAuthStateChanged(function (user) {
  const logoutBtn = document.getElementById("logout-btn");
  if (user) {
    logoutBtn.addEventListener("click", () => {
      console.log("check");
      signOut(firebase.auth())
        .then(() => {
          window.location.href = "login.html";
        })
        .catch((error) => {
          console.log(error);
        });
    });
    logoutBtn.style = `
    display:block;
    cursor:pointer;
    font-size:15px;
    `;

    if (window.location.pathname.includes("freelanding.html")) {
      logoutBtn.style.borderRadius = "0px 0px 10px 10px";
    } else {
      logoutBtn.style.borderRadius = "0 0 10px 10px";
    }

    document.getElementById("plan-navigate").style.display = "block";
    document.getElementById("register-navigate").style.display = "none";
    document.getElementById("subscribe-btn").style.display = "none";
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("useremail").innerText = user.email;
    document.getElementById("useremail").style = `color:#fff`;
  } else {
    document.getElementById("plan-navigate").style.display = "none";
    document.getElementById("register-navigate").style.display = "block";
    document.getElementById("login-btn").style.display = "block";
    document.getElementById("subscribe-btn").style.display = "block";
    document.getElementById("useremail").style.display = "none";
    logoutBtn.style.display = "none";
  }
});
