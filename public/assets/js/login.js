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
  measurementId: "G-40LPYEGYP0",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

document.getElementById("loginMainButton").addEventListener("click", function () {
    // Get all our input fields
    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;

    // Validate input fields
    let isEmailError = false;
    let isPwdError = false;

    const emailError = document.getElementById("email-error");
    if (!validate_email(email)) {
      emailError.style.display = "block";
      isEmailError = true;
    } else {
      emailError.style.display = "none";
    }

    if (password.length <= 6) {
      // Display the password error message
      const passwordError = document.getElementById("password-error");
      passwordError.style.display = "block";
      isPwdError = true;
    } else {
      const passwordError = document.getElementById("password-error");
      passwordError.style.display = "none";
    }

    if (isEmailError || isPwdError) {
      return;
    }

    // Sign in the user using Firebase Authentication
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Sign-in successful
        const user = userCredential.user;
        console.log("Sign-in successful:", user);

        // Redirect the user to another page after successful sign-in
        window.location.href = "landing.html"; // Replace with your desired URL
      })
      .catch((error) => {
        // Handle sign-in errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign-in error:", errorCode, errorMessage);

        const loginError = document.getElementById("login-error");
        loginError.style.display = "block";
      });
  });

function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    window.location.href = "index.html";
  } else {
    document.body.style.display = "block";
  }
});

document.getElementById("resetPasswordButton").addEventListener("click", function () {
  var emailInput = document.getElementById("recoverEmail");
  var emailAddress = emailInput.value;
  var errorText = document.getElementById("errorText");

  firebase
    .auth()
    .sendPasswordResetEmail(emailAddress)
    .then(function () {
      // Password reset email sent successfully
      errorText.textContent = "Email per il reset della password inviata con successo. Controlla la tua casella di posta.";
      errorText.style.color = "green"; // Optional: Change text color to indicate success
      resetPasswordButton.style.display = "none";
      recoverEmail.style.display = "none";
      recoverEmail2.style.display = "none";
      recovertitle.style.display = "none";
      emailimage.style.display = "flex";
      backLogin.style.display = "flex";
    })
    .catch(function (error) {
      // An error occurred
      var errorMessage = "Errore: " + error.message;

      // You can customize the error messages based on the error codes, for example:
      if (error.code === "auth/invalid-email") {
        errorMessage = "L'indirizzo email inserito non è valido.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "Nessun utente trovato con questo indirizzo email.";
      }

      errorText.textContent = errorMessage;
      errorText.style.color = "#ff0033"; // Set text color to red for errors
    });
});

