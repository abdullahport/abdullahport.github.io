const cursor = document.getElementById("cursor");
const scissor = document.getElementById("scissor");

const leftSound = new Audio("assets/sound/left.mp3");
const rightSound = new Audio("assets/sound/right.mp3");

document.addEventListener("mousemove", e => {
  gsap.to(cursor,{
    x:e.clientX,
    y:e.clientY,
    duration:.08,
    ease:"power2.out"
  });
});

/* LEFT CLICK */
document.addEventListener("mousedown", e=>{
  if(e.button===0){
    leftSound.currentTime=0;
    leftSound.play();
    gsap.fromTo(scissor,
      {scale:1},
      {scale:.7,rotate:-20,yoyo:true,repeat:1}
    );
  }
});

/* RIGHT CLICK */
document.addEventListener("contextmenu", e=>{
  e.preventDefault();
  rightSound.currentTime=0;
  rightSound.play();
  gsap.fromTo(scissor,
    {scale:1},
    {scale:.7,rotate:20,yoyo:true,repeat:1}
  );
});


/* typing */
const text="DOCUMENTARY & FACELESS VIDEO EDITOR"
let i=0
setInterval(()=>{
 document.querySelector(".typing").innerText=text.slice(0,i++)
 if(i>text.length)i=0
},120)
// NAV ITEM HOVER ANIMATION
document.querySelectorAll(".nav-item").forEach(item=>{
  item.addEventListener("mouseenter",()=>{
    gsap.to(item,{scale:1.1,duration:.2});
  });
  item.addEventListener("mouseleave",()=>{
    gsap.to(item,{scale:1,duration:.2});
  });
});

/* SMOOTH SCROLL */
document.querySelectorAll(".nav-item").forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    const target=document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({behavior:"smooth"});
  });
});
/* TYPING EFFECT */
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

typingEl.textContent="";
typeEffect();
/* HERO LOAD ANIMATION */
gsap.from(".hero-image-wrap img",{
  x:-80,
  opacity:0,
  duration:1.2,
  ease:"power3.out"
});

gsap.from(".hero-text > *",{
  y:40,
  opacity:0,
  duration:1,
  stagger:.15,
  delay:.4,
  ease:"power3.out"
});
/* SERVICES HOVER ANIMATION */
document.querySelectorAll(".service-card").forEach(card=>{
  card.addEventListener("mouseenter",()=>{
    gsap.to(card.querySelector(".service-icon"),{
      scale:1.3,
      rotate:6,
      duration:.3,
      ease:"power3.out"
    });
  });

  card.addEventListener("mouseleave",()=>{
    gsap.to(card.querySelector(".service-icon"),{
      scale:1,
      rotate:0,
      duration:.3,
      ease:"power3.out"
    });
  });
});
gsap.from(".portfolio-card",{
  scrollTrigger:{
    trigger:"#portfolio",
    start:"top 80%"
  },
  y:60,
  opacity:0,
  stagger:.15,
  duration:1,
  ease:"power3.out"
});
document.querySelectorAll(".contact-social a").forEach(box=>{
  box.addEventListener("mouseenter",()=>{
    gsap.to(box,{y:-12,scale:1.05,duration:.3});
  });
  box.addEventListener("mouseleave",()=>{
    gsap.to(box,{y:0,scale:1,duration:.3});
  });
});
