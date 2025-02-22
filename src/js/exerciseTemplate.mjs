// exerciseTemplate.mjs
// - Creates the exerciseTemplate for individual exercise item display.
// - Defines the ExerciseList class, which takes in the category, dataSource, and listElement.
// - Includes the init function to render the exercise list.

// exerciseTemplate.mjs
// - Creates the exerciseTemplate for individual exercise item display.
// - Defines the ExerciseList class, which takes in the category, dataSource, and listElement.
// - Includes the init function to render the exercise list.

import { renderListWithTemplate, toTitleCase } from "./utils.mjs";

// Function for creating the exercise template for individual exercise item display
function exerciseTemplate(exerciseItems) {
    // If exerciseItems is an array, map each item into an HTML template
    if (Array.isArray(exerciseItems)) {
        return exerciseItems.map(item => `
            <div class="exercise-box">
                <li class="exercise-items">${item}</li>
            </div>
        `).join("");  // Joining the array into a single string
    }

    // If exerciseItems is an object, map each key-value pair to create list items
    if (typeof exerciseItems === "object" && exerciseItems !== null) {
        return Object.entries(exerciseItems).map(([key, item]) => {
            const formattedKey = toTitleCase(key); // Format the key to title case
            // Handling array values (like instructions, muscles, etc.)
            if (Array.isArray(item)) {
                const listItems = item.map(subItem => `<li class="sub-items">${subItem}</li>`).join("");
                return `
                    <div class="exercise-box">
                        <li class="exercise-items">
                            <strong>${formattedKey}:</strong>
                            <ol>${listItems}</ol>
                        </li>
                    </div>`;
            }

            // If the item is a gif URL (string), render it as an image
            if (formattedKey === "Gif Url" && typeof item === "string") {
                return `
                    <div class="exercise-box">
                        <li class="exercise-items">
                            <strong>${formattedKey}:</strong>
                            <img src="${item}" alt="${formattedKey}">
                        </li>
                    </div>`;
            }

            // For non-array items, simply display them as text
            return `
                <div class="exercise-box">
                    <li class="exercise-items">
                        <strong>${formattedKey}:</strong> ${item}
                    </li>
                </div>`;
        }).join("");  // Joining the array into a single string
    }

    // If neither an array nor an object, return a message
    // return "<p>No exercise data available.</p>";
    return;
}

// ExerciseList class for rendering exercise data
export default class ExerciseList {
    constructor(title, dataSource, listElement) {
        this.title = title;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    // Use init function to initialize and fetch the dataSource
    async init() {
        try {
            const exerciseList = await this.dataSource.getData(this.title);
            console.log("exerciseList: ", exerciseList);

            // Render the list of exercise items
            this.renderList(exerciseList);

            // Dynamically set the page title
            if (document.title) {
                document.title = `${toTitleCase(this.title)} - Exercise List`;
            }
        } catch (error) {
            console.error("Error fetching exercise data:", error);
            this.listElement.innerHTML = "<p>Failed to load exercise items. Please try again later.</p>";
        }
    }

    renderList(exerciseList) {
        // Ensure exerciseList is not empty
        if (Array.isArray(exerciseList) && exerciseList.length > 0) {
            renderListWithTemplate(exerciseTemplate, this.listElement, exerciseList);
        } else if (exerciseList && typeof exerciseList === "object" && Object.keys(exerciseList).length > 0) {
            renderListWithTemplate(exerciseTemplate, this.listElement, Object.values(exerciseList));
        } else {
            // Handle empty or invalid exercise data
            this.listElement.innerHTML = "<p>No exercise items available. Please try again later.</p>";
        }
    }
}
