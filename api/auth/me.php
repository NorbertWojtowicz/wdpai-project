<?php

declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

require_once '../../config/session.php';
require_once '../../config/database.php';

if (!is_logged_in()) {
    echo json_encode(['logged_in' => false]);
    exit;
}

try {
    $db = (new Database())->connect();
    $stmt = $db->prepare('SELECT id, username, role FROM users WHERE id = ?');
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        // Na wszelki wypadek gdyby ktos usunal usera
        echo json_encode(['logged_in' => false]);
        exit;
    }

    echo json_encode(['logged_in' => true, 'user' => $user]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['logged_in' => false, 'error' => 'Internal server error']);
}
