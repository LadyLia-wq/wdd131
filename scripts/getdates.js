// scripts/getdates.js

// Get the current year and display it
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Get the document's last modified date and display it
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;
