// Mobile Navbar Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Scroll-to-Top Button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.id = "scrollTopBtn";
scrollTopBtn.title = "Go to top";
scrollTopBtn.innerText = "↑";
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Scroll Reveal Animation using Intersection Observer
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// Newsletter Form Alert
const form = document.querySelector('.newsletter-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = form.querySelector('input').value;
    alert(`Thank you! Newsletter signup received: ${email}`);
    form.reset();
  });
}





