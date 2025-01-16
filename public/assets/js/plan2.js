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
    const btn = document.getElementById("premium-btn");
    const stripe = Stripe(
      "pk_live_51O4vmXDDGGxf05cworuWxl8jyy5jz3DLjByesMtC0YA76jthgz2zPTVF3yARsbBbEjINwVZDrIcNF6GyeEhFLDIF00JSr0i5Ik"
    );

    const userDocRef = firestore.collection("users").doc(user.uid);
    const subscribeBtn = document.querySelectorAll(".subscribe-btn");
    const unsubscribebtn = document.querySelectorAll(".unsubscribe-btn");
    const days = document.querySelectorAll(".rem-days");
    subscribeBtn.forEach((elements) => {
      elements.style.display = "block";
    });
    // Fetch the document data

    function getRemainingDays(subscription) {
      if (subscription.status === "active") {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const remainingSeconds =
          subscription.current_period_end - currentTimestamp;

        if (remainingSeconds > 0) {
          const remainingDays = Math.ceil(
            remainingSeconds / (24 * 60 * 60)
          );
          return remainingDays;
        } else {
          return 0; // Subscription has already ended
        }
      } else {
        return 0; // Subscription is not active
      }
    }
    userDocRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        if (userData?.customerId) {
          fetch(
            `https://betoolz-server.vercel.app/api/get-session/${userData?.customerId}`,
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((data) => {
              
              // Display subscriptions in the table
              fetchAndDisplayAllSubscriptions(userData.customerId);
              fetchAndDisplayAllInvoices(userData.customerId);
            })
            .catch((error) => {
              console.error("Error fetching subscriptions:", error);
            });
        } else {
          // console.log("Customer ID not found.");
          displaySubscriptions([]);
          displayInvoices([]);
        }
      } else {
        // console.log("User document does not exist.");
        displaySubscriptions([]);
        displayInvoices([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching user document:", error);
      displaySubscriptions([]);
      displayInvoices([]);
    });
    // btn.addEventListener("click", async () => {
    window.getPremium = async (price) => {
      try {
        const response = await fetch(
          "https://betoolz-server.vercel.app/api/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price: price,
              baseUrl: window.location.origin,
              userEmail: user.email,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem(
            "sessionData",
            JSON.stringify({
              sessionId: data.sessionId,
              userId: user.uid,
              price,
              messageData: "Premium Subscription",
              customerId: data.customerId,
            })
          );

          const users = firestore
            .collection("users")
            .doc(user.uid)
            .update({ customerId: data.customerId });
          const result = await stripe.redirectToCheckout({
            sessionId: data.sessionId,
          });
        } else {
          console.error("Error creating checkout session");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  }
});

function displaySubscriptions(subscriptions) {
  const acquistiDiv = document.getElementById("acquisti-record");
  acquistiDiv.innerHTML = ""; // Clear any previous content

  if (subscriptions.length === 0) {
    acquistiDiv.innerText = "Non hai effettuato acquisti.";
    return;
  }

  // Create a table
  const table = document.createElement("table");
  table.className = "subscription-table";
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";

  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Coupon", "Sconto", "Stato", "Inizio", "Rinnovo", "Costo"].forEach((header) => {
    const th = document.createElement("th");
    th.innerText = header;
    th.style.padding = "10px";
    th.style.textAlign = "left";
    th.style.border = "1px solid #ccc"
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");
  subscriptions.forEach((subscription) => {
    const row = document.createElement("tr");
    // console.log(subscription);
    

    // Subscription details
    const subscriptionDetails = [
      subscription.discount && subscription.discount.coupon ? subscription.discount.coupon.name : "N/A", // Check if discount and coupon exist
      subscription.discount && subscription.discount.coupon && subscription.discount.coupon.percent_off
        ? `${subscription.discount.coupon.percent_off}%`
        : "N/A", // Check if discount and coupon exist
      subscription.status,
      new Date(subscription.start_date * 1000).toLocaleDateString(),
      subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toLocaleDateString()
        : "N/A",
      subscription.plan.amount ? `€${(subscription.plan.amount / 100).toFixed(2)}` : "N/A",
    ];
    

    subscriptionDetails.forEach((detail, index) => {
      const td = document.createElement("td");
      td.style.border = "1px solid #ccc";
      td.style.padding = "10px";
    
      if (index === 2) { // Status column
        const statusSpan = document.createElement("span");
        if(detail == "active"){
          statusSpan.innerText = "attivo";
        } else if(detail == "inactive"){
          statusSpan.innerText = "terminato";
        } else if(detail == "canceled"){
          statusSpan.innerText = "cancellato";
        } else {
          statusSpan.innerText = detail;
        }
        statusSpan.className = detail === "active" ? "status-pill active" : "status-pill inactive";
        td.appendChild(statusSpan);
      } else {
        td.innerText = detail;
      }
    
      // Assign classes dynamically based on the content of detail
      switch (index) {
        case 0: // Coupon column
          td.className = detail !== "None" ? "has-coupon" : "no-coupon";
          break;
        case 1: // Discount column
          td.className = detail !== "N/A" ? "has-discount" : "no-discount";
          break;
        case 5: // Amount column
          td.className = detail !== "N/A" ? "has-amount" : "no-amount";
          break;
        default:
          td.className = "default-cell"; // Generic class for other columns
      }
    
      row.appendChild(td);
    });
    

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  acquistiDiv.appendChild(table);
}

function displayInvoices(invoices) {
  const acquistiDiv = document.getElementById("acquisti-invoices");
  acquistiDiv.innerHTML = ""; // Clear any previous content

  if (invoices.length === 0) {
    acquistiDiv.innerText = "Non hai effettuato acquisti.";
    return;
  }

  // Create a table
  const table = document.createElement("table");
  table.className = "subscription-table";
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";

  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Coupon", "Sconto", "Stato", "Inizio", "Termine", "Pagato"].forEach((header) => {
    const th = document.createElement("th");
    th.innerText = header;
    th.style.padding = "10px";
    th.style.textAlign = "left";
    th.style.border = "1px solid #ccc"
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");
  invoices.forEach((invoice) => {
    const row = document.createElement("tr");
    // console.log(invoice);
    

    // invoice details
    const invoiceDetails = [
      invoice.discount && invoice.discount.coupon ? invoice.discount.coupon.name : "N/A", // Check if discount and coupon exist
      invoice.discount && invoice.discount.coupon && invoice.discount.coupon.percent_off
        ? `${invoice.discount.coupon.percent_off}%`
        : "N/A", // Check if discount and coupon exist
      invoice.status,
      new Date(invoice.period_start * 1000).toLocaleDateString(),
      invoice.period_end
        ? new Date(invoice.period_end * 1000).toLocaleDateString()
        : "N/A",
        invoice.amount_paid != null ? `€${(invoice.amount_paid / 100).toFixed(2)}` : "N/A"
    ];
    

    invoiceDetails.forEach((detail, index) => {
      const td = document.createElement("td");
      td.style.border = "1px solid #ccc";
      td.style.padding = "10px";
    
      if (index === 2) { // Status column
        const statusSpan = document.createElement("span");
        if(detail == "paid"){
          statusSpan.innerText = "pagato";
        } else if(detail == "inactive"){
          statusSpan.innerText = "terminato";
        } else if(detail == "canceled"){
          statusSpan.innerText = "cancellato";
        } else {
          statusSpan.innerText = detail;
        }
        statusSpan.className = detail === "paid" ? "status-pill active" : "status-pill inactive";
        td.appendChild(statusSpan);
      } else {
        td.innerText = detail;
      }
    
      // Assign classes dynamically based on the content of detail
      switch (index) {
        case 0: // Coupon column
          td.className = detail !== "None" ? "has-coupon" : "no-coupon";
          break;
        case 1: // Discount column
          td.className = detail !== "N/A" ? "has-discount" : "no-discount";
          break;
        case 5: // Amount column
          td.className = detail !== "N/A" ? "has-amount" : "no-amount";
          break;
        default:
          td.className = "default-cell"; // Generic class for other columns
      }
    
      row.appendChild(td);
    });
    

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  acquistiDiv.appendChild(table);
}

// Fetch and display all subscriptions
function fetchAndDisplayAllSubscriptions(customerId) {
  fetch(`https://betoolz-server.vercel.app/api/get-all-subscriptions/${customerId}`, { method: "GET" })
    .then((response) => response.json())
    .then((subscriptions) => {
      // console.log(subscriptions);
      
      displaySubscriptions(subscriptions); // Reuse the displaySubscriptions function
    })
    .catch((error) => {
      console.error("Error fetching all subscriptions:", error);
    });
}

function fetchAndDisplayAllInvoices(customerId) {
  fetch(`https://betoolz-server.vercel.app/api/get-invoices/${customerId}`, { method: "GET" })
    .then((response) => response.json())
    .then((invoices) => {
      // console.log(invoices);
      displayInvoices(invoices); // Reuse the displaySubscriptions
    })
    .catch((error) => {
      console.error("Error fetching all invoices:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("modify-fatturazione");
  if (button) {
      button.addEventListener("click", modifyFatturazione);
  }
});


function modifyFatturazione(){
  console.log("Modifica fatturazione");
  const telegramId = document.getElementById("telegram-utente").value;
  const nomeUtente = document.getElementById("nome-utente").value;
  const cognomeUtente = document.getElementById("cognome-utente").value;
  const indirizzoUtente = document.getElementById("indirizzo-utente").value;
  const cittaUtente = document.getElementById("citta-utente").value;
  const provinciaUtente = document.getElementById("provincia-utente").value;
  const capUtente = document.getElementById("cap-utente").value;

  console.log(telegramId, nomeUtente, cognomeUtente, indirizzoUtente, cittaUtente, provinciaUtente, capUtente);
  let isAddressError = false;
  let isTelegramError = false;
  

  if(!validateTelegram(telegramId)){
    const telegramError = document.getElementById("telegram-error");
    telegramError.style.display = "block";
    isTelegramError = true;
  }

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

  if (
    isAddressError ||
    isTelegramError
  ) {
    console.log("Validation failed.");
    return;
  }

  const addressError = document.getElementById("address-error");
  addressError.style.display = "none";
  const telegramError = document.getElementById("telegram-error");
  telegramError.style.display = "none";
  console.log("Validation successful.");

  const db = firebase.firestore();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection("users").doc(user.uid).update({
        nome: nomeUtente,
        cognome: cognomeUtente,
        indirizzo: indirizzoUtente,
        citta: cittaUtente,
        provincia: provinciaUtente,
        cap: capUtente,
        telegramId: telegramId,
      })
        .then(() => {
          console.log("User updated successfully in Firestore.");
          const updateSuccess = document.getElementById("update-success");
          updateSuccess.style.display = "block";

          // Hide the element after 3 seconds (3000 milliseconds)
          setTimeout(() => {
            updateSuccess.style.display = "none";
          }, 3000);
        })
        .catch((error) => {
          console.error("Error updating user in Firestore: ", error);
          alert("Failed to update user. Please try again.");
        });
    } else {
      console.log("No user is logged in.");
    }
  });
}

function validate_field(field) {
  return field != null && field.trim().length > 3;
}

function validate_cap(cap) {
  const expression = /^\d{5}$/; // Italian ZIP code format
  return expression.test(cap);
}

function validateTelegram(telegramId){
  const expression = /^[a-zA-Z0-9_]{5,32}$/;
  return expression.test(telegramId);
}


