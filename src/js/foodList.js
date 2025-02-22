// foodList.js
// List at least 9 data points from the foodAPI
// 1) title 2) image 3) healthScore 4) pricePerServing 5) readyInMinutes
// 6) servings 7) summary 8) ingredients 9) instructions
import {
  fetchFoodData,
  fetchFoodAPI,
  fetchRecipeData,
  fetchRecipeAPI,
} from "./food.mjs";

import FoodList from "./foodTemplate.mjs";

import {
  getLocalStorage,
  qs,
  setLocalStorage,
  removeHtmlTags,
  getIsLocalJsonFromStorage,
} from "./utils.mjs";

import { checkSignup } from "./app.mjs";

const modal = qs("#recipeModal");
const closeModalBtn = qs("#closeModal");
// Get the food container where food items will be rendered
const foodContainer = qs("#food-container");
let foodPrompt = qs("#foodPrompt");

// Close the modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
// debugger;
let isLocalJson = getIsLocalJsonFromStorage();
let isFoodDataFetched = false; // Avoid user from fetching API repeatedly

// Capture the recipe Id here when user clicked on the recipe image
foodContainer.addEventListener("click", async (event) => {
  // debugger;
  let recipe = "";

  const clickedEl = event.target;
  if (clickedEl) {
    isFoodDataFetched = false;

    if (clickedEl.tagName === "IMG" && clickedEl.id) {
      const foodId = clickedEl.id;
      // console.log("Food ID: ", foodId);
      try {
        // Pass in the food item id to fetch the recipe information
        if (isLocalJson) {
          // alert("fetchRecipeData invoked");

          await fetchRecipeData(foodId);
          // Assign the contents of local storage to recipe variable
          recipe = getLocalStorage("recipeLocal");
        } else {
          const fetchedRecipe = await fetchRecipeAPI(foodId);
          // Save it in local storage for later processing
          // alert("fetchRecipeAPI invoked");
          setLocalStorage("recipeAPI", fetchedRecipe);
          // Assign the contents of local storage to recipe variable
          recipe = getLocalStorage("recipeAPI");
        }
      } catch (error) {
        // console.error("Failed to fetch recipe: ", error);
        return;
      }

      if (recipe) {
        // Set content for the modal
        qs("#recipeTitle").innerHTML = `<h1>${recipe.title}</h1>`;
        qs("#recipeImage").src = recipe.image;
        qs("#healthScore").innerHTML =
          `<strong>Health Score:</strong> ${recipe.healthScore}`;
        qs("#pricePerServing").innerHTML =
          `<strong>Price per Serving:</strong> ${recipe.pricePerServing}`;
        qs("#readyInMinutes").innerHTML =
          `<strong>Ready in Minutes:</strong> ${recipe.readyInMinutes}`;
        qs("#servings").innerHTML =
          `<strong>Servings:</strong> ${recipe.servings}`;

        const cleanedSummary = removeHtmlTags(recipe.summary);
        qs("#recipeSummary").innerHTML =
          `<br><strong>Summary:</strong> ${cleanedSummary}`;

        // qs("#recipeInstruction").textContent = recipe.instructions;
        // debugger;
        // Populate the ingredients list
        const ingredientList = qs("#ingredientList");
        ingredientList.innerHTML = "";

        recipe.extendedIngredients.map((ingredient) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${ingredient.original}`;

          ingredientList.appendChild(listItem);
        });
        // AI helped here...
        // Populate the instructions list
        const instructionList = qs("#recipeInstruction");
        instructionList.innerHTML = "";

        // Check if recipe.instructions is a string and convert it to an array if necessary
        let instructionsArray = [];

        if (typeof recipe.instructions === "string") {
          // If it's a string, split it by newline or other delimiter into an array
          instructionsArray = recipe.instructions
            .split("\n")
            .map((instruction) => instruction.trim())
            .filter(Boolean);
        } else if (Array.isArray(recipe.instructions)) {
          // If it's already an array, just use it
          instructionsArray = recipe.instructions;
        }

        // Loop through the instructions and create list items
        instructionsArray.forEach((instruction) => {
          const listItem = document.createElement("li");
          listItem.textContent = removeHtmlTags(instruction);
          instructionList.appendChild(listItem);
        });

        // Display the modal
        modal.style.display = "block";
      }
    }
  }

  // Close the modal when clicking anywhere outside
  window.addEventListener("click", (event) => {
    const modal = qs("#recipeModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// function openModal(recipe) {

// }

// Create new food list instance
const foodList = new FoodList("food", null, foodContainer);

// Button for fetching food data
const fetchFoodBtn = qs("#fetchFood");

fetchFoodBtn.addEventListener("click", () => {
  // debugger;
  let foodData, foodAPI;

  // Check if API data was fetched already
  if (isFoodDataFetched) {
    foodPrompt.textContent = "Data has already been fetched.";
    // alert("Data has already been fetched. No need to fetch it again.");
    return;
  }

  // Check whether foodLocal or foodAPI is available from local storage. Also, check for isLocalJson value.
  if (getLocalStorage("foodLocal") && isLocalJson === true) {
    // fetchFoodBtn.textContent = "Show foodLocal";
    foodData = getLocalStorage("foodLocal");
    isFoodDataFetched = true;
  } else if (!getLocalStorage("foodLocal")) {
    fetchFoodData();
    isFoodDataFetched = true;
  }

  if (getLocalStorage("foodAPI") && isLocalJson === false) {
    // fetchFoodBtn.textContent = "Show foodAPI";
    foodAPI = getLocalStorage("foodAPI");
    isFoodDataFetched = true;
  } else if (!getLocalStorage("foodAPI")) {
    fetchFoodAPI();
    isFoodDataFetched = true;
  }

  // Parse food data for rendering purposes
  let parsedFoodData;
  if (foodData) {
    // Check if the data is a string and needs to be parsed
    if (typeof foodData === "string" && foodData !== undefined) {
      parsedFoodData = JSON.parse(foodData);
    } else {
      parsedFoodData = foodData; // it's already an object, so no need to parse
    }
  }

  if (foodAPI) {
    if (typeof foodAPI === "string" && foodAPI !== undefined) {
      parsedFoodData = JSON.parse(foodAPI);
    } else {
      parsedFoodData = foodAPI; // it's already an object, so no need to parse
    }
  }

  if (parsedFoodData) {
    foodList.renderList(parsedFoodData);
  } else {
    // console.log("No data available in local storage");
    return;
  }

  checkFoodDataFetch(isFoodDataFetched);
});

function checkFoodDataFetch(isFoodDataFetched) {
  if (isFoodDataFetched) {
    foodPrompt.textContent = "Data was successfully fetched.";
    // alert("Data was successfully fetched.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Check if user has signed up; If yes, show the welcome screen; otherwise, hide it
  checkSignup();
});
