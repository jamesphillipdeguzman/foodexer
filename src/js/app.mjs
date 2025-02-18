import { fetchFoodData, fetchFoodAPI } from "./food.mjs";
import { fetchExerciseData, fetchExerciseAPI } from "./exercise.mjs";
import { checkIsLocalJsonState, getIsLocalJsonFromStorage } from "./utils.mjs";
// import { storeAccessInfo, getUserId, hamburgerMenuToggle, setCurrentYear, setLastModifiedDate, logLastAccess } from './base.js';



// export const chooseActivity = document.querySelector("#choose-activity");
export const myActivity = document.querySelector("pre");
// Local JSON data (cached for testing purposes)
export let fetchedData = document.querySelector(".fetched-data");
// Update the URL query string without reloading the page
export const currentUrl = new URL(window.location.href);
// Update global variable for activity
export let activity = "";



let localjsonStatus = document.querySelector("#localjson-status");

let isLocalJson = getIsLocalJsonFromStorage();

export function handleCardClick(isLocalJson) {
  console.log("isLocalJson: ", isLocalJson);

  // Use the global `isLocalJson` directly inside this function
  const localjsonStatus = document.querySelector("#localjson-status");


  // Update display with status of isLocalJson
  if (localjsonStatus) {
    localjsonStatus.textContent = "isLocalJson: " + isLocalJson;
  }

  const cardContainer = document.querySelector("#card-container");



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

document.addEventListener("DOMContentLoaded", () => {

  // hamburgerMenuToggle();
  // setCurrentYear();
  // setLastModifiedDate();
  // getUserId();
  // storeAccessInfo();

  debugger;


  if (localjsonStatus) {

    checkIsLocalJsonState();


  } else {
    console.warn("localjsonStatus element not found");
  }

  // Call the function to handle card clicks
  handleCardClick(isLocalJson);



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


  // Go to selected html page
  const cardFood = document.querySelector("#card-food");
  const cardExer = document.querySelector("#card-exer");

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

