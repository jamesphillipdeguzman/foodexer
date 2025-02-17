import { fetchFoodData, fetchFoodAPI, fetchRecipeData, fetchRecipeAPI } from "./food.mjs";
// import { isLocalJson } from "./app.mjs";
import FoodList from "./foodTemplate.mjs";
import {
  getLocalStorage,
  qs,
  setLocalStorage,
  removeHtmlTags,
  getIsLocalJsonFromStorage
} from "./utils.mjs";

const modal = qs("#recipeModal");
const closeModalBtn = qs("#closeModal");
// Get the food container where food items will be rendered
const foodContainer = qs("#food-container");

// Close the modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
debugger;
let isLocalJson = getIsLocalJsonFromStorage();

// Capture the recipe Id here when user clicked on the recipe image
foodContainer.addEventListener("click", async (event) => {
  debugger;
  let recipe = "";


  const clickedEl = event.target;
  if (clickedEl.tagName === "IMG" && clickedEl.id) {
    const foodId = clickedEl.id;
    // console.log("Food ID: ", foodId);
    try {
      // Pass in the food item id to fetch the recipe information
      if (isLocalJson) {
        alert("fetchRecipeData invoked");
        const fetchedRecipe = await fetchRecipeData(foodId);
        setLocalStorage("recipeLocal", fetchedRecipe);
        // Assign the contents of local storage to recipe variable
        recipe = getLocalStorage("recipeLocal");

      } else {
        const fetchedRecipe = await fetchRecipeAPI(foodId);
        // Save it in local storage for later processing
        alert("fetchRecipeAPI invoked");
        setLocalStorage("recipeAPI", fetchedRecipe);
        // Assign the contents of local storage to recipe variable
        recipe = getLocalStorage("recipeAPI");
      }


    } catch (error) {
      // console.error("Failed to fetch recipe: ", error);
      return;
    }
    // Set content for the modal
    qs("#recipeTitle").textContent = recipe.title;
    qs("#recipeImage").src = recipe.image;
    const cleanedSummary = removeHtmlTags(recipe.summary);
    qs("#recipeSummary").textContent = cleanedSummary;

    // qs("#recipeInstruction").textContent = recipe.instructions;

    // Populate the ingredients list
    const ingredientList = qs("#ingredientList");
    // ingredientList.innerHTML = "";
    // recipe.extendedIngredients.forEach(ingredient => {
    //     const listItem = document.createElement("li");
    //     listItem.textContent = ingredient;
    //     ingredientList.appendChild(listItem);
    // });
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
  debugger;
  let foodData, foodAPI;
  // Check whether foodLocal or foodAPI is available from local storage. Also, check for isLocalJson value.
  if (getLocalStorage("foodLocal") && isLocalJson === true) {
    fetchFoodBtn.textContent = "Show foodLocal";
    foodData = getLocalStorage("foodLocal");

  } else if (!getLocalStorage("foodLocal") && isLocalJson === true) {
    fetchFoodData();
  }

  if (getLocalStorage("foodAPI") && isLocalJson === false) {
    fetchFoodBtn.textContent = "Show foodAPI";
    foodAPI = getLocalStorage("foodAPI");

  } else if (!getLocalStorage("foodAPI") && isLocalJson === false) {
    fetchFoodAPI();
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

});

