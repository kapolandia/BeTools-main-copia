document
  .querySelector(".nav__register2")
  .addEventListener("click", function () {
    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;
    const password2 = document.getElementById("logPassword2").value;
    const termini = document.getElementById("termini");
    const privacy = document.getElementById("privacy");

    var isEmailError = false;
    var isPwdError = false;
    var isMissError = false;
    var isCondizioni = false;


    const emailError = document.getElementById("email-error");
    if (validate_email(email) == false) {
      emailError.style.display = "block";
      isEmailError = true;
      // Check if the password is longer than 6 characters
    }

    if (password.length <= 6) {
      // Display the password error message
      const passwordError = document.getElementById("password-error");
      passwordError.style.display = "block";
      isPwdError = true;
    }

    if (password != password2) {
      const missError = document.getElementById("miss-error");
      missError.style.display = "block";
      isMissError = true;
    }

    if (termini.checked && privacy.checked){
      isCondizioni = false;
    } else{
      const terminiError = document.getElementById("termini-error");
      terminiError.style.display = "block";
      isCondizioni = true;
    }

    if (isCondizioni == false) {
      const terminiError = document.getElementById("termini-error");
      terminiError.style.display = "none";
    }

    if (isMissError == false) {
      const missError = document.getElementById("miss-error");
      missError.style.display = "none";
    }

    if (isPwdError == false) {
      const passwordError = document.getElementById("password-error");
      passwordError.style.display = "none";
    }

    if (isEmailError == false) {
      const emailError = document.getElementById("email-error");
      emailError.style.display = "none";
    }

    if (isEmailError == true || isPwdError == true || isMissError == true || isCondizioni == true) {
      return;
    }

    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Registration successful
      const user = userCredential.user;
      console.log("Registration successful:", user);
  
      // Add a document to a Firestore collection
      const db = firebase.firestore(); // Initialize Firestore
      const collection = db.collection("users"); // Replace 'your_collection_name' with the actual collection name
  
      // Define the data you want to add
      const dataToAdd = {
        // Define your data here, e.g., 'username', 'email', etc.
        member: "free",
        customerId: "",
        email: email, // You can use the 'email' variable from the registration form
      };
  
      // Add the data to Firestore
      const uid = user.uid; // Get the user's UID
      collection
        .doc(uid)
        .set(dataToAdd) // Use the user's UID as the document ID
        .then(() => {
          console.log("Document added with ID: ", uid); // Log the user's UID
          // Redirect the user to another page after successful registration
          window.location.href = "landing.html";
        })
    })
    .catch((error) => {
      // Handle errors, including the case where email is already in use
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        // Display an appropriate error message to the user
        const emailError = document.getElementById("email-used-error");
        emailError.style.display = "block"; // Show the error message
      } else {
        // Handle other errors
        console.error("Registration error:", errorCode, errorMessage);
      }
    });
  
  });

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
