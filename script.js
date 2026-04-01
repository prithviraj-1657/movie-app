const API_KEY = "8167ac8c"; 

async function searchMovie() {
    const query = document.getElementById("searchInput").value;

    const moviesDiv = document.getElementById("movies");
    moviesDiv.innerHTML = "Loading...";

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        const data = await response.json();

        displayMovies(data.Search);
    } catch (error) {
        moviesDiv.innerHTML = "Error fetching data";
    }
}

function displayMovies(movies) {
    const moviesDiv = document.getElementById("movies");
    moviesDiv.innerHTML = "";

    movies.forEach(movie => {
        const div = document.createElement("div");
        div.className = "movie";

        div.innerHTML = `
            <h3>${movie.Title}</h3>
            <img src="${movie.Poster}" width="150">
            <p>${movie.Year}</p>
        `;

        moviesDiv.appendChild(div);
    });
}