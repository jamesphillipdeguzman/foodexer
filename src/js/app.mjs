import { fetchFoodData, fetchFoodAPI } from "./food.mjs";
import { fetchExerciseData, fetchExerciseAPI } from "./exercise.mjs";
import { checkIsLocalJsonState, getIsLocalJsonFromStorage, qs, getLocalStorage, setLocalStorage } from "./utils.mjs";


// export const chooseActivity = qs("#choose-activity");
export const myActivity = qs("pre");
// Local JSON data (cached for testing purposes)
export let fetchedData = qs(".fetched-data");
// Update the URL query string without reloading the page
export const currentUrl = new URL(window.location.href);
// Update global variable for activity
export let activity = "";



let localjsonStatus = qs("#localjson-status");

let isLocalJson = getIsLocalJsonFromStorage();

export function handleCardClick(isLocalJson) {
  console.log("isLocalJson: ", isLocalJson);

  // Use the global `isLocalJson` directly inside this function
  const localjsonStatus = qs("#localjson-status");


  // Update display with status of isLocalJson
  if (localjsonStatus) {
    localjsonStatus.textContent = "isLocalJson: " + isLocalJson;
  }

  const cardContainer = qs("#card-container");



  function cardClickHandler(event) {
    debugger;
    // Checked which card was clicked
    const clickedCard = event.target.closest('.food-card, .exer-card');
    activity = clickedCard.dataset.category;

    if (clickedCard && clickedCard.dataset && clickedCard.dataset.category) {

      if (activity === "food" && isLocalJson) {
        fetchFoodData();
      } else if (activity === "food" && !isLocalJson) {
        fetchFoodAPI();
      } else if (activity === "exercise" && isLocalJson) {
        fetchExerciseData();
      } else if (activity === "exercise" && !isLocalJson) {
        fetchExerciseAPI();
      }
    } else {
      console.error("No card clicked or incorrect element");
    }

  }

  if (cardContainer) {
    // Add the event listener for card clicks
    cardContainer.removeEventListener("click", cardClickHandler); // Remove any existing listeners first
    cardContainer.addEventListener("click", cardClickHandler);
  }

}

// Check if signup email exists in local storage
export function checkSignup() {

  let main = qs("main");
  let login = qs("#login");
  const signup = getLocalStorage("signup");

  if (signup && signup.length > 0) {
    if (login && main) {
      // Hide login if user has signed up using email
      login.style.display = "none";
      // Show the welcome content to the user
      main.classList.remove("hide");
    }


  } else {
    if (login && main) {
      // Show login to signup
      login.style.display = "flex";
      // Hide welcome content if not yet signed up
      main.classList.add("hide");
    }

  }
}

document.addEventListener("DOMContentLoaded", () => {


  debugger;

  // Check if the user has signed up with an email address
  checkSignup();


  // Testing for local json data and external API
  if (localjsonStatus) {
    checkIsLocalJsonState();
  } else {
    console.warn("localjsonStatus element not found");
  }

  // Call the function to handle card clicks
  handleCardClick(isLocalJson);



  // Email validation logic
  const form = qs("form");
  const email = qs("#email");
  const emailError = qs("#email + span.error");

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

  if (email) {
    // Listen for input events on the email field
    email.addEventListener("input", showError);
    // Remove shake effect after animation ends
    email.addEventListener("animationend", () => {
      email.classList.remove("shake");
    });
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      // If the email field is invalid, show error and prevent form submission
      if (!email.validity.valid || emailError.textContent) {
        showError();
        event.preventDefault();
      }
    });
  }

  // Listen for signup
  debugger;
  const signupBtn = qs("#signup-btn");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => handleUserSignUp(email));
  }


  function handleUserSignUp(email) {
    let userEmail = email.value;
    // alert(userEmail);
    // Save email address to local storage
    if (signupBtn) {
      // Save email address to local storage
      let signup = getLocalStorage("signup") || [];

      // Add email to the signup array
      signup.push(userEmail);

      // Save the updated array back to local storage
      setLocalStorage("signup", signup);
    }
  }

  // Go to selected html page
  const cardFood = qs("#card-food");
  const cardExer = qs("#card-exer");

  if (cardFood) {
    cardFood.addEventListener("click", () => {
      window.location.href = "/pages/food.html";
    });
  }

  if (cardExer) {
    cardExer.addEventListener("click", () => {
      window.location.href = "/pages/exercise.html";
    });
  }


});

