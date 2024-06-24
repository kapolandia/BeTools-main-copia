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

// Function to check if a user is logged in
// Function to check if a user is logged in and get user email
const checkUserLoggedIn = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve({
          user: user,
          email: user.email // Access user email
        });
      } else {
        resolve(null);
      }
    });
  });
};

checkUserLoggedIn().then((userData) => {
  if (userData) {
    const userEmail = userData.email;
    console.log('User email:', userEmail);
    // You can use userEmail as needed, for example, display it on the page
  } else {
    console.log('User not logged in');
    // Handle case where user is not logged in
  }
});



function formatDate(timestamp) {
  const dateObject = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object
  const month = dateObject.toLocaleString('default', { month: 'short' }).replace(/^\w/, (c) => c.toUpperCase()); // Get and capitalize abbreviated month name
  const day = dateObject.getDate(); // Get day of the month
  const year = dateObject.getFullYear(); // Get full year

  return `${month} ${day}, ${year}`; // Return formatted date string
}

function formatDate1(timestamp) {
  const dateObject = new Date(timestamp); // Convert timestamp to JavaScript Date object
  const month = dateObject.toLocaleString('default', { month: 'short' }).replace(/^\w/, (c) => c.toUpperCase()); // Get abbreviated month name
  const day = dateObject.getDate(); // Get day of the month
  const year = dateObject.getFullYear(); // Get full year

  return `${month} ${day}, ${year}`; // Return formatted date string
}

// Reference to Firestore collection
const db = firebase.firestore();
const funbonuscasRef = db.collection('vdgslot');
let yearlyProfit = document.getElementById('yearly-profit');
let monthlyProfit = document.getElementById('monthly-profit');
let esitoCount = 0;
let esitoCountMonth = 0;
let funMonet = 0;
let funRicevuti = 0;
let funRicevutiElement = document.getElementById('fun-ricevuti');
let funMonetElement = document.getElementById('fun-monet');
let conversionRate = document.getElementById('conversion-rate');
let userEmailAdd = null;
const monthlyReturns = Array.from({ length: 12 }, () => 0);
const dailyReturns = Array.from({ length: 30 }, () => 0);
let mainBarChart;
let cardChartNew1;
// Function to fetch data from Firestore and populate the table
// Function to fetch data from Firestore and populate the table
// Function to fetch data from Firestore and populate the table
function populateTable() {
  // Initialize an array to store returns for each month

  checkUserLoggedIn().then(userData => {
    if (userData && userData.email) {
      userEmailAdd = userData.email; // Add this line for logging

      // If user is logged in, filter the query by user's email
      funbonuscasRef.where('id', '==', userData.email).orderBy('data', 'desc').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const capitalizedEsito = data.esito.charAt(0).toUpperCase() + data.esito.slice(1);
          console.log("Document email:", doc.id);
          esitoCount += data.ritorno;
          funRicevuti += 1;
          yearlyProfit.innerHTML = esitoCount.toFixed(2) + ' €';

          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so adding 1
          const currentYear = currentDate.getFullYear();
          let dashDate = document.getElementById('current-month');
          let yearlyDate = document.getElementById('month-year');
          let today = new Date().toISOString().slice(0, 10);
          // Set the value of the date picker input field to today's date
          document.getElementById("date-picker").value = today;

          // Check if the document's date falls within the current year
          if (data.data.toDate().getFullYear() === currentYear) {
            // Define an array of month names
            const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
            const currentMonth1 = monthNames[currentDate.getMonth()];
            dashDate.innerHTML = currentMonth1 + ' ' + currentYear;
            yearlyDate.innerHTML = "Gennaio " + currentYear  + " - Dicembre " + currentYear;
            // Check if the document's date falls within the current month
            if (data.data.toDate().getMonth() + 1 === currentMonth) {
              esitoCountMonth += data.ritorno; // Update monthlyProfit
              const dayOfMonth = data.data.toDate().getDate();
              dailyReturns[dayOfMonth - 1] += data.ritorno; // Subtract 1 because days are 1-indexed
            }

            // Update monthly returns array
            const documentMonth = data.data.toDate().getMonth();
            monthlyReturns[documentMonth] += data.ritorno;
          }

          monthlyProfit.innerHTML = esitoCountMonth.toFixed(2) + ' €';

          // Access data fields like data.fieldName
          // Create HTML elements and populate with data
          const tableRow = document.createElement('tr');
          tableRow.classList.add('align-middle');
          let varEsito = ``;
          if (capitalizedEsito === 'Perso') {
            varEsito += `<p data-esitostile="esitostile" style="background-color: #ffe8e8;color: #DC3545;padding: 5px;width: 80px;border-radius: 8px;margin: 0;border: 1px solid rgb(255, 178, 178)">${capitalizedEsito}</p>`;
          } else {
            varEsito += `<p data-esitostile="esitostile" style="background-color: #e2efde;color: #198754;padding: 5px;width: 80px;border-radius: 8px;margin: 0;border: 1px solid #6fad918d">${capitalizedEsito}</p>`;
            funMonet += 1;
          }

          funRicevutiElement.innerHTML = funRicevuti;
          funMonetElement.innerHTML = funMonet;
          conversionRate.innerHTML = "Tasso di conversione: " + ((funMonet / funRicevuti) * 100).toFixed(2) + "%";

          tableRow.innerHTML = `
            <td class="text-center">
              <div style="display: flex;justify-content: center; align-items: center;" data-esito="bonus-esito">
                  ${varEsito}
              </div>
            </td>
            <td>
              <div data-sito="bonus-sito">${data.sito}</div>
            </td>
            <td class="text-center" data-ritorno="bonus-ritorno">
              ${data.ritorno}<span> €<\span>
            </td>
            <td>
              <div class=""><small class="text-medium-emphasis">${formatDate(data.data)}</small></div>
            </td>
            <td>
              <button class="my-modify-btn fa-solid fa-pen" data-docid="${doc.id}" ></button>
              <button class="documentId my-delete-btn fa-solid fa-trash" style="color: #DC3545; cursor: pointer;" data-docid="${doc.id}" data-ritorno="${data.ritorno}" data-esito="${data.esito}" data-date="${formatDate(data.data)}" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            </td>
          `;

          document.querySelector('tbody').appendChild(tableRow);
        });

        // Now you can use monthlyReturns array to display the sum of returns for each month
        console.log(monthlyReturns);
        let dailyReturns2 = calculateSums(dailyReturns);
        console.log(dailyReturns);
        mainBarChart = new Chart(document.getElementById('main-bar-chart'), {
          type: 'bar',
          data: {
            labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
            datasets: [{
              label: 'Profitto',
              backgroundColor: '#5865f1',
              borderRadius: 4,
              borderSkipped: false,
              data: monthlyReturns,
              barPercentage: 0.65,
              categoryPercentage: 0.5
            }]
          },
          options: {
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                enabled: true,
                callbacks: {
                  label: function(context) {
                    return 'Profitto: ' + context.parsed.y + "€";
                  }
                }
              },
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                grid: {
                  display: false,
                  drawBorder: false,
                  drawTicks: false
                },
                ticks: {
                  color: coreui.Utils.getStyle('--cui-text-disabled'),
                  font: {
                    size: 14
                  },
                  padding: 16
                }
              },
              y: {
                grid: {
                  drawBorder: false,
                  borderDash: [2, 4]
                },
                gridLines: {
                  borderDash: [8, 4],
                  color: '#348632'
                },
                ticks: {
                  beginAtZero: true,
                  color: coreui.Utils.getStyle('--cui-text-disabled'),
                  font: {
                    size: 14
                  },
                  maxTicksLimit: 5,
                  padding: 16,
                  stepSize: Math.ceil(100 / 4)
                }
              }
            }
          }
        });
        cardChartNew1 = new Chart(document.getElementById('card-chart-new1'), {
          type: 'line',
          data: {
            labels: Array.from({ length: 30 }, (_, index) => index + 1),
            datasets: [{
              label: 'Profitto del mese',
              backgroundColor: `rgba(88,101,241, .1)`,
              borderColor: '#5865F1',
              borderWidth: 3,
              data: dailyReturns2,
              fill: true
            }]
          },
          options: {
            plugins: {
              legend: {
                display: false
              }
            },
            maintainAspectRatio: false,
            scales: {
              x: {
                display: false
              },
              y: {
                beginAtZero: true,
                display: false
              }
            },
            elements: {
              line: {
                borderWidth: 2,
                tension: 0.4
              },
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4
              }
            }
          }
        });
      });
    } else {
      console.log("User not logged in or user email not available.");
    }
  });
}


// Valori per eliminazione bonus
let deleteDocumentId = null;
let deleteDocumentRow = null;
let deleteDocRitorno = null;
let deleteDocEsito = null;
let deleteDocDate = null;


var showModalButton = document.getElementById('aggiungi-button');
var modal = document.getElementById('addModal');
var modal1 = document.getElementById('add-modal');
var backdrop = document.querySelector('.modal-backdrop');

// Valori per modifica bonus

//fine valori modifica bonus

showModalButton.addEventListener('click', function() {
  modal.style.display = 'block';
});

modal1.addEventListener("click", ()=>{
  let today = new Date().toISOString().slice(0, 10);
  // Set the value of the date picker input field to today's date
  document.getElementById("date-picker").value = today;
})


document.getElementById("aggiungi-button").addEventListener("click", function() {
  // Variabili di aggiunta
  let errorAdd1 = document.getElementById('add-error-1');
  let esitoBonusAdd = document.getElementById('esito-bonus').value;
  let sitoBonusAdd = document.getElementById('sito').value;
  let ritornoBonusAdd =  parseFloat(document.getElementById('ritorno-funbonus').value);
  console.log(ritornoBonusAdd);
  let timestampNow = new Date()
  // Set the value of the date picker input field to today's date
  let myTimeInput = document.getElementById("date-picker").value ;
  let mytime = new Date(myTimeInput);
  timestampNow = mytime;
  console.log(mytime);
  console.log(timestampNow.getMonth());

  if (esitoBonusAdd === null || esitoBonusAdd === "" ||
  sitoBonusAdd === null || sitoBonusAdd === "" ||
  ritornoBonusAdd === null || ritornoBonusAdd === "" || isNaN(ritornoBonusAdd) || isNaN(mytime.getTime())){
  // Display an error message or handle the case appropriately
  errorAdd1.classList.remove("d-none");
  return; // Exit the function
  }
  // Replace the Firestore code below with your actual function to add a document
  funbonuscasRef.add({
      data: timestampNow,
      esito: esitoBonusAdd,
      id: userEmailAdd,
      ritorno: ritornoBonusAdd,
      sito: sitoBonusAdd
      // Add more key-value pairs as needed
  })
  .then(function(docRef) {
      // Visual changes to the dashboard
      const capitalizedEsito = esitoBonusAdd.charAt(0).toUpperCase() + esitoBonusAdd.slice(1);
      esitoCount += ritornoBonusAdd;
      yearlyProfit.innerHTML = esitoCount.toFixed(2) + ' €';

      // Logic of date
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      // Define an array of month names
      const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
      // Get current month
      const currentMonth = monthNames[currentDate.getMonth()];
      let timestampNow1 = timestampNow.getMonth();
      const timestampMonth = monthNames[timestampNow1];
      console.log(currentMonth, timestampMonth, timestampNow.getFullYear(), currentYear);
      let currentMonth1 = timestampNow.getMonth();
      let timestampYear =  timestampNow.getFullYear();
      if (timestampMonth === currentMonth && timestampYear == currentYear) {
        console.log(currentMonth, timestampMonth, timestampNow.getFullYear(), currentYear);
        esitoCountMonth += ritornoBonusAdd;// Update monthlyProfit
        monthlyReturns[currentMonth1] += ritornoBonusAdd;
        mainBarChart.data.datasets[0].data = monthlyReturns;
        mainBarChart.update();
        console.log(monthlyReturns);
        monthlyProfit.innerHTML = esitoCountMonth.toFixed(2) + ' €';

        const dayOfMonth = timestampNow.getDate();
        dailyReturns[dayOfMonth - 1] += ritornoBonusAdd; // Subtract 1 because days are 1-indexed
        
        cardChartNew1.data.datasets[0].data = calculateSums(dailyReturns);
        cardChartNew1.update();

        console.log('questo mese');
      } else{
        console.log('altro mese' + ritornoBonusAdd);
        if(timestampYear == currentYear){
          monthlyReturns[currentMonth1] += parseInt(ritornoBonusAdd);
          mainBarChart.data.datasets[0].data = monthlyReturns;
          mainBarChart.update();
          console.log(monthlyReturns);
        }
      }


      // Update Table
      const tableRow = document.createElement('tr');
      tableRow.classList.add('align-middle');
      let varEsito = ``;
      if(capitalizedEsito === 'Perso'){
        varEsito += `<p data-esitostile="esitostile" style="background-color: #ffe8e8;color: #DC3545;padding: 5px;width: 80px;border-radius: 8px;margin: 0;border: 1px solid rgb(255, 178, 178);text-align:center">${capitalizedEsito}</p>`;
      } else{
        varEsito += `<p data-esitostile="esitostile" style="background-color: #e2efde;color: #198754;padding: 5px;width: 80px;border-radius: 8px;margin: 0;border: 1px solid #6fad918d;text-align:center">${capitalizedEsito}</p>`;
        funMonet += 1;
      }
      funRicevuti +=1;
      funRicevutiElement.innerHTML = funRicevuti;
      funMonetElement.innerHTML = funMonet;
      conversionRate.innerHTML = "Tasso di conversione: " + ((funMonet / funRicevuti) * 100).toFixed(2) + "%"; 





      console.log(tableRow.innerHTML)
      var table = document.getElementById('tbody');
      console.log(table);

      // Insert a row at the beginning (index 0)
      var newRow = table.insertRow(0);
      newRow.classList.add("align-middle");

      // Insert cells into the new row
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      var cell4 = newRow.insertCell(3);
      var cell5 = newRow.insertCell(4);

      // Assign HTML content to each cell
      cell1.innerHTML = `<div style="display: flex; justify-content: center; align-items: center;" data-esito="bonus-esito">${varEsito}</div>`;
      cell2.innerHTML = `<div class="text-nowrap" data-sito="bonus-sito">${sitoBonusAdd}</div>`;
      cell3.innerHTML = `<div style="text-align:center" data-ritorno="bonus-ritorno">${ritornoBonusAdd}<span> €</span></div>`;
      cell4.innerHTML = `<div><small class="text-medium-emphasis">${formatDate1(timestampNow)}</small></div>`;
      cell5.innerHTML = `
        <button class="my-modify-btn fa-solid fa-pen" data-docid="${docRef.id}" ></button>
        <button class="documentId my-delete-btn fa-solid fa-trash" style="color: #DC3545; cursor: pointer;" data-docid="${docRef.id}" data-ritorno="${ritornoBonusAdd}" data-esito="${esitoBonusAdd}" data-date="${formatDate1(timestampNow)}" data-bs-toggle="modal" data-bs-target="#exampleModal">
        </button>
      `;
      // Visual part of the adding document
      document.getElementById('ritorno-funbonus').value = '';
      document.getElementById('sito').value = '';
      let modal = document.getElementById('addModal');
      modal.style.display = 'none';
      var backdrop = document.querySelector('.modal-backdrop');
      errorAdd1.classList.add("d-none");
    
      if (modal && backdrop) {
        backdrop.remove();
      }
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
});





// Function to store document ID and row when delete button is clicked
function storeDocumentIdAndRow(docId, row, docRitorno, docEsito, docDate) {
  deleteDocumentId = docId;
  deleteDocumentRow = row;
  deleteDocRitorno = docRitorno;
  deleteDocEsito = docEsito;
  deleteDocDate = docDate;
}

function isInCurrentMonthYear(formattedDateString) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so adding 1
  const currentYear = currentDate.getFullYear();

  // Parse the formatted date string into a Date object
  const formattedDate = new Date(formattedDateString);

  // Extract month and year from the formatted date
  const formattedMonth = formattedDate.getMonth() + 1;
  const formattedYear = formattedDate.getFullYear();

  // Check if the formatted date's month and year match the current month and year
  return formattedMonth === currentMonth && formattedYear === currentYear;
}

function getFormattedYear(formattedDateString) {
  // Parse the formatted date string into a Date object
  const formattedDate = new Date(formattedDateString);

  // Extract month and year from the formatted date
  const formattedYear = formattedDate.getFullYear();

  // Return the formatted month and year
  return formattedYear;
}

function returnFormattedDay(dateString){
 
  const day = parseInt(dateString.match(/\d+/)[0], 10); // Extracts the first number found in the string
  return day;
}

function returnFormattedMonth(dateString){
  let monthName = dateString.split(' ')[0]; // Get the month name
  monthName = monthName.toLowerCase();
  console.log(`monthName : ${monthName}`);
  const months = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
  const monthIndex = months.indexOf(monthName); // Get the index of the month
  const month = monthIndex; // Adding 1 since getMonth() returns 0-indexed months
  return month;
}

// Function to handle the deletion of the document
function deleteDocumentByIdAndAnimateRow() {
  if (deleteDocumentId && deleteDocumentRow) {
    const docRef = db.collection('vdgslot').doc(deleteDocumentId);

    // Delete the document
    docRef.delete().then(() => {
      console.log("Document successfully deleted!");
      if(deleteDocEsito === 'perso'){
        funRicevuti -= 1;
        funRicevutiElement.innerHTML = funRicevuti;
      } else{
        funRicevuti -= 1;
        funRicevutiElement.innerHTML = funRicevuti;
        funMonet -= 1;
        funMonetElement.innerHTML = funMonet;
      }

      conversionRate.innerHTML = "Tasso di conversione: " + ((funMonet / funRicevuti) * 100).toFixed(2) + "%";
      esitoCount -= deleteDocRitorno;
      yearlyProfit.innerHTML = esitoCount.toFixed(2) + ' €';
      
      const isCurrentMonth = isInCurrentMonthYear(deleteDocDate);
      console.log(deleteDocDate);
      let currentMonth =  returnFormattedMonth(deleteDocDate);
      let dayOfMonth = returnFormattedDay(deleteDocDate);
      console.log(dayOfMonth, currentMonth);
      console.log(getFormattedYear(deleteDocDate));
      const currentDate = new Date();
      if(isCurrentMonth){
        esitoCountMonth -= deleteDocRitorno;
        monthlyProfit.innerHTML = esitoCountMonth.toFixed(2) + ' €';

        monthlyReturns[currentMonth] -= deleteDocRitorno;
        mainBarChart.data.datasets[0].data = monthlyReturns;
        mainBarChart.update();

        dailyReturns[dayOfMonth - 1] -= deleteDocRitorno; // Subtract 1 because days are 1-indexed
        cardChartNew1.data.datasets[0].data = calculateSums(dailyReturns);
        cardChartNew1.update();
        console.log(dayOfMonth, dailyReturns);
      } else{
        if(currentDate.getFullYear() == getFormattedYear(deleteDocDate)){
          monthlyReturns[currentMonth] -= deleteDocRitorno;
          mainBarChart.data.datasets[0].data = monthlyReturns;
          console.log(monthlyReturns);
          mainBarChart.update();
        }
      }
      const cancelButton = document.querySelector('#my-delete-dnone');

      // Simulate a click on the button
      cancelButton.click();

      

      // Add CSS class for animation
      deleteDocumentRow.classList.add('hide-row');

      // After animation completes, remove the row from DOM
      deleteDocumentRow.addEventListener('animationend', function() {
        deleteDocumentRow.remove();
      });
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
}

// Event listener for delete buttons
document.getElementById('dataTable').addEventListener('click', function(event) {
  // Check if the clicked element is a button with class "documentId"
  if (event.target && event.target.matches('.documentId')) {
    // Retrieve the document ID from the data attribute
    const docId = event.target.dataset.docid;
    const docRitorno = event.target.dataset.ritorno;
    const docEsito = event.target.dataset.esito;
    const docDate = event.target.dataset.date;

    // Retrieve the closest <tr> element
    const row = event.target.closest('tr');

    // Store document ID and row
    storeDocumentIdAndRow(docId, row, docRitorno, docEsito, docDate);
  }
});

// Event listener for the modal delete button
document.querySelector('.modal-footer .btn-danger').addEventListener('click', function() {
  // Execute deletion when modal delete button is clicked
  deleteDocumentByIdAndAnimateRow();
});

// Logica modifica

let modifydocId = null;

function storeModifyDocumentId(modifydocIdElement){
    modifydocId = modifydocIdElement;
}

document.getElementById('dataTable').addEventListener('click', function(event) {
  // Check if the clicked element is a button with class "documentId"
  if (event.target && event.target.matches('.my-modify-btn')) {
    // Retrieve the document ID from the data attribute
    const modifydocId = event.target.dataset.docid;

    // Store document ID and row
    storeModifyDocumentId(modifydocId);
    compileModifyModal(modifydocId);
  }
});

document.querySelector('.my-btn-modify').addEventListener('click', function() {
  // Execute deletion when modal delete button is clicked
  modifyDocumentById();
});

function compileModifyModal(modifydocId){
  console.log(modifydocId);
  db.collection('vdgslot').doc(modifydocId).get()
  .then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      console.log(data.data);
      document.getElementById("modifica-esito-bonus").value = data.esito;
      document.getElementById("modifica-sito").value = data.sito;
      document.getElementById("modifica-date-picker").value = modifyDocumentDate(data.data);
      document.getElementById("modifica-ritorno-funbonus").value = data.ritorno;
    } else {
      console.log('No such document!');
    }
  })
  .catch((error) => {
    console.log('Error getting document:', error);
  });
}

let isFunctionRunning = false;
function modifyDocumentById(){
    // Checka se è già attiva
    if (isFunctionRunning) {
      console.log("La funzione è già in corso di esecuzione.");
      return;
    }
    isFunctionRunning = true;

    // prende var global e checka
    db.collection('vdgslot').doc(modifydocId).get()
      .then((doc) => {
        if (doc.exists) {
          let myTimeInput = document.getElementById("modifica-date-picker").value;
          let mytime = new Date(myTimeInput);
          let modificaBonusRitorno = document.getElementById("modifica-ritorno-funbonus").value;
          let modificaBonusEsito = document.getElementById("modifica-sito").value;
          let modificaBonusSito = document.getElementById("modifica-esito-bonus").value;
          let modificaBonusData = document.getElementById("modifica-date-picker").value;
          let errorAdd1 = document.getElementById('add-error-2');
      
          if (modificaBonusEsito === null || modificaBonusEsito === "" ||
          modificaBonusSito === null || modificaBonusSito === "" ||
          modificaBonusRitorno === null || modificaBonusRitorno === "" || isNaN(modificaBonusRitorno) || isNaN(mytime.getTime())){
          // Display an error message or handle the case appropriately
          errorAdd1.classList.remove("d-none");
          isFunctionRunning = false;
          return; // Exit the function
          }
          errorAdd1.classList.add("d-none");
          const data = doc.data();
          const clickedButton = document.querySelector(`button[data-docid="${modifydocId}"]`)
          const row = clickedButton.closest('tr');

          // Gestione Dati dagli input
          // Data modificata

          console.log(mytime);
          //Esito bonus


          if(row){
            //Logica esito
            let varEsito = document.getElementById("modifica-esito-bonus").value;
            console.log(row.querySelector(`[data-esitostile="esitostile"]`));
            let esitoStyleElement = row.querySelector(`[data-esitostile="esitostile"]`);
            console.log(data.esito, varEsito);
            if(varEsito == "perso"){
              //gestione stile
              esitoStyleElement.style.border = "1px solid rgb(255, 178, 178)";
              esitoStyleElement.style.color = "#DC3545";
              esitoStyleElement.style.backgroundColor = "#ffe8e8";
              esitoStyleElement.innerHTML = "Perso";
              if(varEsito != data.esito){
                funMonet -= 1;
                funMonetElement.innerHTML = funMonet;
              }
            } else{
              //gestione stile
              esitoStyleElement.style.border = "1px solid #6fad918d";
              esitoStyleElement.style.color = "#198754";
              esitoStyleElement.style.backgroundColor = "#e2efde";
              esitoStyleElement.innerHTML = "Vinto";
              if(varEsito != data.esito){
                funMonet += 1;
                funMonetElement.innerHTML = funMonet;
              }
            }
            conversionRate.innerHTML = "Tasso di conversione: " + ((funMonet / funRicevuti) * 100).toFixed(2) + "%";

            //fine logica esito
            row.querySelector(`[data-sito="bonus-sito"]`).innerHTML = document.getElementById("modifica-sito").value;

            //Logica Ritorno e Date
            row.querySelector(`[data-ritorno="bonus-ritorno"]`).innerHTML = parseFloat(document.getElementById("modifica-ritorno-funbonus").value) + " €";
            row.querySelector('td:nth-child(4) div small').textContent = getModifyData(mytime);
            //Logica modifica dati a schermo
            
            //Profitto Mensile e annuale da modificare
            let oldReturnValue = data.ritorno;
            let oldDateValue = data.data;
            let isCurrentMonth = isInCurrentMonthYearModify(oldDateValue);
            let oldMonthDate = getMonthIndex(oldDateValue);
            oldMonthDate -= 1;
            let oldYearModify = getYearModify(oldDateValue);
            let oldDayModify = getDayOfMonthModify(oldDateValue);
            console.log(oldReturnValue, oldDateValue, isCurrentMonth, oldDayModify);
            var currentDate = new Date();

            if(isCurrentMonth){
              esitoCountMonth -= oldReturnValue;
              monthlyProfit.innerHTML = esitoCountMonth.toFixed(2) + ' €';
      
              monthlyReturns[oldMonthDate] -= oldReturnValue;
              mainBarChart.data.datasets[0].data = monthlyReturns;
      
              dailyReturns[oldDayModify - 1] -= oldReturnValue; // Subtract 1 because days are 1-indexed
              cardChartNew1.data.datasets[0].data = calculateSums(dailyReturns);
              console.log(oldDayModify);
            } else{
              if(currentDate.getFullYear() == oldYearModify){
                monthlyReturns[oldMonthDate] -= oldReturnValue;
                mainBarChart.data.datasets[0].data = monthlyReturns;
              }
            }

            esitoCount -= oldReturnValue;
            yearlyProfit.innerHTML = esitoCount.toFixed(2) + ' €';

            //Profitto Mensile e annuale da aggiungere
            let newReturnValue = parseFloat(document.getElementById("modifica-ritorno-funbonus").value);
            let newDateValueRaw = document.getElementById("modifica-date-picker").value;
            var date = new Date(newDateValueRaw);
            var newDateValue = date.getTime();
            console.log(newDateValue, newReturnValue);

            let newDateYear = getYearFromTimestamp(newDateValue);
            let newDateMonth = getMonthIndexFromTimestamp(newDateValue);
            newDateMonth -= 1;
            let newDateDay = getDayFromTimestamp(newDateValue);
            isCurrentMonth =  isCurrentMonthAndYearModify2(newDateValue);

            console.log("New Date Year:", newDateYear);
            console.log("New Date Month:", newDateMonth);
            console.log("New Date Day:", newDateDay);
            console.log("Is in current month:", isCurrentMonth);
            console.log(monthlyReturns);

            if(isCurrentMonth){
              esitoCountMonth += newReturnValue;
              monthlyProfit.innerHTML = esitoCountMonth.toFixed(2) + ' €';
      
              monthlyReturns[newDateMonth] += newReturnValue;
              mainBarChart.data.datasets[0].data = monthlyReturns;
      
              dailyReturns[newDateDay - 1] += newReturnValue; // Subtract 1 because days are 1-indexed
              cardChartNew1.data.datasets[0].data = calculateSums(dailyReturns);
              
            } else{
              if(currentDate.getFullYear() == newDateYear){
                monthlyReturns[newDateMonth] += newReturnValue;
                mainBarChart.data.datasets[0].data = monthlyReturns;
                
              }
            }
            mainBarChart.update();
            cardChartNew1.update();
            console.log(monthlyReturns, dailyReturns);

            esitoCount += newReturnValue;
            yearlyProfit.innerHTML = esitoCount.toFixed(2) + ' €';

            // Trasferimento dati su firestore
            var docRef = db.collection("vdgslot").doc(modifydocId);
            docRef.update({
              data: mytime,
              esito: varEsito,
              ritorno: newReturnValue,
              sito: document.getElementById("modifica-sito").value
            })
            .then(function() {
              console.log("Document successfully updated!");
              const cancelButton = document.querySelector('#modify-close-btn');

              // Simulate a click on the button
              cancelButton.click();
              isFunctionRunning = false;

            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            });
          }
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
}

function modifyDocumentDate(timestamp){
  const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return(formattedDate); // Output will be in the format yyyy-MM-dd
}

function isInCurrentMonthYearModify(timestamp) {
  // Convert seconds to milliseconds and add nanoseconds
  var milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);

  // Create a Date object from the milliseconds
  var date = new Date(milliseconds);

  // Get the year and month of the timestamp
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // Month is zero-based, so add 1 to get the correct month

  // Get the current year and month
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth() + 1;

  // Check if the timestamp is in the current month and year
  return year === currentYear && month === currentMonth;
}

function getMonthIndex(timestamp) {
  // Convert seconds to milliseconds and add nanoseconds
  var milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);

  // Create a Date object from the milliseconds
  var date = new Date(milliseconds);

  // Get the month index of the timestamp (zero-based)
  var monthIndex = date.getMonth(); 

  // Adjust the index to be one-based (1 for January, 2 for February, etc.)
  monthIndex += 1;

  return monthIndex;
}

function getModifyData(timestamp){
  const date = new Date(timestamp);

  // Get month, day, and year components
  const monthNames = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu",
  "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Construct the desired format
  const formattedDate = `${month} ${day}, ${year}`;

  return(formattedDate); // Output: "Mar 25, 2024"
}

function getYearModify(timestamp) {
  // Convert seconds to milliseconds and add nanoseconds
  var milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);

  // Create a Date object from the milliseconds
  var date = new Date(milliseconds);

  // Get the year from the timestamp
  var year = date.getFullYear();

  return year;
}


function getDayOfMonthModify(timestamp) {
  // Convert seconds to milliseconds and add nanoseconds
  var milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);

  // Create a Date object from the milliseconds
  var date = new Date(milliseconds);

  // Get the day of the month from the timestamp
  var dayOfMonth = date.getDate();

  return dayOfMonth;
}

function getYearFromTimestamp(timestamp) {
  return new Date(timestamp).getFullYear();
}

function getMonthIndexFromTimestamp(timestamp) {
  return new Date(timestamp).getUTCMonth() + 1; // Adding 1 to get month index starting from 1 (January)
}

function getDayFromTimestamp(timestamp) {
  return new Date(timestamp).getUTCDate();
}

function isCurrentMonthAndYearModify2(timestamp) {
  const currentDate = new Date();
  const dateFromTimestamp = new Date(timestamp);
  return currentDate.getUTCFullYear() === dateFromTimestamp.getUTCFullYear() &&
         currentDate.getUTCMonth() === dateFromTimestamp.getUTCMonth();
}

function calculateSums(arr) {
  let newArr = Array.from(arr); // Create a copy of the original array
  console.log(arr);
  for (let i = 0; i < newArr.length; i++) {
      if (i > 0) {
          newArr[i] += newArr[i - 1]; // Add the previous element's value
      }
  }
  console.log(newArr)
  return newArr;
}




// Call populateTable function when the page loads
document.addEventListener('DOMContentLoaded', populateTable);

// Bar Chart

Chart.defaults.pointHitDetectionRadius = 1;
Chart.defaults.plugins.tooltip.enabled = false;
Chart.defaults.plugins.tooltip.mode = 'index';
Chart.defaults.plugins.tooltip.position = 'nearest';
Chart.defaults.plugins.tooltip.external = coreui.ChartJS.customTooltips;
Chart.defaults.color = '#5865f1';


// eslint-disable-next-line no-unused-vars


// Line Chart


export { checkUserLoggedIn };
