/* =========================================================
   HELMI BOUKHATEM PORTFOLIO
   Main JavaScript
   ========================================================= */


/* =========================================================
   INITIALIZE LUCIDE ICONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  if (window.lucide) {
    lucide.createIcons();
  }

});


/* =========================================================
   FOOTER YEAR
   ========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   DARK / LIGHT MODE
   ========================================================= */

const themeToggle = document.getElementById("theme-toggle");

function setTheme(theme) {

  if (theme === "light") {
    document.body.classList.add("light");

    themeToggle.innerHTML =
      '<i data-lucide="moon"></i>';

  } else {

    document.body.classList.remove("light");

    themeToggle.innerHTML =
      '<i data-lucide="sun"></i>';
  }

  localStorage.setItem("helmi-theme", theme);

  if (window.lucide) {
    lucide.createIcons();
  }
}


/* Load saved theme */

const savedTheme =
  localStorage.getItem("helmi-theme") || "dark";

setTheme(savedTheme);


/* Change theme */

themeToggle.addEventListener("click", () => {

  const currentTheme =
    document.body.classList.contains("light")
      ? "light"
      : "dark";

  setTheme(
    currentTheme === "light"
      ? "dark"
      : "light"
  );

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle =
  document.getElementById("menu-toggle");

const mobileMenu =
  document.getElementById("mobile-menu");


menuToggle.addEventListener("click", () => {

  const isOpen =
    mobileMenu.classList.contains("open");

  mobileMenu.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(!isOpen)
  );

  menuToggle.innerHTML = isOpen
    ? '<i data-lucide="menu"></i>'
    : '<i data-lucide="x"></i>';

  lucide.createIcons();

});


/* Close mobile menu when clicking a link */

document
  .querySelectorAll(".mobile-link")
  .forEach(link => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.innerHTML =
        '<i data-lucide="menu"></i>';

      lucide.createIcons();

    });

  });


/* =========================================================
   TYPING EFFECT
   ========================================================= */

const typingElement =
  document.getElementById("typing-text");

const roles = [
  "IT Support Technician",
  "Network Support Technician",
  "Technical Support Technician",
  "Hardware Support Technician"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeRole() {

  const currentRole =
    roles[roleIndex];

  if (!deleting) {

    typingElement.textContent =
      currentRole.substring(
        0,
        characterIndex
      );

    characterIndex++;

  } else {

    typingElement.textContent =
      currentRole.substring(
        0,
        characterIndex
      );

    characterIndex--;

  }


  let speed = deleting
    ? 45
    : 85;


  /* Finished typing */

  if (
    !deleting &&
    characterIndex > currentRole.length
  ) {

    deleting = true;

    speed = 1400;

  }


  /* Finished deleting */

  if (
    deleting &&
    characterIndex < 0
  ) {

    deleting = false;

    characterIndex = 0;

    roleIndex =
      (roleIndex + 1) % roles.length;

    speed = 300;

  }


  setTimeout(typeRole, speed);

}


typeRole();


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".nav-link"
  );


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach(link => {

          const isActive =
            link.getAttribute("href") ===
            `#${entry.target.id}`;

          link.classList.toggle(
            "active",
            isActive
          );

        });

      });

    },
    {
      rootMargin:
        "-35% 0px -55% 0px"
    }
  );


sections.forEach(section => {
  observer.observe(section);
});


/* =========================================================
   PROJECT FILTER
   ========================================================= */

const filterButtons =
  document.querySelectorAll(
    ".filter-btn"
  );

const projectCards =
  document.querySelectorAll(
    ".project-card"
  );


filterButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter =
        button.dataset.filter;


      projectCards.forEach(card => {

        const category =
          card.dataset.category;

        const shouldShow =
          filter === "all" ||
          category === filter;

        card.style.display =
          shouldShow
            ? ""
            : "none";

      });

    }
  );

});


/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm =
  document.getElementById(
    "contact-form"
  );


contactForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    const formData =
      new FormData(contactForm);


    const name =
      String(
        formData.get("name") || ""
      ).trim();

    const email =
      String(
        formData.get("email") || ""
      ).trim();

    const message =
      String(
        formData.get("message") || ""
      ).trim();


    const subject =
      encodeURIComponent(
        `Portfolio contact from ${name}`
      );


    const body =
      encodeURIComponent(
        `Name: ${name}

Email: ${email}

Message:
${message}`
      );


    window.location.href =
      `mailto:helmiboukhatem53@gmail.com` +
      `?subject=${subject}` +
      `&body=${body}`;

  }
);