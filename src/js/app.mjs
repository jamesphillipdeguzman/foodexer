import { fetchFoodData, fetchFoodAPI } from "./food.mjs";
import { fetchExerciseData, fetchExerciseAPI } from "./exercise.mjs";

export const chooseActivity = document.querySelector("#choose-activity");
export const myActivity = document.querySelector("pre");
export const activity = chooseActivity.value;
// Local JSON data (cached for testing purposes)
export let fetchedData = document.querySelector("#fetched-data");

// Update the URL query string withouth reloading the page
export const currentUrl = new URL(window.location.href);
currentUrl.searchParams.get("choose-activity", activity);

// Push the updated URL to the browser history
window.history.pushState({}, "", currentUrl);


document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector("#submit-button");
  const checkLocalJson = document.querySelector("#localjson-check");

  let isLocalJson = checkLocalJson.checked;

  // Listen when the checkbox is ticked or not by the user
  checkLocalJson.addEventListener("change", () => {
    isLocalJson = checkLocalJson.checked;

    // console.log(isLocalJson);
  });

  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // debugger;

    alert(activity);

    if (activity === "food" && isLocalJson) {
      fetchFoodData();
    } else if (activity === "food" && !isLocalJson) {
      fetchFoodAPI();
    } else if (activity === "exercise" && isLocalJson) {
      fetchExerciseData();
    } else if (activity === "exercise" && !isLocalJson) {
      fetchExerciseAPI();
    }
  });
});
