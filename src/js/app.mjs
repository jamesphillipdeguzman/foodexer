import { fetchFoodData, fetchFoodAPI } from "./food.mjs";
import { fetchExerciseData, fetchExerciseAPI } from "./exercise.mjs";

// export const chooseActivity = document.querySelector("#choose-activity");
export const myActivity = document.querySelector("pre");
// Local JSON data (cached for testing purposes)
export let fetchedData = document.querySelector("#fetched-data");
// Update the URL query string withouth reloading the page
export const currentUrl = new URL(window.location.href);
// Update global variable for activity
export let activity = "";

export let isLocalJson = true;


export function handleCardClick(isLocalJson) {
  console.log("isLocalJson: ", isLocalJson);
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

  // Add the event listener for card clicks
  cardContainer.addEventListener("click", cardClickHandler);

}

document.addEventListener("DOMContentLoaded", () => {

  const checkLocalJson = document.querySelector("#localjson-check");

  // Listen when the checkbox is ticked or not by the user
  checkLocalJson.addEventListener("click", () => {

    isLocalJson = checkLocalJson.checked;
    handleCardClick(isLocalJson);

    // Reload the page if the checkbox is checked
    if (checkLocalJson.checked) {
      window.location.reload();
    }

  });
  // Call the function to handle card clicks
  handleCardClick(isLocalJson);

});


