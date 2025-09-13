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
        SELECT
            s.id,
            s.name,
            s.city,
            s.country,
            s.created_at,
            COUNT(c.id) AS catch_count
        FROM spots s
        LEFT JOIN catches c ON c.spot_id = s.id
        WHERE s.user_id = :uid
        GROUP BY s.id
        ORDER BY s.created_at DESC
    ");
    $stmt->execute([':uid' => $_SESSION['user_id']]);
    $spots = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($spots);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
