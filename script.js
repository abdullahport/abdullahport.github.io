const cursor = document.getElementById("cursor");
const scissor = document.getElementById("scissor");
const scissorContainer = document.getElementById("scissor-container");

// Audio Files
const leftSound = new Audio("assets/sound/cut.mp3");
const rightSound = new Audio("assets/sound/right.mp3");

// Smooth Mouse Follow
document.addEventListener("mousemove", e => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    ease: "power2.out"
  });
});

/* LEFT CLICK ANIMATION & SOUND */
document.addEventListener("mousedown", e => {
  if (e.button === 0) { // Left Click
    leftSound.currentTime = 0;
    leftSound.play();
    
    // Scissor Cut Animation
    gsap.to(".blade-left", { rotate: 20, duration: 0.1, yoyo: true, repeat: 1, transformOrigin: "50% 50%" });
    gsap.to(".blade-right", { rotate: -20, duration: 0.1, yoyo: true, repeat: 1, transformOrigin: "50% 50%" });
  }
});

/* RIGHT CLICK ANIMATION & SOUND */
document.addEventListener("contextmenu", e => {
  e.preventDefault();
  rightSound.currentTime = 0;
  rightSound.play();
  
  gsap.to(scissor, {
    scale: 0.8,
    duration: 0.1,
    yoyo: true,
    repeat: 1
  });
});

/* HOVER EFFECT ON LINKS/CARDS */
const hoverTargets = document.querySelectorAll(".nav-item, .service-card, .portfolio-card, button, .contact-social a");

hoverTargets.forEach(target => {
  target.addEventListener("mouseenter", () => {
    // মাউস বড় হবে, কালার পরিবর্তন হবে (সায়ান) এবং মাথা উপরে ঘুরবে
    gsap.to(scissor, { 
      scale: 1.5, 
      rotate: 45, // মাথা উপরের দিকে ঘোরানোর জন্য
      color: "#00ffcc", 
      duration: 0.3 
    });
    // শ্যাডো কালারও চেঞ্জ হবে
    scissor.style.filter = "drop-shadow(0 0 10px #00ffcc)";
  });

  target.addEventListener("mouseleave", () => {
    // আগের অবস্থায় ফিরে আসবে
    gsap.to(scissor, { 
      scale: 1, 
      rotate: 0, 
      color: "#ff3c3c", 
      duration: 0.3 
    });
    scissor.style.filter = "drop-shadow(0 0 6px #ff3c3c)";
  });
});

/* Typing Effect (Restored) */
const typingTexts = [
  "FACELESS VIDEO EDITOR",
  "CRIME DOCUMENTARY EDITOR",
  "RETENTION STORYTELLER"
];
let typingIndex = 0;
let charIndex = 0;
let typingEl = document.getElementById("typingText");

function typeEffect(){
  if(charIndex < typingTexts[typingIndex].length){
    typingEl.textContent += typingTexts[typingIndex][charIndex];
    charIndex++;
    setTimeout(typeEffect, 80);
  } else {
    setTimeout(eraseEffect, 1800);
  }
}
function eraseEffect(){
  if(charIndex > 0){
    typingEl.textContent = typingTexts[typingIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 50);
  } else {
    typingIndex = (typingIndex + 1) % typingTexts.length;
    setTimeout(typeEffect, 300);
  }
}
if(typingEl) {
    typingEl.textContent="";
    typeEffect();
}

/* GSAP Animations for Hero & Portfolio (Restored) */
gsap.from(".hero-image-wrap img",{
  x:-80, opacity:0, duration:1.2, ease:"power3.out"
});
gsap.from(".hero-text > *",{
  y:40, opacity:0, duration:1, stagger:.15, delay:.4, ease:"power3.out"
});
gsap.from(".portfolio-card",{
  scrollTrigger:{ trigger:"#portfolio", start:"top 80%" },
  y:60, opacity:0, stagger:.15, duration:1, ease:"power3.out"
});

/* Smooth Scroll */
document.querySelectorAll(".nav-item").forEach(link=>{
  link.addEventListener("click",e=>{
    const href = link.getAttribute("href");
    if(href.startsWith("#")){
        e.preventDefault();
        const target=document.querySelector(href);
        if(target) target.scrollIntoView({behavior:"smooth"});
    }
  });
});
