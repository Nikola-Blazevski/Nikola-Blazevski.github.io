document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Resumes: flag any PDF that hasn't been uploaded yet ---------- */
document.querySelectorAll(".resume[data-file]").forEach(async (card) => {
  try {
    const res = await fetch(card.dataset.file, { method: "HEAD" });
    if (res.ok) return;
  } catch { /* offline or blocked: treat as missing */ }
  card.classList.add("is-missing");
  card.querySelector(".resume__missing").hidden = false;
  card.querySelectorAll(".btn").forEach((btn) => {
    btn.removeAttribute("href");
    btn.setAttribute("aria-disabled", "true");
  });
});

/* ---------- Recon terminal: reveal lines one by one ---------- */
const term = document.querySelector(".term");
if (term && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const lines = [...term.querySelectorAll(".term__line")];
  term.classList.add("is-typing");
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    io.disconnect();
    lines.forEach((line, i) => setTimeout(() => line.classList.add("is-shown"), 350 + i * 280));
  }, { threshold: 0.4 });
  io.observe(term);
}

/* ---------- For the curious ---------- */
console.log(
  "%c▲ basecamp%c\nYou opened the console. Respect.\nflag{l34v3_n0_tr4c3}",
  "font: bold 16px monospace; color: #6b3a2a;",
  "font: 12px monospace; color: inherit;"
);
