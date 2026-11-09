const hoursEl = document.querySelector(".hoursNumber");
const minutesEl = document.querySelector(".minutesNumber");
const secondsEl = document.querySelector(".secondsNumber");
const dateEl = document.querySelector("#dateDisplay");
const timezoneEl = document.querySelector("#timezoneDisplay");
const timezoneSelect = document.querySelector("#timezoneSelect");
const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
const supportedTimezones = typeof Intl.supportedValuesOf === "function"
    ? Intl.supportedValuesOf("timeZone")
    : [];
const timezones = [...new Set([localTimezone, "UTC", ...supportedTimezones])];

for (const timezone of timezones) {
    const option = document.createElement("option");
    option.value = timezone;
    option.textContent = timezone.replaceAll("_", " ");
    timezoneSelect.appendChild(option);
}

timezoneSelect.value = localTimezone;

function updateClock() {
    const timezone = timezoneSelect.value;
    const now = new Date();
    const parts = Object.fromEntries(
        new Intl.DateTimeFormat("en-GB", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h23",
        })
            .formatToParts(now)
            .map(({ type, value }) => [type, value]),
    );

    hoursEl.textContent = parts.hour;
    minutesEl.textContent = parts.minute;
    secondsEl.textContent = parts.second;
    dateEl.textContent = new Intl.DateTimeFormat(undefined, {
        timeZone: timezone,
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(now);
    timezoneEl.textContent = timezone;
}

timezoneSelect.addEventListener("change", updateClock);
updateClock();
window.setInterval(updateClock, 1000);

const yearEl = document.querySelector("#currentYear");
const topBtn = document.querySelector("#topBtn");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const updateTopButton = () => {
    if (!topBtn) return;
    const isVisible = window.scrollY > 260;
    topBtn.classList.toggle("show", isVisible);
    topBtn.tabIndex = isVisible ? 0 : -1;
    topBtn.setAttribute("aria-hidden", String(!isVisible));
};

window.addEventListener("scroll", updateTopButton, { passive: true });
updateTopButton();

topBtn?.addEventListener("click", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});
