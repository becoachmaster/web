/* ============================================================
   BECOACH — components.js
   Carga nav y footer en todas las páginas via fetch().
   Maneja: scroll del nav, menú móvil, link activo.

   USO: agregar al final del <body> en cada página:
   <script src="../assets/js/components.js"></script>

   Para páginas sin nav/footer (landings, ventas):
   No incluir este script.
   ============================================================ */

(function () {

  /* ----------------------------------------------------------
     Detecta la profundidad de la página actual para
     construir la ruta correcta al componente.
     / (raíz)       → components/
     /landings/     → ../components/
     /recursos/     → ../components/
     ---------------------------------------------------------- */
  function getRutaBase() {
    const partes = window.location.pathname.split('/').filter(Boolean);
    // Si estamos en la raíz o en index.html directamente
    if (partes.length <= 1) return 'components/';
    // Si estamos un nivel adentro (landings/, ventas/, etc.)
    return '../components/';
  }

  const BASE = getRutaBase();

  /* ----------------------------------------------------------
     Carga un componente HTML y lo inserta en el DOM
     ---------------------------------------------------------- */
  async function cargarComponente(archivo, idContenedor, insertar) {
    try {
      const respuesta = await fetch(BASE + archivo);
      if (!respuesta.ok) throw new Error(`No se pudo cargar: ${archivo}`);
      const html = await respuesta.text();

      if (insertar === 'prepend') {
        document.body.insertAdjacentHTML('afterbegin', html);
      } else {
        document.body.insertAdjacentHTML('beforeend', html);
      }

    } catch (error) {
      console.warn('[BeCoach components]', error.message);
    }
  }

  /* ----------------------------------------------------------
     Marca el link activo según la URL actual
     ---------------------------------------------------------- */
  function marcarLinkActivo() {
    const ruta = window.location.pathname;
    const links = document.querySelectorAll('.nav__link[data-pagina]');

    links.forEach(link => {
      const href = link.getAttribute('href') || '';
      // Compara el segmento de la URL con el href
      if (ruta.endsWith('index.html') || ruta === '/' || ruta.endsWith('/')) {
        if (href.includes('index.html') || href === '../index.html') {
          link.classList.add('activo');
        }
      } else if (href && ruta.includes(href.replace('../', '').replace('.html', ''))) {
        link.classList.add('activo');
      }
    });
  }

  /* ----------------------------------------------------------
     Efecto scroll del nav (agrega clase .scrolled)
     ---------------------------------------------------------- */
  function initScrollNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const umbral = 60;

    function actualizarNav() {
      if (window.scrollY > umbral) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', actualizarNav, { passive: true });
    actualizarNav(); // Ejecutar al cargar por si ya hay scroll
  }

  /* ----------------------------------------------------------
     Menú hamburguesa (móvil)
     ---------------------------------------------------------- */
  function initMenuMovil() {
    const hamburguesa = document.getElementById('hamburguesa');
    const menuMovil   = document.getElementById('menuMovil');
    if (!hamburguesa || !menuMovil) return;

    hamburguesa.addEventListener('click', function () {
      const abierto = menuMovil.classList.toggle('abierto');
      hamburguesa.classList.toggle('abierto', abierto);

      // Bloquear scroll del body cuando el menú está abierto
      document.body.style.overflow = abierto ? 'hidden' : '';
      hamburguesa.setAttribute('aria-expanded', abierto);
    });

    // Cerrar menú al hacer clic en un link
    menuMovil.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuMovil.classList.remove('abierto');
        hamburguesa.classList.remove('abierto');
        document.body.style.overflow = '';
      });
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuMovil.classList.contains('abierto')) {
        menuMovil.classList.remove('abierto');
        hamburguesa.classList.remove('abierto');
        document.body.style.overflow = '';
      }
    });
  }

  /* ----------------------------------------------------------
     Animación de entrada para secciones (Intersection Observer)
     Agrega clase .visible a elementos con clase .animar
     cuando entran al viewport.
     ---------------------------------------------------------- */
  function initAnimaciones() {
    const elementos = document.querySelectorAll('.animar');
    if (!elementos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elementos.forEach(el => observer.observe(el));
  }

  /* ----------------------------------------------------------
     Smooth scroll para links internos con #
     ---------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function (e) {
        const id = this.getAttribute('href').slice(1);
        const destino = document.getElementById(id);
        if (!destino) return;

        e.preventDefault();
        const navAltura = document.getElementById('nav')?.offsetHeight || 80;
        const y = destino.getBoundingClientRect().top + window.scrollY - navAltura - 16;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });
  }

  /* ----------------------------------------------------------
     Inicialización principal
     ---------------------------------------------------------- */
  async function init() {
    // Cargar nav y footer en paralelo
    await Promise.all([
      cargarComponente('nav.html', 'nav', 'prepend'),
      cargarComponente('footer.html', 'footer', 'append')
    ]);

    // Inicializar comportamientos después de insertar los componentes
    marcarLinkActivo();
    initScrollNav();
    initMenuMovil();
    initSmoothScroll();
    initAnimaciones();
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
