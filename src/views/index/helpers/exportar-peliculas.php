<?php
require '../../../../vendor/autoload.php'; 
include_once  '../../../models/Pelicula.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

function exportarPeliculas() {
    // Crear una nueva instancia de Spreadsheet
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    // Definir encabezados de la hoja de cálculo
    $sheet->setCellValue('A1', 'IMDb ID');
    $sheet->setCellValue('B1', 'Título');
    $sheet->setCellValue('C1', 'Año');

    // Obtener los datos de las películas de la base de datos
    $pelicula = new Pelicula();
    $peliculas = $pelicula->obtenerPeliculas();


    // Rellenar los datos de las películas en la hoja de cálculo
    $fila = 2; // Empezamos en la fila 2 para dejar la primera fila para los encabezados
    foreach ($peliculas as $pelicula)
    { // Iterar sobre las páliculas ($peliculas) {
        $sheet->setCellValue('A' . $fila, $pelicula['imdbID']);
        $sheet->setCellValue('B' . $fila, $pelicula['titulo']);
        $sheet->setCellValue('C' . $fila, $pelicula['anio']);
        $fila++;
    }

    // Definir el encabezado de la respuesta para descargar el archivo Excel
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment; filename="peliculas.xlsx"');
    header('Cache-Control: max-age=0');

    // Crear el escritor de Excel y enviar el archivo al navegador
    $writer = new Xlsx($spreadsheet);
    $writer->save('php://output');
    exit;
}

// Llamar a la función para exportar las películas
exportarPeliculas();
