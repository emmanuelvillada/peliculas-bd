document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "8ad24484";
  const movieList = document.getElementById("movies");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  // Función para obtener películas de la API y mostrar las predeterminadas
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
        <h3 class="movie-title">${movie.Title}</h3>
        <p class="movie-year">Año: ${movie.Year}</p>
        <p class="movie-imdbID">IMDb ID: ${movie.imdbID}</p>
        <img class="movie-poster" src="${movie.Poster !== "N/A" ? movie.Poster : "default-image.jpg"}" alt="${movie.Title}" width="100">
        <button class="add-movie-btn" data-id="${movie.imdbID}" data-title="${movie.Title}" data-year="${movie.Year}">
          <img src="../../assets/icons/add.svg" alt="icono agregar">
        </button>
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

    fetch("../index/helpers/add-pelicula.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movieData)
    })
      .then(response => response.json())
      .then(result => {
        Swal.fire({
          icon: result.success ? 'success' : 'error',
          title: result.success ? 'Película agregada' : 'Error',
          text: result.success ? 'La película se agregó correctamente' : 'No se pudo agregar la película',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => {
        console.error("Error adding movie to database:", error);
      });
  }

  // Evento de búsqueda para el botón
  searchBtn.addEventListener("click", function () {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
      fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          movieList.innerHTML = ""; // Limpiar los resultados anteriores
          if (data.Response === "True") {
            displayMovies(data.Search);
          } else {
            movieList.innerHTML = "<p class='no-results'>No se encontraron películas.</p>";
          }
        })
        .catch(error => {
          console.error("Error al obtener las películas:", error);
          movieList.innerHTML = "<p class='error'>Error al cargar películas.</p>";
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, introduce una consulta de búsqueda',
        showConfirmButton: false,
        timer: 1500
      });
    }
  });

  // Evento para detectar cuando el campo de búsqueda está vacío
  searchInput.addEventListener("input", function () {
    if (searchInput.value.trim() === "") {
      fetchMovies(); // Mostrar películas predeterminadas si el campo está vacío
    }
  });

  // Cargar películas predeterminadas al inicio
  fetchMovies();

  //formulario
  // Referencia al formulario
  const addMovieForm = document.getElementById("add-movie-form");

  // Evento de envío del formulario
  addMovieForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const movieData = {
      imdbID: document.getElementById("movie-imdbID").value,
      title: document.getElementById("movie-title").value,
      year: document.getElementById("movie-year").value,
    };

    fetch("../index/helpers/add-pelicula.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movieData)
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          Swal.fire({
            icon: 'success',
            title: 'Película agregada',
            text: 'La película se agregó correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          addMovieForm.reset(); // Limpiar el formulario
          fetchMovies(); // Actualizar la lista de películas
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo agregar la película',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => {
        console.error("Error al agregar la película:", error);
      });
  });
});
