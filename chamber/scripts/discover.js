// scripts/discover.js  
const currentYearSpan = document.querySelector("#currentyear");
const lastModifiedParagraph = document.querySelector("#lastModified");
const menuButton = document.getElementById("menuButton");
const nav = document.querySelector("header nav");

const today = new Date();
if (currentYearSpan) currentYearSpan.textContent = today.getFullYear();

if (lastModifiedParagraph) {
  const modified = new Date(document.lastModified);
  const formatted = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(modified);
  lastModifiedParagraph.innerHTML = `Last Modified: <span class="highlight">${formatted}</span>`;
}

/* ===== menu responsive  ===== */
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("show");
    menuButton.textContent = menuButton.textContent === "☰" ? "✖" : "☰";
  });

  // close menu
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("show");
      menuButton.textContent = "☰";
    })
  );
}

/* load attractions */
async function loadAttractions() {
  const container = document.querySelector(".cards-container");
  if (!container) return;

  try {
    const res = await fetch("./data/places.json");
    if (!res.ok) throw new Error("Failed to fetch attractions JSON");
    const json = await res.json();
    const attractions = json.huancayo_attractions || [];

    attractions.slice(0, 8).forEach((item, index) => {
      // create card
      const article = document.createElement("article");
      article.className = "place-card";
      // set named 
      article.style.gridArea = `card${index + 1}`;

      // build inner markup: h2, figure, address, p, button
      const title = document.createElement("h2");
      title.textContent = item.name;

      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = item.photo_url || item.photo || "images/placeholder.webp";
      img.alt = item.name || "Attraction image";
      img.loading = "lazy";
      figure.appendChild(img);

      const addr = document.createElement("address");
      addr.textContent = item.address || "";

      const desc = document.createElement("p");
      desc.textContent = item.description || item.cost || "";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "Learn More";
      btn.addEventListener("click", () => {
        // example: could open modal or link — por ahora un alerta
        alert(`${item.name}\n\n${item.description || ""}`);
      });

      // assemble
      article.appendChild(title);
      article.appendChild(figure);
      article.appendChild(addr);
      article.appendChild(desc);
      article.appendChild(btn);

      container.appendChild(article);
    });
  } catch (err) {
    console.error("Error loading attractions:", err);
    container.innerHTML = "<p>Unable to load attractions at this time.</p>";
  }
}

/* localStorage   */
function handleVisitMessage() {
  const visitMessageEl = document.getElementById("visitMessage");
  if (!visitMessageEl) return;

  const last = localStorage.getItem("lastVisitTimestamp");
  const now = Date.now();

  if (!last) {
    visitMessageEl.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const msDiff = now - Number(last);
    const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    if (msDiff < 1000 * 60 * 60 * 24) {
      // less than 1 day
      visitMessageEl.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
      visitMessageEl.textContent = `You last visited 1 day ago.`;
    } else {
      visitMessageEl.textContent = `You last visited ${days} days ago.`;
    }
  }

  localStorage.setItem("lastVisitTimestamp", now.toString());
}

loadAttractions();
handleVisitMessage();
