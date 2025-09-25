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

menuButton.addEventListener("click", () => {
    nav.classList.toggle("show");
    if (menuButton.textContent === "☰") {
        menuButton.textContent = "✖";
    } else {
        menuButton.textContent = "☰";
    }
});

const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

const container = document.getElementById('courses-container');
const creditsDisplay = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.filter-btn');

// Función para crear y mostrar las tarjetas de cursos
function renderCourses(filteredCourses) {
    container.innerHTML = ''; 

    if (filteredCourses.length === 0) {
        container.innerHTML = '<p>No hay cursos para mostrar.</p>';
        creditsDisplay.textContent = 'Créditos totales: 0';
        return;
    }

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');

        // Determina la clase del ícono y el color del fondo
        const icon = course.completed ? '✅' : '';
        const cardClass = course.completed ? 'completed-card' : 'in-progress-card';
        card.classList.add(cardClass);

        card.innerHTML = `
            ${icon} ${course.subject} ${course.number}
        `;
        container.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsDisplay.textContent = `Total Credits: ${totalCredits}`;
}

// Escucha los clics en los botones de filtro
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remueve la clase 'active' de todos los botones
        filterButtons.forEach(b => b.classList.remove('active'));
        // Agrega la clase 'active' al botón que fue clicado
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        let filtered;

        if (filter === 'all') {
            filtered = courses;
        } else {
            filtered = courses.filter(course => course.subject === filter);
        }

        renderCourses(filtered);
    });
});


renderCourses(courses);