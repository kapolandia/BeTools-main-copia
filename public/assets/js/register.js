document
  .querySelector(".nav__register2")
  .addEventListener("click", function () {
    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;
    const password2 = document.getElementById("logPassword2").value;
    const nomeUtente = document.getElementById("nome-utente").value;
    const cognomeUtente = document.getElementById("cognome-utente").value;
    const indirizzoUtente = document.getElementById("indirizzo-utente").value;
    const cittaUtente = document.getElementById("citta-utente").value;
    const provinciaUtente = document.getElementById("provincia-utente").value;
    const capUtente = document.getElementById("cap-utente").value;
    const termini = document.getElementById("termini");
    const privacy = document.getElementById("privacy");

    var isEmailError = false;
    var isPwdError = false;
    var isMissError = false;
    var isCondizioni = false;
    var isAddressError = false;

    const emailError = document.getElementById("email-error");
    if (!validate_email(email)) {
      emailError.style.display = "block";
      isEmailError = true;
    }

    if (password.length <= 6) {
      const passwordError = document.getElementById("password-error");
      passwordError.style.display = "block";
      isPwdError = true;
    }

    if (password !== password2) {
      const missError = document.getElementById("miss-error");
      missError.style.display = "block";
      isMissError = true;
    }

    if (!termini.checked || !privacy.checked) {
      const terminiError = document.getElementById("termini-error");
      terminiError.style.display = "block";
      isCondizioni = true;
    }

    // Validate address fields
    if (
      !validate_field(nomeUtente) ||
      !validate_field(cognomeUtente) ||
      !validate_field(indirizzoUtente) ||
      !validate_field(cittaUtente) ||
      !validate_field(provinciaUtente) ||
      !validate_cap(capUtente)
    ) {
      const addressError = document.getElementById("address-error");
      addressError.style.display = "block";
      isAddressError = true;
    }

    // Hide errors if resolved
    if (!isEmailError) emailError.style.display = "none";
    if (!isPwdError) {
      const passwordError = document.getElementById("password-error");
      passwordError.style.display = "none";
    }
    if (!isMissError) {
      const missError = document.getElementById("miss-error");
      missError.style.display = "none";
    }
    if (!isCondizioni) {
      const terminiError = document.getElementById("termini-error");
      terminiError.style.display = "none";
    }
    if (!isAddressError) {
      const addressError = document.getElementById("address-error");
      addressError.style.display = "none";
    }

    if (
      isEmailError ||
      isPwdError ||
      isMissError ||
      isCondizioni ||
      isAddressError
    ) {
      console.log("Validation failed.");
      return;
    }

    // Proceed with Firebase registration
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Registration successful:", user);

        const db = firebase.firestore();
        const collection = db.collection("users");

        const dataToAdd = {
          member: "free",
          customerId: "",
          email: email,
          nome: nomeUtente,
          cognome: cognomeUtente,
          indirizzo: indirizzoUtente,
          citta: cittaUtente,
          provincia: provinciaUtente,
          cap: capUtente,
        };

        const uid = user.uid;
        collection
          .doc(uid)
          .set(dataToAdd)
          .then(() => {
            console.log("Document added with ID: ", uid);
            window.location.href = "freelanding.html";
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          const emailError = document.getElementById("email-used-error");
          emailError.style.display = "block";
        } else {
          console.error("Registration error:", errorCode, error.message);
        }
      });
  });

function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_field(field) {
  return field != null && field.trim().length > 0;
}

function validate_cap(cap) {
  const expression = /^\d{5}$/; // Italian ZIP code format
  return expression.test(cap);
}
