//KEY AND URLs
const API_KEY = "7d149566af8dd84bd3a1e75d071091be";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const URL =
	"https://api.themoviedb.org/3/search/movie?api_key=7d149566af8dd84bd3a1e75d071091be";

//DOM elements
const submitElement = document.getElementById("searchTab");
const inputElement = document.getElementById("inputValue");
const movieSearch = document.getElementById("movie-search");
const movieContainer = document.getElementById("movie-container");

//need to create a dynamic url to get movie trailers
function dynamicUrl(path) {
	const url = `https://api.themoviedb.org/3${path}?api_key=7d149566af8dd84bd3a1e75d071091be`;
	return url;
}

//fetch
submitElement.addEventListener("click", (e) => {
	e.preventDefault();
	const value = inputElement.value;
	const path = "/search/movie";
	const modifiedURL = dynamicUrl(path) + "&query=" + value;

	fetch(modifiedURL)
		.then((res) => res.json())
		.then(renderSearch)
		.catch((error) => {
			console.log(error);
		});

	console.log(value);

	inputElement.value = ""; // reset
});

//function to create elements to be appended to movie-search div with child movieElement

function createContainer(movies, title = "") {
	const movieElement = document.createElement("div"); //div to nest all movie elements
	movieElement.setAttribute("class", "movie");

	const header = document.createElement("h2");
	header.innerText = title;

	const section = document.createElement("section");
	section.classList = "section";

	movies.map((movie) => {
		if (movie.poster_path) {
			const img = document.createElement("img");
			img.src = IMAGE_URL + movie.poster_path;
			img.setAttribute("data-movie-id", movie.id);

			section.appendChild(img);
		}
	});

	const content = document.createElement("div");
	content.classList = "content";

	const contentClose = `<button id="content-close" aria-label="Close"></button>`;
	content.innerHTML = contentClose;

	movieElement.appendChild(header);
	movieElement.appendChild(section);
	movieElement.appendChild(content);

	return movieElement;
}

//refactor search
function renderSearch(data) {
	movieSearch.innerHTML = ""; //replace old search with new search
	const movies = data.results;
	const movieBlock = createContainer(movies);
	movieSearch.appendChild(movieBlock);
}

//function to add click listeners to image
document.addEventListener("click", (e) => {
	const target = e.target;

	if (target.tagName.toLowerCase() === "img") {
		console.log(e); //helps get the id of the movieId
		const parent = e.target.parentElement;
		const content = parent.nextElementSibling;
		content.classList.add("content-display"); //add a new block where the trailer will be
		const movieId = target.dataset.movieId;
        const path = `/movie/${movieId}/videos`
        const modifiedURL = dynamicUrl(path) 

        fetch(modifiedURL)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch()
	}
	if (target.id === "content-close") {
		const content = target.parentElement;
		content.classList.remove("content-display"); //remove the new block when closed
	}
});
