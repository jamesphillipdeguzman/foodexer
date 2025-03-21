// food.mjs
// Contains both local JSON and External APIs
// Local JSON: 1) fetchFoodData 2) fetchRecipeData
// External APIs 1) fetchFoodAPI 2) fetchRecipeAPI

import { fetchedData, handleCardClick } from "./app.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Global timeout Id that can be cleared each time
let timeoutId;
// This function grabs the the food local json data asynchronously
const myActivity = document.querySelector("pre");
export async function fetchFoodData() {
  // debugger;
  if (myActivity) {

    myActivity.innerHTML = "";

    timeoutId = setTimeout(() => {
      myActivity.innerHTML = `Loading food json...`;
    }, 500);

  }


  try {

    // Local json for food
    let url = "/json/food.json";
    // Convert promise to a response object
    const response = await fetch(url);

    // Check if response returned between 200-299, otherwise, throw error of "Data not found"
    if (response.ok) {
      const data = await response.json();
      const foodData = data;
      // Display it in the console
      // alert(foodData);
      // debugger;
      console.log("FoodData: ", foodData);
      // Only run this if food key was not found in localstorage
      if (!getLocalStorage("foodLocal") || getLocalStorage("foodLocal").length === 0) {
        setLocalStorage("foodLocal", foodData);

      }

      clearTimeout(timeoutId);
      if (myActivity) {
        myActivity.innerHTML = "";
        // Display results on the HTML page
        myActivity.innerHTML = JSON.stringify(foodData, null, 2);
      }

      // Determine if local data or API was fetched
      // fetchedData.textContent = "You fetched a local JSON data";
    } else {
      console.log("Data not found");
    }
    // Catch other errors here...
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }

}

// List of Third-Party APIs from https://rapidapi.com/

// Async function to fetch JSON and display the food content
export async function fetchFoodAPI() {
  if (myActivity) {
    myActivity.innerHTML = "";

    timeoutId = setTimeout(() => {
      myActivity.innerHTML = `Loading food API...`;
    }, 500);

  }



  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  // const apiUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?limitLicense=false&offset=0&number=10&minIron=0&minCalcium=0&maxVitaminB2=1000&maxMagnesium=1000&minPotassium=0&maxVitaminB6=1000&intolerances=peanut%2C%20shellfish&maxVitaminB5=1000&minFolicAcid=0&minVitaminA=0&maxSodium=1000&maxSugar=1000&maxVitaminA=5000&maxFluoride=1000&minFluoride=0&minVitaminB1=0&minCholine=0&ranking=2&minFat=5&maxVitaminB1=1000&minVitaminB12=0&maxSelenium=1000&minZinc=0&minFolate=0&maxManganese=1000&maxVitaminB12=1000&maxPotassium=1000&maxIron=1000&minSelenium=0&minVitaminK=0&maxFiber=1000&minSodium=0&maxCopper=1000&minCalories=150&maxCholine=1000&minCholesterol=0&maxVitaminE=1000&minProtein=5&minVitaminB3=0&minVitaminB6=0&maxIodine=1000&excludeIngredients=coconut%2C%20mango&maxProtein=100&minMagnesium=0&minCarbs=5&cuisine=american&maxCaffeine=1000&maxSaturatedFat=50&maxVitaminK=1000&minAlcohol=0&minIodine=0&query=burger&minSaturatedFat=0&includeIngredients=onions%2C%20lettuce%2C%20tomato&minVitaminE=0&maxCalcium=1000&minFiber=0&minVitaminC=0&maxZinc=1000&maxCalories=1500&maxAlcohol=1000&minPhosphorus=0&minVitaminD=0&minVitaminB2=0&minSugar=0&maxFolate=1000&type=main%20course&maxCholesterol=1000&maxVitaminB3=1000&minCaffeine=0&minVitaminB5=0&maxFolicAcid=1000&maxCarbs=100&maxVitaminD=1000&equipment=pan&maxFat=100&minCopper=0&maxVitaminC=1000&maxPhosphorus=1000&minManganese=0';
  const apiUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=side%20salad&diet=vegetarian&intolerances=gluten&includeIngredients=cheese%2Cnuts&excludeIngredients=eggs&instructionsRequired=true&fillIngredients=false&addRecipeInformation=false&addRecipeInstructions=false&addRecipeNutrition=false&maxReadyTime=45&ignorePantry=true&sort=max-used-ingredients&offset=0&number=100';


  const url = proxyUrl + apiUrl; // Combine proxy and API URLs

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '5f36438cdfmsh35b8aa8adc1d663p1d319cjsn3b4817b74143',
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  try {
    // const response = await fetch(url, options); // Uncomment if you are having issues with CORS policy
    const response = await fetch(apiUrl, options);
    const result = await response.json();  // Assuming the response is in JSON format
    // alert(result);
    // console.log(result);
    const foodResult = result;
    // debugger;
    console.log("FoodAPI: ", foodResult);
    // Only run this if food key was not found in localstorage
    if (!getLocalStorage("foodAPI") || getLocalStorage("foodAPI").length === 0) {
      setLocalStorage("foodAPI", foodResult);
    }

    clearTimeout(timeoutId);
    myActivity.innerHTML = "";
    // Display result in pre tag
    myActivity.innerHTML = JSON.stringify(foodResult, null, 2);
    // Determine if local data or API was fetched
    // fetchedData.textContent = "You fetched a Third-party API";
  } catch (error) {
    // alert('Error:', error);
    console.log(`Error: ${error.message}`);
  }
}


// This function grabs the the food local json data asynchronously

export async function fetchRecipeData(foodId) {
  debugger;
  if (myActivity) {

    myActivity.innerHTML = "";

    timeoutId = setTimeout(() => {
      myActivity.innerHTML = `Loading recipe json...`;
    }, 500);

  }


  try {

    // Local json for food
    let url = "/json/recipe.json";
    // Convert promise to a response object
    const response = await fetch(url);

    // Check if response returned between 200-299, otherwise, throw error of "Data not found"
    if (response.ok) {
      const data = await response.json();
      const recipeData = data;
      // Display it in the console
      // alert(recipeData);
      // debugger;
      console.log("RecipeData: ", recipeData);
      // Find the recipe with a matching id
      const matchingRecipe = recipeData.find(recipe => parseInt(foodId) === recipe.id);

      // If matching recipe is found, save it to localStorage
      if (matchingRecipe && (!getLocalStorage("recipeLocal") || getLocalStorage("recipeLocal").length === 0)) {
        setLocalStorage("recipeLocal", matchingRecipe);
      } else {
        setLocalStorage("recipeLocal", matchingRecipe);
      }

      clearTimeout(timeoutId);
      if (myActivity) {
        myActivity.innerHTML = "";
        // Display results on the HTML page
        myActivity.innerHTML = JSON.stringify(recipeData, null, 2);
      }

      // Determine if local data or API was fetched
      // fetchedData.textContent = "You fetched a local json data";
    } else {
      console.log("Data not found");
    }
    // Catch other errors here...
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }

}


// Async function to fetch JSON and display the recipe information
export async function fetchRecipeAPI(foodId) {
  // debugger;
  if (myActivity) {
    myActivity.innerHTML = "";
    timeoutId = setTimeout(() => {
      myActivity.innerHTML = `Loading food recipe API...`;
    }, 500);
  }


  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  // const apiUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?limitLicense=false&offset=0&number=10&minIron=0&minCalcium=0&maxVitaminB2=1000&maxMagnesium=1000&minPotassium=0&maxVitaminB6=1000&intolerances=peanut%2C%20shellfish&maxVitaminB5=1000&minFolicAcid=0&minVitaminA=0&maxSodium=1000&maxSugar=1000&maxVitaminA=5000&maxFluoride=1000&minFluoride=0&minVitaminB1=0&minCholine=0&ranking=2&minFat=5&maxVitaminB1=1000&minVitaminB12=0&maxSelenium=1000&minZinc=0&minFolate=0&maxManganese=1000&maxVitaminB12=1000&maxPotassium=1000&maxIron=1000&minSelenium=0&minVitaminK=0&maxFiber=1000&minSodium=0&maxCopper=1000&minCalories=150&maxCholine=1000&minCholesterol=0&maxVitaminE=1000&minProtein=5&minVitaminB3=0&minVitaminB6=0&maxIodine=1000&excludeIngredients=coconut%2C%20mango&maxProtein=100&minMagnesium=0&minCarbs=5&cuisine=american&maxCaffeine=1000&maxSaturatedFat=50&maxVitaminK=1000&minAlcohol=0&minIodine=0&query=burger&minSaturatedFat=0&includeIngredients=onions%2C%20lettuce%2C%20tomato&minVitaminE=0&maxCalcium=1000&minFiber=0&minVitaminC=0&maxZinc=1000&maxCalories=1500&maxAlcohol=1000&minPhosphorus=0&minVitaminD=0&minVitaminB2=0&minSugar=0&maxFolate=1000&type=main%20course&maxCholesterol=1000&maxVitaminB3=1000&minCaffeine=0&minVitaminB5=0&maxFolicAcid=1000&maxCarbs=100&maxVitaminD=1000&equipment=pan&maxFat=100&minCopper=0&maxVitaminC=1000&maxPhosphorus=1000&minManganese=0';
  const apiUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${foodId}/information`;


  const url = proxyUrl + apiUrl; // Combine proxy and API URLs

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '5f36438cdfmsh35b8aa8adc1d663p1d319cjsn3b4817b74143',
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  try {
    // const response = await fetch(url, options); // Uncomment if you are having issues with CORS policy
    const response = await fetch(apiUrl, options);
    const result = await response.json();  // Assuming the response is in JSON format
    // alert(result);
    console.log(result);
    const recipeResult = result;

    setLocalStorage("recipeAPI", recipeResult);

    clearTimeout(timeoutId);
    if (myActivity) {
      myActivity.innerHTML = "";
      // Display result in pre tag
      myActivity.innerHTML = JSON.stringify(recipeResult, null, 2);
    }

    if (fetchedData) {
      // Determine if local data or API was fetched
      // fetchedData.textContent = "You fetched a Third-party API";
    }
    return recipeResult;



  } catch (error) {
    console.log('Error:', error);
    if (myActivity) {
      myActivity.innerHTML = `Error: ${error.message}`;
    }

  }
}