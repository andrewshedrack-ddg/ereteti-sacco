# Lab 6 — my answers

Name: Andrew Shedrack Anderson · Admission number: 227177

1. In process-delivery.php, the browser already checks the member number. Why does PHP check it again? Name one way the browser's check can be skipped.

   The browser check runs in JavaScript on the visitor's own computer, so the visitor can switch it off or go around it. PHP runs on the server, which the visitor cannot change, so the server check is the one that really protects the data. One way to skip the browser check is to turn off JavaScript in the browser, so the form is sent without any of the checks running.

2. In my INSERT, bind_param has the letters 'issd'. What does each letter stand for, and which value does it go with?

   Each letter tells MySQL what kind of value is coming, in the same order as the four question marks. i stands for integer and goes with farmer_id, s stands for string and goes with delivery_date, the second s stands for string and goes with session (MORNING or EVENING), and d stands for double, a decimal number, and goes with litres.

3. Why is Delete a small form sent by post, while Edit is a link?

   Edit is a link because it only opens a page to show the form; it changes nothing in the database, so it is safe to visit. Delete changes the database, so it must be a small form sent by post. A link could be followed by mistake, for example by a search engine crawling the site or a browser fetching the page early, and that would delete a delivery nobody asked to delete.

4. Someone opens deliveries.php?date=' OR '1'='1 on my site. What happens, and why does my prepared statement not run it as SQL?

   The page shows "No deliveries recorded on this day." My prepared statement keeps the SQL and the typed value apart: the SQL is sent first with a question mark where the date goes, and the typed text is sent afterwards as a plain value. So the database looks for a delivery whose date is literally the text ' OR '1'='1, finds none, and the OR part is never run as SQL.
