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

document.querySelector(".copy-email").addEventListener("click", copyEmail);
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
  document.querySelector("#year").textContent = now.getFullYear();
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
