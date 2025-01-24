import { activity, fetchedData, myActivity } from "./app.js";
// This function grabs the the food local json data asynchronously
export async function fetchExerciseData() {
    myActivity.innerHTML = `Loading ${activity} local json...`;
    // Local json for food
    const url = "./src/data/exercise.json";

    try {
        // Convert promise to a response object
        const response = await fetch(url);

        // Check if response returned between 200-299, otherwise, throw error of "Data not found"
        if (response.ok) {
            const data = await response.json();
            const exerciseData = data;
            // Display it in the console
            alert(exerciseData);
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
    myActivity.innerHTML = `Loading ${activity} API...`;
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
        alert(result);
        // Display result in pre tag
        myActivity.innerHTML = JSON.stringify(result, null, 2);
        // Determine if local data or API was fetched
        fetchedData.textContent = "You fetched a Third-party API";
    } catch (error) {
        alert('Error:', error);
        myActivity.innerHTML = `Error: ${error.message}`;
    }
}