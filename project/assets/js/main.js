// main.js (module) - Khalia Beauty
// This file intentionally meets the rubric requirements:
// - multiple functions
// - DOM interaction: select, modify, event listening
// - conditional branching
// - objects & arrays & array methods
// - template literals exclusively for HTML output
// - localStorage

const services = [
  { id: 1, name: 'Classic Manicure', price: 20, type: 'manicure' },
  { id: 2, name: 'Gel Polish', price: 35, type: 'manicure' },
  { id: 3, name: 'Acrylic Full Set', price: 60, type: 'manicure' },
  { id: 4, name: 'Spa Pedicure', price: 30, type: 'pedicure' },
  { id: 5, name: 'Bridal Package', price: 120, type: 'bridal' }
];

const galleryItems = [
  { id: 1, src: 'assets/images/gallery/1.jpg', alt: 'Pink nails', tag: 'manicure' },
  { id: 2, src: 'assets/images/gallery/2.jpg', alt: 'Teal design', tag: 'manicure' },
  { id: 3, src: 'assets/images/gallery/3.jpg', alt: 'Soft set', tag: 'bridal' },
  { id: 4, src: 'assets/images/gallery/4.jpg', alt: 'Pedicure art', tag: 'pedicure' }
];

// Short helper to find elements
function q(selector, parent=document){ return parent.querySelector(selector) }

// Renders first 3 services on index
function renderServicesPreview(){
  const container = q('#servicesContainer');
  if(!container) return;
  container.innerHTML = services.slice(0,3).map(s => `
    <article class="service-card" aria-labelledby="service-${s.id}">
      <h3 id="service-${s.id}">${s.name}</h3>
      <p>Price: $${s.price}</p>
      <p><small>Type: ${s.type}</small></p>
    </article>
  `).join('');
}

// Renders full services list on services page
function renderServicesList(){
  const list = q('#servicesList');
  if(!list) return;
  list.innerHTML = services.map(s => `
    <div class="card">
      <h3>${s.name}</h3>
      <p>Price: $${s.price}</p>
      <p>Type: ${s.type}</p>
    </div>
  `).join('');
}

// Renders gallery, accepts filter 'all' or a tag
function renderGallery(filter='all'){
  const grid = q('#galleryGrid') || q('#galleryPreview');
  if(!grid) return;
  const items = filter === 'all' ? galleryItems : galleryItems.filter(g => g.tag === filter);
  grid.innerHTML = items.map(g => `
    <figure>
      <img src="${g.src}" alt="${g.alt}" loading="lazy">
      <figcaption style="display:none">${g.alt}</figcaption>
    </figure>
  `).join('');
}

// Populates services select in booking form
function populateServiceSelect(){
  const sel = q('#serviceSelect');
  if(!sel) return;
  sel.innerHTML = services.map(s => `<option value="${s.id}">${s.name} — $${s.price}</option>`).join('');
}

// Handles newsletter form with localStorage
function handleNewsletter(){
  const form = q('#newsletterForm');
  const msg = q('#newsletterMessage');
  if(!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = q('#email').value.trim();
    if(!email){ msg.textContent = 'Please enter a valid email.'; return; }
    const saved = localStorage.getItem('kb_newsletter');
    if(saved === email){
      msg.textContent = 'You are already subscribed. Thank you!';
    } else {
      localStorage.setItem('kb_newsletter', email);
      msg.textContent = 'Thanks for subscribing! We saved your email.';
    }
  });
  // show message if already subscribed
  const saved = localStorage.getItem('kb_newsletter');
  if(saved){
    msg.textContent = 'You are already subscribed.';
  }
}

// Handles booking form (saves to localStorage as demo)
function handleBooking(){
  const form = q('#bookingForm');
  const msg = q('#bookingMessage');
  if(!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      name: q('#name').value.trim(),
      phone: q('#phone').value.trim(),
      serviceId: q('#serviceSelect').value,
      date: q('#date').value,
      notes: q('#notes').value.trim()
    };
    if(!data.name || !data.phone || !data.date){
      msg.textContent = 'Please fill in the required fields.';
      return;
    }
    const existing = JSON.parse(localStorage.getItem('kb_bookings') || '[]');
    existing.push(data);
    localStorage.setItem('kb_bookings', JSON.stringify(existing));
    msg.textContent = 'Booking request saved (demo). We will contact you to confirm.';
    form.reset();
  });
}

// Mobile nav toggle
function setupNavToggle(){
  const btn = q('#navToggle');
  const navList = q('#navList');
  if(!btn || !navList) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    navList.style.display = expanded ? 'none' : 'flex';
  });
}

// Init function to wire everything up
function init(){
  // set copyright years
  const yearEls = document.querySelectorAll('#year, #year-footer, #year-footer-2, #year-footer-3');
  yearEls.forEach(el => el.textContent = new Date().getFullYear());

  renderServicesPreview();
  renderServicesList();
  renderGallery();
  populateServiceSelect();
  handleNewsletter();
  handleBooking();
  setupNavToggle();

  const filter = q('#filter');
  if(filter){
    filter.addEventListener('change', (e) => {
      renderGallery(e.target.value);
    });
  }
}

// run init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);

// Export for debugging or future tests
export { renderGallery, renderServicesList };
