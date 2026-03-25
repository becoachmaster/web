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
  var id      = params.get('t') || '';
  var base    = window.TALLER_BASE || '';
  var url     = base + 'data/talleres.json';
  var datos   = null;

  try {
    var resp = await fetch(url);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    var json = await resp.json();

    if (id && json[id]) {
      datos = Object.assign({ id: id }, json[id]);
    } else {
      var primerKey = Object.keys(json)[0];
      datos = Object.assign({ id: primerKey }, json[primerKey]);
      if (id) {
        console.warn(
          '[taller-config] ID "' + id +
          '" no encontrado en talleres.json. ' +
          'Usando fallback: "' + primerKey + '"'
        );
      }
    }
  } catch (e) {
    console.warn('[taller-config] No se pudo cargar talleres.json:', e.message);
    datos = {
      id: 'buc-abr-25',
      ciudad: 'Bucaramanga',
      dia_semana: 'Sábado',
      fecha_display: '11 de abril',
      fecha_corta: '11 de abril',
      cupos: 30,
      hora: '9:00 AM',
      precio: '$47',
      link_pago: '#',
      direccion_nota: 'La dirección exacta se confirma al reservar tu lugar.'
    };
  }

  return datos;
}
