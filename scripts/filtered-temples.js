// Footer Year + Last Modified (IDs match HTML)
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.querySelector("#lastModified");
if (lastModEl) lastModEl.textContent = document.lastModified || new Date().toString();

// Hamburger Menu Toggle (uses main-nav)
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#main-nav");
if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    navMenu.style.display = expanded ? "none" : "flex";
    menuButton.textContent = expanded ? "☰" : "✖";
  });
}

// Temple data
const temples = [
  { templeName: "Aba Nigeria", location: "Aba, Nigeria", dedicated: "2005, August, 7", area: 11500, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg" },
  { templeName: "Manti Utah", location: "Manti, Utah, United States", dedicated: "1888, May, 21", area: 74792, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg" },
  { templeName: "Payson Utah", location: "Payson, Utah, United States", dedicated: "2015, June, 7", area: 96630, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg" },
  { templeName: "Yigo Guam", location: "Yigo, Guam", dedicated: "2020, May, 2", area: 6861, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg" },
  { templeName: "Washington D.C.", location: "Kensington, Maryland, United States", dedicated: "1974, November, 19", area: 156558, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg" },
  { templeName: "Lima Perú", location: "Lima, Perú", dedicated: "1986, January, 10", area: 9600, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg" },
  { templeName: "Mexico City Mexico", location: "Mexico City, Mexico", dedicated: "1983, December, 2", area: 116642, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg" },
  { templeName: "Accra Ghana", location: "Accra, Ghana", dedicated: "2004, January, 11", area: 8420, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/61/Accra_LDS_Temple.jpg" },
  { templeName: "Tokyo Japan", location: "Tokyo, Japan", dedicated: "1980, October, 27", area: 78000, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo-temple.jpeg" },
  { templeName: "Santiago Chile", location: "Santiago, Chile", dedicated: "2000, September, 9", area: 92000, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/santiago-chile/400x250/santiago-chile-temple.jpeg" }
];

// parse year from dedicated string
function getYear(dedicatedStr) {
  if (!dedicatedStr) return NaN;
  const parts = dedicatedStr.split(',').map(s => s.trim());
  const num = parseInt(parts[0], 10);
  if (!isNaN(num)) return num;
  for (const p of parts) {
    const y = parseInt(p, 10);
    if (!isNaN(y)) return y;
  }
  return NaN;
}

// create a card element for a temple
function createTempleCard(t) {
  const figure = document.createElement('figure');
  figure.classList.add('temple-card');

  const img = document.createElement('img');
  img.src = t.imageUrl;
  img.alt = t.templeName + ' exterior';
  img.loading = 'lazy';
  img.classList.add('temple-image');
  figure.appendChild(img);

  const figcap = document.createElement('figcaption');
  figcap.classList.add('temple-caption');
  figcap.innerHTML = `
      <strong>${t.templeName}</strong><br/>
      <span>${t.location}</span><br/>
      Dedicated: ${t.dedicated}<br/>
      Area: ${t.area.toLocaleString()} sq ft`;
  figure.appendChild(figcap);

  figure.dataset.year = getYear(t.dedicated);
  figure.dataset.area = t.area;

  return figure;
}

const listEl = document.getElementById('temple-list');
const countEl = document.getElementById('count');

function render(templesToShow) {
  if (!listEl) return console.error('No #temple-list element found');
  listEl.innerHTML = '';
  if (!templesToShow || templesToShow.length === 0) {
    const p = document.createElement('p');
    p.className = 'no-results';
    p.textContent = 'No temples match that filter.';
    listEl.appendChild(p);
    if (countEl) countEl.textContent = '0';
    return;
  }
  const frag = document.createDocumentFragment();
  templesToShow.forEach(t => frag.appendChild(createTempleCard(t)));
  listEl.appendChild(frag);
  if (countEl) countEl.textContent = templesToShow.length;
}

// initial render
render(temples);

// filtering logic
function filterByKey(key) {
  switch (key) {
    case 'all': return temples;
    case 'old': return temples.filter(t => getYear(t.dedicated) < 1900);
    case 'new': return temples.filter(t => getYear(t.dedicated) > 2000);
    case 'large': return temples.filter(t => t.area > 90000);
    case 'small': return temples.filter(t => t.area < 10000);
    default: return temples;
  }
}

// nav link behavior (works with <a data-filter> links)
const nav = document.getElementById('main-nav');
if (nav) {
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-filter]');
    if (!link) return;
    e.preventDefault(); 

    // update pressed state (use aria-pressed on links)
    nav.querySelectorAll('a[data-filter]').forEach(a => a.setAttribute('aria-pressed', 'false'));
    link.setAttribute('aria-pressed', 'true');

    // filter and render
    const key = link.dataset.filter;
    const base = filterByKey(key);
    const qEl = document.getElementById('search');
    const q = qEl ? qEl.value.trim().toLowerCase() : '';
    const final = base.filter(t => (!q) || (t.templeName.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)));
    render(final);
  });
}

// live search
const search = document.getElementById('search');
if (search && nav) {
  search.addEventListener('input', () => {
    const activeLink = nav.querySelector('a[aria-pressed="true"]');
    const activeKey = activeLink ? activeLink.dataset.filter : 'all';
    const results = filterByKey(activeKey);
    const q = search.value.trim().toLowerCase();
    const final = results.filter(t => (!q) || (t.templeName.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)));
    render(final);
  });
}

// keyboard accessibility for nav links
if (nav) {
  nav.querySelectorAll('a[data-filter]').forEach(link => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });
}
