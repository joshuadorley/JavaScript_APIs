console.log("Hello World!\n==========\n");
"use strict";
// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

const GIPHY_URL = "https://api.giphy.com/v1/gifs/translate";
const GIPHY_KEY = "wV6YCYJqpBwgj9RROIz9mH6qBouObTvB";

let savedGifs = [];

let feedbackEle = document.querySelector("#feedback");
let searchInput = document.querySelector("#searchWord");
let searchBtn = document.querySelector("#submitSearch");
let inputContainer = document.querySelector("#inputContainer");
let gifEle = document.querySelector("#imageContainer > img");
let imageContainer = document.querySelector("#imageContainer");
let saveBtn = document.querySelector("#saveBtn");
let savedGifsContainer = document.querySelector("#savedGifs");


inputContainer.addEventListener("submit", (event) => {
    event.preventDefault();

    getGif(searchInput.value);
});

saveBtn.addEventListener("click", (event) => {
  savedGifs.push({ 
    src: gifEle.src, 
    alt: gifEle.alt, 
    id: gifEle.getAttribute("data-id"),
 });

let newGif = document.createElement("img");
newGif.src = gifEle.src;
newGif.alt = gifEle.alt;
newGif.id = gifEle.getAttribute("data-id");
savedGifsContainer.prepend(newGif);
});

async function getGif(searchTerm) {
    try {
        let res = await fetch(`${GIPHY_URL}?api_key=${GIPHY_KEY}&s=${searchTerm}`);
        let body = await res.json();

        console.log(body);

        if (typeof body.data instanceof Array && body.data.length == 0) {
            throw new Error(`No results for "${searchTerm}"`)
        }

        feedbackEle.textContent = "";

        gifEle.src = body.data.images.original.url;
        gifEle.alt = body.data.title;
        gifEle.setAttribute("data-id", body.data.id)
        imageContainer.classList.remove("hidden");
    } catch (err) {
      console.error(err);
      feedbackEle.textContent = err.message;
      imageContainer.classList.add("hidden");
    }
}