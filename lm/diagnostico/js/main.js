// ════════════════════════════════════════════════════════════════════
//  MAIN — Estado global y flujo principal
//  Depende de: calcular() (engine.js)
//              showScreen(), renderPregunta(), renderResultado() (ui.js)
//              enviarEmail(), abrirWhatsApp(), enviarWebhook() (engine.js)
//              CONFIG (config.js)
//  Expone: iniciar(), elegir(), mostrarCargando(), mostrarCaptura(),
//          verResultado(), elegirCanal(), validarInput(), reiniciar()
//          iniciarTimer(), actualizarTimer() — usados por ui.js
//          scrollToEmail(), validarEmailFinal(), enviarEmailFinal()
// ════════════════════════════════════════════════════════════════════

// ── ESTADO GLOBAL ─────────────────────────────────────────────────
var indicePregunta     = 0;
var respuestas         = {};
var timerInterval      = null;
var timerSeg           = 15;
var canalActual        = null;
var resultadoCalculado = null;
var CIRC               = 2 * Math.PI * 12;

// ── TIMER ─────────────────────────────────────────────────────────
function iniciarTimer() {
  clearInterval(timerInterval);
  timerSeg = 15;
  actualizarTimer();
  timerInterval = setInterval(function() {
    timerSeg--;
    actualizarTimer();
    if (timerSeg <= 0) clearInterval(timerInterval);
  }, 1000);
}

function actualizarTimer() {
  var n = document.getElementById('timer-num');
  var r = document.getElementById('ring-fg');
  n.textContent = Math.max(timerSeg, 0);
  r.style.strokeDashoffset = CIRC * (1 - timerSeg / 15);
  var u = timerSeg <= 5;
  n.className  = 'timer-num' + (u ? ' urgent' : '');
  r.className  = 'ring-fg'   + (u ? ' urgent' : '');
  document.getElementById('timer-label').textContent = u ? '¡Responde!' : 'Responde pronto';
}

// ── FLUJO PRINCIPAL ───────────────────────────────────────────────
function iniciar() {
  indicePregunta = 0;
  respuestas = {};
  showScreen('pregunta');
  renderPregunta();
}

function elegir(valor) {
  clearInterval(timerInterval);
  respuestas[PREGUNTAS[indicePregunta].id] = valor;
  for (var i = 1; i <= 5; i++) document.getElementById('c' + i).classList.remove('selected');
  document.getElementById('c' + valor).classList.add('selected');
  setTimeout(function() {
    if (indicePregunta < PREGUNTAS.length - 1) {
      indicePregunta++;
      renderPregunta();
    } else {
      mostrarCargando();
    }
  }, 380);
}

function mostrarCargando() {
  showScreen('cargando');
  var msgs = [
    'Analizando tus respuestas...',
    'Identificando patrones...',
    'Preparando tu diagnóstico...'
  ];
  var i = 0;
  var el = document.getElementById('cargando-msg');
  var iv = setInterval(function() {
    i = (i + 1) % msgs.length;
    el.textContent = msgs[i];
  }, 900);
  setTimeout(function() {
    clearInterval(iv);
    resultadoCalculado = calcular();
    mostrarCaptura();
  }, 2700);
}

// ── CAPTURA PREVIA ────────────────────────────────────────────────
function mostrarCaptura() {
  canalActual = null;
  document.querySelectorAll('.btn-canal-grande').forEach(function(b) {
    b.classList.remove('active');
  });
  document.getElementById('input-wrap').classList.remove('visible');
  document.getElementById('btn-ver-resultado').classList.remove('listo');
  showScreen('captura');
}

function elegirCanal(canal) {
  canalActual = canal;
  document.querySelectorAll('.btn-canal-grande').forEach(function(b) {
    b.classList.remove('active');
  });
  document.getElementById('btn-' + canal).classList.add('active');

  var wrap  = document.getElementById('input-wrap');
  var label = document.getElementById('input-label');
  var input = document.getElementById('input-contacto');

  if (canal === 'email') {
    wrap.classList.add('visible');
    label.textContent  = 'Tu email';
    input.type         = 'email';
    input.placeholder  = 'tu@correo.com';
    input.value        = '';
    validarInput();
  } else if (canal === 'whatsapp') {
    wrap.classList.add('visible');
    label.textContent  = 'Tu número de WhatsApp';
    input.type         = 'tel';
    input.placeholder  = '+57 300 000 0000';
    input.value        = '';
    validarInput();
  } else {
    wrap.classList.remove('visible');
    document.getElementById('btn-ver-resultado').classList.add('listo');
  }
}

function validarInput() {
  var val = document.getElementById('input-contacto').value.trim();
  var btn = document.getElementById('btn-ver-resultado');
  btn.classList.toggle('listo', val.length > 3);
}

function verResultado() {
  var canal    = canalActual;
  var contacto = (document.getElementById('input-contacto').value || '').trim();

  // Renderizar resultado completo
  renderResultado(resultadoCalculado);
  showScreen('resultado');

  // Enviar según canal elegido en captura
  if (canal === 'email' && contacto) {
    enviarEmail(contacto, resultadoCalculado);
  } else if (canal === 'whatsapp' && contacto) {
    abrirWhatsApp(contacto, resultadoCalculado);
  }

  // Webhook si está activo
  if (CONFIG.webhook.activo) {
    enviarWebhook(canal, contacto, resultadoCalculado);
  }

  // Badge de confirmación
  var badge = document.getElementById('enviado-badge');
  if (canal === 'email' && contacto) {
    badge.textContent    = '✓ Te enviamos tu diagnóstico al correo';
    badge.style.display  = 'block';
  } else if (canal === 'whatsapp' && contacto) {
    badge.textContent    = '✓ Abrimos WhatsApp con tu resumen';
    badge.style.display  = 'block';
  }
}

// ── EMAIL FINAL (dentro del resultado) ────────────────────────────
function scrollToEmail() {
  var el = document.getElementById('email-final');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function validarEmailFinal() {
  var nombre = (document.getElementById('email-final-nombre').value || '').trim();
  var email  = (document.getElementById('email-final-input').value  || '').trim();
  var btn    = document.getElementById('btn-email-final');
  if (btn) btn.style.opacity = (nombre.length > 0 && email.length > 3) ? '1' : '0.4';
}

function enviarEmailFinal() {
  var nombreInput = document.getElementById('email-final-nombre');
  var emailInput  = document.getElementById('email-final-input');
  var nombre   = (nombreInput.value || '').trim();
  var contacto = (emailInput.value  || '').trim();
  if (!nombre || !contacto || contacto.length < 4) return;

  // Mostrar overlay de transición inmediatamente
  document.getElementById('envio-overlay').classList.add('visible');

  enviarEmail(contacto, resultadoCalculado, nombre);

  if (CONFIG.webhook.activo) {
    enviarWebhook('email-resultado', contacto, resultadoCalculado);
  }

  // Guardar nombre para el popup en la página del taller
  try { sessionStorage.setItem('diag_nombre', nombre); } catch(e) {}

  // Redirigir al taller con ?diagnostico=enviado y la ciudad si viene en la URL
  var url = CONFIG.taller.url;
  if (url && url !== '#') {
    var sep     = url.indexOf('?') >= 0 ? '&' : '?';
    var ciudad  = new URLSearchParams(window.location.search).get('ciudad');
    var extra   = ciudad ? '&ciudad=' + encodeURIComponent(ciudad) : '';
    setTimeout(function() {
      window.location.href = url + sep + 'diagnostico=enviado' + extra;
    }, 1400);
  }
}

// ── REINICIAR ─────────────────────────────────────────────────────
function reiniciar() {
  clearInterval(timerInterval);
  indicePregunta     = 0;
  respuestas         = {};
  canalActual        = null;
  resultadoCalculado = null;
  document.getElementById('enviado-badge').style.display = 'none';
  document.getElementById('sticky-gancho').style.display = 'none';
  showScreen('intro');
}
