// exerciseList.js
// List at least TBA data points from the exerAPI

import { fetchExerciseData, fetchExerciseAPI } from "./exercise.mjs";
import ExerciseList from "./exerciseTemplate.mjs";
import {
  getLocalStorage,
  qs,
  setLocalStorage,
  removeHtmlTags,
  getIsLocalJsonFromStorage,
} from "./utils.mjs";

import { checkSignup } from "./app.mjs";

const modal = qs("#exerciseModal");
const closeModalBtn = qs("#closeModal");
// Get the exercise container where exercise items will be rendered
const exerciseContainer = qs("#exercise-container");

// Get the selection for body parts
const bodyPartSelect = qs("#bodyPartSelect");

// Close the modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

let isLocalJson = getIsLocalJsonFromStorage();
let bodyPart = ""; // default value
let isExerDataFetched = false; // Avoid user from fetching API repeatedly

bodyPartSelect.addEventListener("change", (event) => {
  // debugger;
  isExerDataFetched = false;
  const clickedEl = event.target;
  if (clickedEl && clickedEl.tagName === "SELECT") {
    bodyPart = clickedEl.value;
    if (bodyPart === "") {
      alert("Please select a body part.");
    } else {
      alert("Body Part: " + bodyPart);
    }

    // const exerData = await fetchExerciseData(bodyPart);
  }
});

// Capture the exercise Id here when user clicked on the exercise image
exerciseContainer.addEventListener("click", async (event) => {
  // debugger;
  let exercise = "";
  const clickedEl = event.target;

  if (clickedEl && clickedEl.tagName === "LI" && clickedEl.id) {
    const exerciseId = clickedEl.id;

    try {
      if (isLocalJson) {
        alert("fetchExerciseData invoked");
        await fetchExerciseData(bodyPart);
        // Assign the contents of local storage to exercise variable
        exercise = getLocalStorage("exerLocal");
      } else {
        const fetchedExercise = await fetchExerciseAPI(bodyPart);
        alert("fetchExerciseAPI invoked");
        // Save it in local storage for later processing
        setLocalStorage("exerAPI", fetchedExercise);
        // Assign the contents of local storage to exercise variable
        exercise = getLocalStorage("exerAPI");
      }
    } catch (error) {
      return; // Handle the error appropriately
    }

    if (exercise) {
      // Set content for the modal
      qs("#exerciseTitle").innerHTML = `<h1>${exercise.name}</h1>`;
      // qs("#exerciseImage").src = exercise.gifUrl;

      const cleanedSummary = removeHtmlTags(exercise.instructions);
      qs("#exerciseSummary").innerHTML =
        `<br><strong>Summary:</strong> ${cleanedSummary}`;

      // Populate the instructions list
      const instructionList = qs("#exerciseInstruction");
      instructionList.innerHTML = "";

      let instructionsArray = [];

      // Check if exercise.instructions is a string or array
      if (typeof exercise.instructions === "string") {
        instructionsArray = exercise.instructions
          .split("\n")
          .map((instruction) => instruction.trim())
          .filter(Boolean);
      } else if (Array.isArray(exercise.instructions)) {
        instructionsArray = exercise.instructions;
      }

      instructionsArray.forEach((instruction) => {
        const listItem = document.createElement("li");
        listItem.textContent = removeHtmlTags(instruction);
        instructionList.appendChild(listItem);
      });

      // Display the modal
      modal.style.display = "block";
    }
  }

  // Close the modal when clicking anywhere outside
  window.addEventListener("click", (event) => {
    const modal = qs("#exerciseModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
// debugger;
// Create new exercise list instance
const exerList = new ExerciseList("exercise", null, exerciseContainer);

// Button for fetching exercise data
const fetchExerciseBtn = qs("#fetchExercise");

// Hide or show selection; If external API is used show it; If local json data, hide it

if (isLocalJson) {
  bodyPartSelect.classList.add("hide");
} else {
  bodyPartSelect.classList.remove("hide");
}

fetchExerciseBtn.addEventListener("click", async () => {
  // debugger;
  let exerciseData, exerAPI;

  // Check if API data was fetched already
  if (isExerDataFetched) {
    alert("Data has already been fetched. No need to fetch it again.");
    return;
  }

  // Check whether exerLocal or exerAPI is available from local storage
  if (getLocalStorage("exerLocal") && isLocalJson === true) {
    fetchExerciseBtn.textContent = "Show exerLocal";

    exerciseData = await fetchExerciseData(bodyPart);
    exerciseData = getLocalStorage("exerLocal");

    isExerDataFetched = true;
  } else if (!getLocalStorage("exerLocal")) {
    // Fetch from API if no local data exists
    exerciseData = await fetchExerciseData(bodyPart);
  }

  if (getLocalStorage("exerAPI") && isLocalJson === false) {
    fetchExerciseBtn.textContent = "Show exerAPI";
    if (bodyPart === "") {
      alert("Please select a body part.");
    } else {
      exerAPI = await fetchExerciseAPI(bodyPart);
      exerAPI = getLocalStorage("exerAPI");

      isExerDataFetched = true;
    }
  } else if (!getLocalStorage("exerAPI")) {
    if (bodyPart === "") {
      alert("Please select a body part.");
    } else {
      // Fetch from API if no local data exists
      exerAPI = await fetchExerciseAPI(bodyPart);

      isExerDataFetched = true;
    }
  }

  // Parse exercise data for rendering purposes
  let parsedExerciseData;
  if (exerciseData) {
    parsedExerciseData =
      typeof exerciseData === "string"
        ? JSON.parse(exerciseData)
        : exerciseData;
  }

  if (exerAPI) {
    parsedExerciseData =
      typeof exerAPI === "string" ? JSON.parse(exerAPI) : exerAPI;
  }

  if (parsedExerciseData) {
    exerList.renderList(parsedExerciseData);
  } else {
    // Handle no data scenario
    return;
  }

  checkExerDataFetch(isExerDataFetched);
});

function checkExerDataFetch(isExerDataFetched) {
  if (isExerDataFetched) {
    alert("Data was successfully fetched.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Check if user has signed up; If yes, show the welcome screen; otherwise, hide it
  checkSignup();
});
