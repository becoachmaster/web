// ════════════════════════════════════════════════════════════════════
//  ENGINE — Cálculo y envíos
//  Depende de: CONFIG (config.js), PREGUNTAS, BLOQUEOS, NUDOS (data.js)
//  Expone: calcular(), buildPayload(), enviarEmail(), abrirWhatsApp(), enviarWebhook()
// ════════════════════════════════════════════════════════════════════

// ── CALCULAR ──────────────────────────────────────────────────────
function calcular() {
  var scores = {sa:0,d:0,c:0}, counts = {sa:0,d:0,c:0};
  PREGUNTAS.forEach(function(p) {
    var raw = respuestas[p.id]; if (!raw) return;
    var val = p.inv ? 6 - raw : raw;
    scores[p.b] += val; counts[p.b]++;
  });
  var pct = {};
  Object.keys(scores).forEach(function(b) { pct[b] = Math.round((scores[b] / (counts[b] * 5)) * 100); });
  var ord = Object.entries(pct).sort(function(a,b) { return b[1]-a[1]; });
  var dom = ord[0][0], seg = ord[1][0];
  var nudo = NUDOS[[dom,seg].sort().join('-')] || '';
  return { pct: pct, dom: dom, seg: seg, nudo: nudo, ord: ord };
}

// ── BUILD PAYLOAD ─────────────────────────────────────────────────
function buildPayload(canal, contacto, r) {
  var b = BLOQUEOS[r.dom];
  return {
    canal:          canal,
    contacto:       contacto,
    bloqueo:        r.dom,
    nombre_bloqueo: b.nombre,
    descripcion:    b.desc,
    impacto:        b.impacto,
    cta:            b.cta,
    porcentajes:    r.pct,
    pct_1: BLOQUEOS[r.ord[0][0]].nombre + ': ' + r.ord[0][1] + '%',
    pct_2: BLOQUEOS[r.ord[1][0]].nombre + ': ' + r.ord[1][1] + '%',
    pct_3: BLOQUEOS[r.ord[2][0]].nombre + ': ' + r.ord[2][1] + '%',
    timestamp: new Date().toISOString(),
  };
}

// ── ENVIAR EMAIL ──────────────────────────────────────────────────
function enviarEmail(email, r, nombre) {
  if (!CONFIG.emailjs.publicKey || CONFIG.emailjs.publicKey === 'TU_PUBLIC_KEY') {
    console.warn('EmailJS no configurado. Agrega tus claves en CONFIG.');
    return;
  }
  emailjs.init(CONFIG.emailjs.publicKey);
  var payload = buildPayload('email', email, r);
  emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, {
    email:       email,
    nombre:      nombre || '',
    bloqueo:     payload.nombre_bloqueo,
    descripcion: payload.descripcion,
    impacto:     payload.impacto,
    pct_1:       payload.pct_1,
    pct_2:       payload.pct_2,
    pct_3:       payload.pct_3,
    cta:         payload.cta,
  }).catch(function(err) { console.error('EmailJS error:', err); });
}

// ── ABRIR WHATSAPP ────────────────────────────────────────────────
function abrirWhatsApp(numeroUsuario, r) {
  var b = BLOQUEOS[r.dom];
  var msg =
    '*Tu diagnóstico — Arquitectura del Ser*\n\n' +
    '*Patrón principal: ' + b.nombre + '* (' + r.pct[r.dom] + '%)\n\n' +
    b.desc + '\n\n' +
    '*Cómo te está frenando:*\n' + b.impacto + '\n\n' +
    '*Tus tres patrones:*\n' +
    '• ' + BLOQUEOS[r.ord[0][0]].nombre + ': ' + r.ord[0][1] + '%\n' +
    '• ' + BLOQUEOS[r.ord[1][0]].nombre + ': ' + r.ord[1][1] + '%\n' +
    '• ' + BLOQUEOS[r.ord[2][0]].nombre + ': ' + r.ord[2][1] + '%\n\n' +
    '_' + b.cta + '_';

  // Abre WhatsApp del usuario hacia el número de Gio (como contacto de soporte)
  var url = 'https://wa.me/' + CONFIG.whatsapp.numero + '?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
}

// ── ENVIAR WEBHOOK ────────────────────────────────────────────────
function enviarWebhook(canal, contacto, r) {
  var payload = buildPayload(canal, contacto, r);
  fetch(CONFIG.webhook.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(function(err) { console.error('Webhook error:', err); });
}
