//need to create a dynamic url to get movie trailers
function dynamicUrl(path) {
	const url = `https://api.themoviedb.org/3${path}?api_key=7d149566af8dd84bd3a1e75d071091be`;
	return url;
}

//refactoring the fetch function
function requestMovies(url, onSuccess, onFailure) {
	fetch(url) //display movieposters
		.then((res) => res.json())
		.then(onSuccess)
		.catch(onFailure);
}

//refactor search
function renderSearch(data) {
	movieSearch.innerHTML = ""; //replace old search with new search
	const movies = data.results;
	const movieBlock = createContainer(movies);
	movieSearch.appendChild(movieBlock);
}

function foundError(error) {
	console.log(error);
}

function searchMovie(value) {
	const path = "/search/movie"; //path specification
	const url = dynamicUrl(path) + "&query=" + value;

	requestMovies(url, renderSearch, foundError);
}

//function to render the ondisplay movies
function ondisplayMovies(data) {
	const movies = data.results;
	const movieBlock = createContainer(movies, this.title);
	movieContainer.appendChild(movieBlock);
}




function getUpcomingMovies() {
	const path = "/movie/upcoming";
	const url = dynamicUrl(path);
	const titledMovies = ondisplayMovies.bind({ title: "Upcoming Movies" });

	requestMovies(url, titledMovies, foundError);
}

function getNowPlayingMovies() {
	const path = "/movie/now_playing";
	const url = dynamicUrl(path);
	const titledMovies = ondisplayMovies.bind({ title: "Now Playing Movies" });

	requestMovies(url, titledMovies, foundError);
}

function getTopRatedMovies() {
	const path = "/movie/top_rated";
	const url = dynamicUrl(path);
	const titledMovies = ondisplayMovies.bind({ title: "Top-Rated Movies" });

	requestMovies(url, titledMovies, foundError);
}

function getPopularMovies() {
	const path = "/movie/popular";
	const url = dynamicUrl(path);
	const titledMovies = ondisplayMovies.bind({ title: "Popular Movies" });

	requestMovies(url, titledMovies, foundError);
}