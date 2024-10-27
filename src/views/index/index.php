<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
  <title>Películas</title>
  <link rel="stylesheet" href="../index/style.css">
</head>
<body>
  <header>
    <h1>Listados de Películas</h1>
  </header>

  <main>
    <div class="excel-movie">
    <a href="../index//helpers/exportar-peliculas.php" class="download-btn">Descargar Excel con tus peliculas agregadas</a>
    </div>
    <div class="search-container">
      <input type="text" id="search-input" placeholder="Simpson" />
      <button class="search-btn" id="search-btn"><img src="../../assets/icons/search.svg" alt="icono buscar" srcset=""></button>
    </div>
  <section class="movie-list">
  <h2>Lista de Películas</h2>
  <div id="movies">
    <!-- Aquí se cargará la lista de películas obtenida de la API -->
  </div>
</section>

   
  </main>

  <script src="../index/script.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>

