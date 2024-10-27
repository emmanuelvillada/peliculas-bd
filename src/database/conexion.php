<?php 
// Archivo de conexión a base de datos

const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASSWORD = '1903';
const DB_DATABASE = 'peliculas';

class Conexion {
    private $pdo;

    public function __construct() {
        try {
            $this->pdo = new PDO(
                'mysql:host=' . DB_HOST . ';dbname=' . DB_DATABASE . ';charset=utf8mb4',
                DB_USER,
                DB_PASSWORD
            );
            // Configurar el modo de error de PDO para lanzar excepciones
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Error de conexión a la base de datos: " . $e->getMessage());
        }
    }

    public function getPdo() {
        return $this->pdo;
    }
}
