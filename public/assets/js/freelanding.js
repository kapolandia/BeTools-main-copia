import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
import {
  getFirestore,
  updateDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";

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

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    const firestore = firebase.firestore();

    const userDocRef = firestore.collection("users").doc(user.uid);

    // Fetch the document data
    userDocRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Document data exists, so you can access the "member" field
          const userData = doc.data();
          const endDate = userData?.endDate?.toDate() || 0; // Convert Firestore Timestamp to JavaScript Date
          const currentDate = new Date();

          // Calculate the difference in milliseconds
          const difference = endDate - currentDate;

          // Convert the difference to days
          const remainingDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

          console.log("Remaining Days:", remainingDays);
          console.log("User Data:", userData);

          if (remainingDays < 1) {
            document.body.style.display = "block";
          } else if (remainingDays > 0) {
            window.location.href = "landing.html";
          }
        } else {
          console.log("User document does not exist.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user document:", error);
      });
  } else {
    window.location.href = "login.html";
  }
});
