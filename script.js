// ==============================
// MOBILE MENU
// ==============================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navMenu.classList.contains("active")) {
        icon.className = "ri-close-line";
    } else {
        icon.className = "ri-menu-line";
    }
});


// Tutup menu setelah memilih navigasi

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");

        const icon = menuBtn.querySelector("i");
        icon.className = "ri-menu-line";
    });
});


// ==============================
// DARK / LIGHT MODE
// ==============================

const themeBtn = document.getElementById("themeBtn");
const themeIcon = themeBtn.querySelector("i");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeIcon.className = "ri-sun-line";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeIcon.className = "ri-sun-line";

    } else {

        localStorage.setItem("theme", "light");

        themeIcon.className = "ri-moon-line";
    }
});


// ==============================
// PROGRESS TUGAS
// ==============================

const taskCheckboxes = document.querySelectorAll(
    '.task-item input[type="checkbox"]'
);

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

function updateProgress() {

    const total = taskCheckboxes.length;

    let completed = 0;

    taskCheckboxes.forEach(checkbox => {

        if (checkbox.checked) {
            completed++;
        }

        const parent = checkbox.closest(".task-item");
        const status = parent.querySelector("small");

        if (checkbox.checked) {
            status.textContent = "Selesai";
        } else {
            status.textContent = "Belum";
        }
    });

    const percentage = Math.round((completed / total) * 100);

    progressFill.style.width = percentage + "%";
    progressText.textContent = percentage + "%";
}


// Jalankan saat checkbox berubah

taskCheckboxes.forEach(checkbox => {

    checkbox.addEventListener("change", updateProgress);

});


// Jalankan pertama kali

updateProgress();


// ==============================
// ANIMASI SCROLL
// ==============================

const cards = document.querySelectorAll(
    ".member-card, .material-card, .photo-placeholder"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.1
    }
);


cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";
    card.style.transition = "opacity .6s ease, transform .6s ease";

    observer.observe(card);

});