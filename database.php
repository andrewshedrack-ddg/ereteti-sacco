<?php
require_once 'includes/db.php';

$sql = "SELECT farmer_id, member_no, CONCAT(first_name, ' ', last_name) AS name, phone, route_id FROM farmer ORDER BY first_name, last_name";
$result = mysqli_query($conn, $sql);
?>
