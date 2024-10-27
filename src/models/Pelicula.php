<?php
// Modelo de Pelicula

include_once __DIR__ . '/../database/conexion.php';

class Pelicula {
    private $pdo;
    public $imdbID;
    public $title;
    public $year;

    public function __construct() {
        $conexion = new Conexion();
        $this->pdo = $conexion->getPdo();
    }

    public function guardar() {
        try {
            // Corrige el nombre del campo 'año' a 'anio' para evitar errores en SQL
            $sql = "INSERT INTO peliculas (imdbID, titulo, anio) VALUES (:imdbID, :titulo, :anio)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':imdbID', $this->imdbID);
            $stmt->bindParam(':titulo', $this->title);
            $stmt->bindParam(':anio', $this->year);
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
    public function obtenerPeliculas() {
        try {
            $sql = "SELECT * FROM peliculas";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
}
