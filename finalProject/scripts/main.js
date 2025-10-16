import { createModal } from './modal.js';
import { saveFavorite, getFavorites } from './local.js';

document.addEventListener('DOMContentLoaded', () => {
  updateFooterInfo();
  setupMenuToggle();
  init();
});

//  Initialize
async function init() {
  try {
    const items = await fetchItems();
    renderItems(items);
    restoreFavoritesUI();
  } catch (err) {
    console.error('Error initializing the app:', err);
    const grid = document.querySelector('#dynamicGrid');
    if (grid) {
      grid.innerHTML = `<p class="error">Failed to load items. Please try reloading the page.</p>`;
    }
  }
}

//  Load local JSON
async function fetchItems() {
  try {
    const res = await fetch('data/items.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length < 1)
      throw new Error('Invalid or empty data');
    return data;
  } catch (error) {
    console.error('fetchItems error:', error);
    throw error;
  }
}

//  Render dynamic cards
function renderItems(items) {
  const grid = document.querySelector('#dynamicGrid');
  if (!grid) {
    console.warn('No #dynamicGrid found in the DOM');
    return;
  }

  grid.innerHTML = '';
  const slice = items.slice(0, 15);

  slice.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <img src="images/placeholder.webp" alt="${item.name}" loading="lazy" width="400" height="240">
      <div class="card-body">
        <h4>${item.name}</h4>
        <p><strong>Region:</strong> ${item.region}</p>
        <p><strong>Type:</strong> ${item.type}</p>
        <p class="muted"><strong>Year:</strong> ${item.yearEstablished}</p>
        <div class="card-actions">
          <button class="btn-details" data-id="${item.id}">View Details</button>
          <button class="btn-fav" data-id="${item.id}" aria-pressed="false">🤍 Favorite</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Listeners to open modal
  grid.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(e.currentTarget.dataset.id);
      openDetailsModal(id);
    });
  });

  // Listeners for favorites
  grid.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const pressed = e.currentTarget.getAttribute('aria-pressed') === 'true';
      const newState = !pressed;
      e.currentTarget.setAttribute('aria-pressed', String(newState));
      saveFavorite(id, newState);
      e.currentTarget.textContent = newState ? ' Favorite' : ' Favorite';
    });
  });
}

//  Show details in modal
async function openDetailsModal(id) {
  try {
    const items = await fetchItems();
    const item = items.find(i => i.id === id);
    if (!item) throw new Error('Item not found');

    const modal = createModal();
    modal.setContent(`
      <h2>${item.name}</h2>
      <p><strong>Region:</strong> ${item.region}</p>
      <p><strong>Type:</strong> ${item.type}</p>
      <p><strong>Material:</strong> ${item.material}</p>
      <p>${item.description}</p>
      <div class="modal-actions">
        <button id="closeModalBtn" class="btn-primary">Close</button>
      </div>
    `);
    modal.open();

    document.getElementById('closeModalBtn').addEventListener('click', () => modal.close());
  } catch (err) {
    console.error('openDetailsModal error:', err);
    alert('Unable to display the information. Check the console for details.');
  }
}

//  Restore favorites from localStorage
function restoreFavoritesUI() {
  const favs = getFavorites();
  if (!favs || !favs.length) return;

  document.querySelectorAll('.btn-fav').forEach(btn => {
    const id = Number(btn.dataset.id);
    if (favs.includes(id)) {
      btn.setAttribute('aria-pressed', 'true');
      btn.textContent = ' Favorite';
    }
  });
}

/* Year, last modified date, and hamburger menu */
function updateFooterInfo() {
  const currentYearSpan = document.querySelector("#currentyear");
  const lastModifiedParagraph = document.querySelector("#lastModified");

  const today = new Date();

  if (currentYearSpan) {
    currentYearSpan.textContent = today.getFullYear();
  }

  if (lastModifiedParagraph) {
    const modified = new Date(document.lastModified);
    const formatted = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "medium"
    }).format(modified);
    lastModifiedParagraph.innerHTML = `Last Modified: <span class="highlight">${formatted}</span>`;
  }
}

function setupMenuToggle() {
  const menuButton = document.getElementById("menuButton");
  const nav = document.querySelector("header nav");

  if (!menuButton || !nav) return;

  menuButton.addEventListener("click", () => {
    nav.classList.toggle("show");
    menuButton.textContent = menuButton.textContent === "☰" ? "✖" : "☰";
  });
}
