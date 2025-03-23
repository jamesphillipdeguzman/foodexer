document.addEventListener("DOMContentLoaded", () => {
  function hamburgerMenuToggle() {
    // debugger;

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
    // debugger;
    // Get the year
    const todaysDate = new Date();
    // Set the current year for all elements with class 'currentyear'
    const yearElements = document.querySelectorAll(".currentyear");
    yearElements.forEach((element) => {
      element.textContent = todaysDate.getFullYear(); // simplified approach
    });
  }

  function setLastModifiedDate() {
    const lastModifiedDate = document.lastModified; // Get the last modified date of the document
    const dateFormat = { year: "numeric", month: "short", day: "numeric" }; // Format for the date
    const timeFormat = lastModifiedDate.toLocaleTimeString(); // Get time in the user's locale
    const formattedDate = lastModifiedDate.toLocaleDateString("en-US", dateFormat); // Format date as "Feb 21, 2025"
    const formattedDateTime = `${formattedDate} ${timeFormat}`; // Combine date and time

    const lastModified = document.querySelector("#lastModified"); // Get the element to display the last modified date

    if (lastModified) {
      lastModified.innerHTML = `<span class="highlight2">${formattedDateTime}</span>`; // Display formatted last modified date-time
    }

    // Optionally, if you want to display it elsewhere (e.g., #timestamp element)
    const timestamp = document.querySelector("#timestamp");
    if (timestamp) {
      timestamp.innerHTML = `<span class="highlight2">${formattedDateTime}</span>`;
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
