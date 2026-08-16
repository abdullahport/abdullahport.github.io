/* ===== FOOTER YEAR ===== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ===== MOBILE MENU ===== */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
document.querySelectorAll(".nav-item").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('.nav-item[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      ?.scrollIntoView({ behavior: "smooth" });
  });
});

/* ===== CUSTOM CURSOR (desktop / fine pointer only) ===== */
const isFinePointer = window.matchMedia("(pointer: fine)").matches;

if (isFinePointer) {
  const cursor = document.getElementById("cursor");
  const scissor = document.getElementById("scissor");
  const cutSound = new Audio("assets/sound/cut.mp3");
  const rightSound = new Audio("assets/sound/right.mp3");

  document.addEventListener("mousemove", e => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "power2.out" });
  });

  /* LEFT CLICK = cut */
  document.addEventListener("mousedown", e => {
    if (e.button === 0) {
      cutSound.currentTime = 0;
      cutSound.play().catch(() => {});
      gsap.fromTo(scissor, { scale: 1 }, { scale: 0.65, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut" });
      gsap.to("#bladeL", { attr: { x2: 55, y2: 60 }, duration: 0.1, yoyo: true, repeat: 1 });
      gsap.to("#bladeR", { attr: { x2: 45, y2: 60 }, duration: 0.1, yoyo: true, repeat: 1 });
    }
  });

  /* RIGHT CLICK = alternate action */
  document.addEventListener("contextmenu", e => {
    e.preventDefault();
    rightSound.currentTime = 0;
    rightSound.play().catch(() => {});
    gsap.fromTo(scissor, { rotate: 0 }, { rotate: 25, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut" });
  });

  /* HOVER GROW ON INTERACTIVE ELEMENTS */
  const interactiveEls = document.querySelectorAll(
    "a, button, .service-card, .portfolio-card, .contact-social a, .nav-item"
  );

  interactiveEls.forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hovering");
      gsap.to(cursor, { scale: 1.6, duration: 0.25, ease: "power2.out" });

      const icon = el.querySelector(".service-icon, .pf-icon, span");
      if (icon) gsap.to(icon, { scale: 1.25, rotate: 8, duration: 0.3, ease: "power3.out" });
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hovering");
      gsap.to(cursor, { scale: 1, duration: 0.25, ease: "power2.out" });

      const icon = el.querySelector(".service-icon, .pf-icon, span");
      if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: "power3.out" });
    });
  });
}

/* ===== TYPING EFFECT ===== */
const typingTexts = [
  "FACELESS VIDEO EDITOR",
  "CRIME DOCUMENTARY EDITOR",
  "RETENTION STORYTELLER"
];
let typingIndex = 0, charIndex = 0;
const typingEl = document.getElementById("typingText");

function typeEffect() {
  if (charIndex < typingTexts[typingIndex].length) {
    typingEl.textContent += typingTexts[typingIndex][charIndex++];
    setTimeout(typeEffect, 75);
  } else {
    setTimeout(eraseEffect, 1600);
  }
}
function eraseEffect() {
  if (charIndex > 0) {
    typingEl.textContent = typingTexts[typingIndex].substring(0, --charIndex);
    setTimeout(eraseEffect, 40);
  } else {
    typingIndex = (typingIndex + 1) % typingTexts.length;
    setTimeout(typeEffect, 300);
  }
}
typeEffect();

/* ===== LOAD ANIMATIONS ===== */
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-image-wrap img", { x: -60, opacity: 0, duration: 1.1, ease: "power3.out" });
gsap.from(".hero-text > *", { y: 35, opacity: 0, duration: 0.9, stagger: 0.12, delay: 0.3, ease: "power3.out" });

gsap.utils.toArray(".service-card, .portfolio-card, .about-wrap, .contact-wrapper").forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 85%" },
    y: 50, opacity: 0, duration: 0.9, ease: "power3.out"
  });
});
