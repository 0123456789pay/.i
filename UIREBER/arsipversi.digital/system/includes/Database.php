<?php
/**
 * Database Connection Class
 * Kelas untuk koneksi dan operasi database
 */

class Database {
    private static $instance = null;
    private $connection;
    private $config;
    
    private function __construct() {
        $this->config = [
            'host' => DB_HOST,
            'name' => DB_NAME,
            'user' => DB_USER,
            'pass' => DB_PASS,
            'charset' => DB_CHARSET
        ];
        $this->connect();
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function connect() {
        try {
            $dsn = "mysql:host={$this->config['host']};dbname={$this->config['name']};charset={$this->config['charset']}";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ];
            $this->connection = new PDO($dsn, $this->config['user'], $this->config['pass'], $options);
        } catch (PDOException $e) {
            die("Koneksi database gagal: " . $e->getMessage());
        }
    }
    
    public function getConnection() {
        return $this->connection;
    }
    
    public function query($sql, $params = []) {
        $stmt = $this->connection->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }
    
    public function fetchAll($sql, $params = []) {
        return $this->query($sql, $params)->fetchAll();
    }
    
    public function fetchOne($sql, $params = []) {
        return $this->query($sql, $params)->fetch();
    }
    
    public function insert($table, $data) {
        $keys = array_keys($data);
        $fields = implode(', ', $keys);
        $placeholders = ':' . implode(', :', $keys);
        
        $sql = "INSERT INTO {$table} ({$fields}) VALUES ({$placeholders})";
        $this->query($sql, $data);
        return $this->connection->lastInsertId();
    }
    
    public function update($table, $data, $where, $whereParams = []) {
        $set = [];
        foreach ($data as $key => $value) {
            $set[] = "{$key} = :{$key}";
        }
        $setString = implode(', ', $set);
        
        $sql = "UPDATE {$table} SET {$setString} WHERE {$where}";
        return $this->query($sql, array_merge($data, $whereParams));
    }
    
    public function delete($table, $where, $params = []) {
        $sql = "DELETE FROM {$table} WHERE {$where}";
        return $this->query($sql, $params);
    }
    
    public function beginTransaction() {
        return $this->connection->beginTransaction();
    }
    
    public function commit() {
        return $this->connection->commit();
    }
    
    public function rollback() {
        return $this->connection->rollBack();
    }
}
