import { checkUserLoggedIn } from "./auth.js";

// When the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if the user is logged in
  checkUserLoggedIn()
    .then((user) => {
      if (user) {
        // User is logged in, update the HTML content accordingly
        // document.getElementById("loggedInMessage").textContent =
        //   "User is logged in.";
      } else {
        // User is not logged in, update the HTML content accordingly
        window.location.href = "login.html";
      }
    })
    .catch((error) => {
      console.error("Error checking user login:", error);
    });
});
