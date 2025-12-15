/* app.js
  - Carga posts.json
  - Inserta los posts en batches (infinite scroll)
  - Lazy-load de imágenes con IntersectionObserver
  - Cada tarjeta abre en nueva pestaña
*/

(() => {
  const POSTS_JSON = 'posts.json'; // archivo con todos los posts
  const BATCH_SIZE = 9;            // cuántos cargar por batch
  const feedEl = document.getElementById('feed');
  const sentinel = document.getElementById('sentinel');
  const yearEl = document.getElementById('year');

  let posts = [];      // array completo cargado desde posts.json
  let index = 0;       // siguiente índice a renderizar

  // actualiza año en footer
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Fetch posts.json
  async function loadPosts() {
    try {
      const resp = await fetch(POSTS_JSON, {cache: "no-store"});
      if (!resp.ok) throw new Error('No se pudo cargar posts.json: ' + resp.status);
      posts = await resp.json();
      if (!Array.isArray(posts)) throw new Error('posts.json debe ser un array');
      // Render primer batch
      loadMore();
      // inicializar observers
      initLazyObserver();
      initInfiniteObserver();
    } catch (err) {
      console.error(err);
      feedEl.innerHTML = `<div style="padding:28px;color:#9CA3AF">Error cargando posts.json — revisa la ruta o formato.</div>`;
    }
  }

  // Crear tarjeta DOM por post
  function createCard(post) {
    // post = { image: "...", title: "...", link: "..." }
    const a = document.createElement('a');
    a.className = 'post-card';
    a.href = post.link || '#';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    // img con data-src para lazy load
    const img = document.createElement('img');
    img.alt = post.title ? post.title : 'Post BeCoach';
    img.setAttribute('data-src', post.image);
    // opcional: atributo loading=lazy para navegadores que lo soportan
    img.loading = 'lazy';
    // placeholder 1x1 transparent gif to avoid broken layout (small)
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

    a.appendChild(img);
    return a;
  }

  // Renderiza next batch
  function loadMore() {
    if (index >= posts.length) return;
    const next = posts.slice(index, index + BATCH_SIZE);
    const fragment = document.createDocumentFragment();
    next.forEach(p => {
      const card = createCard(p);
      fragment.appendChild(card);
    });
    feedEl.appendChild(fragment);
    index += next.length;
    // solicita al lazy observer revisar nodos nuevos
    observeUnloadedImages();
  }

  // Lazy-load: sustituir data-src -> src cuando imagen cerca del viewport
  let lazyObserver;
  function initLazyObserver() {
    if ('IntersectionObserver' in window) {
      lazyObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
            }
            lazyObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '200px 0px', // precarga antes de que entre
        threshold: 0.01
      });
      observeUnloadedImages();
    } else {
      // navegadores muy viejos: cargamos todas las imágenes de golpe
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      });
    }
  }

  // observar todas las imágenes que todavía tienen data-src
  function observeUnloadedImages() {
    if (!lazyObserver) return;
    document.querySelectorAll('img[data-src]').forEach(img => {
      lazyObserver.observe(img);
    });
  }

  // Observer para infinite scrolling (observa el sentinel)
  function initInfiniteObserver() {
    if (!('IntersectionObserver' in window)) {
      // fallback: scroll event simple
      window.addEventListener('scroll', onScrollFallback);
      return;
    }
    const infObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // cuando sentinel visible: cargar siguiente batch
          loadMore();
          // si ya se acabaron los posts, dejamos de observar
          if (index >= posts.length) {
            infObserver.unobserve(sentinel);
            sentinel.style.display = 'none';
          }
        }
      });
    }, { rootMargin: '400px 0px', threshold: 0.01 });

    infObserver.observe(sentinel);
  }

  // Fallback simple si no hay IntersectionObserver
  function onScrollFallback() {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 700;
    if (nearBottom) {
      loadMore();
      if (index >= posts.length) {
        window.removeEventListener('scroll', onScrollFallback);
      }
    }
  }

  // init
  loadPosts();

})();
