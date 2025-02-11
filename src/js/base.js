document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu click event
  const hamburgerBtn = document.querySelector("#menu");
  const navigationBtn = document.querySelector(".navlinks ul");

  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("open");
    navigationBtn.classList.toggle("open");
  });

  // Get the year
  const todaysDate = new Date();
  const dateFormat = { year: "numeric", month: "short", day: "numeric" };
  const timeFormat = todaysDate.toLocaleTimeString();
  const formattedDate = todaysDate.toLocaleDateString("en-US", dateFormat);
  const formattedDateTime = formattedDate + " " + timeFormat;

  const timestamp = document.querySelector("#timestamp");

  // Set the current year for all elements with class 'currentyear'
  const yearElements = document.querySelectorAll(".currentyear");
  yearElements.forEach((element) => {
    element.textContent = todaysDate.getFullYear(); // simplified approach
  });

  const lastModified = document.querySelector("#lastModified");
  lastModified.innerHTML = `<span class="highlight2">${formattedDateTime}</span>`; // using formatted date-time

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

  // Email validation logic
  const form = document.querySelector("form");
  const email = document.querySelector("#email");
  const emailError = document.querySelector("#email + span.error");

  // List of valid email domains
  const validDomains = [
    "@gmail.com",
    "@yahoo.com",
    "@outlook.com",
    "@info.com",
    "@hotmail.com",
  ];

  function showError() {
    // Reset previous error
    emailError.textContent = "";

    // Check for validity issues
    if (email.validity.valueMissing) {
      emailError.textContent = "Please enter an email address.";
    } else if (email.validity.typeMismatch) {
      emailError.textContent = "Please enter a valid email address.";
    } else if (email.validity.tooShort) {
      emailError.textContent = `Email should be at least ${email.minLength} characters.`;
    } else if (!validDomains.some((domain) => email.value.endsWith(domain))) {
      emailError.textContent =
        "Please enter a valid email domain (e.g., @gmail.com).";
    }

    // If there is an error, add the 'shake' class
    if (emailError.textContent) {
      email.classList.add("shake");
      emailError.classList.add("active", "shake");
    } else {
      email.classList.remove("shake");
      emailError.classList.remove("active", "shake");
    }
  }

  // Listen for input events on the email field
  email.addEventListener("input", showError);

  form.addEventListener("submit", (event) => {
    // If the email field is invalid, show error and prevent form submission
    if (!email.validity.valid || emailError.textContent) {
      showError();
      event.preventDefault();
    }
  });

  // Remove shake effect after animation ends
  email.addEventListener("animationend", () => {
    email.classList.remove("shake");
  });
});
