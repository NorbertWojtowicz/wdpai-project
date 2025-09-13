<?php

require_once '../../config/database.php';

$db = (new Database())->connect();
$stmt = $db->query("
    SELECT f.fish_name, f.weight_kg, f.caught_at, u.username, u.role, s.name as spot
    FROM catches f
    JOIN users u ON u.id = f.user_id
    LEFT JOIN spots s ON s.id = f.spot_id
    ORDER BY f.caught_at DESC
    LIMIT 50
");

$latest = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($latest);
