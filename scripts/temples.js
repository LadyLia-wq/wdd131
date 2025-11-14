// Footer Year
document.querySelector("#year").textContent = new Date().getFullYear();

// Last Modified
document.querySelector("#lastModified").textContent = document.lastModified;

// Hamburger Menu Toggle
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

menuButton.addEventListener("click", () => {
    const visible = navMenu.style.display === "flex";
    navMenu.style.display = visible ? "none" : "flex";

    // Change icon
    menuButton.textContent = visible ? "☰" : "✖";
});
