<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require_once '../../config/session.php';
require_once '../../config/database.php';

if (!is_logged_in()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

try {
    $db = (new Database())->connect();

    $stmt = $db->prepare("
        SELECT f.fish_name, f.weight_kg, f.caught_at, u.username, u.role, s.name as spot
        FROM catches f
        JOIN users u ON u.id = f.user_id
        LEFT JOIN spots s ON s.id = f.spot_id
        WHERE u.id = :uid
        ORDER BY f.caught_at DESC
        ");
    $stmt->execute([':uid' => $_SESSION['user_id']]);
    $spots = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($spots);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
