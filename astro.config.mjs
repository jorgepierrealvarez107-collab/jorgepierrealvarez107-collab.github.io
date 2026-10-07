// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

// SITE_URL (en .env, en el hosting o en la GitHub Action): dominio público,
// p. ej. https://alvrastudio.com. Activa URLs canónicas, metadatos sociales y sitemap.
const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

export default defineConfig({
  site: SITE_URL || undefined,
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
  integrations: SITE_URL ? [sitemap({ filter: (page) => !page.includes('/privacidad') })] : [],
});
