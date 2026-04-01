const API_KEY = "8167ac8c";

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

        displayMovies(data.Search);
    } catch (error) {
        moviesDiv.innerHTML = "Error fetching data";
    }
}

function displayMovies(movies) {
    const moviesDiv = document.getElementById("movies");
    moviesDiv.innerHTML = "";

    movies.forEach(movie => {
        const poster = movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/150";

        const div = document.createElement("div");
        div.className = "movie";

        div.innerHTML = `
            <img src="${poster}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;

        moviesDiv.appendChild(div);
    });
}