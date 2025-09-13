<?php

require_once '../../config/database.php';

$db = (new Database())->connect();
$stmt = $db->query("
    SELECT s.id, s.name, s.city, s.country, u.username, COUNT(c.id) as catch_count
    FROM spots s
    LEFT JOIN catches c ON c.spot_id = s.id
    LEFT JOIN users u ON u.id = s.user_id
    GROUP BY s.id, s.name, u.username
    ORDER BY catch_count DESC
    LIMIT 20
");

$popular_spots = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($popular_spots);
