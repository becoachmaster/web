(function () {

  function ensureMeta(attribute, value, content) {
    let selector = `meta[${attribute}="${value}"]`;
    let meta = document.head.querySelector(selector);

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, value);
      document.head.appendChild(meta);
    }

    if (typeof content === 'string') {
      meta.setAttribute('content', content);
    }
  }

  function ensureCharset() {
    let meta = document.head.querySelector('meta[charset]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('charset', 'UTF-8');
      document.head.insertBefore(meta, document.head.firstChild);
    }
  }

  function ensureLink(rel, href, extraAttributes) {
    let link = document.head.querySelector(`link[rel="${rel}"][href="${href}"]`);

    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      link.href = href;

      if (extraAttributes) {
        Object.keys(extraAttributes).forEach((key) => {
          if (extraAttributes[key] !== undefined && extraAttributes[key] !== null) {
            link.setAttribute(key, extraAttributes[key]);
          }
        });
      }

      document.head.appendChild(link);
    }
  }

  function initHead(options) {
    const config = options || {};
    const title = config.title || 'BeCoach';
    const description = config.description || 'BeCoach — Mentoría para alinear tu ser con tu hacer.';
    const basePath = config.basePath || '';

    ensureCharset();
    ensureMeta('name', 'viewport', 'width=device-width, initial-scale=1.0');
    ensureMeta('name', 'description', description);

    document.title = title;

    ensureLink('preconnect', 'https://fonts.googleapis.com');
    ensureLink('preconnect', 'https://fonts.gstatic.com', { crossorigin: '' });
    ensureLink(
      'stylesheet',
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500&display=swap'
    );

    ensureLink('stylesheet', `${basePath}assets/css/main.css`);
    ensureLink('stylesheet', `${basePath}assets/css/components.css`);
  }

  window.initHead = initHead;
})();
