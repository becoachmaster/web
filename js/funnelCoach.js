// script.js
// IDs esperados en HTML:
// ciudad, fecha, fecha-limite (span), contador, preventa-finalizada,
// cd-days, cd-hours, cd-minutes, cd-seconds,
// precio-preventa, precio-general, link-inscripcion, payment, cta-text

document.addEventListener('DOMContentLoaded', () => {
  fetch('../data/data.json')
    .then(res => res.json())
    .then(data => {
      const info = data.bga;
      const eventoDate = new Date(info.fecha_taller);
      const limiteDate = new Date(info.fecha_limite_preventa);

      // Formateadores
      const fmtDate     = new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
      const fmtTime     = new Intl.DateTimeFormat('es-CO', { hour: 'numeric', minute: '2-digit', hour12: true });
      const fmtMonthDay = new Intl.DateTimeFormat('es-CO', { month: 'long', day: 'numeric' });
      const fmtNum      = num => new Intl.NumberFormat('es-CO').format(num);

      // Precios formateados
      const pre = fmtNum(info.preventa);
      const gen = fmtNum(info.general);

      // 0. Población inmediata de precio general siempre
      document.querySelectorAll('#precio-general').forEach(el => el.textContent = `$${gen}`);

      // 1. Ciudad
      document.querySelectorAll('#ciudad').forEach(el => el.textContent = info.ciudad);

      // 2. Fecha evento
      const fechaStr = fmtDate.format(eventoDate);
      const horaStr  = fmtTime.format(eventoDate);
      document.querySelectorAll('#fecha').forEach(el => el.textContent = `${fechaStr} a las ${horaStr}`);

      // 3. Fecha límite
      const fechaLimStr = fmtMonthDay.format(limiteDate);
      document.querySelectorAll('#fecha-limite').forEach(el => el.textContent = fechaLimStr);

      // Elementos del contador
      const contadorDiv = document.getElementById('contador');
      const msgFinal    = document.getElementById('preventa-finalizada');
      const elDays      = document.getElementById('cd-days');
      const elHours     = document.getElementById('cd-hours');
      const elMinutes   = document.getElementById('cd-minutes');
      const elSeconds   = document.getElementById('cd-seconds');

      // 4. Funciones para actualizar enlaces, textos de pago y CTA
      const paymentBtns = document.querySelectorAll('#payment');
      const ctaTexts    = document.querySelectorAll('#cta-text');

      function setPreventa() {
        // precio-preventa
        document.querySelectorAll('#precio-preventa').forEach(el => el.textContent = `$${pre}`);
        // link-inscripcion
        document.querySelectorAll('#link-inscripcion').forEach(el => {
          el.href = info.linkPreventa;
          el.textContent = 'Inscríbete en preventa';
        });
        // botones de pago
        paymentBtns.forEach(btn => {
          btn.href = info.linkPreventa;
          const h5 = btn.querySelector('h5');
          if (h5) h5.innerHTML = `Inscribirme al <span class="font-weight-bold">Taller FunnelCoach</span> por $${pre}!`;
        });
        // CTA texto independiente
        ctaTexts.forEach(el => {
          el.innerHTML = `Ir al taller <span class="font-weight-bold">FunnelCoach</span> por <u>$${pre}</u> y obtener todos los bonos!`;
        });
      }

      function setGeneral() {
        // precio-general (reejecutar si cambia)
        document.querySelectorAll('#precio-general').forEach(el => el.textContent = `$${gen}`);
        // link-inscripcion
        document.querySelectorAll('#link-inscripcion').forEach(el => {
          el.href = info.linkGeneral;
          el.textContent = 'Inscríbete precio general';
        });
        // botones de pago
        paymentBtns.forEach(btn => {
          btn.href = info.linkGeneral;
          const h5 = btn.querySelector('h5');
          if (h5) h5.innerHTML = `Inscribirme al <span class="font-weight-bold">Taller FunnelCoach</span> por $${gen}!`;
        });
        // CTA texto independiente
        ctaTexts.forEach(el => {
          el.innerHTML = `Ir al taller <span class="font-weight-bold">FunnelCoach</span> por <u>$${gen}</u> y obtener todos los bonos!`;
        });
      }

      // 5. Inicializar según fecha actual
      if (new Date() <= limiteDate) setPreventa(); else setGeneral();

      // 6. Countdown y cambio en finalización
      function updateCountdown() {
        const now  = new Date();
        const diff = limiteDate - now;
        if (diff <= 0) {
          contadorDiv.style.display = 'none';
          msgFinal.style.display    = 'block';
          setGeneral();
          clearInterval(intervalo);
          return;
        }
        const days    = Math.floor(diff / (1000*60*60*24));
        const hours   = Math.floor((diff / (1000*60*60)) % 24);
        const minutes = Math.floor((diff / (1000*60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        elDays.textContent    = days;
        elHours.textContent   = hours;
        elMinutes.textContent = minutes;
        elSeconds.textContent = seconds;
      }
      updateCountdown();
      const intervalo = setInterval(updateCountdown, 1000);

    })
    .catch(err => console.error('Error cargando data.json:', err));
});
