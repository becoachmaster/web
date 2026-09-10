/* ============================================================
   Masterclass Liderazgo — fecha, hora y contador
   Config: /data/webinar-liderazgo.json  (horas en zona Bogotá)

   Reglas:
   - Si hay "override" y aún no ha pasado -> se muestra esa clase especial.
   - Si no, esquema DIARIO a las "hora":
       * quien entra ANTES de "corte_hora"  -> clase para HOY
       * quien entra a esa hora o después   -> clase para MAÑANA
   - Nunca antes de "diario_desde".
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  pintarNombre();
  cargarWebinar();
});

function getParam(param) {
  return new URLSearchParams(window.location.search).get(param) || "";
}

function pintarNombre() {
  const el = document.getElementById("user-name");
  if (el) el.textContent = getParam("name");
  const sep = document.getElementById("user-name-sep");
  if (sep && getParam("name")) sep.hidden = false;
}

// Fecha/hora actual en Bogotá (GMT-5), como objeto Date en hora local del navegador
function ahoraBogota() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Bogota" })
  );
}

// Construye un Date con los componentes de "base" pero a la hora "HH:MM"
function aLaHora(base, hhmm) {
  const [h, m] = String(hhmm).split(":").map(Number);
  const d = new Date(base);
  d.setHours(h, m, 0, 0);
  return d;
}

// Date a partir de "YYYY-MM-DD" + "HH:MM" en hora local
function fechaLocal(fechaISO, hhmm) {
  const [y, mo, da] = fechaISO.split("-").map(Number);
  const [h, m] = String(hhmm).split(":").map(Number);
  return new Date(y, mo - 1, da, h || 0, m || 0, 0, 0);
}

async function cargarWebinar() {
  let cfg;
  try {
    const res = await fetch("/data/webinar-liderazgo.json");
    cfg = await res.json();
  } catch (e) {
    return; // sin config, dejamos el texto por defecto
  }

  const ahora = ahoraBogota();
  const objetivo = calcularProximo(ahora, cfg);

  const fechaEl = document.getElementById("fecha-webinar");
  if (fechaEl) {
    fechaEl.textContent = generarTextoFecha(ahora, objetivo.fecha, objetivo.horaTexto);
  }

  iniciarContador(objetivo.fecha);
}

function calcularProximo(ahora, cfg) {
  const horaTextoDiaria = cfg.hora_texto || "7:00 pm";

  // 1) Clase especial única
  if (cfg.override && cfg.override.fecha) {
    const inicio = fechaLocal(cfg.override.fecha, cfg.override.hora || "10:00");
    if (ahora < inicio) {
      return {
        fecha: inicio,
        horaTexto: cfg.override.hora_texto || horaTextoDiaria,
      };
    }
  }

  // 2) Esquema diario con hora de corte
  const corte = aLaHora(ahora, cfg.corte_hora || "17:00");
  let objetivo = aLaHora(ahora, cfg.hora || "19:00");
  if (ahora >= corte) {
    objetivo.setDate(objetivo.getDate() + 1);
  }

  // 3) No antes del arranque del esquema diario
  if (cfg.diario_desde) {
    const desde = fechaLocal(cfg.diario_desde, cfg.hora || "19:00");
    if (objetivo < desde) objetivo = desde;
  }

  return { fecha: objetivo, horaTexto: horaTextoDiaria };
}

function generarTextoFecha(ahora, fecha, horaTexto) {
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
    "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  const hoyMid = new Date(ahora); hoyMid.setHours(0, 0, 0, 0);
  const objMid = new Date(fecha); objMid.setHours(0, 0, 0, 0);
  const difDias = Math.round((objMid - hoyMid) / 86400000);

  const ds = dias[fecha.getDay()];
  const dm = fecha.getDate();
  const mes = meses[fecha.getMonth()];

  let cuando;
  if (difDias === 0) cuando = `Hoy, ${ds} ${dm} de ${mes}`;
  else if (difDias === 1) cuando = `Mañana, ${ds} ${dm} de ${mes}`;
  else cuando = `${ds} ${dm} de ${mes}`;

  return `${cuando}  ⏰ ${horaTexto}`;
}

function iniciarContador(fechaObjetivo) {
  const el = document.getElementById("contador");
  if (!el) return;

  function tick() {
    const diff = fechaObjetivo - ahoraBogota();

    if (diff <= 0) {
      el.textContent = "¡La clase está por comenzar!";
      clearInterval(intervalo);
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);

    el.textContent = (d > 0 ? `${d}d ` : "") + `${h}h ${m}m ${s}s`;
  }

  tick();
  const intervalo = setInterval(tick, 1000);
}
