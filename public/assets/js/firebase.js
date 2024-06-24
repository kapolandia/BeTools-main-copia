// Check if the user has the required role to access the page
const checkUserRole = (userId) => {
  // Get the user's role from Firestore based on their user ID
  firebase
    .firestore()
    .collection("Users")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
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
          console.log("lesss");
          document.body.style.display = "block";
          window.location.href = "freelanding.html";
        } else if (remainingDays > 0) {
          console.log("greaters");
          window.location.href = "landing.html";
        }

        //   const userRole = doc.data().member;
        //   if (userRole === "free") {
        //     // User has the required role, allow access
        //     // Redirect or render the protected page
        //     window.location.href = "freelanding.html"; // Replace with the URL you want to redirect to
        //   } else {
        //     // User doesn't have the required role, deny access
        //     // Redirect or show an error message
        //   }
        // } else {
        //   // User document not found, handle accordingly
      }
    })
    .catch((error) => {
      // Handle Firestore read error
    });
};

// Check if the user is authenticated and get their user ID
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid;
    checkUserRole(userId);
  } else {
    // User is not authenticated, handle accordingly (e.g., redirect to login)
  }
});

window.addEventListener("DOMContentLoaded", onAuthStateChanged);
