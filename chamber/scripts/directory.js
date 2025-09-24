
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


const menuButton = document.getElementById("menuButton");
const nav = document.querySelector("header nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("show");
    menuButton.textContent = menuButton.textContent === "☰" ? "✖" : "☰";
});


document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".business-cards");

    const response = await fetch("data/members.json");
    const data = await response.json();

    data.businesses.forEach(biz => {
        const article = document.createElement("article");
        article.classList.add("business");

        article.innerHTML = `
            <img src="${biz.image}" alt="${biz.name}">
            <h3>${biz.name}</h3>
            <p>${biz.description}</p>
            <p><strong>Email:</strong> ${biz.email}</p>
            <p><strong>Phone:</strong> ${biz.phone}</p>
            <p><strong>Website:</strong> <a href="http://${biz.website}" target="_blank">${biz.website}</a></p>
        `;

        container.appendChild(article);
    });
});

