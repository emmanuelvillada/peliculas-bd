<?php 
//conexion a base de datos
namespace Database;
use PDO;

const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASSWORD = 'root';
const DB_DATABASE = 'peliculas';



class Conexion{
    private $pdo;

    public function __construct(){
        $this->pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_DATABASE, DB_USER, DB_PASSWORD);
    }

    public function getPdo(){
        return $this->pdo;
    }
}