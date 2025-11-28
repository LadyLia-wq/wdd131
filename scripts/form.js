// Product array - id used as value, name used as option label.
// Replace or extend with the provided array if your instructor gave one.
const products = [
  { id: "p-01", name: "Rubia Solar Light Model A" },
  { id: "p-02", name: "Rubia Solar Light Model B" },
  { id: "p-03", name: "Magdelena Smart Thermostat" },
  { id: "p-04", name: "Francesco Water Filter" },
  { id: "p-05", name: "Madagascar EcoSpeaker" }
];

// Footer year and last modified
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified || "Unknown";

document.addEventListener("DOMContentLoaded", () => {
  // populate select
  const select = document.getElementById("productSelect");
  products.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;   // requirement: value attribute is the product id
    opt.textContent = p.name;
    select.appendChild(opt);
  });

  // optional: simple client-side validation UI for date + rating on submit
  const form = document.getElementById("reviewForm");
  form.addEventListener("submit", (e) => {
    // Let the browser handle "required". This listener only ensures better UX for unsupported date formats.
    // If you want to add custom checks, do them here and call e.preventDefault() if invalid.
    // Example: ensure a selection other than placeholder was made:
    if (!select.value) {
      e.preventDefault();
      select.focus();
      alert("Please select a product.");
      return false;
    }
    // rating required is on the radio inputs; browser should enforce it.
    return true;
  });
});
