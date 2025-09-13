<?php

require_once '../../config/database.php';
require_once '../../config/session.php';

if (!is_logged_in()) {
    http_response_code(401);
    echo json_encode([
        'error' => 'Unauthorized',
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];
$db = (new Database())->connect();

// Najcięższa ryba
$stmt = $db->prepare("SELECT MAX(weight_kg) AS max_weight FROM catches WHERE user_id = ?");
$stmt->execute([$user_id]);
$max_weight = $stmt->fetchColumn();

// Liczba ryb
$stmt = $db->prepare("SELECT COUNT(*) FROM catches WHERE user_id = ?");
$stmt->execute([$user_id]);
$total_fish = $stmt->fetchColumn();

// Ulubiony spot
$stmt = $db->prepare("
    SELECT s.name FROM catches c
    JOIN spots s ON s.id = c.spot_id
    WHERE c.user_id = ?
    GROUP BY s.id
    ORDER BY COUNT(*) DESC
    LIMIT 1
");
$stmt->execute([$user_id]);
$favorite_spot = $stmt->fetchColumn();

// Liczba dodanych spotów
$stmt = $db->prepare("SELECT COUNT(*) FROM spots WHERE user_id = ?");
$stmt->execute([$user_id]);
$total_spots = $stmt->fetchColumn();

// Ostatnie ryby
$stmt = $db->prepare("SELECT fish_name, weight_kg, caught_at FROM catches WHERE user_id = ? ORDER BY caught_at DESC LIMIT 5");
$stmt->execute([$user_id]);
$recent_fish = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmt = $db->prepare("SELECT username, role FROM users WHERE id = ?");
$stmt->execute([$user_id]);
$current_user = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    'max_weight' => $max_weight,
    'total_fish' => $total_fish,
    'favorite_spot' => $favorite_spot,
    'total_spots' => $total_spots,
    'recent_fish' => $recent_fish,
    'current_user' => $current_user,
]);
