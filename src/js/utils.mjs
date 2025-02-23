// utils.mjs - Contains utility functions used by other modules.

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
    const storedData = localStorage.getItem(key);
    if (!storedData) {
        console.warn("No data found in local storage");
        return null;
    }

    try {
        return JSON.parse(storedData);

    } catch (error) {
        // console.error(`Error parsing JSON for key: ${key}`, error);
        return null;
    }

}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
    qs(selector).addEventListener("touchend", (event) => {
        event.preventDefault();
        callback();
    });
    qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get(param);
    return product;
}

// // debugger;
export function renderListWithTemplate(
    templateFn,
    parentElement,
    list,
    position = "afterbegin",
    clear = false
) {

    const htmlStrings = list.map(templateFn);

    if (!parentElement) {
        return;
    }

    if (clear) {
        parentElement.innerHTML = "";
    } else {
        parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
    }

}



async function loadTemplate(path) {

    const res = await fetch(path);
    const template = await res.text();
    return template;

}

export async function loadHeaderFooter() {
    // // debugger;

    const headerPath = "/partials/header.html";
    const footerPath = "/partials/footer.html";

    const headerTemplate = await loadTemplate(headerPath);
    const headerEl = qs("#main-header");
    const footerTemplate = await loadTemplate(footerPath);
    const footerEl = qs("#main-footer");

    renderWithTemplate(headerTemplate, headerEl);
    renderWithTemplate(footerTemplate, footerEl);



}

loadHeaderFooter();

export let isLocalJson;
export function checkIsLocalJsonState() {
    // // debugger;

    let storedIsLocalJson = getLocalStorage("isLocalJson");

    // If the value exists, use it; otherwise, default to true
    if (storedIsLocalJson === null || storedIsLocalJson === undefined) {

        isLocalJson = false; // Default to false
        setLocalStorage("isLocalJson", isLocalJson);
    }
    // Update display with status of isLocalJson
    const localjsonStatus = document.querySelector("#localjson-status");
    if (localjsonStatus) {
        isLocalJson = storedIsLocalJson;
        localjsonStatus.textContent = "isLocalJson: " + isLocalJson;
    }



    // Get the checkbox element
    let checkLocalJson = document.querySelector("#localjson-check");


    if (checkLocalJson) {
        // Sync checkbox with current state
        checkLocalJson.checked = isLocalJson;
        localjsonStatus.textContent = "isLocalJson: " + isLocalJson;


        // Listen when the checkbox is ticked or not by the user
        checkLocalJson.addEventListener("click", () => {
            // Change state of isLocalJson when checkbox is clicked
            // isLocalJson = checkLocalJson.checked;

            // Log the value of isLocalJson before mutation
            console.log("Before mutation, isLocalJson: ", isLocalJson);

            // Update the isLocalJson state based on the checkbox state
            isLocalJson = document.querySelector("#localjson-check").checked;


            // Log the value of isLocalJson after mutation
            console.log("After mutation, isLocalJson: ", isLocalJson);

            //Save the updated state to local storage
            setLocalStorage("isLocalJson", isLocalJson);
            // Update display
            if (localjsonStatus) {
                localjsonStatus.textContent = "isLocalJson: " + isLocalJson;
            }

            // Refresh the page
            window.location.reload();


        });
    }
}

export function getIsLocalJsonFromStorage() {

    let storedIsLocalJson = localStorage.getItem("isLocalJson");

    // If it's not found in localStorage, default to true
    if (storedIsLocalJson === null) {
        storedIsLocalJson = false;  // Default to false
        localStorage.setItem("isLocalJson", storedIsLocalJson);
    }

    return storedIsLocalJson === "true"; // Return boolean value
}


export function renderWithTemplate(template, parentElement, clear, data, callback) {

    if (clear) {
        parentElement.innerHTML = "";
    }

    parentElement.insertAdjacentHTML("afterbegin", template);

    if (callback) {
        callback(data);
    }

}

// Function to remove HTML tags from a string
export function removeHtmlTags(inputString) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = inputString;
    return tempElement.textContent || tempElement.innerText || '';
}


export function loadCarouselSlider(data) {
    // // debugger;
    console.log(data);
    const slides = qs(".my-food-card");
    let slideIndex = 0;
    let intervalId = null;

    function initializeSlider() {
        //  // debugger;
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 5000);
    }

    function showSlide(index) {
        // // debugger;
        console.log("slideIndex", index);
        console.log("slideLength: ", slides.length);

        if (index >= slides.length) {
            // Loop back to the first slide
            slideIndex = 0;
        } else if (index < 0) {
            // Go to the last slide
            slideIndex = slides.length - 1;
        } else {
            slideIndex = index; // Valid index within bounds
        }

        // First, hide the slides
        slides.forEach(slide => {
            slide.classList.remove("displaySlide");
        });

        // Add the displaySlide class to the active slide
        slides[slideIndex].classList.add("displaySlide");


    }

    console.log("Slides: ", slides);

    function prevSlide() {
        // Move to the previous slide
        slideIndex--;
        showSlide(slideIndex);
    }

    function nextSlide() {
        // Move to the next slide
        slideIndex++;
        showSlide(slideIndex);
    }

    const prevBtn = qs("#prev");
    const nextBtn = qs("#next");

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            // Show previous slide, when clicked
            prevSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            // Show the next slide, when clicked
            nextSlide();
        });
    }

    initializeSlider();

}
// AI helped with this
export function toTitleCase(str) {
    return str
        .split(/(?=[A-Z])|\s/)  // Split at spaces or capital letters
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize each word
        .join(" ");  // Join the words back together
}
