import { activity, fetchedData, myActivity, handleCardClick } from "./app.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Global timeout Id that can be cleared each time
let timeoutId;

// This function grabs the the food local json data asynchronously
export async function fetchExerciseData() {
    myActivity.innerHTML = "";

    timeoutId = setTimeout(() => {
        myActivity.innerHTML = `Loading ${activity} json...`;
    }, 500);


    try {

        // Local json for exercise
        let url = "/json/exercise.json";
        // Convert promise to a response object
        const response = await fetch(url);

        // Check if response returned between 200-299, otherwise, throw error of "Data not found"
        if (response.ok) {
            const data = await response.json();
            const exerciseData = data;
            // Display it in the console
            // alert(exerciseData);
            debugger;
            console.log("ExerData: ", exerciseData);
            // Only run this if food key was not found in localstorage
            if (!getLocalStorage("exerLocal") || getLocalStorage("exerLocal").length === 0) {
                setLocalStorage("exerLocal", exerciseData);
            }


            clearTimeout(timeoutId);
            myActivity.innerHTML = "";

            // Display results on the HTML page
            myActivity.innerHTML = JSON.stringify(exerciseData, null, 2);
            // Determine if local data or API was fetched
            fetchedData.textContent = "You fetched a local json data";
        } else {
            alert("Data not found");
        }
        // Catch other errors here...
    } catch (error) {
        alert(`Error: ${error.message}`);
    }

}




// Async function to fetch JSON and display the exercise content
export async function fetchExerciseAPI() {
    myActivity.innerHTML = "";

    timeoutId = setTimeout(() => {
        myActivity.innerHTML = `Loading ${activity} API...`;
    }, 500);


    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10&offset=0';


    const url = proxyUrl + apiUrl; // Combine proxy and API URLs


    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5f36438cdfmsh35b8aa8adc1d663p1d319cjsn3b4817b74143',
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };


    try {
        // const response = await fetch(url, options); // Uncomment if you are having issues with CORS policy
        const response = await fetch(apiUrl, options);
        const result = await response.json();  // Assuming the response is in JSON format
        // alert(result);
        console.log(result);
        const exerResult = result;
        debugger;
        console.log("ExerAPI: ", exerResult);
        // Only run this if food key was not found in localstorage
        if (!getLocalStorage("exerAPI") || getLocalStorage("exerAPI").length === 0) {
            setLocalStorage("exerAPI", exerResult);
        }


        clearTimeout(timeoutId);
        myActivity.innerHTML = "";
        // Display result in pre tag
        myActivity.innerHTML = JSON.stringify(result, null, 2);
        // Determine if local data or API was fetched
        fetchedData.textContent = "You fetched a Third-party API";
    } catch (error) {
        alert('Error:', error);
        myActivity.innerHTML = `Error: ${error.message}`;
    }
}