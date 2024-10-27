<?php 
//controlador de peliculas

include_once __DIR__ . '/../models/Pelicula.php';


class PeliculaController{

    //Método para guardar las peliculas en la base de datos
    public function guardarPelicula($imdbID, $title, $year){
        
        $peliucula = new Pelicula();
        $peliucula->imdbID = $imdbID;
        $peliucula->title = $title;
        $peliucula->year = $year;

        return $peliucula->guardar();
    }
}