
// ROHITLABS — WEBSITE INTERACTIONS

// IMPORTANT: Replace this with your real business email.
// Do not publish until you have changed it.
const CONTACT_EMAIL = "YOUR_EMAIL@example.com";

// Copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Header appearance on scroll
const header = document.querySelector(".header");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close menu" : "Open menu"
  );
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

// Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element =>
    element.classList.add("visible")
  );
}

// Soft cursor glow on desktop
const glow = document.querySelector(".cursor-glow");

if (window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("pointermove", event => {
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
  });
} else {
  glow.style.display = "none";
}

// Contact form — opens the visitor's email application
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  if (CONTACT_EMAIL === "YOUR_EMAIL@example.com") {
    formStatus.textContent =
      "Contact email has not been configured yet.";
    return;
  }

  const name = document.getElementById("client-name").value.trim();
  const email = document.getElementById("client-email").value.trim();
  const service = document.getElementById("client-service").value;
  const message = document.getElementById("client-message").value.trim();

  if (!name || !email || !service || !message) {
    formStatus.textContent = "Please complete every field.";
    return;
  }

  const subject = `RohitLabs Project Inquiry — ${service}`;

  const body =
    `Hello RohitLabs,\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Service: ${service}\n\n` +
    `Project Details:\n${message}\n\n` +
    `Thank you.`;

  const mailto =
    `mailto:${CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  formStatus.textContent =
    "Your email app should open. Please press Send there to submit your inquiry.";

  window.location.href = mailto;
});
