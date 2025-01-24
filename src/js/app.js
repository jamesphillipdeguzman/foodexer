import { fetchFoodData, fetchFoodAPI } from "./food.mjs";
import { fetchExerciseData, fetchExerciseAPI } from "./exercise.mjs";

export const chooseActivity = document.querySelector("#choose-activity");
export const myActivity = document.querySelector("pre");
export const activity = chooseActivity.value;
// Local JSON data (cached for testing purposes)
export let fetchedData = document.querySelector("#fetched-data");


document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector("#submit-button");
  const checkLocalJson = document.querySelector("#localjson-check");

  let isLocalJson = checkLocalJson.checked;

  // Listen when the checkbox is ticked or not by the user
  checkLocalJson.addEventListener("change", () => {
    isLocalJson = checkLocalJson.checked;

    // console.log(isLocalJson);
  });

  // Event listener for recipe change
  submitButton.addEventListener("click", (event) => {
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
