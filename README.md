# ALVRA STUDIO — sitio web

Sitio de arquitectura y construcción construido con [Astro](https://astro.build): HTML estático, rápido, sin base de datos y con los proyectos como archivos Markdown.

**Concepto: «Del trazo a la obra».** La interacción principal compara el dibujo de líneas de un proyecto con su resultado (render u obra). Se controla con un deslizador nativo, así que funciona con teclado, táctil y ratón, y respeta `prefers-reduced-motion`.

**Paleta:** del azul rey (acento, el azul de los planos) al azul medianoche (tinta), sobre papel claro. Los colores están definidos en `src/styles/global.css` (`:root`).

## Comandos

```bash
npm install
npm run dev       # desarrollo en http://localhost:4321
npm run build     # verificación de tipos (astro check) + build en dist/
npm run preview   # sirve la build de producción
```

## Dónde se edita cada cosa

| Qué | Dónde |
| --- | --- |
| Datos del negocio (WhatsApp, correo, zona, redes) | `src/config/site.ts` |
| Proyectos | `src/content/proyectos/*.md` y sus imágenes en `src/content/proyectos/img/` |
| Proceso y servicios | `src/lib/contenido.ts` |
| Texturas de materiales e imagen del estudio | `src/assets/` |
| Colores y tipografía | `src/styles/global.css` |
| Logotipo provisional | `src/components/Logo.astro` |

### Añadir un proyecto

1. Copia un archivo de `src/content/proyectos/` y cambia el nombre (será la URL).
2. Coloca las imágenes junto a él y referencia `portada` (obra o render) y `trazo` (dibujo con el **mismo encuadre**).
3. `estado`: `construido`, `en-obra` o `conceptual`.
4. Si es real: `demo: false` e `imagenesIA: false`.

Cuando todo el contenido sea real, cambia `mostrarAvisosDemo` a `false` en `src/config/site.ts`.

## Video del hero

El fondo del hero es un video en bucle, silenciado y decorativo: `public/video/hero-1080.mp4` en escritorio y `hero-720.mp4` en móvil.

- Solo se descarga si el visitante **no** tiene activado `prefers-reduced-motion` ni el ahorro de datos. En esos casos se muestra la imagen fija (póster).
- Tiene un botón visible para pausarlo y se detiene solo cuando el hero sale de pantalla.
- Para sustituirlo por un video real, reemplaza los dos archivos (H.264, sin audio, de 6 a 12 s, idealmente < 4 MB). Para recomprimir uno nuevo:

```bash
node scripts/comprimir-video.mjs ruta/al/video.mp4
```

## Formulario de contacto

El formulario envía un POST JSON a `PUBLIC_CONTACT_ENDPOINT` (ver `.env.example`). Es compatible con Formspree o con una función serverless propia.

- **Sin endpoint** el botón queda deshabilitado y el sitio avisa que nada se envía.
- **El éxito solo se muestra con una respuesta 2xx del servidor.** Si hay un error o no hay conexión, se conservan las respuestas y se ofrece reintentar.
- Antispam en el cliente: campo trampa (honeypot) y tiempo mínimo de llenado. La protección real contra abuso (límite de envíos, captcha) debe estar en el servicio que recibe el formulario.
- No coloques claves secretas en variables `PUBLIC_*`.

## Contenido de demostración

Los cuatro proyectos son **de demostración**. Sus renders, dibujos, texturas y la imagen de la mesa de trabajo fueron **generados con IA (Runway)** y están etiquetados así en el sitio. No deben presentarse como obra real del estudio.
