<?php
include_once __DIR__ . '/../../../controllers/PeliculaController.php';

header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['imdbID']) && isset($input['title']) && isset($input['year'])) {
  $imdbID = $input['imdbID'];
  $title = $input['title'];
  $year = $input['year'];



$peliculaController = new PeliculaController();

if ($peliculaController->guardarPelicula($imdbID, $title, $year)) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false]);
}
} else {
  echo json_encode(['success' => false]);
}

