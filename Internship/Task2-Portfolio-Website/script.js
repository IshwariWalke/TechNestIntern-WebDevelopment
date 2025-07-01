// script.js

// ============ GSAP Animations ============

// Intro text animation
gsap.from(".intro-text h2", {
  duration: 1,
  y: -50,
  opacity: 0,
  ease: "power2.out"
});

gsap.from(".intro-text h1", {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 0.5,
  ease: "power2.out"
});

gsap.from(".animated-text", {
  duration: 1,
  opacity: 0,
  delay: 1,
  ease: "power2.out"
});

// Scroll-triggered section animations
gsap.utils.toArray("section").forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  });
});

// Project card hover effect
const cards = document.querySelectorAll(".project-card");
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, { scale: 1.05, duration: 0.3 });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { scale: 1, duration: 0.3 });
  });
});

// Contact form submit animation
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Animate form submission
  gsap.to(contactForm, {
    opacity: 0,
    y: -20,
    duration: 0.5,
    onComplete: () => {
      contactForm.innerHTML =
        "<p style='color:#00d8ff;font-weight:bold;'>Thank you! Your message has been sent.</p>";
      gsap.from(contactForm, { opacity: 0, y: 20, duration: 0.5 });
    }
  });
});

// ============ Three.js Background ============

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("three-bg").appendChild(renderer.domElement);

// Add particle geometry
const particleCount = 300;
const geometry = new THREE.BufferGeometry();
const positions = [];

for (let i = 0; i < particleCount; i++) {
  positions.push((Math.random() - 0.5) * 10);
  positions.push((Math.random() - 0.5) * 10);
  positions.push((Math.random() - 0.5) * 10);
}

geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
  color: 0x00d8ff,
  size: 0.05
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Animate particles
function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
