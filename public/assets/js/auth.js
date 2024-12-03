import "https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.2.10/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/8.2.10/firebase-firestore.js";

// Initialize Firebase
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
let userEmail = null;
// Function to check if a user is logged in
const checkUserLoggedIn = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

checkUserLoggedIn().then((userData) => {
  if (userData) {
    userEmail = userData.email;
    console.log('User email:', userEmail);
    // You can use userEmail as needed, for example, display it on the page
  } else {
    console.log('User not logged in');
    // Handle case where user is not logged in
  }
});

const db = firebase.firestore();
const funbonuscasRef = db.collection('funbonuscas');
const vdgslotRef = db.collection('vdgslot');
const vdgcasinoRef = db.collection('vdgcas');
const rtpRef = db.collection('rtp');
const multitoolRef = db.collection('multitool');

const modalSave = document.getElementById("modal-save");



if(modalSave){
  modalSave.addEventListener("click", function (event) {
    event.preventDefault(); 
    
    const esitoAgenda = document.getElementById("esito-agenda").value;
    const sitoAgenda = document.getElementById("sito-agenda").value;
    const ritornoAgenda = parseFloat(document.getElementById("ritorno-agenda").value);
    const timeNow = new Date();
  
    if(sitoAgenda === "" ||  isNaN(ritornoAgenda)){
      document.getElementById("miss-error").style.display= "block";
      return;
    } else {
      document.getElementById("miss-error").style.display= "none";
    }
  
    const strumento = modalSave.dataset.strumento;
    // Inizio logica aggiunta documenti
    if(strumento == 'funbonus'){
      funbonuscasRef.add({
        data: timeNow,
        esito: esitoAgenda,
        id: userEmail,
        ritorno: ritornoAgenda,
        sito: sitoAgenda
      })
      .then(function(docRef) {
        displayAgenda();
        return;
      })
      .catch(function(error) {
        console.log("Error adding document")
      })
    } else if(strumento == 'vdgslot'){
      vdgslotRef.add({
        data: timeNow,
        esito: esitoAgenda,
        id: userEmail,
        ritorno: ritornoAgenda,
        sito: sitoAgenda
      })
      .then(function(docRef) {
        displayAgenda();
        return;
      })
      .catch(function(error) {
        console.log("Error adding document")
      })
    } else if(strumento == 'vdgcas'){
      vdgcasinoRef.add({
        data: timeNow,
        esito: esitoAgenda,
        id: userEmail,
        ritorno: ritornoAgenda,
        sito: sitoAgenda
      })
      .then(function(docRef) {
        displayAgenda();
        return;
      })
      .catch(function(error) {
        console.log("Error adding document")
      })
    }  else if(strumento == 'rtp'){
      rtpRef.add({
        data: timeNow,
        esito: esitoAgenda,
        id: userEmail,
        ritorno: ritornoAgenda,
        sito: sitoAgenda
      })
      .then(function(docRef) {
        displayAgenda();
        return;
      })
      .catch(function(error) {
        console.log("Error adding document")
      })
    }
  
    console.log(timeNow, ritornoAgenda, sitoAgenda, esitoAgenda, strumento, userEmail);
  });
}


document.addEventListener('DOMContentLoaded', function () {
    var modalBtn = document.getElementById('add-modal-btn');
    var modalClose = document.getElementById('modal-close');
    var modalOverlay = document.getElementById('modal-overlay');
    var modal = document.getElementById('addModal');
    var modalCancel = document.getElementById('modal-cancel');
    
    if(modalBtn){
          modalBtn.addEventListener('click', function () {
        displayNoneAgenda();
        modalOverlay.style.display = 'block';
        setTimeout(function() {
            modal.classList.add('active');
        }, 50); // Adding a slight delay to ensure proper animation
    });

    modalClose.addEventListener('click', function () {
        modalOverlay.style.display = 'none';
        modal.classList.remove('active');
        document.getElementById("miss-error").style.display= "none";
    });

    modalCancel.addEventListener('click', function () {
        modalOverlay.style.display = 'none';
        modal.classList.remove('active');
        document.getElementById("miss-error").style.display= "none";
    });

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modalOverlay) {
            modalOverlay.style.display = 'none';
            modal.classList.remove('active');
        }
    }
    }
});


function displayAgenda(){
  document.getElementById("agendaBtns").style.display="none";
  document.getElementById("agendaHr").style.display="none";
  document.getElementById("agendaHr2").style.display="none";
  document.getElementById("agendaTitle").style.display="none";
  document.getElementById("esitoDiv").style.display="none";
  document.getElementById("sitoDiv").style.display="none";
  document.getElementById("ritornoDiv").style.display="none";
  document.getElementById("success-checkmark").style.display="block";
  document.getElementById("agendaCheckMessage").style.display="block";
  document.getElementById("goToDash").style.display="block";
}

function displayNoneAgenda(){
  document.getElementById("agendaBtns").style.display="flex";
  document.getElementById("agendaHr").style.display="block";
  document.getElementById("agendaHr2").style.display="block";
  document.getElementById("agendaTitle").style.display="block";
  document.getElementById("esitoDiv").style.display="flex";
  document.getElementById("sitoDiv").style.display="flex";
  document.getElementById("ritornoDiv").style.display="flex";
  document.getElementById("success-checkmark").style.display="none";
  document.getElementById("agendaCheckMessage").style.display="none";
  document.getElementById("goToDash").style.display="none";

  document.getElementById("sito-agenda").value = "";
  const strumento = modalSave.dataset.strumento;
  if(strumento != "rtp"){
    document.getElementById("ritorno-agenda").value = "";
  }
}
export { checkUserLoggedIn };
