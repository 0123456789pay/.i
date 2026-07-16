<?php
session_start();
require_once __DIR__ . '/db.php';

// Check if user is logged in
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: /situsnewsmediadigital/dashboard/login.php');
        exit;
    }
}

function getCurrentUser() {
    if (!isLoggedIn()) {
        return null;
    }
    $users = dbFind('users', ['id' => $_SESSION['user_id']]);
    return !empty($users) ? $users[0] : null;
}
?>
