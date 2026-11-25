<?php
$page_title = 'Members';
require_once 'includes/header.php';
require_once 'includes/db.php';

$sql = "SELECT farmer_id, member_no, CONCAT(first_name, ' ', last_name) AS name, phone, route_id FROM farmer ORDER BY first_name, last_name";
$result = mysqli_query($conn, $sql);
?>
<main>
<h2>Our members</h2>
<p>Any farmer on one of our three routes may join the sacco. To join, you need a national ID and a bank account. Once your membership number is issued, you may deliver milk from that very day. Around eight hundred farmers are members, and we pay every one of them once a month for every accepted litre.</p>

<label for="memberSearch">Search members</label>
<input type="search" id="memberSearch" placeholder="Search members by name or number">

<table id="membersTable">
<thead>
<tr>
<th>Member number</th>
<th>Name</th>
<th>Phone</th>
<th>Route</th>
</tr>
</thead>
<tbody>
<?php while ($row = mysqli_fetch_assoc($result)) { ?>
<tr>
<td><?php echo htmlspecialchars($row['member_no']); ?></td>
<td><?php echo htmlspecialchars($row['name']); ?></td>
<td><?php echo htmlspecialchars($row['phone']); ?></td>
<td><?php echo htmlspecialchars($row['route_id']); ?></td>
</tr>
<?php } ?>
</tbody>
</table>
</main>
<?php require_once 'includes/footer.php'; ?>
