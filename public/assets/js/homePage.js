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
  if (user) {
    window.location.href = "landing.html";
  } else {
    document.body.style.display = "block";
  }
});
