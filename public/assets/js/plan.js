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
    // const days = document.querySelectorAll(".rem-days");
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
          // Document data exists, so you can access the "member" field
          const userData = doc.data();
          const sessionData = JSON.parse(
            localStorage.getItem("sessionData")
          );
          console.log(sessionData);
          if (userData?.customerId) {
            const getSession = fetch(
              `https://betoolz-server.vercel.app/api/get-session/${userData?.customerId}`,
              {
                method: "GET",
              }
            )
              .then((response) => response.json())
              .then(async (data) => {
                console.log(data);
                if (data.length !== 0) {
                  if (data[0].cancel_at_period_end === true) {
                    subscribeBtn.forEach((element) => {
                      element.style.display = "block";
                    });
                    unsubscribebtn.forEach((element) => {
                      element.style.display = "none";
                    });
                  } else {
                    subscribeBtn.forEach((element) => {
                      element.style.display = "none";
                    });
                    unsubscribebtn.forEach((element) => {
element.style.display = "block";
element.addEventListener("click", async function () {
const confirmationDiv = document.getElementById("myModal");
confirmationDiv.style.display = "block";

const confirmButton = document.getElementById("confirmBtn");
const cancelButton = document.getElementById("cancelBtn");
const toHide = document.getElementById("toHide");
toHide.style.display = "none";
const toHideFooter = document.getElementById("footer");
toHideFooter.style.display = "none";

confirmButton.addEventListener("click", async function () {
  const response = await fetch(
    "https://betoolz-server.vercel.app/api/cancel-subscription",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriptionId: data[0].id,
        deadline: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        userId: user.email,
      }),
    }
  );
  
  confirmationDiv.style.display = "none";
  const toHide = document.getElementById("toHide");
  toHide.style.display = "block";
  const toHideFooter = document.getElementById("footer");
  toHideFooter.style.display = "block";

  subscribeBtn.forEach((elements) => {
    elements.style.display = "block";
  });
  unsubscribebtn.forEach((elements) => {
    elements.style.display = "none";
  });

  confirmationDiv.style.display = "none";
});

cancelButton.addEventListener("click", function () {
  console.log("You pressed Cancel!");
  confirmationDiv.style.display = "none";
  const toHide = document.getElementById("toHide");
  toHide.style.display = "block";
  const toHideFooter = document.getElementById("footer");
  toHideFooter.style.display = "block";
});
});
});
}


                  const users = firestore
                    .collection("users")
                    .doc(user?.uid)
                    .update({ member: "premium" });

                  let maxRemainingDays = 0;

                  data.forEach((subscription) => {
                    const remainingDays = getRemainingDays(subscription);
                    maxRemainingDays = Math.max(
                      maxRemainingDays,
                      remainingDays
                    );
                  });
                  if (maxRemainingDays > 0) {
                    days.forEach((element) => {
                      element.style = `font-weight:bold; margin-Top:10px`;
                      element.innerText = `Il tuo abbonamento scade tra ${maxRemainingDays} giorni`;
                    });
                  }
                } else {
                  const users = firestore
                    .collection("users")
                    .doc(user?.uid)
                    .update({ member: "free" });
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
        } else {
          console.log("User document does not exist.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user document:", error);
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