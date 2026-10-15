document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Resumes: flag any PDF that hasn't been uploaded yet ---------- */
document.querySelectorAll(".doc[data-file]").forEach(async (doc) => {
  try {
    const res = await fetch(doc.dataset.file, { method: "HEAD" });
    if (res.ok) return;
  } catch { /* offline or blocked: treat as missing */ }
  doc.classList.add("is-missing");
  doc.querySelector(".doc__links").textContent = "Not uploaded yet";
});

/* ---------- Local time in Edmonton ---------- */
const clock = document.getElementById("clock");
const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Edmonton", hour: "numeric", minute: "2-digit" });
function updateClock() { clock.textContent = fmt.format(Date.now()); }
if (clock) {
  updateClock();
  setInterval(updateClock, 30e3);
}

/* ---------- Reveal sections as they scroll in ---------- */
const revealables = [...document.querySelectorAll("[data-reveal], .opener")];
const groups = new Map();
revealables.forEach((el) => {
  const group = el.closest("section, footer") ?? document.body;
  const i = groups.get(group) ?? 0;
  el.style.setProperty("--i", Math.min(i, 6));
  groups.set(group, i + 1);
});
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-in");
    io.unobserve(entry.target);
  });
}, { rootMargin: "0px 0px -10% 0px" });
revealables.forEach((el) => io.observe(el));

/* ---------- Footer wordmark: fit the viewBox to the set name so it spans margin to margin ---------- */
const wordmark = document.querySelector(".wordmark");
document.fonts.ready.then(() => {
  const box = wordmark.querySelector("text").getBBox();
  wordmark.setAttribute("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
});

/* ---------- For the curious ---------- */
console.log(
  "%c▲ basecamp%c\nYou opened the console. Respect.\nflag{l34v3_n0_tr4c3}",
  "font: bold 16px monospace; color: #6b3a2a;",
  "font: 12px monospace; color: inherit;"
);
