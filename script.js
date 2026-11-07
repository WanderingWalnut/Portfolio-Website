const email = "nkprimary1@gmail.com";
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2500);
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email);
    showToast("Email copied. Say hello!");
  } catch {
    showToast(email);
  }
}

for (const button of document.querySelectorAll(".copy-email, .contact-copy")) {
  button.addEventListener("click", copyEmail);
}
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() !== "c" || event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
  if (event.target.closest("input, textarea, select, [contenteditable]")) return;
  if (window.getSelection()?.toString()) return;
  copyEmail();
});

function updateClock() {
  const now = new Date();
  document.querySelector("#clock").textContent = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23", timeZoneName: "short" }).format(now);
  document.querySelector("#clock").dateTime = now.toISOString();
}
updateClock();
setInterval(updateClock, 1000);

const dockLinks = [...document.querySelectorAll('.dock a[href^="#"]')];
const sections = dockLinks.map((link) => document.querySelector(link.getAttribute("href")));
let scrollPending = false;
function updateActiveSection() {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  const current = atBottom ? sections.at(-1) : sections.filter((section) => section.getBoundingClientRect().top <= window.innerHeight * 0.4).at(-1) || sections[0];
  for (const link of dockLinks) {
    if (link.getAttribute("href") === `#${current.id}`) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
  scrollPending = false;
}
window.addEventListener("scroll", () => {
  if (!scrollPending) {
    scrollPending = true;
    requestAnimationFrame(updateActiveSection);
  }
}, { passive: true });
updateActiveSection();

const themeToggle = document.querySelector(".theme-toggle");
const systemTheme = matchMedia("(prefers-color-scheme: dark)");
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.querySelector(".tooltip").textContent = dark ? "Light mode" : "Dark mode";
  document.querySelector('meta[name="theme-color"]').content = dark ? "#0d0d0d" : "#ffffff";
}
applyTheme(document.documentElement.dataset.theme);
themeToggle.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(theme);
  try { localStorage.setItem("theme", theme); } catch {}
});
systemTheme.addEventListener("change", (event) => {
  try { if (localStorage.getItem("theme")) return; } catch {}
  applyTheme(event.matches ? "dark" : "light");
});

const soccerVideo = document.querySelector("#soccer-video");
const videoToggle = document.querySelector(".video-toggle");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let soccerPausedByUser = reducedMotion.matches;

function updateVideoControl() {
  const playing = !soccerVideo.paused;
  videoToggle.setAttribute("aria-pressed", String(playing));
  videoToggle.setAttribute("aria-label", playing ? "Pause soccer video" : "Play soccer video");
}

function playSoccer() {
  soccerVideo.play().catch(updateVideoControl);
}

videoToggle.addEventListener("click", () => {
  soccerPausedByUser = !soccerVideo.paused;
  if (soccerVideo.paused) playSoccer();
  else soccerVideo.pause();
});
soccerVideo.addEventListener("play", updateVideoControl);
soccerVideo.addEventListener("pause", updateVideoControl);
new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && !soccerPausedByUser && !document.hidden) playSoccer();
  else soccerVideo.pause();
}, { threshold: 0.25 }).observe(soccerVideo);
reducedMotion.addEventListener("change", (event) => {
  if (event.matches) {
    soccerPausedByUser = true;
    soccerVideo.pause();
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) soccerVideo.pause();
});


const stackTrack = document.querySelector(".stack-track");
const stackCopy = stackTrack.firstElementChild.cloneNode(true);
stackCopy.classList.add("stack-copy");
stackCopy.setAttribute("aria-hidden", "true");
stackTrack.append(stackCopy);
stackTrack.closest(".stack-rail").classList.add("is-looping");

if (!reducedMotion.matches) {
  const signature = document.querySelector(".footer-signature");
  signature.classList.add("signature-ready");
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    signature.classList.add("is-drawing");
    observer.disconnect();
  }, { threshold: 0.55 });
  observer.observe(signature);
}

const torontoWeather = document.querySelector('.footer-weather');
const weatherTemperature = torontoWeather.querySelector('span');

async function updateTorontoWeather() {
  try {
    const endpoint = 'https://api.open-meteo.com/v1/forecast?latitude=43.6532&longitude=-79.3832&current=temperature_2m,weather_code,is_day';
    const response = await fetch(endpoint, { signal: AbortSignal.timeout(5500) });
    if (!response.ok) return;
    const { current } = await response.json();
    const temperature = current?.temperature_2m;
    if (!Number.isFinite(temperature)) return;
    const conditions = [
      [0, 'Clear', current.is_day ? 'sun' : 'moon'],
      [2, 'Partly cloudy', 'cloud'],
      [3, 'Overcast', 'cloud'],
      [48, 'Fog', 'cloud'],
      [69, 'Rain', 'rain'],
      [79, 'Snow', 'snow'],
      [84, 'Rain showers', 'rain'],
      [86, 'Snow showers', 'snow'],
      [99, 'Thunderstorms', 'rain'],
    ];
    const [, condition, icon] = conditions.find(([max]) => current.weather_code <= max) ?? [0, 'Current conditions', 'cloud'];
    weatherTemperature.textContent = `${Math.round(temperature)} °C`;
    torontoWeather.querySelector('use').setAttribute('href', `#i-${icon}`);
    torontoWeather.title = `${condition} in Toronto · Open-Meteo`;
    torontoWeather.setAttribute('aria-label', `Toronto weather, ${weatherTemperature.textContent}, ${condition}. Data by Open-Meteo.`);
  } catch {
    // Keep the city and weather link available when the service cannot be reached.
  }
}

updateTorontoWeather();
