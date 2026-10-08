// Genera un sitio de redirección para GitHub Pages: cada página de dist/
// se reemplaza por un aviso mínimo que manda a la misma ruta en el dominio
// definitivo. GitHub Pages no admite redirecciones 301, así que se usa
// meta refresh + location.replace + canonical (Google lo trata como 301).
//
// Uso: node scripts/paginas-redireccion.mjs https://alvra.com.mx [dist] [salida]
import { readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const [destino, origen = 'dist', salida = 'redireccion'] = process.argv.slice(2);
if (!destino) throw new Error('Falta el dominio destino, p. ej. https://alvra.com.mx');
const base = destino.replace(/\/$/, '');

async function* html(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* html(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

const pagina = (url, conRuta) => `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>ALVRA STUDIO se mudó a ${base.replace(/^https?:\/\//, '')}</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta http-equiv="refresh" content="0; url=${url}">
<script>location.replace(${conRuta ? `${JSON.stringify(base)} + location.pathname + location.search + location.hash` : JSON.stringify(url)});</script>
</head>
<body style="font-family:system-ui,sans-serif;padding:2rem">
<p>Nos mudamos a <a href="${url}">${url}</a>.</p>
</body>
</html>
`;

await rm(salida, { recursive: true, force: true });
let n = 0;
for await (const archivo of html(origen)) {
  const rel = relative(origen, archivo).split(sep).join('/');
  const ruta = rel === 'index.html' ? '/' : rel.endsWith('/index.html') ? `/${rel.slice(0, -10)}` : `/${rel}`;
  const es404 = rel === '404.html';
  const destinoArchivo = join(salida, rel);
  await mkdir(join(destinoArchivo, '..'), { recursive: true });
  // El 404 conserva la ruta pedida, para que enlaces viejos lleguen a su página.
  await writeFile(destinoArchivo, pagina(es404 ? `${base}/` : `${base}${ruta}`, es404));
  n++;
}
await writeFile(join(salida, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap-index.xml\n`);
console.log(`✓ ${n} páginas de redirección → ${base} (en ${salida}/)`);
