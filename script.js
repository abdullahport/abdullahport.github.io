// ১. মাউস কার্সার কন্ট্রোল
const cursor = document.getElementById('cursor');
const scissorsImg = document.getElementById('scissors');
const leftClickSound = new Audio('assets/sound/cut.mp3');
const rightClickSound = new Audio('assets/sound/right.mp3');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    
    // হোভার ইফেক্ট
    const target = e.target;
    if (target.closest('a, button, .logo, h1, h2, h3')) {
        cursor.classList.add('hover-active');
    } else {
        cursor.classList.remove('hover-active');
    }
});

// ২. ক্লিক অ্যানিমেশন ও সাউন্ড
document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
        leftClickSound.currentTime = 0;
        leftClickSound.play().catch(() => {});
        gsap.to(scissorsImg, { scale: 0.6, rotate: -40, duration: 0.05, yoyo: true, repeat: 1 });
    }
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClickSound.play().catch(() => {});
    gsap.to(scissorsImg, { x: 10, repeat: 5, yoyo: true, duration: 0.05, onComplete: () => gsap.set(scissorsImg, {x: 0}) });
});

// ৩. ডাইনামিক স্কিল রোটেটর (বড় টেক্সটের নিচে যেটা বদলাবে)
const skills = [
    "YOUTUBE AUTOMATION",
    "DOCUMENTARY EDITS",
    "MYSTERY & CRIME",
    "SOUND DESIGN",
    "COLOR GRADING"
];

let skillIndex = 0;
const skillElement = document.getElementById('changing-text');

function rotateSkills() {
    gsap.to(skillElement, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        onComplete: () => {
            skillIndex = (skillIndex + 1) % skills.length;
            skillElement.textContent = skills[skillIndex];
            gsap.to(skillElement, { opacity: 1, y: 0, duration: 0.5 });
        }
    });
}
setInterval(rotateSkills, 3000);

// ৪. পোর্টফোলিও ভিডিও লোড
const myVideos = [
    { title: "Hells Angels Fear This Brutal Biker Gang", id: "bbC0Au4jAtE", channel: "DF" },
    { title: "King David's Palace Discovery", id: "9DSw3CVPC_I", channel: "HTU" },
    { title: "The Epic of Gilgamesh Mystery", id: "CVz1nDmI4Bc", channel: "TCM" },
    { title: "AI Just Opened Ancient Library", id: "8lrIFA3pWjw", channel: "UD" },
    { title: "The Mystery of the Bermuda Triangle", id: "K9p9V-Q8_Gg", channel: "MP" }
];

function loadVideos() {
    const videoGrid = document.querySelector('.service-grid');
    if (!videoGrid) return;
    let videoHTML = "";
    myVideos.forEach(video => {
        videoHTML += `
            <div class="service-card">
                <iframe width="100%" height="200" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen></iframe>
                <div style="padding: 15px;">
                    <h3 style="font-size: 0.9rem; color: #fff;">${video.title}</h3>
                    <p style="color: #ff3c3c; font-size: 0.7rem; font-weight: bold; margin-top:5px;">CHANNEL: ${video.channel}</p>
                </div>
            </div>`;
    });
    videoGrid.innerHTML = videoHTML;
}

window.onload = loadVideos;
