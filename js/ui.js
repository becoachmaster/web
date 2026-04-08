// ════════════════════════════════════════════════════════════════════
//  UI — Pantallas y renderizado
//  Depende de: PREGUNTAS, BLOQUEOS, NUDOS, ILUSTRACIONES (data.js)
//              CONFIG (config.js)
//              iniciarTimer() (main.js)
//  Expone: showScreen(), renderPregunta(), renderResultado()
// ════════════════════════════════════════════════════════════════════

// ── PANTALLAS ─────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById('screen-' + id).classList.add('active');
}

// ── RENDER PREGUNTA ───────────────────────────────────────────────
function renderPregunta() {
  var p = PREGUNTAS[indicePregunta];
  var total = PREGUNTAS.length;
  document.getElementById('prog-num').textContent = 'Pregunta ' + (indicePregunta + 1) + ' de ' + total;
  document.getElementById('prog-fill').style.width = ((indicePregunta / total) * 100) + '%';
  document.getElementById('pregunta-texto').textContent = p.texto;
  for (var i = 1; i <= 5; i++) document.getElementById('c' + i).classList.remove('selected');
  iniciarTimer();
}

// ── HELPER: párrafo con saltos de línea ───────────────────────────
function renderParrafos(texto, extraClass) {
  var cls = extraClass ? ' class="' + extraClass + '"' : ' class="card-texto"';
  return texto.split('\n\n').map(function(p) {
    return '<p' + cls + '>' + p.replace(/\n/g, '<br>') + '</p>';
  }).join('');
}

// ── RENDER RESULTADO ──────────────────────────────────────────────
function renderResultado(result) {
  var pct = result.pct, dom = result.dom, nudo = result.nudo, ord = result.ord;
  var bDom = BLOQUEOS[dom];

  // Título dinámico
  document.getElementById('resultado-eyebrow').textContent = 'Tu patrón principal';
  document.getElementById('resultado-title').textContent   = bDom.nombre;
  document.getElementById('resultado-title').style.color   = bDom.color;

  // Barras
  var barrasEl = document.getElementById('barras');
  barrasEl.innerHTML = '';
  ord.forEach(function(entry, idx) {
    var key   = entry[0], p = entry[1];
    var b     = BLOQUEOS[key];
    var badge = idx === 0
      ? '<span class="badge-dom" style="background:' + b.colorL + ';color:' + b.color + '">principal</span>'
      : '';
    barrasEl.innerHTML +=
      '<div class="barra-item">' +
        '<div class="barra-meta">' +
          '<span class="barra-nombre">' + b.nombre + badge + '</span>' +
          '<span class="barra-pct" style="color:' + b.color + ';font-size:22px;font-weight:500">' + p + '%</span>' +
        '</div>' +
        '<div class="barra-track" style="height:8px">' +
          '<div class="barra-fill" style="width:0%;background:' + b.color + ';height:8px" data-target="' + p + '"></div>' +
        '</div>' +
      '</div>';
  });
  setTimeout(function() {
    document.querySelectorAll('.barra-fill').forEach(function(el) { el.style.width = el.dataset.target + '%'; });
  }, 100);

  // Ilustración
  document.getElementById('ilustracion-wrap').innerHTML = ILUSTRACIONES[dom];

  // Frase de apertura
  document.getElementById('card-apertura').innerHTML =
    '<p class="apertura-texto">' + bDom.apertura + '</p>';

  // Bloqueo dominante — Lo que está pasando
  document.getElementById('card-dominante').innerHTML =
    '<div class="card-bloqueo" style="background:' + bDom.colorL + ';border-color:' + bDom.color + '">' +
      '<p class="card-label" style="color:' + bDom.color + '">Lo que está pasando</p>' +
      '<h3 class="card-titulo">' + bDom.nombre + '</h3>' +
      renderParrafos(bDom.desc) +
    '</div>';

  // Cómo te está frenando
  document.getElementById('card-impacto').innerHTML =
    '<div class="card-impacto">' +
      '<p class="card-label" style="color:var(--accent)">Cómo te está frenando</p>' +
      renderParrafos(bDom.frena) +
    '</div>';

  // La raíz
  document.getElementById('card-raiz').innerHTML =
    '<div class="card-raiz">' +
      '<p class="card-label" style="color:var(--hint)">La raíz</p>' +
      renderParrafos(bDom.raiz) +
    '</div>';

  // El nudo — cómo se conectan los dos bloqueos más altos
  document.getElementById('card-nudo').innerHTML = nudo ?
    '<div class="card-nudo">' +
      '<p class="card-label" style="color:var(--hint)">Cómo se conectan tus patrones</p>' +
      '<p class="card-texto">' + nudo + '</p>' +
    '</div>' : '';

  // Gancho email
  document.getElementById('card-gancho').innerHTML =
    '<div class="card-gancho">' +
      '<p class="gancho-label">El diagnóstico completo incluye</p>' +
      renderParrafos(bDom.gancho, 'gancho-texto') +
      '<button class="btn-gancho" onclick="scrollToEmail()">' +
        'Recibir diagnóstico completo →' +
      '</button>' +
    '</div>';

  // CTA final
  document.getElementById('cta-bloque').innerHTML =
    '<div class="cta-box">' +
      '<p class="cta-intro">Lo que acabas de leer no es un análisis de tu personalidad.</p>' +
      '<p class="cta-texto">Es un mapa de los resultados que estás obteniendo — y del lugar desde donde los estás construyendo.</p>' +
      '<p class="cta-texto">Los resultados que tienes hoy son el fruto exacto de quien has venido siendo. No de lo que sabes. No de lo que intentaste. De quien eres.</p>' +
      '<p class="cta-texto">Eso no es una sentencia. Es el punto de partida más honesto que existe.</p>' +
      '<p class="cta-texto">Porque si tus resultados son el fruto de quien eres — transformar los resultados empieza por transformar el ser. No por hacer más. Por ser diferente.</p>' +
      '<p class="cta-subtitulo">Eso es lo que hacemos en la Arquitectura del Ser.</p>' +
      '<p class="cta-texto">No vas a recibir otro método. No vas a hacer otro plan. Vas a encontrarte con quien eres — con claridad, sin juicio — y vas a construir, desde ahí, quien necesitas ser para tener lo que realmente quieres.</p>' +
      '<a class="btn-cta" id="btn-taller" href="' + CONFIG.taller.url + '">Quiero entender cómo cambiar esto →</a>' +
    '</div>';

  // Sección de envío email al final del resultado
  document.getElementById('email-final').innerHTML =
    '<div class="email-final-box">' +
      '<p class="email-final-title">Recibe el diagnóstico completo</p>' +
      '<p class="email-final-sub">Incluyendo la emoción de fondo, el impacto en tus relaciones, por qué lo que has intentado no ha funcionado — y el punto de partida real.</p>' +
      '<input class="input-contacto" id="email-final-nombre" type="text" placeholder="Tu nombre" oninput="validarEmailFinal()" style="margin-bottom:10px"/>' +
      '<div class="email-final-input-row">' +
        '<input class="input-contacto" id="email-final-input" type="email" placeholder="tu@correo.com" oninput="validarEmailFinal()"/>' +
        '<button class="btn-email-final" id="btn-email-final" onclick="enviarEmailFinal()">Enviar</button>' +
      '</div>' +
      '<p class="captura-privacidad">Tu información es privada y nunca será compartida con terceros.</p>' +
      '<p class="email-final-enviado" id="email-final-enviado" style="display:none">✓ Diagnóstico enviado. En un momento te redirigimos al taller…</p>' +
    '</div>';

  // Mostrar botón sticky y ocultarlo cuando el botón in-card o el form de email estén visibles
  var sticky = document.getElementById('sticky-gancho');
  sticky.style.display = 'block';

  setTimeout(function() {
    var visibles = 0;
    function actualizarSticky() {
      sticky.style.display = visibles > 0 ? 'none' : 'block';
    }
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { visibles += e.isIntersecting ? 1 : -1; });
      if (visibles < 0) visibles = 0;
      actualizarSticky();
    }, { threshold: 0.3 });

    var btnInCard = document.querySelector('#card-gancho .btn-gancho');
    var emailSection = document.getElementById('email-final');
    if (btnInCard)    obs.observe(btnInCard);
    if (emailSection) obs.observe(emailSection);
  }, 50);
}

