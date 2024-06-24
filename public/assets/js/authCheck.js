import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";

document.body.style.display = "none";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Check the user's authentication state
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.

    // Get a reference to the Firestore database
    const db = firebase.firestore();
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    // Construct a reference to the user's document in the "users" collection
    const userDocRef = db.collection("users").doc(user.uid);

    // Fetch the document data
    userDocRef
      .get()
      .then((doc) => {
        console.log("doc", doc.exists);
        if (doc.exists) {
          // Document data exists, so you can access the "member" field
          const userData = doc.data();

          if (userData?.customerId) {
            const getSession = fetch(
              `https://betoolz-server.vercel.app/api/get-session/${userData?.customerId}`,
              {
                method: "GET",
              }
            )
              .then((response) => response.json())
              .then(async (data) => {
                console.log(data, "data");
                if (data.length === 0) {
                  db.collection("users")
                    .doc(user?.uid)
                    .update({ member: "free" });
                  window.location.href = "freelanding.html";
                } else {
                  db.collection("users")
                    .doc(user?.uid)
                    .update({ member: "premium" });
                  document.body.style.display = "block";
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } else {
            window.location.href = "freelanding.html";
          }
        } else {
          console.log("User document does not exist.");
          //   window.location.href = "index.html";
        }
      })
      .catch((error) => {
        console.error("Error fetching user document:", error);
      });
  } else {
    // No user is signed in.
    window.location.href = "login.html"; // Redirect to the sign-in page if the user is not authenticated
  }
});