// foodTemplate.mjs
// - Creates the foodTemplate for individual food item display.
// - Defines the FoodList class, which takes in the category, dataSource, and listElement.
// - Includes the init function to render the food list.

import { renderListWithTemplate } from "./utils.mjs";


// Function for creating the food template
function foodTemplate(foodItems) {
    // debugger;

    // If foodItems is an array
    if (Array.isArray(foodItems)) {
        return foodItems.map((item) => {
            // console.log(item);
            return `<li class="food-items">
                        <img id="${item.id}" src="${item.image}" alt="${item.title}">
                        ${item.title}                        
                        
                    </li>`;
        }).join("");  // Joining the array into a single string
    }
    // AI helped here...
    // If foodItems is an object (convert object values to an array and map)
    else if (typeof foodItems === "object" && foodItems !== null) {
        // Convert object values to an array and map
        const items = Object.values(foodItems);  // This converts the object into an array of values
        return items.map((item) => {
            return `<li class="food-items">
                        ${item.title}
                        <img id="${item.id}" src="${item.image}" alt="${item.title}">
                    </li>`;
        }).join("");  // Joining the array into a single string
    }

    // If it's neither an array nor an object
    else {
        // console.error("foodItems is neither an array nor an object:", foodItems);
        return;
    }
}




export default class FoodList {
    // Make the ProductListing class as flexible and reusable by passing in category, dataSource, and listElement.
    constructor(title, dataSource, listElement) {
        this.title = title;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    // Use init function to initialize and grab the dataSource using the getData function from ProductData class.
    async init() {
        // debugger;
        try {
            const foodlist = await this.dataSource.getData(this.title);

            // Render list of food items here...
            this.renderList(foodlist);

            // // Set the title of the page to the category
            if (document.title === null || document.title === "") {
                return
            }

            // Dynamically set title
            document.title = `${this.title.charAt(0).toUpperCase() + this.title.slice(1)} - Food List`;
        } catch {
            console.error("Error fetching food data.", error);
            this.listElement.innerHTML = "<p>Failed to load food items. Please try again later.</p>";
        }

    }

    renderList(foodlist) {
        // debugger;
        // AI helped here...
        // Check if foodlist is an array and has items
        if (Array.isArray(foodlist) && foodlist.length > 0) {
            renderListWithTemplate(foodTemplate, this.listElement, foodlist);
        }
        // Check if foodlist is an object and has the expected properties (e.g., title, image)
        else if (typeof foodlist === "object" && foodlist !== null && Object.keys(foodlist).length > 0) {
            // Assuming `foodlist` is an object, convert it to an array of its values
            const items = Object.values(foodlist);

            // Now items is an array, so we can safely call renderListWithTemplate
            renderListWithTemplate(foodTemplate, this.listElement, items);
        }
        // If it's neither an array nor a valid object
        else {
            this.listElement.innerHTML = "<p>No food items available.</p>";
        }
    }


}