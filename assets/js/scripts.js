const API_KEY = "7d149566af8dd84bd3a1e75d071091be";
const URL =
	"https://api.themoviedb.org/3/search/movie?api_key=7d149566af8dd84bd3a1e75d071091be&query=thor";

//DOM elements
const submitElement = document.getElementById("searchTab");
const inputElement = document.getElementById("inputValue");
const movieSearch = document.getElementById("movie-search");
const movieContainer = document.getElementById("movie-container");

submitElement.addEventListener("click", (e) => {
	e.preventDefault();
	const value = inputElement.value;

	fetch(URL)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.log(error);
		});

	console.log(value);

	inputElement.value = ""; // reset
});
