<?php
require_once '../../config/database.php';
require_once '../../config/session.php';

if (!is_logged_in()) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$fish_name = $data['fish_name'];
$weight_kg = $data['weight_kg'];
$spot_name = $data['spot_name'] ?? null;
$spot_city = $data['spot_city'] ?? null;
$spot_country = $data['spot_country'] ?? null;

if (!$spot_name || !$spot_city || !$spot_country) {
    http_response_code(400);
    echo json_encode(['error' => 'Podaj lokacje w formacie Nazwa-Miejscowość-Kraj...']);
    exit;
}

$db = (new Database())->connect();

$stmt = $db->prepare("SELECT id FROM spots WHERE user_id = :uid AND name = :name AND city = :city AND country = :country LIMIT 1");
$stmt->execute([':uid' => $_SESSION['user_id'], ':name' => $spot_name, ':city' => $spot_city, ':country' => $spot_country]);;
$selected_spot = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$selected_spot) {
    http_response_code(400);
    echo json_encode(['error' => 'Taka lokalizacja nie istnieje...']);
    exit;
}
$spot_id = $selected_spot['id'];

$stmt = $db->prepare("INSERT INTO catches (user_id, spot_id, fish_name, weight_kg) VALUES (?, ?, ?, ?)");
$stmt->execute([$_SESSION['user_id'], $spot_id, $fish_name, $weight_kg]);

echo json_encode(['success' => true]);
