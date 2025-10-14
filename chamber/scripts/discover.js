
import{places}from"../data/places.mjs";
console.log(places);
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

const menuButton = document.getElementById("menuButton");0
const nav = document.querySelector("header nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("show");
    menuButton.textContent = menuButton.textContent === "☰" ? "✖" : "☰";
});
// === RENDERIZAR PLACES (similar a discover.js) ===
const cardsContainer = document.querySelector(".cards-container");

if (cardsContainer && Array.isArray(places)) {
  places.forEach((place) => {
    const card = document.createElement("section");
    card.classList.add("place-card");

    card.innerHTML = `
      <img src="${place.image}" alt="${place.name}" loading="lazy">
      <h3>${place.name}</h3>
      <p><strong>Address:</strong> ${place.address}</p>
      <p><strong>Phone:</strong> ${place.phone}</p>
      <p><strong>Website:</strong> <a href="${place.website}" target="_blank">${place.website}</a></p>
      <p>${place.info}</p>
      <p class="membership">Membership Level: ${place.membership}</p>
    `;

    cardsContainer.appendChild(card);
  });
}

// === CONTADOR DE VISITAS (feature de discover.js) ===
const visitDisplay = document.querySelector("#visitCount");
const lastVisitDisplay = document.querySelector("#lastVisit");

if (visitDisplay && lastVisitDisplay) {
  const lastVisit = localStorage.getItem("lastVisitDate");
  const currentVisit = today.getTime();

  if (lastVisit) {
    const daysPassed = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
    lastVisitDisplay.textContent = `Days since last visit: ${daysPassed}`;
  } else {
    lastVisitDisplay.textContent = "Welcome! This is your first visit.";
  }

  // Actualiza el contador de visitas
  let visitCount = Number(localStorage.getItem("visitCount")) || 0;
  visitCount++;
  visitDisplay.textContent = `Visit count: ${visitCount}`;
  localStorage.setItem("visitCount", visitCount);
  localStorage.setItem("lastVisitDate", currentVisit);
}