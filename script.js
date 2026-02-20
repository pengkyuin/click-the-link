function rand(min, max){ return Math.random() * (max - min) + min; }

function popSparkles(x, y){
  const colors = ["#ffd6e8", "#ff5fa6", "#ffd369", "#c9b4ff", "#ffffff"];
  const count = 22;

  // if no coords, random near center
  const baseX = (typeof x === "number") ? x : window.innerWidth * rand(0.35, 0.65);
  const baseY = (typeof y === "number") ? y : window.innerHeight * rand(0.35, 0.65);

  for(let i=0;i<count;i++){
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.left = (baseX + rand(-30, 30)) + "px";
    s.style.top = (baseY + rand(-30, 30)) + "px";
    s.style.background = colors[Math.floor(rand(0, colors.length))];
    document.body.appendChild(s);

    const dx = rand(-170, 170);
    const dy = rand(-170, 170);
    const duration = rand(650, 950);

    s.animate([
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0 }
    ], { duration, easing: "cubic-bezier(.2,.7,.2,1)" });

    setTimeout(()=> s.remove(), duration + 40);
  }
}

function launchConfetti(){
  const colors = ["#ff5fa6", "#ffd6e8", "#ffd369", "#c9b4ff", "#ffffff"];
  const count = 150;

  for(let i=0;i<count;i++){
    const p = document.createElement("div");
    p.style.position = "fixed";
    p.style.left = rand(0, 100) + "vw";
    p.style.top = "-10px";
    p.style.width = rand(6, 10) + "px";
    p.style.height = rand(6, 14) + "px";
    p.style.background = colors[Math.floor(rand(0, colors.length))];
    p.style.borderRadius = rand(0,1) > 0.6 ? "999px" : "4px";
    p.style.opacity = "0.95";
    p.style.transform = `rotate(${rand(0,360)}deg)`;
    p.style.zIndex = 9999;
    p.style.pointerEvents = "none";

    const fall = rand(900, 1400);
    const drift = rand(-140, 140);
    const duration = rand(950, 1500);

    document.body.appendChild(p);

    p.animate([
      { transform: `translate(0,0) rotate(${rand(0,360)}deg)` },
      { transform: `translate(${drift}px, ${fall}px) rotate(${rand(360, 900)}deg)`, opacity: 0.0 }
    ], { duration, easing: "cubic-bezier(.2,.7,.2,1)" });

    setTimeout(()=> p.remove(), duration + 60);
  }
}

// Cute: sparkle on taps/clicks (mobile friendly)
window.addEventListener("pointerdown", (e) => {
  // avoid sparkle spam on form radio taps? still cute, but lighter
  if (Math.random() < 0.65) popSparkles(e.clientX, e.clientY);
}, { passive: true });

window.popSparkles = popSparkles;
window.launchConfetti = launchConfetti;
