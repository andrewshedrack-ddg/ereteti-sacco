<?php
// Not every page opens the database, so close the connection only if it exists.
if (isset($conn)) { mysqli_close($conn); }
?>
<footer>
<p>Ereteti Dairy Sacco, PO Box 4021, Ngong.</p>
<p>Site built by Andrew Shedrack Anderson, DBT Year 1, 2026.</p>
</footer>
</body>
</html>
