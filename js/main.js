// Ereteti Dairy Sacco - main.js
// Plain JavaScript, no framework. Linked with defer from every page,
// so each feature first checks that its elements exist on the page
// and quietly skips that feature if they do not.

// ---------- Delivery form: member-number check, litres check, submit guard ----------
// The form on deliveries.php has id "delivery-form". Its fields are
// member, delivery-date, session and litres.

var deliveryForm = document.getElementById("delivery-form");
var member = document.getElementById("member");
var litres = document.getElementById("litres");
var memberMessage = document.getElementById("member-message");
var litresMessage = document.getElementById("litres-message");

function checkMember() {
    // Member number must look like ER-0001: ER- followed by exactly 4 digits.
    var pattern = /^ER-[0-9]{4}$/;
    if (!member) { return; }
    if (!pattern.test(member.value.trim())) {
        member.classList.add("invalid");
        if (memberMessage) { memberMessage.textContent = "A member number looks like ER-0001."; }
    } else {
        member.classList.remove("invalid");
        if (memberMessage) { memberMessage.textContent = ""; }
    }
}

function checkLitres() {
    // Litres must be a number greater than 0 and not more than 60.
    if (!litres) { return; }
    var value = Number(litres.value);
    if (litres.value === "" || isNaN(value) || value <= 0 || value > 60) {
        litres.classList.add("invalid");
        if (litresMessage) { litresMessage.textContent = "Litres must be more than 0 and at most 60."; }
    } else {
        litres.classList.remove("invalid");
        if (litresMessage) { litresMessage.textContent = ""; }
    }
}

function recordDelivery(event) {
    checkMember();
    checkLitres();
    if (member && member.classList.contains("invalid")) {
        event.preventDefault(); // stop: the member number is wrong
        member.focus();
    } else if (litres && litres.classList.contains("invalid")) {
        event.preventDefault(); // stop: the litres are wrong
        litres.focus();
    }
    // nothing wrong: the form goes on to process-delivery.php
}

if (deliveryForm) {
    deliveryForm.addEventListener("submit", recordDelivery);
}

// ---------- Routes search filter (routes.html) ----------

var routeSearch = document.getElementById("routeSearch");

if (routeSearch) {
    routeSearch.addEventListener("input", function () {
        var text = routeSearch.value.toLowerCase().trim();
        var routes = document.querySelectorAll(".route");
        routes.forEach(function (routeSection) {
            // A route section stays visible if its own text contains
            // the typed text, or if any of its centres does.
            var sectionText = routeSection.textContent.toLowerCase();
            var sectionMatches = text === "" || sectionText.indexOf(text) !== -1;
            routeSection.style.display = sectionMatches ? "" : "none";
            // Inside a visible section, hide only the centre items
            // that do not match, so the matching centres stand out.
            var centres = routeSection.querySelectorAll(".centre");
            centres.forEach(function (centre) {
                var centreMatches = text === "" || centre.textContent.toLowerCase().indexOf(text) !== -1;
                centre.style.display = centreMatches ? "" : "none";
            });
        });
    });
}

// ---------- Members search filter (members.html) ----------

var memberSearch = document.getElementById("memberSearch");

if (memberSearch) {
    memberSearch.addEventListener("input", function () {
        var text = memberSearch.value.toLowerCase().trim();
        var rows = document.querySelectorAll("#membersTable tbody tr");
        rows.forEach(function (row) {
            // Match against the member number (first cell) or the name (second cell).
            var number = row.cells[0] ? row.cells[0].textContent.toLowerCase() : "";
            var name = row.cells[1] ? row.cells[1].textContent.toLowerCase() : "";
            var matches = text === "" || number.indexOf(text) !== -1 || name.indexOf(text) !== -1;
            row.style.display = matches ? "" : "none";
        });
    });
}

// ---------- Table total: deliveries ----------

// On page load, add up the Litres column and write the total into the
// footer cell. Only rows marked Accepted (Yes) count towards the total.
// The guard also stops a day with no deliveries from throwing an error.
(function computeAcceptedTotalOnLoad() {
    var totalCell = document.getElementById("accepted-total") || document.getElementById("litresTotal");
    if (!totalCell) {
        return;
    }
    var total = 0;
    var rows = document.querySelectorAll(".table-scroll table tbody tr, #deliveriesTable tbody tr");
    rows.forEach(function (row) {
        var cells = row.cells;
        if (cells.length > 4 && cells[4].textContent === "Yes") {
            var litresCell = cells[3];
            if (litresCell) {
                total += Number(litresCell.textContent) || 0;
            }
        }
    });
    totalCell.textContent = total.toFixed(2);
})();
