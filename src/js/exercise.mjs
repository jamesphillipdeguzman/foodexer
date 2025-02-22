// exercise.mjs
// Contains both local JSON and External APIs
// Local JSON: 1) fetchExerciseData
// External API: 1) fetchExerciseAPI

import { activity, fetchedData, myActivity, handleCardClick } from "./app.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Global timeout Id that can be cleared each time
let timeoutId;

// Utility function to handle loading state
function showLoadingMessage(message) {
    timeoutId = setTimeout(() => {
        if (myActivity) {
            myActivity.innerHTML = `Loading ${message}...`;
        }

    }, 500);
}

// Utility function to clear the loading message
function clearLoadingMessage() {
    clearTimeout(timeoutId);
    if (myActivity) {
        myActivity.innerHTML = "";
    }
}

export async function fetchExerciseData(bodyPart) {
    // Clear any existing content if myActivity is available
    const myActivity = document.getElementById('myActivity');
    const fetchedData = document.getElementById('fetchedData');

    if (myActivity) {
        myActivity.innerHTML = "";
    }

    showLoadingMessage(activity); // Assuming 'activity' is a defined variable

    try {
        const url = "/json/exercise.json";
        const response = await fetch(url);

        if (response.ok) {
            const exerciseData = await response.json();
            console.log("Exercise Data: ", exerciseData);

            // Store exercise data in localStorage if not already stored
            if (!getLocalStorage("exerLocal") || getLocalStorage("exerLocal").length === 0) {
                setLocalStorage("exerLocal", exerciseData);
            }

            clearLoadingMessage(); // Clear loading message after successful data retrieval

            // Check if we received the correct structure of exercise data
            if (Array.isArray(exerciseData) && exerciseData.length > 0) {
                const exerciseList = exerciseData.map(exercise => {
                    // Ensure that 'secondaryMuscles' is an array before joining
                    const secondaryMuscles = Array.isArray(exercise.secondaryMuscles) ? exercise.secondaryMuscles.join(', ') : '';

                    // Instructions list
                    const instructionsList = exercise.instructions.map(instruction => `<li>${instruction}</li>`).join('');

                    return `
                        <div class="exercise-card">
                            <h3>${exercise.name}</h3>
                            <img src="${exercise.gifUrl}" alt="${exercise.name}" />
                            <p><strong>Body Part:</strong> ${exercise.bodyPart}</p>
                            <p><strong>Equipment:</strong> ${exercise.equipment}</p>
                            <p><strong>Target Muscles:</strong> ${exercise.target}</p>
                            <p><strong>Secondary Muscles:</strong> ${secondaryMuscles}</p>
                            <ul><strong>Instructions:</strong>${instructionsList}</ul>
                        </div>
                    `;
                }).join('');

                if (myActivity) {
                    myActivity.innerHTML = exerciseList;
                }

                fetchedData.textContent = "You fetched a local JSON data";
            } else {
                console.error("Invalid exercise data structure");
                fetchedData.textContent = "Exercise data format is invalid.";
            }
        } else {
            alert("Data not found or the request failed.");
        }
    } catch (error) {
        clearLoadingMessage(); // Ensure loading message is cleared even if there is an error
        console.error("Error fetching exercise data:", error);
        // alert(`Error: ${error.message}`);
    }
}



// Async function to fetch JSON and display the exercise content from an external API
export async function fetchExerciseAPI(bodyPart) {
    // debugger;
    if (myActivity) {
        myActivity.innerHTML = "";
    }


    showLoadingMessage(activity); // Show loading message with activity name

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=1&offset=0`;
    // const apiUrl = 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=biceps';

    const url = proxyUrl + apiUrl; // Combine proxy and API URLs

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '49fc0c0e0amshf3105a46ecf07e6p14d54fjsnb9c53346917f', // Replace with your secure API key
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            // 'x-rapidapi-host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(apiUrl, options);
        const result = await response.json();
        console.log("Exercise API Data: ", result);
        // Update the exerAPI in local storage
        setLocalStorage("exerAPI", result);
        // if (!getLocalStorage("exerAPI") || getLocalStorage("exerAPI").length === 0) {
        //     setLocalStorage("exerAPI", result);
        // }

        clearLoadingMessage();
        if (myActivity) {
            myActivity.innerHTML = JSON.stringify(result, null, 2);
        }

        fetchedData.textContent = "You fetched a Third-party API";
    } catch (error) {
        clearLoadingMessage();
        // alert(`Error: ${error.message}`);
    }
}

