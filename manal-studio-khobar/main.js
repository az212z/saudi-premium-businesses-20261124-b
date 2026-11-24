// RTL date fix: Chrome renders the empty date placeholder reversed in Arabic locales.
document.querySelectorAll("input[type=date]").forEach((d) => {
  const toText = () => { if (!d.value) { d.type = "text"; d.placeholder = "اختر التاريخ"; } };
  d.addEventListener("focus", () => { if (d.type !== "date") { d.type = "date"; try { d.showPicker(); } catch {} } });
  d.addEventListener("blur", toText); toText();
});

// Preview build: no network calls, no storage. After approval, set WA to the studio's number to open WhatsApp directly.
const WA = "";
const tc = document.getElementById("tc");
if (tc && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let f = 0;
  const p = (n) => String(n).padStart(2, "0");
  setInterval(() => { f++; const s = Math.floor(f / 24); tc.textContent = `${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}:${p(f % 24)}`; }, 1000 / 24);
}
const form = document.getElementById("f");
const date = form.elements.date;
date.min = new Date().toISOString().slice(0, 10);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const err = document.getElementById("err");
  if (!date.value) { err.hidden = false; date.setAttribute("aria-invalid", "true"); date.focus(); return; }
  err.hidden = true; date.removeAttribute("aria-invalid");
  const needs = [...form.querySelectorAll("input[name=need]:checked")].map((i) => i.value);
  const d = new Date(date.value + "T12:00").toLocaleDateString("ar-SA-u-ca-gregory", { day: "numeric", month: "long", year: "numeric" });
  const venue = form.elements.venue.value.trim();
  const msg = ["السلام عليكم، أبغى أستفسر عن حجز تصوير.", `المناسبة: ${form.elements.type.value}`, `التاريخ المتوقع: ${d}`,
    needs.length ? `المطلوب: ${needs.join(" + ")}` : null, venue ? `المكان: ${venue}` : null].filter(Boolean).join("\n");
  if (WA) { window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener"); return; }
  document.getElementById("msg").textContent = msg;
  const out = document.getElementById("out"); out.hidden = false; out.scrollIntoView({ block: "nearest" });
});
