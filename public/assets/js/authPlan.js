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

const db = firebase.firestore();
const userCollection = db.collection('users');

checkUserLoggedIn().then(async (userData) => {
  if (userData) {
    const userUid = userData.uid;
    console.log('User UID:', userUid);

    try {
      // Access the document directly by its UID
      const userDoc = await userCollection.doc(userUid).get();

      if (userDoc.exists) {
        console.log('User document found:', userDoc.id, userDoc.data());
        compileFatturazione(userDoc.data())
      } else {
        console.log('No user document found with the given UID.');
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
    }
  } else {
    console.log('User not logged in');
  }
});

function compileFatturazione(userData){
  if(userData.nome != undefined)
    document.getElementById("nome-utente").value = userData.nome;
  if(userData.cognome != undefined)
    document.getElementById("cognome-utente").value = userData.cognome;
  if(userData.indirizzo != undefined)
    document.getElementById("indirizzo-utente").value = userData.indirizzo;
  if(userData.citta != undefined)
    document.getElementById("cap-utente").value = userData.cap;
  if(userData.cap != undefined)
    document.getElementById("citta-utente").value = userData.citta;
  if(userData.provincia != undefined)
    document.getElementById("provincia-utente").value = userData.provincia;
  if(userData.telegramId != undefined)
    document.getElementById("telegram-utente").value = userData.telegramId;
}







export { checkUserLoggedIn };
