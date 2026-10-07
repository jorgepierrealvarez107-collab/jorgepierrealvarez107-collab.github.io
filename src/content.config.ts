import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Cada proyecto es un archivo Markdown en src/content/proyectos/.
 * Para añadir uno: copia un archivo existente, cambia el texto y coloca las
 * imágenes en la misma carpeta (las rutas son relativas al .md).
 */
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumen: z.string(),
      estado: z.enum(['construido', 'en-obra', 'conceptual']),
      tipo: z.string(),
      ubicacion: z.string().optional(),
      superficie: z.string().optional(),
      anio: z.string().optional(),
      alcance: z.array(z.enum(['Diseño arquitectónico', 'Construcción'])).min(1),
      /** true = contenido de demostración: se etiqueta de forma visible. */
      demo: z.boolean().default(false),
      destacado: z.boolean().default(false),
      orden: z.number().default(99),
      /** Lámina de demostración usada mientras no haya fotografías reales. */
      dibujo: z.enum(['voladizo', 'patio', 'urbano', 'pabellon']),
      /** Fotografía o render final. Si existe, sustituye a la lámina "obra". */
      portada: image().optional(),
      portadaAlt: z.string().optional(),
      /** Dibujo o render de concepto para la capa "trazo" (opcional). */
      trazo: image().optional(),
      /** true = las imágenes fueron generadas con IA (se etiquetan de forma visible). */
      imagenesIA: z.boolean().default(false),
      galeria: z
        .array(z.object({ src: image(), alt: z.string(), pie: z.string().optional() }))
        .default([]),
      decisiones: z.array(z.object({ titulo: z.string(), texto: z.string() })).default([]),
    }),
});

export const collections = { proyectos };
