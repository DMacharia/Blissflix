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
	searchMovie(value);

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

//need to create a iFrame where the trailers will be displayed
function createIframe(video) {
	const iframe = document.createElement("iframe");
	iframe.src = `https://www.youtube.com/embed/${video.key}`;
	iframe.width = 460;
	iframe.height = 315;
	iframe.allowFullscreen = true;

	return iframe;
}

//function to add click listeners to image
document.addEventListener("click", (e) => {
	const target = e.target;

	if (target.tagName.toLowerCase() === "img") {
		console.log(e); //helps get the id of the movieId
		const parent = e.target.parentElement;
		const content = parent.nextElementSibling;
		content.classList.add("content-display"); //add a new block where the trailer will be displayed
		const movieId = target.dataset.movieId;
		const path = `/movie/${movieId}/videos`;
		const modifiedURL = dynamicUrl(path);

		fetch(modifiedURL)
			.then((res) => res.json())
			.then((data) => {
				content.innerHTML = `<button id="content-close" aria-label="Close"></button>`;
				const videos = data.results;
				const length = videos.length > 3 ? 3 : videos.length;
				const iframeBlock = document.createElement("div");
				for (let i = 0; i < length; i++) {
					//loop over videos max 4
					const video = videos[i];
					const iframe = createIframe(video);
					iframeBlock.appendChild(iframe);
					content.appendChild(iframeBlock);
				}
			})
			.catch((error) => console.log(error));
	}
	if (target.id === "content-close") {
		const content = target.parentElement;
		content.classList.remove("content-display"); //remove the new block when closed
	}
});

//refactoring the fetch function
function requestMovies(url, onSuccess, onFailure) {
	fetch(url) //display movieposters
		.then((res) => res.json())
		.then(onSuccess)
		.catch(onFailure);
}

function searchMovie(value) {
	const path = "/search/movie"; //path specification
	const url = dynamicUrl(path) + "&query=" + value;

	requestMovies(url, renderSearch, foundError);
}

function foundError(error) {
	console.log(error);
}

function getUpcomingMovies() {
	const path = "/movie/upcoming";
	const url = dynamicUrl(path);

	requestMovies(url, renderSearch, foundError);
}

function getNowPlayingMovies() {
	const path = "/movie/now_playing";
	const url = dynamicUrl(path);

	requestMovies(url, renderSearch, foundError);
}

function getTopRatedMovies() {
	const path = "/movie/top_rated";
	const url = dynamicUrl(path);

	requestMovies(url, renderSearch, foundError);
}

function getPopularMovies() {
	const path = "/movie/popular";
	const url = dynamicUrl(path);

	requestMovies(url, renderSearch, foundError);
}

document.addEventListener("DOMContentLoaded", (e) => {
	// getUpcomingMovies();
    getPopularMovies();
	// getNowPlayingMovies();
	// getTopRatedMovies();
});
