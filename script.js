const cursor = document.getElementById("cursor");
const scissor = document.getElementById("scissor");

const leftSound = new Audio("assets/sound/cut.mp3");
const rightSound = new Audio("assets/sound/right.mp3");

/* CURSOR FOLLOW */
document.addEventListener("mousemove", e=>{
  gsap.to(cursor,{
    x:e.clientX,
    y:e.clientY,
    duration:.08
  });
});

/* LEFT CLICK */
document.addEventListener("mousedown", e=>{
  if(e.button===0){
    leftSound.currentTime=0;
    leftSound.play();
    gsap.fromTo(scissor,
      {scale:1},
      {scale:.7,rotate:-25,yoyo:true,repeat:1,duration:.15}
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
    {scale:.7,rotate:25,yoyo:true,repeat:1,duration:.15}
  );
});

/* TYPING EFFECT */
const texts=[
  "FACELESS VIDEO EDITOR",
  "CRIME DOCUMENTARY EDITOR",
  "RETENTION STORYTELLER"
];
let t=0,c=0;
const el=document.getElementById("typingText");

function type(){
  if(c<texts[t].length){
    el.textContent+=texts[t][c++];
    setTimeout(type,80);
  }else setTimeout(erase,1500);
}
function erase(){
  if(c>0){
    el.textContent=texts[t].slice(0,--c);
    setTimeout(erase,50);
  }else{
    t=(t+1)%texts.length;
    setTimeout(type,300);
  }
}
type();
