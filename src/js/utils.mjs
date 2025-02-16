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

debugger;
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
    debugger;

    const headerPath = "/partials/header.html";
    const footerPath = "/partials/footer.html";

    const headerTemplate = await loadTemplate(headerPath);
    const headerEl = qs("#main-header");
    const footerTemplate = await loadTemplate(footerPath);
    const footerEl = qs("#main-footer");

    renderWithTemplate(headerTemplate, headerEl);
    renderWithTemplate(footerTemplate, footerEl);



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
    debugger;
    console.log(data);
    const slides = qs(".my-food-card");
    let slideIndex = 0;
    let intervalId = null;

    function initializeSlider() {
        // debugger;
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 5000);
    }

    function showSlide(index) {
        // debugger;
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