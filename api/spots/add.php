<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require_once '../../config/database.php';
require_once '../../config/session.php';

if (!is_logged_in()) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    $data = json_decode(file_get_contents('php://input'), true) ?? [];

    $name = isset($data['name']) ? trim((string)$data['name']) : '';
    $city = isset($data['city']) ? trim((string)$data['city']) : '';
    $country = isset($data['country']) ? trim((string)$data['country']) : '';


    if ($name === '' || $city === '' || $country === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Nazwa lokacji, miejscowość oraz kraj są wymagane...']);
        exit;
    }
    if (mb_strlen($name) > 255 || mb_strlen($city) > 255 || mb_strlen($country) > 255) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Nazwa lokacji, miejscowości lub kraju jest zbyt długa (max 255 znaków)']);
        exit;
    }

    $db = (new Database())->connect();

    $check = $db->prepare("
        SELECT 1
        FROM spots
        WHERE user_id = :uid
          AND LOWER(name) = LOWER(:name)
          AND LOWER(city) = LOWER(:city)
          AND LOWER(country) = LOWER(:country)
        LIMIT 1
    ");
    $check->execute([
        ':uid'  => $_SESSION['user_id'],
        ':name' => $name,
        ':city' => $city,
        ':country' => $country,
    ]);

    if ($check->fetchColumn()) {
        http_response_code(409);
        echo json_encode(['success' => false, 'error' => 'Taka lokacja już istnieje wśród twoich innych lokacji']);
        exit;
    }

    $stmt = $db->prepare("
        INSERT INTO spots (user_id, name, city, country)
        VALUES (:uid, :name, :city, :country)
        RETURNING id, user_id, name, city, country, created_at
    ");
    $stmt->execute([
        ':uid'      => $_SESSION['user_id'],
        ':name'     => $name,
        ':city'     => $city,
        ':country'  => $country,
    ]);

    $spot = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'spot' => $spot]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Wewnętrzny błąd serwera']);
}
