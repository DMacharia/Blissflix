//DOM elements
const submitElement = document.getElementById("searchTab");
const inputElement = document.getElementById("inputValue");
const movieSearch = document.getElementById("movie-search");
const movieContainer = document.getElementById("movie-container");

submitElement.addEventListener("click", (e) => {
	e.preventDefault();
	const value = inputElement.value;
    console.log(value);

	inputElement.value = ""; // reset
});

