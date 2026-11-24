// Preview build: no network, no storage. After approval, set WA to the clinic's WhatsApp number.
const WA = "";
const SERVICES = ["كشف وعلاج", "تعقيم", "قص وعناية", "فندقة", "مستلزمات"];
const box = document.getElementById("svc");
SERVICES.forEach((s, i) => {
  const l = document.createElement("label");
  const r = Object.assign(document.createElement("input"), { type: "radio", name: "svc", value: s, checked: i === 0 });
  const t = Object.assign(document.createElement("span"), { textContent: s });
  l.append(r, t); box.append(l);
});
const form = document.getElementById("f");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const note = form.elements.note.value.trim();
  const msg = ["السلام عليكم، أبغى أحجز زيارة.", `الخدمة: ${form.querySelector("input[name=svc]:checked").value}`, `الأليف: ${form.elements.pet.value}`, note ? `ملاحظة: ${note}` : null].filter(Boolean).join("\n");
  if (WA) { window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener"); return; }
  document.getElementById("msg").textContent = msg;
  const o = document.getElementById("out"); o.hidden = false; o.scrollIntoView({ block: "nearest" });
});
