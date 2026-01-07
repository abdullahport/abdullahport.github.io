const cursor = document.getElementById("cursor");
const scissor = document.getElementById("scissor");

// Sounds
const leftSound = new Audio("assets/sound/cut.mp3");
const rightSound = new Audio("assets/sound/right.mp3");

// ১. মাউস মুভমেন্ট
document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

// ২. বাম ক্লিক (Cut Animation & Sound)
document.addEventListener("mousedown", (e) => {
    if (e.button === 0) { // Left Click
        leftSound.currentTime = 0;
        leftSound.play().catch(e => console.log("Sound error:", e));

        // Cut Animation (Open and Close)
        gsap.to(".blade-left", { rotate: 25, duration: 0.1, yoyo: true, repeat: 1, transformOrigin: "50% 50%" });
        gsap.to(".blade-right", { rotate: -25, duration: 0.1, yoyo: true, repeat: 1, transformOrigin: "50% 50%" });
    }
});

// ৩. ডান ক্লিক (Right Sound)
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    rightSound.currentTime = 0;
    rightSound.play().catch(e => console.log("Sound error:", e));
});

// ৪. হোভার ইফেক্ট (Home, Service, Portfolio ইত্যাদি লেখার ওপর নিলে)
const hoverLinks = document.querySelectorAll(".nav-item, .service-card, .portfolio-card, .logo, button, a");

hoverLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
        gsap.to(scissor, { 
            scale: 1.6, 
            rotate: 90, // মাথা উপরে ঘুরে যাবে
            color: "#00ffcc", // কালার চেঞ্জ
            duration: 0.3 
        });
        scissor.style.filter = "drop-shadow(0 0 12px #00ffcc)";
    });

    link.addEventListener("mouseleave", () => {
        gsap.to(scissor, { 
            scale: 1, 
            rotate: -45, // আবার আগের মতো বামে কাত হবে
            color: "#ff3c3c", 
            duration: 0.3 
        });
        scissor.style.filter = "drop-shadow(0 0 6px #ff3c3c)";
    });
});

// Typing Effect
const typingTexts = ["FACELESS VIDEO EDITOR", "CRIME DOCUMENTARY EDITOR", "RETENTION STORYTELLER"];
let typingIndex = 0, charIndex = 0, typingEl = document.getElementById("typingText");

function type() {
    if (charIndex < typingTexts[typingIndex].length) {
        typingEl.textContent += typingTexts[typingIndex][charIndex];
        charIndex++;
        setTimeout(type, 80);
    } else {
        setTimeout(erase, 1500);
    }
}
function erase() {
    if (charIndex > 0) {
        typingEl.textContent = typingTexts[typingIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        typingIndex = (typingIndex + 1) % typingTexts.length;
        setTimeout(type, 300);
    }
}
type();
