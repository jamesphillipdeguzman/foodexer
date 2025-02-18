document.addEventListener("DOMContentLoaded", () => {
  function hamburgerMenuToggle() {
    debugger;

    // Hamburger menu click event
    const hamburgerBtn = document.querySelector("#menu");
    const navigationBtn = document.querySelector(".navlinks ul");

    if (hamburgerBtn && navigationBtn) {
      hamburgerBtn.addEventListener("click", () => {
        // console.log("hamburger clicked!");
        hamburgerBtn.classList.toggle("open");
        navigationBtn.classList.toggle("open");
      });
    }
  }

  function setCurrentYear() {
    debugger;
    // Get the year
    const todaysDate = new Date();
    // Set the current year for all elements with class 'currentyear'
    const yearElements = document.querySelectorAll(".currentyear");
    yearElements.forEach((element) => {
      element.textContent = todaysDate.getFullYear(); // simplified approach
    });
  }

  function setLastModifiedDate() {
    const todaysDate = new Date(document.lastModified);
    const dateFormat = { year: "numeric", month: "short", day: "numeric" };
    const timeFormat = todaysDate.toLocaleTimeString();
    const formattedDate = todaysDate.toLocaleDateString("en-US", dateFormat);
    const formattedDateTime = formattedDate + " " + timeFormat;

    const timestamp = document.querySelector("#timestamp");

    const lastModified = document.querySelector("#lastModified");

    if (lastModified) {
      lastModified.innerHTML = `<span class="highlight2">${formattedDateTime}</span>`; // using formatted date-time
    }
  }

  // Function to store the current local date, time, and username based on User Agent
  function storeAccessInfo() {
    const currentDateTime = new Date().toLocaleString(); // Get current local date and time
    const userId = getUserId() || "Guest"; // Retrieve user ID or default to 'Guest'

    // Retrieve existing access times from local storage
    const accessTimes = JSON.parse(localStorage.getItem("accessTimes")) || [];

    // Add the current date, time, user ID to the array
    accessTimes.push({ dateTime: currentDateTime, userId: userId });

    // Store the updated array back in local storage
    localStorage.setItem("accessTimes", JSON.stringify(accessTimes));
  }

  // Function to retrieve user ID from cookies or query parameters
  function getUserId() {
    // Check for user ID in cookies
    const cookieMatch = document.cookie.match(/userId=([^;]+)/);
    if (cookieMatch) {
      return cookieMatch[1]; // Return user ID from cookie
    }

    // Check for user ID in the query string
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("userId"); // Return user ID from query string, if it exists
  }

  // Call the function when the page loads
  storeAccessInfo();
  logLastAccess();

  // Function to log all access times and user IDs
  function logLastAccess() {
    const accessTimes = JSON.parse(localStorage.getItem("accessTimes")) || [];

    if (accessTimes.length > 0) {
      accessTimes.forEach((entry, index) => {
        // console.log(`Access #${index + 1}: ${entry.dateTime}, User ID: ${entry.userId}`);
      });
    } else {
      // console.log('This is your first visit.');
    }
  }

  hamburgerMenuToggle();
  setCurrentYear();
  setLastModifiedDate();

  storeAccessInfo();
  logLastAccess();
});
