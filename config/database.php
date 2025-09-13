<?php
class Database
{
    private $host = "localhost";
    private $db = "db";
    private $user = "docker";
    private $pass = "docker";
    public $conn;

    public function connect()
    {
        try {
            error_log('DBG: user registered id=');
            $this->conn = new PDO("pgsql:host=$this->host;port=5433;dbname=$this->db", $this->user, $this->pass);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->conn;
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }
}
