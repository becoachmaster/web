/**
 * taller-config.js — BeCoach
 * Carga datos del taller desde /data/talleres.json según el
 * parámetro ?t=ID de la URL. Nunca rompe la página.
 *
 * Uso:
 *   1. Antes de este script, definir la ruta base:
 *      <script>window.TALLER_BASE = '../../';</script>
 *   2. <script src="...taller-config.js"></script>
 *   3. getTallerData().then(function(t) { ... });
 */

async function getTallerData() {
  var params  = new URLSearchParams(window.location.search);
  var ciudad  = params.get('ciudad') || '';
  var base    = window.TALLER_BASE || '';
  var url     = base + 'data/talleres.json';
  var datos   = null;

  try {
    var resp = await fetch(url);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    var json = await resp.json();

    if (ciudad && json[ciudad]) {
      datos = Object.assign({ id: ciudad }, json[ciudad]);
    } else {
      var primerKey = Object.keys(json)[0];
      datos = Object.assign({ id: primerKey }, json[primerKey]);
      if (ciudad) {
        console.warn(
          '[taller-config] Ciudad "' + ciudad +
          '" no encontrada en talleres.json. ' +
          'Usando fallback: "' + primerKey + '"'
        );
      }
    }
  } catch (e) {
    console.warn('[taller-config] No se pudo cargar talleres.json:', e.message);
    datos = {
      id: 'buc',
      ciudad: 'Bucaramanga',
      dia_semana: 'Sábado',
      fecha_display: '18 de abril',
      fecha_corta: '18 de abril',
      cupos: 30,
      hora: '9:00 AM',
      direccion: 'Por confirmar',
      segundo_contadores: 300,
      precio: '$47',
      link_pago: '#',
      direccion_nota: 'La dirección exacta se confirma al reservar tu lugar.'
    };
  }

  return datos;
}
