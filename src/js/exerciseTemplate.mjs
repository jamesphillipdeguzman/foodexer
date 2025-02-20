// exerciseTemplate.mjs
// - Creates the exerciseTemplate for individual exercise item display.
// - Defines the ExerciseList class, which takes in the category, dataSource, and listElement.
// - Includes the init function to render the exercise list.

import { renderListWithTemplate, toTitleCase } from "./utils.mjs";

// Function for creating the exercise template
function exerciseTemplate(exerciseItems) {
    debugger;
    // console.log("exerciseItems: ", exerciseItems);

    // If exerciseItems is an array
    if (Array.isArray(exerciseItems)) {
        return exerciseItems.map((item) => {
            return `<div class="exercise-box">
                        <li class="exercise-items">
                            ${item}
                        </li>
                    </div>`;
        }).join("");  // Joining the array into a single string
    }
    // If exerciseItems is an object (convert object values to an array and map)
    else if (typeof exerciseItems === "object" && exerciseItems !== null) {
        // Object.entries will give us an array of [key, value] pairs
        const items = Object.entries(exerciseItems);
        return items.map(([key, item]) => {
            const formattedKey = toTitleCase(key);
            return `<div class="exercise-box">
                        <li class="exercise-items">
                            <strong>${formattedKey}:</strong> ${item}
                        </li>
                    </div>`;
        }).join("");  // Joining the array into a single string
    }

    // If it's neither an array nor an object
    else {
        return "<p>No exercise data available.</p>";
    }
}

// ExerciseList class for rendering exercise data
export default class ExerciseList {
    constructor(title, dataSource, listElement) {
        this.title = title;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    // Use init function to initialize and grab the dataSource
    async init() {


        try {
            debugger;
            const exerciseList = await this.dataSource.getData(this.title);
            console.log("exerciseList: ", exerciseList)
            // Render list of exercise items here...
            this.renderList(exerciseList);

            // Dynamically set the page title
            if (document.title === null || document.title === "") {
                return;
            }

            document.title = `${this.title.charAt(0).toUpperCase() + this.title.slice(1)} - Exercise List`;
        } catch (error) {
            console.error("Error fetching exercise data:", error);
            this.listElement.innerHTML = "<p>Failed to load exercise items. Please try again later.</p>";
        }
    }

    renderList(exerciseList) {
        debugger;
        // Check if exerciseList is an array and has items
        if (Array.isArray(exerciseList) && exerciseList.length > 0) {
            renderListWithTemplate(exerciseTemplate, this.listElement, exerciseList);
        }
        // Check if exerciseList is an object and has the expected properties (e.g., title, image)
        else if (typeof exerciseList === "object" && exerciseList !== null && Object.keys(exerciseList).length > 0) {
            // Assuming `exerciseList` is an object, convert it to an array of its values
            const items = Object.values(exerciseList);
            // Now items is an array, so we can safely call renderListWithTemplate
            renderListWithTemplate(exerciseTemplate, this.listElement, items);
        }
        // If it's neither an array nor a valid object
        else {
            this.listElement.innerHTML = "<p>No exercise items available.</p>";
        }
    }
}
