const API_KEY = "8167ac8c";

let allMovies = [];
let displayedMovies = [];
let favorites = [];

async function searchMovie() {
    const query = document.getElementById("searchInput").value;
    const moviesDiv = document.getElementById("movies");

    if (!query) {
        moviesDiv.innerHTML = "Please enter a movie name";
        return;
    }

    moviesDiv.innerHTML = "<h2>Loading movies...</h2>";

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "False") {
            moviesDiv.innerHTML = data.Error;
            return;
        }

        allMovies = data.Search;
        displayedMovies = [...allMovies];

        displayMovies(displayedMovies);
    } catch (error) {
        moviesDiv.innerHTML = "Error fetching data";
    }
}

function displayMovies(movies) {
    const moviesDiv = document.getElementById("movies");
    moviesDiv.innerHTML = "";

    movies.map(movie => {
        const poster = movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/150";

        const div = document.createElement("div");
        div.className = "movie";

        div.innerHTML = `
            <img src="${poster}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button onclick="addToFavorites('${movie.imdbID}')">❤️</button>
        `;

        moviesDiv.appendChild(div);
    });
}

function handleFilter() {
    const year = document.getElementById("yearFilter").value;

    displayedMovies = allMovies.filter(movie => movie.Year === year);

    displayMovies(displayedMovies);
}

function handleSort() {
    const value = document.getElementById("sortSelect").value;

    if (value === "asc") {
        displayedMovies.sort((a, b) => a.Year - b.Year);
    } else if (value === "desc") {
        displayedMovies.sort((a, b) => b.Year - a.Year);
    }

    displayMovies(displayedMovies);
}

function addToFavorites(id) {
    if (!favorites.includes(id)) {
        favorites.push(id);
        alert("Added to favorites");
    }
}