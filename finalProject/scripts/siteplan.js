document.addEventListener("DOMContentLoaded", () => {
  const currentYearSpan = document.querySelector("#currentyear");
  const lastModifiedParagraph = document.querySelector("#lastModified");
  const visitMessage = document.querySelector("#visitMessage");

  const socialLinks = [
    { name: "Facebook", url: "https://facebook.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "Instagram", url: "https://instagram.com" }
  ];

  // show year
  function updateYear() {
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }
  }

  // show las modified
  function showLastModified() {
    if (lastModifiedParagraph) {
      const modified = new Date(document.lastModified);
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "medium"
      }).format(modified);
      lastModifiedParagraph.innerHTML = `Last Modified: <span class="highlight">${formatted}</span>`;
    }
  }

  //saved and show visits
  function handleVisits() {
    let visits = Number(localStorage.getItem("visits")) || 0;
    visits++;
    localStorage.setItem("visits", visits);
    
    if (visitMessage) {
      visitMessage.textContent = visits === 1
        ? `Welcome! This is your first visit.`
        : `Welcome back! You have visited ${visits} times.`;
    }
  }

  // show social links dynamically
  function displaySocialLinks() {
    const container = document.querySelector(".socialmedia");
    if (container) {
      container.innerHTML = "";
      socialLinks.forEach(link => {
        const a = document.createElement("a");
        a.href = link.url;
        a.target = "_blank";
        a.textContent = link.name;
        container.appendChild(a);
      });
    }
  }

  updateYear();
  showLastModified();
  handleVisits();
  
});
