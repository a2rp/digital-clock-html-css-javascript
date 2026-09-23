const hoursEl = document.querySelector(".hoursNumber");
const minutesEl = document.querySelector(".minutesNumber");
const secondsEl = document.querySelector(".secondsNumber");
const dateEl = document.querySelector("#dateDisplay");
const timezoneEl = document.querySelector("#timezoneDisplay");
const timezoneSelect = document.querySelector("#timezoneSelect");
const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const timezones = typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : [localTimezone, "UTC"];
const options = [...new Set([localTimezone, ...timezones])];
options.forEach((timezone) => { const option = document.createElement("option"); option.value = timezone; option.textContent = timezone.replaceAll("_", " / "); timezoneSelect.appendChild(option); });
timezoneSelect.value = localTimezone;
const pad = (value) => String(value).padStart(2, "0");
function updateClock() {
  const timezone = timezoneSelect.value;
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).formatToParts(now).reduce((acc, item) => ({ ...acc, [item.type]: item.value }), {});
  hoursEl.textContent = parts.hour;
  minutesEl.textContent = parts.minute;
  secondsEl.textContent = parts.second;
  dateEl.textContent = new Intl.DateTimeFormat(undefined, { timeZone: timezone, weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(now);
  timezoneEl.textContent = timezone;
}
timezoneSelect.addEventListener("change", updateClock);
updateClock();
setInterval(updateClock, 1000);

const yearEl = document.querySelector("#currentYear");
const topBtn = document.querySelector("#topBtn");
if (yearEl) yearEl.textContent = new Date().getFullYear();
window.addEventListener("scroll", () => {
  topBtn?.classList.toggle("show", window.scrollY > 260);
}, { passive: true });
topBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
