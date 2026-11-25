<?php
require_once 'includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $phone = trim($_POST['phone']);
    $route_id = (int) $_POST['route_id'];

    // Split the full name: the first word is the first name, the rest is the last name.
    $parts = explode(' ', $name, 2);
    $first_name = $parts[0];
    $last_name = isset($parts[1]) ? $parts[1] : '';

    // Work out the next member number, e.g. ER-0009 after ER-0008.
    $max_sql = "SELECT MAX(CAST(SUBSTRING(member_no, 4) AS UNSIGNED)) AS max_no FROM farmer";
    $max_result = mysqli_query($conn, $max_sql);
    $max_row = mysqli_fetch_assoc($max_result);
    $next_no = (int) $max_row['max_no'] + 1;
    $member_no = sprintf('ER-%04d', $next_no);

    // The form collects only name, phone and route, but the farmer table
    // requires a unique national_id, so the phone is stored there.
    $stmt = mysqli_prepare($conn, "INSERT INTO farmer (member_no, first_name, last_name, national_id, phone, route_id, date_joined) VALUES (?, ?, ?, ?, ?, ?, CURDATE())");
    mysqli_stmt_bind_param($stmt, 'sssssi', $member_no, $first_name, $last_name, $phone, $phone, $route_id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    header('Location: members.php');
    exit;
}

$page_title = 'Add a new farmer';
require_once 'includes/header.php';
?>
<main>
<h2>Add a new farmer</h2>
<p>Fill in the farmer's details to add them to the sacco.</p>

<form method="post" action="">
<label for="name">Full name</label>
<input type="text" id="name" name="name" required>

<label for="phone">Phone</label>
<input type="tel" id="phone" name="phone" required>

<label for="route">Route</label>
<select id="route" name="route_id" required>
<option value="1">Kiserian</option>
<option value="2">Ngong</option>
<option value="3">Rongai</option>
</select>

<button type="submit">Save farmer</button>
</form>
</main>
<?php require_once 'includes/footer.php'; ?>
