/* ============================================================
   Masterclass Liderazgo — fecha, hora y contador
   Config: /data/webinar-liderazgo.json  (horas en zona Bogotá)

   Reglas:
   - Si hay "override" y aún no ha pasado -> se muestra esa clase especial.
   - Si no, esquema SEMANAL: un solo "dia_semana" a las "hora":
       * el día del webinar, quien entra ANTES de "corte_hora" -> clase para HOY
       * quien entra a esa hora o después -> salta a la semana siguiente
   - Nunca antes de "diario_desde".
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  pintarNombre();
  cargarWebinar();
  iniciarVideoProgreso();
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

  const texto = generarTextoFecha(ahora, objetivo.fecha, objetivo.horaTexto);
  document.querySelectorAll(".fecha-texto").forEach((el) => {
    el.textContent = texto;
  });

  iniciarContador(objetivo.fecha);
}

function calcularProximo(ahora, cfg) {
  const horaTextoSemanal = cfg.hora_texto || "7:00 pm";

  // 1) Clase especial única
  if (cfg.override && cfg.override.fecha) {
    const inicio = fechaLocal(cfg.override.fecha, cfg.override.hora || "10:00");
    if (ahora < inicio) {
      return {
        fecha: inicio,
        horaTexto: cfg.override.hora_texto || horaTextoSemanal,
      };
    }
  }

  // 2) Esquema semanal: un solo día ("dia_semana", 0=domingo … 6=sábado) con hora de corte
  const diaObjetivo = cfg.dia_semana ?? 2; // martes por defecto
  const corte = aLaHora(ahora, cfg.corte_hora || "17:00");

  let diasHasta = (diaObjetivo - ahora.getDay() + 7) % 7;
  // Si hoy ES el día del webinar pero ya pasó la hora de corte, saltar a la próxima semana
  if (diasHasta === 0 && ahora >= corte) diasHasta = 7;

  let objetivo = aLaHora(ahora, cfg.hora || "19:00");
  objetivo.setDate(objetivo.getDate() + diasHasta);

  // 3) No antes del arranque del esquema semanal (se toma el primer "dia_semana" desde esa fecha)
  if (cfg.diario_desde) {
    const desde = fechaLocal(cfg.diario_desde, cfg.hora || "19:00");
    if (objetivo < desde) {
      const diasDesde = (diaObjetivo - desde.getDay() + 7) % 7;
      objetivo = aLaHora(desde, cfg.hora || "19:00");
      objetivo.setDate(objetivo.getDate() + diasDesde);
    }
  }

  return { fecha: objetivo, horaTexto: horaTextoSemanal };
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

/* ------------------------------------------------------------
   Video del hero: acelera la reproducción y anima una barra de
   progreso "falsa" — el video dura ~7 min (420s) pero la barra
   llega al 85% a los 3 min (180s) y solo el 15% restante se
   reparte en los últimos ~4 min, para que se sienta más rápida.
   ------------------------------------------------------------ */
function iniciarVideoProgreso() {
  const iframe = document.getElementById("video-masterclass");
  const barra = document.getElementById("video-progress-bar");
  const playOverlay = document.getElementById("video-play-overlay");
  const endOverlay = document.getElementById("video-end-overlay");
  if (!iframe || !barra || typeof Vimeo === "undefined") return;

  const player = new Vimeo.Player(iframe);
  const HITO_SEGUNDOS = 180; // 3 min
  const HITO_PORCENTAJE = 85;
  let duracionTotal = 420; // 7 min, fallback si getDuration falla

  player.ready().then(() => {
    // Por si el embed trae autoplay heredado de la configuración del video en Vimeo:
    // lo pausamos apenas esté listo, para que quede detrás del overlay hasta que el usuario haga click.
    player.getPaused().then((paused) => {
      if (!paused) player.pause();
    });

    player.setPlaybackRate(1.15).catch((error) => {
      if (error.name !== "RateNotSupportedError") console.error(error);
    });

    player.getDuration().then((d) => {
      if (d) duracionTotal = d;
    });

    // Overlay de inicio: al hacer click, solo reproduce el video (no abre ningún form).
    // Solo se oculta con un "play" que venga de ese click — así ignoramos cualquier
    // intento de autoplay "fantasma" que dispare el evento sin que el usuario interactúe.
    let reproducidoPorClick = false;
    if (playOverlay) {
      playOverlay.addEventListener("click", () => {
        reproducidoPorClick = true;
        player.play();
      });
      player.on("play", () => {
        if (reproducidoPorClick) playOverlay.hidden = true;
      });
    }

    player.on("timeupdate", (data) => {
      const t = data.seconds;
      let pct;
      if (t <= HITO_SEGUNDOS) {
        pct = (t / HITO_SEGUNDOS) * HITO_PORCENTAJE;
      } else {
        const restante = Math.max(duracionTotal - HITO_SEGUNDOS, 1);
        pct = HITO_PORCENTAJE + ((t - HITO_SEGUNDOS) / restante) * (100 - HITO_PORCENTAJE);
      }
      barra.style.width = Math.min(pct, 100) + "%";
    });

    // Overlay de cierre: aparece cuando termina el video
    player.on("ended", () => {
      barra.style.width = "100%";
      if (endOverlay) endOverlay.hidden = false;
    });
  });
}
