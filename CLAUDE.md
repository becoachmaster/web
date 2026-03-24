# BeCoach — Manual de Marca y Guía de Proyecto
# Sitio: https://[usuario].github.io/becoach/

---

## 01. Identidad del negocio

**Nombre:** BeCoach  
**Tagline principal:** Alínea tu ser con tu hacer  
**One-liner:** Muchas personas luchan para sostener cambios en su vida. La mentoría de BeCoach alinea tu ser con tu hacer para que puedas abrazar con confianza tu nuevo yo.  
**URL de referencia:** BeCoachNow.com  

### Qué es BeCoach
Programa de mentoría de coaching ontológico que acompaña a personas que quieren hacer un cambio profundo y duradero en su vida. No trabajamos desde la fuerza de voluntad ni los hábitos vacíos — trabajamos desde la identidad. El cambio auténtico nace desde el interior.

### A quién va dirigido
Personas que sienten el ciclo agotador de la ambición y el estancamiento: fijan metas, se esfuerzan, pero la emoción se desvanece y regresan al punto de partida. Sienten hábitos insostenibles, duda paralizante y desconexión de su verdadero yo.

### La transformación que ofrecemos
**Antes:** Atrapado, frustrado, emocionalmente agotado.  
**Después:** Alineado, empoderado, actuando desde su nuevo ser con certeza y paz.

### Los 3 pasos del método
1. **Comprender** — Reconocer tu estado actual sin juicios
2. **Construir** — Cultivar una nueva identidad y mentalidad
3. **Emerger** — Transformar el ser en acción alineada y fluida

### Propuesta de valor diferenciada
- El fracaso no proviene de falta de disciplina, sino de forzar nuevas acciones sobre una identidad que no las soporta.
- No fórmulas genéricas — acompañamiento diseñado para tu nivel de consciencia.
- Una década de experiencia en coaching ontológico.

---

## 02. Identidad visual

### Paleta de colores (usar ESTOS y SOLO ESTOS)

```css
/* Fondos y bases */
--color-negro:        #141414;   /* Fondo principal, hero sections */
--color-grafito:      #2F2F2F;   /* Fondo secundario, cards oscuras */
--color-gris-medio:   #7A7A75;   /* Textos secundarios, divisores */
--color-gris-humo:    #D9D6CF;   /* Textos sobre fondo oscuro, subtítulos */

/* Acentos (usar con moderación) */
--color-azul-gris:    #3E4A4F;   /* Acentos estructurales, borders sutiles */
--color-sepia:        #6B4E3D;   /* Acentos cálidos, backgrounds de contraste */
--color-arena:        #B8A08C;   /* Color dorado/arena — CTA, quotes, highlights */

/* Texto */
--color-blanco:       #FFFFFF;   /* Títulos principales sobre fondo oscuro */
--color-texto-suave:  #D9D6CF;   /* Cuerpo de texto sobre fondo oscuro */
--color-texto-muted:  #7A7A75;   /* Textos terciarios, metadata */
```

**Regla de uso:**
- Fondo dominante: #141414 o #2F2F2F
- Textos principales: #FFFFFF o #D9D6CF
- El color arena (#B8A08C) es el único acento "caliente" — reservar para CTAs, quotes destacadas y elementos de énfasis
- NUNCA usar colores vibrantes, brillantes ni la paleta motivacional típica

### Tipografía

```
TÍTULOS (H1, H2, titulares de hero):
  Fuente:       Cormorant Garamond
  Google Fonts: https://fonts.google.com/specimen/Cormorant+Garamond
  Peso:         500 (Medium) o 600 (SemiBold)
  Estilo:       Normal o Italic para quotes y frases filosóficas
  Interlineado: 1.15 — 1.25 (amplio, editorial)
  Uso:          Todo lo que sea titular, headline, nombre de sección

SUBTÍTULOS Y ESTRUCTURA (H3, nav, labels, botones):
  Fuente:       Montserrat
  Google Fonts: https://fonts.google.com/specimen/Montserrat
  Peso:         400 (Regular) o 500 (Medium)
  Estilo:       Normal, letra-espaciado 0.05em en elementos de navegación
  Interlineado: 1.6

CUERPO DE TEXTO:
  Fuente:       Montserrat
  Tamaño:       16px — 17px
  Peso:         300 (Light) o 400 (Regular)
  Interlineado: 1.75
  Color:        #D9D6CF sobre fondos oscuros

REGLA: Máximo dos pesos tipográficos por pieza/página.
NO usar más de estas dos familias.
```

**Import de Google Fonts para el `<head>`:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">
```

### Estilo visual general

- **Estética:** Sobria, cinematográfica, editorial. Premium psicológico. Autoridad sin arrogancia.
- **Iluminación:** Lateral, dramática, con sombras profundas y alto contraste
- **Texturas:** Piedra mineral, mármol oscuro, papel envejecido — solo como fondos de imagen, nunca en CSS
- **Espacio negativo:** Generoso. Las páginas "respiran". Nunca saturar de elementos.
- **Bordes y separadores:** Sutiles — 1px en colores #2F2F2F o #3E4A4F. Sin bordes gruesos.
- **Border-radius:** Mínimo — 2px o 4px máximo. La marca es angular, no redondeada.
- **Sombras CSS:** Muy sutiles o ninguna. Preferir contraste de color a sombras.
- **NUNCA:** Colores vibrantes, estética motivacional brillante, emojis decorativos, gradientes arcoíris, fondos blancos en páginas principales.

---

### Efectos de iluminación y profundidad

- Fondo base de todas las páginas: #0D0D0D 
  Nunca negro plano puro (#000000)
- Textura global: grano sutil de película sobre todos 
  los fondos. SVG fractalNoise, opacity 0.035,
  implementado en body::before de main.css
- Iluminación: siempre direccional, nunca frontal 
  ni uniforme. Usar radial-gradient con:
  blanco opacity 3-5% para luz fría
  sepia #6B4E3D opacity 10-15% para luz cálida
  Nunca colores saturados en los efectos de luz
- Dirección de luz por tipo de sección:
  Hero: spotlight desde arriba-izquierda
  Secciones de contenido: luz cenital suave
  Secciones de credibilidad: luz lateral derecha
  CTA final: cenital + glow sepia en la base
- Separadores entre secciones: NO usar border-top 
  sólido. Usar ::before con gradiente horizontal:
  transparent → rgba(255,255,255,0.06) → transparent
  Esto hace que las líneas se desvanezcan en los bordes
- Vignette: oscurecimiento radial en los bordes.
  Aplicar con clase .vignette en hero y cta-final
- Cards interactivas: al hover mostrar línea superior 
  con gradiente arena (transparent → #B8A08C → transparent)
- Referencia de implementación: ver sections.css 
  y main.css para el código exacto de cada efecto

---

### Botones y CTAs

```css
/* Botón principal */
.btn-primary {
  background: transparent;
  border: 1px solid #B8A08C;
  color: #D9D6CF;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.08em;
  padding: 14px 32px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background: #B8A08C;
  color: #141414;
}

/* Botón secundario */
.btn-secondary {
  background: transparent;
  border: 1px solid #7A7A75;
  color: #7A7A75;
  /* mismos parámetros de fuente */
}
```

---

## 03. Tono y voz

### Atributos de la voz BeCoach
- **Profundo, reflexivo, filosófico** — hablamos del ser, la identidad, la consciencia
- **Empático pero directo** — entendemos el dolor, pero no lo romantizamos
- **Serio sin ser frío** — calidez desde la autoridad, no desde la simpatía superficial
- **Tuteo siempre** — cercano pero no coloquial
- **Sin jerga motivacional vacía** — no usamos "¡tú puedes!", "¡increíble!", "¡épico!"

### Frases que SÍ usamos
- "El cambio auténtico nace desde el interior."
- "No deberías tener que luchar constantemente para crear un cambio duradero."
- "El fracaso no proviene de falta de disciplina."
- "Alinear tu identidad con tus acciones."
- "Transformación duradera y sostenible."
- "Tu guía en la oscuridad del estancamiento."
- "El verdadero trabajo es alinear tu identidad con tus acciones."
- "Eres suficiente tal como eres."

### Frases que NUNCA usamos
- "¡Desbloquea tu potencial!" (demasiado genérico)
- "¡Vive tu mejor vida!" (cliché motivacional)
- "Hábitos de personas exitosas" (enfoque en el hacer, no el ser)
- "¡Solo por hoy!" / "¡Oferta limitada!" (presión artificial)
- Exclamaciones múltiples o excesivas
- Emojis en textos del sitio web

### Estructura narrativa de las páginas (StoryBrand)
Seguir siempre este orden en landing pages y páginas de venta:
1. **El problema** — el ciclo agotador de ambición y estancamiento
2. **Empatía** — entendemos lo difícil que es
3. **Autoridad** — una década de experiencia, vidas transformadas
4. **El plan** — Comprender → Construir → Emerger
5. **CTA directo** — "Inicia tu transformación hoy"
6. **El costo de no actuar** — continuar atrapado, perder oportunidades
7. **La recompensa** — alineación, paz, certeza, nuevo yo

---

## 04. Stack técnico y configuración del proyecto

### Tecnología
- HTML5 semántico
- CSS puro con variables CSS (sin frameworks)
- JavaScript vanilla (sin librerías externas salvo casos específicos)
- Deploy: GitHub Pages
- **TODAS LAS RUTAS SON RELATIVAS — NUNCA ABSOLUTAS**

### Estructura de carpetas
```
becoach/
├── index.html                    ← Página principal
├── CLAUDE.md                     ← Este archivo
├── assets/
│   ├── css/
│   │   ├── main.css              ← Variables, reset, estilos globales
│   │   └── components.css        ← Nav, footer, botones, cards
│   ├── js/
│   │   ├── main.js               ← JS global
│   │   └── components.js         ← Carga de nav/footer via fetch()
│   ├── fonts/                    ← Fuentes locales si las hay
│   └── img/
│       ├── logo.svg
│       ├── logo-white.svg
│       └── logo-dark.svg
├── components/
│   ├── nav.html                  ← Navegación compartida
│   └── footer.html               ← Footer compartido
├── landings/
│   └── [nombre-landing].html
├── ventas/
│   └── [nombre-pagina].html
├── lead-magnets/
│   └── [nombre-recurso].html
└── recursos/
    └── [nombre-recurso].html
```

### Variables CSS base (inicio de main.css)
```css
:root {
  --negro:        #141414;
  --grafito:      #2F2F2F;
  --gris-medio:   #7A7A75;
  --gris-humo:    #D9D6CF;
  --azul-gris:    #3E4A4F;
  --sepia:        #6B4E3D;
  --arena:        #B8A08C;
  --blanco:       #FFFFFF;

  --font-titulo:  'Cormorant Garamond', Georgia, serif;
  --font-cuerpo:  'Montserrat', 'Helvetica Neue', sans-serif;

  --radio:        2px;
  --radio-card:   4px;
  --transicion:   0.3s ease;
  --padding-seccion: 100px 0;
  --padding-seccion-movil: 60px 0;
  --max-ancho:    1200px;
  --ancho-texto:  680px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: var(--negro);
  color: var(--gris-humo);
  font-family: var(--font-cuerpo);
  font-weight: 300;
  line-height: 1.75;
}
```

---

## 05. Layout por tipo de página

| Página | Nav | Footer | Fondo | Notas |
|---|---|---|---|---|
| `index.html` | Sí — completo | Sí — completo | #141414 | Hero de pantalla completa |
| `landings/*.html` | NO nav | NO footer | #141414 | Solo logo en header, un CTA |
| `ventas/*.html` | NO nav | NO footer | #141414 | Sin distracciones, foco total en conversión |
| `lead-magnets/*.html` | NO nav | Footer mínimo | #141414 | Formulario prominente |
| `recursos/*.html` | Sí | Sí | #141414 o #2F2F2F | Contenido informativo |

---

## 06. Formularios

- **Servicio:** Formspree (https://formspree.io)
- Los formularios deben tener fondo #2F2F2F, inputs con borde #3E4A4F
- Labels en Montserrat 12px, #7A7A75, uppercase, letter-spacing 0.1em
- Botón de submit: estilo `btn-primary` con color arena #B8A08C
- Placeholder text: #7A7A75

---

## 07. Copy base por tipo de página

### Página principal
- **H1:** "El cambio comienza en tu interior."
- **Subtítulo:** "Alinea tu ser con tu hacer y crea la transformación duradera que siempre has buscado."
- **CTA:** "Inicia tu transformación hoy"
- **CTA secundario:** "Conoce el método"

### Landings de servicio/mentoría
- **Estructura:** Problema → Empatía → Plan 3 pasos → CTA → Costo de no actuar → CTA final
- **CTA principal:** "Únete ahora" / "Reserva tu lugar"

### Lead magnets
- Recursos sugeridos del Campaign PDF:
  1. "Alinea tu ser: La hoja de ruta hacia el cambio duradero" (PDF guía)
  2. "El checklist del vivir consciente: 10 hábitos esenciales" (checklist)
  3. "Martes de transformación: Tips semanales para el cambio real" (email series)

---

## 08. Reglas absolutas del proyecto

1. **Rutas siempre relativas** — nunca `/assets/css/main.css`, siempre `../assets/css/main.css`
2. **Fondo siempre oscuro** — el sitio vive sobre negro o grafito
3. **Dos familias tipográficas máximo** — Cormorant Garamond + Montserrat
4. **El color arena (#B8A08C) es escaso y precioso** — solo para CTAs, quotes y highlights clave
5. **Sin emojis en el sitio** — la marca es seria y editorial
6. **Border-radius máximo 4px** — la marca es angular
7. **Espacio negativo generoso** — mejor vacío que saturado
8. **Mobile-first** — diseñar primero para móvil, escalar a desktop
9. **Nunca texto blanco puro (#FFFFFF) en cuerpo** — usar #D9D6CF para suavizar
10. **Los botones son siempre outline** (borde sin relleno) en estado normal

---

## 09. Estructura base de páginas nuevas

Todo archivo HTML nuevo del proyecto sigue
esta estructura exacta en el <head>:

<head>
  <script src="[ruta-relativa]/assets/js/head.js"></script>
  <script>
    initHead({
      title: '[Título de la página]',
      description: '[Meta description específica]',
      basePath: '['' para raíz, '../' para subcarpetas]'
    });
  </script>
  <meta name="keywords" content="[palabras clave]">
  <meta property="og:title" content="[título og]">
  <meta property="og:description" content="[desc og]">
  <meta property="og:type" content="website">
  <link rel="stylesheet" href="[ruta]/assets/css/sections.css">
  <link rel="stylesheet" href="[ruta]/assets/css/[pagina-especifica].css">
</head>

Al final del <body>, siempre en este orden:
<script src="[ruta]/assets/js/components.js"></script>
<script src="[ruta]/assets/js/main.js"></script>

## 10. Clases y convenciones establecidas

### Animaciones
Todos los elementos que entran al viewport
llevan clase .animar. Variantes de delay:
.animar-delay-1 (0.1s)
.animar-delay-2 (0.22s)
.animar-delay-3 (0.34s)
El Intersection Observer está en components.js
y se activa automáticamente.

### Separadores entre secciones
Usar siempre este HTML entre secciones
donde cambia el color de fondo:
<div class="seccion-divider animar">
  <svg width="20" height="20" viewBox="0 0 20 20"
       fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8"
            stroke="#B8A08C" stroke-width="0.75"
            opacity="0.5"/>
    <circle cx="10" cy="10" r="2"
            fill="#B8A08C" opacity="0.4"/>
  </svg>
</div>

NO usar separador donde ya hay contraste
visual obvio entre secciones.

### Botones
Tres variantes disponibles — no crear nuevas:
.btn → outline arena, fondo transparente
.btn--filled → relleno arena, texto negro
.btn--secondary → fondo oscuro, borde blanco
.btn--lg → tamaño grande (se combina con las anteriores)

En móvil todos los botones son width: 100%.
Los CTAs en landing pages y páginas de venta
siempre usan .btn--filled como acción principal.

### Imágenes con overlay
Toda imagen de fondo de sección necesita:
1. background-image con ruta relativa correcta
2. background-size: cover
3. background-position: center
4. Un ::before con rgba(10,10,10,0.X) de overlay
   Opacidad recomendada: 0.55-0.78 según la sección
5. El .container dentro con position:relative z-index:1

Nombres de imágenes disponibles en assets/img/:
- hero-bg.jpg → fondo del hero principal
- bg-1.png → secciones de contenido
- bg-2.png → secciones de cierre y CTA

### Efectos de luz en secciones
Toda sección con efectos ::after necesita que
su .container tenga:
  position: relative;
  z-index: 1;

Los efectos de luz nunca superan opacity 0.11
para no competir con el contenido.

### Glow en textos
Títulos H1: glow cálido arena concentrado
  text-shadow:
    0 0 8px rgba(212, 196, 168, 0.45),
    0 0 24px rgba(184, 160, 140, 0.22),
    0 0 50px rgba(184, 160, 140, 0.08);

Títulos H2: glow más sutil
  text-shadow:
    0 0 8px rgba(212, 196, 168, 0.35),
    0 0 24px rgba(184, 160, 140, 0.16),
    0 0 50px rgba(184, 160, 140, 0.06);

Quotes en Cormorant italic arena:
  text-shadow:
    0 0 8px rgba(184, 160, 140, 0.55),
    0 0 20px rgba(184, 160, 140, 0.28),
    0 0 40px rgba(107, 78, 61, 0.12);

### Layout por tipo de página
index.html → nav completo + footer completo
landings/*.html → sin nav, sin footer, solo logo
ventas/*.html → sin nav, sin footer
lead-magnets/*.html → sin nav, footer mínimo

### Rutas relativas según profundidad
Raíz (index.html):
  assets/css/main.css
  assets/js/components.js
  assets/img/hero-bg.jpg

Un nivel (landings/, ventas/, lead-magnets/):
  ../assets/css/main.css
  ../assets/js/components.js
  ../assets/img/hero-bg.jpg

NUNCA usar rutas absolutas con barra inicial (/assets/).

## 11. Historial de correcciones frecuentes

### Nav button texto oscuro (components.css)
.nav__cta {
  color: var(--negro);
  background: linear-gradient(135deg,
    #C4A898 0%, #B8A08C 50%, #A8906C 100%);
  border-color: transparent;
}

### Imagen no visible en sección
Verificar en este orden:
1. Nombre exacto del archivo incluyendo extensión
   y guiones (bg-1.png ≠ bg1.png)
2. Ruta relativa correcta según profundidad
3. Opacidad del overlay — reducir si tapa la imagen
4. z-index del contenido — debe ser mayor al overlay

### Overlay tapando contenido
Si el texto no se ve sobre imagen de fondo:
.seccion .container {
  position: relative;
  z-index: 1;
}

