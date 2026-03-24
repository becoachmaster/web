document.addEventListener('DOMContentLoaded', async function () {

  async function fetchCOP() {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) return;
      const data = await res.json();
      const tasa = data.rates?.COP;
      if (!tasa) return;

      const precios = document.querySelectorAll(
        '[data-usd]'
      );

      precios.forEach(function (el, index) {
        const usd = parseFloat(el.getAttribute('data-usd'));
        if (isNaN(usd)) return;

        const cop = Math.round(usd * tasa);
        const formatted = cop.toLocaleString('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });

        const spanId = 'precio-cop-' + (index + 1);
        const span = document.getElementById(spanId);
        if (span) {
          span.textContent = '~ ' + formatted;
        }
      });

    } catch (e) {
      // Fallo silencioso — no mostrar nada si la API no responde
    }
  }

  fetchCOP();
});
