/**
 * Datos del portafolio (/portafolio/).
 *
 * Misma regla que site.ts: solo información verificada. Lo que queda en
 * `null` o en una lista vacía no se muestra.
 */
export const portafolio = {
  /** Nombre que encabeza la página de perfil. */
  autor: 'ALVRA STUDIO' as string,
  /** Edición que aparece en la portada, p. ej. '2026'. */
  edicion: '2026' as string,
  /** Presentación breve (2 a 4 frases). `null` usa la descripción de site.ts. */
  presentacion: null as string | null,

  formacion: [] as { titulo: string; lugar: string; periodo: string }[],
  experiencia: [] as { puesto: string; lugar: string; periodo: string }[],

  /** Programas con los que se desarrollan los proyectos. */
  software: ['AutoCAD', 'Revit', 'SketchUp', 'V-Ray'] as string[],
};
