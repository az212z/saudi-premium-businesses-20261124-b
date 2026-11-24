// Preview build: no network, no storage. After approval, set WA to the chalet's WhatsApp number.
const WA = "";
const form = document.getElementById("book"), from = form.elements.from;
const t = new Date(); from.min = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const err = document.getElementById("err");
  if (!from.value) { err.hidden = false; from.setAttribute("aria-invalid", "true"); from.focus(); return; }
  err.hidden = true; from.removeAttribute("aria-invalid");
  const n = Number(form.elements.nights.value);
  const d = new Date(from.value + "T12:00");
  const f = (x) => x.toLocaleDateString("ar-SA-u-ca-gregory", { weekday: "long", day: "numeric", month: "long" });
  const out = new Date(d); out.setDate(d.getDate() + n);
  const occ = form.elements.occ.value;
  const msg = ["السلام عليكم، أبغى أحجز في شاليهات المها.", `القسم: ${form.querySelector("input[name=side]:checked").value}`,
    `الوصول: ${f(d)}`, `المغادرة: ${f(out)} (${n === 1 ? "ليلة واحدة" : n === 2 ? "ليلتان" : `${n.toLocaleString("ar-SA")} ليالٍ`})`, occ ? `المناسبة: ${occ}` : null].filter(Boolean).join("\n");
  if (WA) { window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener"); return; }
  document.getElementById("msg").textContent = msg;
  const o = document.getElementById("out"); o.hidden = false; o.scrollIntoView({ block: "nearest" });
});
