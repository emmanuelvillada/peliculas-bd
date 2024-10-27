document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "8ad24484";
    const movieList = document.getElementById("movies");
  
    // Función para obtener películas de la API
    function fetchMovies() {
      const url = `http://www.omdbapi.com/?s=movie&apikey=${apiKey}`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.Response === "True") {
            displayMovies(data.Search);
          } else {
            movieList.innerHTML = "<p>No se encontraron películas.</p>";
          }
        })
        .catch(error => {
          console.error("Error fetching movies:", error);
          movieList.innerHTML = "<p>Error al cargar películas.</p>";
        });
    }
  
    // Función para mostrar películas en la página
    function displayMovies(movies) {
      movieList.innerHTML = ""; // Limpiar la lista antes de agregar nuevas películas
  
      movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
  
        movieDiv.innerHTML = `
          <h3>${movie.Title}</h3>
          <p>Año: ${movie.Year}</p>
          <img src="${movie.Poster}" alt="${movie.Title}" width="100">
          <button class="add-movie-btn" data-id="${movie.imdbID}" data-title="${movie.Title}" data-year="${movie.Year}">Agregar</button>
        `;
  
        movieList.appendChild(movieDiv);
      });
  
      // Agregar evento para los botones "Agregar"
      document.querySelectorAll(".add-movie-btn").forEach(button => {
        button.addEventListener("click", addMovieToDatabase);
      });
    }
  
    // Función para agregar una película a la base de datos
    function addMovieToDatabase(event) {
      const button = event.target;
      const movieData = {
        imdbID: button.getAttribute("data-id"),
        title: button.getAttribute("data-title"),
        year: button.getAttribute("data-year")
      };
  
      fetch("add_movie.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(movieData)
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          alert("Película agregada con éxito");
        } else {
          alert("Error al agregar la película");
        }
      })
      .catch(error => {
        console.error("Error adding movie to database:", error);
      });
    }
  
    // Llamar a la función para obtener las películas al cargar la página
    fetchMovies();
  });
  