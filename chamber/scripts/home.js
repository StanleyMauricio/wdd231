
// Footer dinámico

const currentYearSpan = document.querySelector("#currentyear");
const lastModifiedParagraph = document.querySelector("#lastModified");
const menuButton = document.getElementById("menuButton");
const nav = document.querySelector("nav");
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


// Menú responsive

menuButton.addEventListener("click", () => {
  nav.classList.toggle("show");
  menuButton.textContent = nav.classList.contains("show") ? "✖" : "☰";
});

// Miembros destacados
async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    const membershipLevels = {
      1: "Bronze",
      2: "Silver",
      3: "Gold"
    };

    const eligible = data.members.filter(m => m.membership === 2 || m.membership === 3);
    const shuffled = eligible.sort(() => 0.5 - Math.random());

    const randomCount = Math.floor(Math.random() * 2) + 2; // 2 o 3
    const selected = shuffled.slice(0, randomCount);

    const container = document.querySelector(".business-cards");
    container.innerHTML = "";

    selected.forEach(m => {
      const card = document.createElement("article");
      card.classList.add("business-card");

      card.innerHTML = `
        <img src="${m.image}" alt="${m.name}">
        <h3>${m.name}</h3>
        <p><strong>Membership:</strong> ${membershipLevels[m.membership]}</p>
        <p><strong>Phone:</strong> ${m.phone}</p>
        <p><strong>Address:</strong> ${m.address}</p>
        <p><a href="${m.website}" target="_blank">${m.website}</a></p>
        <p>${m.info}</p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading members:", error);
  }
}


const apiKey = "TU_API_KEY";
const lat = -12.0651; // Huancayo aprox
const lon = -75.2049;
const units = "metric"; // °C

async function loadWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    const response = await fetch(url);
    const data = await response.json();

    // Datos actuales 
    const current = data.list[0];
    const currentContainer = document.querySelector(".current-weather");
    currentContainer.innerHTML = `
      <h2>Current Weather</h2>
      <p><strong>Temperature:</strong> ${current.main.temp.toFixed(1)} °C</p>
      <p><strong>Condition:</strong> ${current.weather[0].description}</p>
    `;

    // Pronóstico 3 días 
    const forecastContainer = document.querySelector(".forecast");
    forecastContainer.innerHTML = "<h2>3-Day Forecast</h2>";
    const daily = {};

    data.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      if (!daily[date] && item.dt_txt.includes("12:00:00")) {
        daily[date] = item;
      }
    });

    Object.keys(daily).slice(0, 3).forEach(date => {
      const f = daily[date];
      const card = document.createElement("div");
      card.classList.add("forecast-day");
      card.innerHTML = `
        <p><strong>${date}</strong></p>
        <p>${f.main.temp.toFixed(1)} °C</p>
        <p>${f.weather[0].description}</p>
      `;
      forecastContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading weather:", error);
  }
}

// Inicializar

loadMembers();
loadWeather();
