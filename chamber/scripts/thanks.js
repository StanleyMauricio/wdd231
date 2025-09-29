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
  // ===============================
  // DISPLAY SUBMITTED DATA
  // ===============================
  const infoDiv = document.getElementById('submitted-info');
  if (infoDiv) {
    const params = new URLSearchParams(window.location.search);

    const firstname = params.get('firstname');
    const lastname = params.get('lastname');
    const title = params.get('title');
    const email = params.get('email');
    const phone = params.get('phone');
    const organization = params.get('organization');
    const membership = params.get('membership');
    const description = params.get('description');
    const timestamp = params.get('timestamp');

    if (firstname && lastname) {
      infoDiv.innerHTML = `
        <ul>
          <li><strong>First Name:</strong> ${firstname}</li>
          <li><strong>Last Name:</strong> ${lastname}</li>
          <li><strong>Title:</strong> ${title}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Mobile Phone:</strong> ${phone}</li>
          <li><strong>Organization:</strong> ${organization}</li>
          <li><strong>Membership:</strong> ${membership}</li>
          <li><strong>Description:</strong> ${description || '(none)'}</li>
          <li><strong>Submitted At:</strong> ${timestamp}</li>
        </ul>
      `;
    } else {
      infoDiv.innerHTML = `<p>No form data found. Please go back and fill out the application form.</p>`;
    }
  }
