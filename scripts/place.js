// Footer year and last modified
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified || "Unknown";

// Hamburger behavior
const menuButton = document.querySelector("#menuButton");
const nav = document.querySelector("#mainNav");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "✖" : "☰";
});

/*
  Wind chill calculation (metric)
  Formula used (Celsius): 13.12 + 0.6215*T - 11.37*v**0.16 + 0.3965*T*v**0.16
  This is returned in one line as required.
*/
function calculateWindChill(tempC, windKmh) {
  return 13.12 + 0.6215 * tempC - 11.37 * (windKmh ** 0.16) + 0.3965 * tempC * (windKmh ** 0.16);
}

// static values (assignment requires static input for now)
const tempC = Number(document.querySelector("#tempValue").textContent); // 28
const windKmh = Number(document.querySelector("#windValue").textContent); // 12

// Only compute if conditions valid (metric: temp <= 10 °C and wind > 4.8 km/h)
const windchillEl = document.querySelector("#windchill");
if (tempC <= 10 && windKmh > 4.8) {
  // compute and show one decimal place
  const wc = calculateWindChill(tempC, windKmh);
  windchillEl.textContent = `${Math.round(wc * 10) / 10} °C`;
} else {
  windchillEl.textContent = "N/A";
}
