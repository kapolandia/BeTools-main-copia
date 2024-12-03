// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
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
    measurementId: "G-40LPYEGYP0"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

import {
    getAuth,
    signOut,
  } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
  signOut(firebase.auth()).catch((error) => {
    console.log(error);
  });