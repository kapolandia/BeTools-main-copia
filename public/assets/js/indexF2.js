document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the button and the target element by their IDs
    const scrollButton = document.getElementById("priceButton");
    const targetElement = document.getElementById("targetPrice");

    // Define the scroll duration (adjust as needed)
    const duration = 1000; // in milliseconds
    const extraPixels = -100; // Additional 50 pixels to scroll

    // Add a click event listener to the button
    scrollButton.addEventListener("click", function () {
        // Get the initial scroll position
        const start = window.pageYOffset;

        // Get the target scroll position including the extra pixels
        const target = targetElement.getBoundingClientRect().top + extraPixels;

        // Define a function to perform smooth scrolling
        function scrollStep(timestamp) {
            const currentTime = timestamp || performance.now();
            const elapsed = currentTime - startTime;

            // Calculate the next scroll position using a smooth easing function
            const nextScroll = easeInOut(elapsed, start, target, duration);

            // Scroll to the next position
            window.scrollTo(0, nextScroll);

            if (elapsed < duration) {
                // Continue scrolling if not finished
                requestAnimationFrame(scrollStep);
            }
        }

        // Record the start time
        const startTime = performance.now();

        // Start the smooth scrolling animation
        requestAnimationFrame(scrollStep);

        // Close the menu (if it's open) when scrolling starts
        const navMenu = document.getElementById("nav-menu");
        navMenu.classList.remove('show-menu');
        const navToggle = document.getElementById("nav-toggle");
        navToggle.classList.remove('show-icon');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the button and the target element by their IDs
    const scrollButton = document.getElementById("priceButton2");
    const targetElement = document.getElementById("targetPrice");

    // Define the scroll duration (adjust as needed)
    const duration = 1000; // in milliseconds
    const extraPixels = -100; // Additional 50 pixels to scroll

    // Add a click event listener to the button
    scrollButton.addEventListener("click", function () {
        // Get the initial scroll position
        const start = window.pageYOffset;

        // Get the target scroll position including the extra pixels
        const target = targetElement.getBoundingClientRect().top + extraPixels;

        // Define a function to perform smooth scrolling
        function scrollStep(timestamp) {
            const currentTime = timestamp || performance.now();
            const elapsed = currentTime - startTime;

            // Calculate the next scroll position using a smooth easing function
            const nextScroll = easeInOut(elapsed, start, target, duration);

            // Scroll to the next position
            window.scrollTo(0, nextScroll);

            if (elapsed < duration) {
                // Continue scrolling if not finished
                requestAnimationFrame(scrollStep);
            }
        }

        // Record the start time
        const startTime = performance.now();

        // Start the smooth scrolling animation
        requestAnimationFrame(scrollStep);

        // Close the menu (if it's open) when scrolling starts
        const navMenu = document.getElementById("nav-menu");
        navMenu.classList.remove('show-menu');
        const navToggle = document.getElementById("nav-toggle");
        navToggle.classList.remove('show-icon');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the button and the target element by their IDs
    const scrollButton = document.getElementById("calcolatoriButton");
    const targetElement = document.getElementById("targetCalcolatori");

    // Define the scroll duration (adjust as needed)
    const duration = 1000; // in milliseconds
    const extraPixels = -100; // Additional 50 pixels to scroll

    // Add a click event listener to the button
    scrollButton.addEventListener("click", function () {
        // Get the initial scroll position
        const start = window.pageYOffset;

        // Get the target scroll position including the extra pixels
        const target = targetElement.getBoundingClientRect().top + extraPixels;

        // Define a function to perform smooth scrolling
        function scrollStep(timestamp) {
            const currentTime = timestamp || performance.now();
            const elapsed = currentTime - startTime;

            // Calculate the next scroll position using a smooth easing function
            const nextScroll = easeInOut(elapsed, start, target, duration);

            // Scroll to the next position
            window.scrollTo(0, nextScroll);

            if (elapsed < duration) {
                // Continue scrolling if not finished
                requestAnimationFrame(scrollStep);
            }
        }

        // Record the start time
        const startTime = performance.now();

        // Start the smooth scrolling animation
        requestAnimationFrame(scrollStep);

        // Close the menu (if it's open) when scrolling starts
        const navMenu = document.getElementById("nav-menu");
        navMenu.classList.remove('show-menu');
        const navToggle = document.getElementById("nav-toggle");
        navToggle.classList.remove('show-icon');
    });
});

