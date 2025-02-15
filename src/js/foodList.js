import { fetchFoodData, fetchFoodAPI } from "./food.mjs";
import FoodList from "./foodTemplate.mjs";
import { getLocalStorage, qs } from "./utils.mjs";


// Get the food container where food items will be rendered
const foodContainer = qs("#food-container");

// Create new food list instance
const foodList = new FoodList("food", null, foodContainer);

// Button for fetching local data
const fetchFoodLocalBtn = qs("#fetchFoodLocal");
fetchFoodLocalBtn.addEventListener("click", () => {
    debugger;
    const foodData = getLocalStorage("foodLocal");

    let parsedFoodData;
    if (typeof foodData === "string") {
        parsedFoodData = JSON.parse(foodData);
    } else {
        parsedFoodData = foodData;
    }


    if (parsedFoodData) {
        foodList.renderList(parsedFoodData);
    } else {
        console.log("No data available in local storage");
    }
});
