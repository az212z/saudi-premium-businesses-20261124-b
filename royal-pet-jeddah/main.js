// Preview build: no network, no storage. Hours are as published on the clinic's Instagram (checked 2026-11-24).
const WA = ""; // set after approval
const DAYS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
// [openMinutes, closeMinutes] in Riyadh time; 24*60 = midnight
const HOURS = { 0: [600, 1440], 1: [600, 1440], 2: [600, 1440], 3: [600, 1440], 4: [600, 1440], 5: [960, 1320], 6: [600, 1440] };
const fmt = (m) => {
  if (m === 1440) return "١٢ منتصف الليل";
  const h = Math.floor(m / 60), ap = h < 12 ? "ص" : "م", h12 = ((h + 11) % 12) + 1;
  return `${h12.toLocaleString("ar-SA")} ${ap}`;
};
const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" }));
const today = now.getDay(), mins = now.getHours() * 60 + now.getMinutes();

const body = document.getElementById("hours-body");
[6, 0, 1, 2, 3, 4, 5].forEach((d) => {
  const tr = document.createElement("tr");
  if (d === today) tr.className = "today";
  const a = document.createElement("td"); a.textContent = DAYS[d];
  const b = document.createElement("td"); b.textContent = `${fmt(HOURS[d][0])} – ${fmt(HOURS[d][1])}`;
  tr.append(a, b); body.append(tr);
});

const st = document.getElementById("status"), stt = document.getElementById("status-text");
const [o, c] = HOURS[today];
if (mins >= o && mins < c) { st.classList.add("open"); stt.textContent = `مفتوحة الآن · حتى ${fmt(c)}`; }
else {
  st.classList.add("closed");
  const next = mins < o ? `اليوم ${fmt(o)}` : `${DAYS[(today + 1) % 7]} ${fmt(HOURS[(today + 1) % 7][0])}`;
  stt.textContent = `مغلقة الآن · تفتح ${next}`;
}

const form = document.getElementById("f"), day = form.elements.day;
day.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const err = document.getElementById("err");
  if (!day.value) { err.hidden = false; day.setAttribute("aria-invalid", "true"); day.focus(); return; }
  err.hidden = true; day.removeAttribute("aria-invalid");
  const name = form.elements.petname.value.trim();
  const d = new Date(day.value + "T12:00").toLocaleDateString("ar-SA-u-ca-gregory", { weekday: "long", day: "numeric", month: "long" });
  const msg = ["السلام عليكم، أبغى أحجز موعد.", `الأليف: ${form.elements.pet.value}${name ? ` (${name})` : ""}`, `سبب الزيارة: ${form.elements.reason.value}`, `اليوم المفضل: ${d}`].join("\n");
  if (WA) { window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener"); return; }
  document.getElementById("msg").textContent = msg;
  const out = document.getElementById("out"); out.hidden = false; out.scrollIntoView({ block: "nearest" });
});
