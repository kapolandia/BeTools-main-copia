// Function to show menu
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId);
  
    toggle.addEventListener('click', () => {
      // Add show-menu class to nav menu
      nav.classList.toggle('show-menu');
  
      // Add show-icon to show and hide the menu icon
      toggle.classList.toggle('show-icon');
    });
  }
  


  
  // Easing function for smooth scrolling
  function easeInOut(t, b, c, d) {
    // t = current time, b = start value, c = change in value, d = duration
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  
  // Call the showMenu function
  showMenu('nav-toggle', 'nav-menu');
  
  document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.question');
    
    questions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                this.querySelector('span').textContent = '+';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                this.querySelector('span').textContent = '-';
            }
        });
    });
});




  