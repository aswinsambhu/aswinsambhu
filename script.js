const profile = {
  name: "Aswin Sambhu",
  birthday: "2008-12-01T00:00:00",
  tagline: "Profile, links, gaming trail, and small moving nonsense.",
  about:
    "My name is Aswin Sambhu . I'm good at gaming you know ? . Kidding! I'm a student .",
  gamerTag: "ASWIN_07",
  gamerStatus: "Currently farming wins, snacks, and suspiciously good excuses.",
  links: [
    {
      title: "Instagram",
      url: "https://www.instagram.com/aswinsambhu?igsh=MXIyNmF3bmljYWZzeQ==",
      note: "Photos, posts, and what ? NOTHING."
    },
    {
      title: "YouTube",
      url: "https://youtube.com/",
      note: "IDK."
    },
    {
      title: "Discord",
      url: "https://discord.com/",
      note: "Chat base and gaming hangout."
    },
    {
      title: "GitHub",
      url: "https://aswinsambhu.github.io/aswinsambhu/",
      note: "Something......"
    }
  ],
  stats: [
    { label: "Minecraft", value: "MAIN GAME" },
    { label: "Trying to do better,but not too bad", value: "LEVEL" },
    { label: "Calm and Rush", value: "Player" },
    { label: "100 $   + RESPECT", value: "Earnings" }
  ],
  fortunes: [
    "Today you will dodge lag by pure confidence.",
    "A mystery teammate will finally use common sense.",
    "Your next click has main character energy.",
    "The tiny car approves your choices.",
    "A clean headshot is hiding in your future."
  ]
};

const loaderNotes = [
  "Winding the cassette...",
  "Dusting the keyboard...",
  "Parking the tiny car...",
  "Polishing the floppy disk..."
];

const loader = document.querySelector("#loader");
const loaderNote = document.querySelector("#loaderNote");
const aboutText = document.querySelector("#aboutText");
const tagline = document.querySelector("#tagline");
const ageReadout = document.querySelector("#ageReadout");
const linksGrid = document.querySelector("#linksGrid");
const statsBoard = document.querySelector("#statsBoard");
const gamerTag = document.querySelector("#gamerTag");
const gamerStatus = document.querySelector("#gamerStatus");
const terminalLine = document.querySelector("#terminalLine");
const fortuneBtn = document.querySelector("#fortuneBtn");
const fortuneText = document.querySelector("#fortuneText");
const stampBtn = document.querySelector("#stampBtn");
const stampText = document.querySelector("#stampText");
const danceBtn = document.querySelector("#danceBtn");
const monitor = document.querySelector(".monitor");
const soundToggle = document.querySelector("#soundToggle");

let soundEnabled = false;

function setEditableContent() {
  document.title = `${profile.name} | Retro Profile`;
  tagline.textContent = profile.tagline;
  aboutText.textContent = profile.about;
  gamerTag.textContent = profile.gamerTag;
  gamerStatus.textContent = profile.gamerStatus;
  terminalLine.textContent = `C:\\${profile.name.split(" ")[0].toUpperCase()}> hello_world.exe`;
}

function renderLinks() {
  linksGrid.innerHTML = profile.links
    .map(
      (link) => `
        <a class="link-card" href="${link.url}" target="_blank" rel="noreferrer">
          <strong>${link.title}</strong>
          <span>${link.note}</span>
        </a>
      `
    )
    .join("");
}

function renderStats() {
  statsBoard.innerHTML = profile.stats
    .map(
      (stat) => `
        <article class="stat-tile">
          <strong>${stat.value}</strong>
          <span>${stat.label}</span>
        </article>
      `
    )
    .join("");
}

function updateAgeClock() {
  const birthDate = new Date(profile.birthday);
  const now = new Date();
  const totalMs = Math.max(0, now - birthDate);
  const totalDays = Math.floor(totalMs / 86400000);
  const hours = Math.floor((totalMs / 3600000) % 24);
  const minutes = Math.floor((totalMs / 60000) % 60);
  const seconds = Math.floor((totalMs / 1000) % 60);
  let years = now.getFullYear() - birthDate.getFullYear();
  const birthdayThisYear = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  if (now < birthdayThisYear) {
    years -= 1;
  }

  ageReadout.innerHTML = [
    { label: "Years", value: years },
    { label: "Days lived", value: totalDays.toLocaleString() },
    { label: "Hours", value: String(hours).padStart(2, "0") },
    { label: "Minutes", value: String(minutes).padStart(2, "0") },
    { label: "Seconds", value: String(seconds).padStart(2, "0") }
  ]
    .map(
      (item) => `
        <div class="age-unit">
          <div>
            <strong>${item.value}</strong>
            <span>${item.label}</span>
          </div>
        </div>
      `
    )
    .join("");

  document.documentElement.style.setProperty("--minute-tick", minutes);
}

function initRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function playClick() {
  if (!soundEnabled) return;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "square";
  oscillator.frequency.value = 240;
  gain.gain.setValueAtTime(0.04, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.08);
}

function makeSparkle(x, y, text = "*") {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = text;
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  document.body.appendChild(sparkle);
  window.setTimeout(() => sparkle.remove(), 720);
}

function initFunButtons() {
  fortuneBtn.addEventListener("click", (event) => {
    const fortune = profile.fortunes[Math.floor(Math.random() * profile.fortunes.length)];
    fortuneText.textContent = fortune;
    makeSparkle(event.clientX, event.clientY, "?");
    playClick();
  });

  stampBtn.addEventListener("click", (event) => {
    const stamps = ["APPROVED", "COOL", "LEGIT", "RETRO OK", "PAGE PASSED"];
    stampText.textContent = stamps[Math.floor(Math.random() * stamps.length)];
    makeSparkle(event.clientX, event.clientY, "OK");
    playClick();
  });

  danceBtn.addEventListener("click", (event) => {
    monitor.classList.remove("is-dancing");
    void monitor.offsetWidth;
    monitor.classList.add("is-dancing");
    makeSparkle(event.clientX, event.clientY, "TV");
    playClick();
  });
}

function initLoader() {
  loaderNote.textContent = loaderNotes[Math.floor(Math.random() * loaderNotes.length)];
  window.setTimeout(() => {
    loader.classList.add("is-hidden");
  }, 1150);
}

function initSoundToggle() {
  soundToggle.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundToggle.classList.toggle("is-on", soundEnabled);
    playClick();
  });
}

function initCursorSparks() {
  let lastSpark = 0;
  window.addEventListener("pointermove", (event) => {
    const now = Date.now();
    if (now - lastSpark < 240) return;
    lastSpark = now;

    if (Math.random() > 0.52) {
      makeSparkle(event.clientX + 8, event.clientY + 8, ".");
    }
  });
}

setEditableContent();
renderLinks();
renderStats();
updateAgeClock();
initRevealAnimations();
initFunButtons();
initLoader();
initSoundToggle();
initCursorSparks();

window.setInterval(updateAgeClock, 1000);
