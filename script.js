gsap.registerPlugin(ScrollTrigger);

const cursor = document.getElementById("cursor");
const scissor = document.getElementById("scissor");
const bladeL = document.getElementById("blade-left");
const bladeR = document.getElementById("blade-right");

let lastX = innerWidth/2;
let lastY = innerHeight/2;

document.addEventListener("mousemove", e=>{
  gsap.to(cursor,{
    x:e.clientX,
    y:e.clientY,
    duration:.08,
    ease:"power2.out"
  });

  const dx=e.clientX-lastX;
  const dy=e.clientY-lastY;
  const angle=Math.atan2(dy,dx)*180/Math.PI;

  gsap.to(cursor,{rotate:angle,duration:.15});

  lastX=e.clientX;
  lastY=e.clientY;
});

/* CUT ANIMATION */
document.addEventListener("mousedown",()=>{
  gsap.to(bladeL,{rotate:-25,transformOrigin:"100% 100%",duration:.1});
  gsap.to(bladeR,{rotate:25,transformOrigin:"0% 100%",duration:.1});
});
document.addEventListener("mouseup",()=>{
  gsap.to([bladeL,bladeR],{rotate:0,duration:.12});
});

/* TYPING */
const texts=["FACELESS VIDEO EDITOR","CRIME DOCUMENTARY EDITOR","RETENTION STORYTELLER"];
let ti=0,ci=0,el=document.getElementById("typingText");

function type(){
  if(ci<texts[ti].length){
    el.textContent+=texts[ti][ci++];
    setTimeout(type,80);
  }else setTimeout(erase,1500);
}
function erase(){
  if(ci>0){
    el.textContent=texts[ti].slice(0,--ci);
    setTimeout(erase,40);
  }else{
    ti=(ti+1)%texts.length;
    setTimeout(type,300);
  }
}
type();

/* HERO ANIMATION */
gsap.from(".hero-image-wrap img",{x:-80,opacity:0,duration:1.2});
gsap.from(".hero-text>*",{y:40,opacity:0,stagger:.15,duration:1});
