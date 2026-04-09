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

  var ICONO_PASANDO = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;margin-bottom:2px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
  var ICONO_FRENANDO = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;margin-bottom:2px"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
  var ICONO_RAIZ = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;margin-bottom:2px"><path d="M12 22V12"/><path d="M12 12C12 12 7 9 7 5a5 5 0 0110 0c0 4-5 7-5 7z"/><path d="M9 17c-2 1-4 2-4 2"/><path d="M15 17c2 1 4 2 4 2"/><path d="M10 19.5c-1 1.5-2 2.5-2 2.5"/><path d="M14 19.5c1 1.5 2 2.5 2 2.5"/></svg>';
  var ICONO_INFORME = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;margin-bottom:2px"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>';

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
      '<p class="card-label" style="color:' + bDom.color + '">' + ICONO_PASANDO + 'Lo que está pasando</p>' +
      '<h3 class="card-titulo">' + bDom.nombre + '</h3>' +
      renderParrafos(bDom.desc) +
    '</div>';

  // Cómo te está frenando
  document.getElementById('card-impacto').innerHTML =
    '<div class="card-impacto">' +
      '<p class="card-label" style="color:var(--accent)">' + ICONO_FRENANDO + 'Cómo te está frenando</p>' +
      renderParrafos(bDom.frena) +
    '</div>';

  // La raíz
  document.getElementById('card-raiz').innerHTML =
    '<div class="card-raiz">' +
      '<p class="card-label" style="color:var(--hint)">' + ICONO_RAIZ + 'La raíz</p>' +
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
      '<p class="gancho-label">' + ICONO_INFORME + 'Recibe el informe completo en tu correo</p>' +
      '<p class="gancho-aviso">La información de esta pantalla se perderá al salir</p>' +
      '<ul class="gancho-bullets">' +
        '<li><span class="bullet-icono">◆</span><span>La <strong>emoción exacta</strong> que está sosteniendo tu patrón — no la que crees, la real</span></li>' +
        '<li><span class="bullet-icono">◆</span><span>Cómo este patrón está <strong>afectando tus relaciones</strong> de maneras que aún no has podido ver</span></li>' +
        '<li><span class="bullet-icono">◆</span><span>Por qué <strong>todo lo que has intentado</strong> antes no ha funcionado — y no es lo que crees</span></li>' +
        '<li><span class="bullet-icono">◆</span><span>Cuál es el <strong>punto de partida real</strong> para que el cambio sea posible</span></li>' +
      '</ul>' +
      '<button class="btn-gancho" onclick="scrollToEmail()">Recibir informe completo →</button>' +
    '</div>';

  // CTA final
  document.getElementById('cta-bloque').innerHTML =
    '<div class="cta-box">' +
      '<div class="cta-icono-wrap">' +
        '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="' + bDom.color + '" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M12 2L2 7l10 5 10-5-10-5z"/>' +
          '<path d="M2 17l10 5 10-5"/>' +
          '<path d="M2 12l10 5 10-5"/>' +
        '</svg>' +
      '</div>' +
      '<p class="cta-eyebrow">El siguiente paso</p>' +
      '<p class="cta-intro">Lo que acabas de leer no es un análisis de tu personalidad.</p>' +
      '<p class="cta-texto">Es un mapa de los resultados que estás obteniendo — y del lugar desde donde los estás construyendo.</p>' +
      '<p class="cta-texto">Los resultados que tienes hoy son el fruto exacto de quien has venido siendo. No de lo que sabes. No de lo que intentaste. De quien eres.</p>' +
      '<p class="cta-texto">Eso no es una sentencia. Es el punto de partida más honesto que existe.</p>' +
      '<p class="cta-texto">Porque si tus resultados son el fruto de quien eres — transformar los resultados empieza por transformar el ser. No por hacer más. Por ser diferente.</p>' +
      '<p class="cta-subtitulo">Eso es lo que hacemos en la Arquitectura del Ser.</p>' +
      '<p class="cta-texto">No vas a recibir otro método. No vas a hacer otro plan. Vas a encontrarte con quien eres — con claridad, sin juicio — y vas a construir, desde ahí, quien necesitas ser para tener lo que realmente quieres.</p>' +
      '<a class="btn-cta" id="btn-taller" href="' + (function(){ var u=CONFIG.taller.url; var c=new URLSearchParams(window.location.search).get('ciudad'); return u + (u.indexOf('?')>=0?'&':'?') + (c?'ciudad='+encodeURIComponent(c):''); })() + '">Taller Arquitectura del Cambio →</a>' +
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

