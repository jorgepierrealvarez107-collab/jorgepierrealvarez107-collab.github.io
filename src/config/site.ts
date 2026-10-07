/**
 * Datos del negocio — ÚNICA fuente de verdad.
 *
 * Regla: solo se completa con información verificada por ALVRA STUDIO.
 * Lo que queda en `null` no se muestra en el sitio ni en los datos estructurados.
 */
export const site = {
  nombre: 'ALVRA STUDIO',
  descripcion:
    'Estudio de arquitectura y construcción. Diseñamos tu proyecto y lo construimos con un mismo equipo, desde el primer trazo hasta la entrega de la obra.',

  contacto: {
    /** Número en formato internacional sin espacios ni signos, p. ej. '5215512345678'. */
    whatsapp: '523221320688' as string | null,
    /** Teléfono tal como se muestra en pantalla. */
    telefonoVisible: '+52 322 132 0688' as string | null,
    /** Correo público, p. ej. 'hola@alvrastudio.com'. */
    email: 'jorgepierrealvarez107@gmail.com' as string | null,
    /** Ciudad o región de servicio confirmada, p. ej. 'Ciudad de México y área metropolitana'. */
    zonaServicio: 'Puerto Vallarta y alrededores' as string | null,
  },

  redes: {
    instagram: null as string | null,
    linkedin: null as string | null,
  },

  /**
   * Muestra etiquetas visibles sobre el contenido de demostración y las
   * propuestas pendientes de confirmar. Cambiar a `false` solo cuando todo
   * el contenido sea real.
   */
  mostrarAvisosDemo: true,
};

export const navegacion = [
  { href: '/proyectos/', label: 'Proyectos' },
  { href: '/servicios/', label: 'Servicios' },
  { href: '/estudio/', label: 'Estudio' },
  { href: '/proceso/', label: 'Proceso' },
  { href: '/contacto/', label: 'Contacto' },
];

export const estados = {
  construido: { label: 'Construido', corto: 'Construido' },
  'en-obra': { label: 'En construcción', corto: 'En obra' },
  conceptual: { label: 'Proyecto conceptual', corto: 'Conceptual' },
} as const;

export type Estado = keyof typeof estados;

export function whatsappUrl(texto?: string) {
  const n = site.contacto.whatsapp;
  if (!n) return null;
  const q = texto ? `?text=${encodeURIComponent(texto)}` : '';
  return `https://wa.me/${n}${q}`;
}
