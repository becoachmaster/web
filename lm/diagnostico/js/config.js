// ════════════════════════════════════════════════════════════════════
//  CONFIGURACIÓN — Edita solo este archivo
// ════════════════════════════════════════════════════════════════════
var CONFIG = {

  whatsapp: {
    numero: '573132047407', // Con código de país, sin + ni espacios
  },

  emailjs: {
    publicKey:  'TU_PUBLIC_KEY',   // → Account > API Keys
    serviceId:  'TU_SERVICE_ID',   // → Email Services > tu servicio
    templateId: 'TU_TEMPLATE_ID',  // → Email Templates > tu plantilla
    // Variables que llegan a la plantilla de EmailJS:
    // {{nombre}}       → nombre del usuario (si lo capturas)
    // {{email}}        → email del usuario
    // {{bloqueo}}      → nombre del bloqueo dominante
    // {{descripcion}}  → descripción personalizada
    // {{impacto}}      → cómo lo está frenando
    // {{pct_1}}        → nombre y % bloqueo 1
    // {{pct_2}}        → nombre y % bloqueo 2
    // {{pct_3}}        → nombre y % bloqueo 3
    // {{cta}}          → texto del llamado a la acción
  },

  // Para n8n u otra automatización:
  // Cambia webhook.activo a true y pon tu URL.
  // Recibirás un POST con JSON que incluye todos los campos de arriba.
  webhook: {
    activo:   false,
    url:      'https://tu-n8n.com/webhook/diagnostico-becoach',
    // El payload que recibirás tiene esta estructura:
    // {
    //   canal:       'email' | 'whatsapp' | 'ver',
    //   contacto:    'dato ingresado por el usuario',
    //   bloqueo:     'sa' | 'd' | 'c',
    //   nombre_bloqueo: '...',
    //   descripcion: '...',
    //   impacto:     '...',
    //   cta:         '...',
    //   porcentajes: { sa: N, d: N, c: N },
    //   timestamp:   'ISO string'
    // }
  },

  taller: {
    url: '../../programas/arquitectura-del-ser/', // Ruta relativa al taller
  },
};
