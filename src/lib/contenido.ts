import type { ImageMetadata } from 'astro';

/**
 * Textos compartidos: proceso y servicios.
 * `confirmado: false` = propuesta del sitio pendiente de validar por ALVRA STUDIO.
 */

export const proceso = [
  {
    titulo: 'Conversación inicial',
    corto: 'Escuchamos qué necesitas, dónde y para cuándo.',
    texto:
      'Nos cuentas tu idea, tu terreno o tu espacio, lo que esperas del proyecto y tus tiempos. Resolvemos dudas y te decimos con franqueza si somos el equipo adecuado.',
    entregable: 'Claridad sobre el alcance y los siguientes pasos.',
  },
  {
    titulo: 'Visita y diagnóstico',
    corto: 'Conocemos el lugar y sus condiciones reales.',
    texto:
      'Visitamos el sitio para entender orientación, entorno, accesos y condiciones existentes. Revisamos la información disponible: escrituras, planos previos o reglamentos aplicables.',
    entregable: 'Una base técnica para diseñar sin sorpresas.',
  },
  {
    titulo: 'Anteproyecto',
    corto: 'Primeras ideas en planos, volúmenes e imágenes.',
    texto:
      'Desarrollamos una propuesta de distribución, volumen y materiales. La revisamos contigo y la ajustamos hasta que el proyecto responde a lo que necesitas.',
    entregable: 'Planos e imágenes del concepto aprobado.',
  },
  {
    titulo: 'Proyecto ejecutivo y presupuesto',
    corto: 'Todo definido antes de construir.',
    texto:
      'Detallamos el proyecto para poder construirlo: planos, especificaciones y coordinación técnica. Con esa información preparamos un presupuesto de obra y un programa de trabajo.',
    entregable: 'Documentación completa, presupuesto y calendario.',
  },
  {
    titulo: 'Construcción',
    corto: 'El mismo equipo que diseñó, construye.',
    texto:
      'Ejecutamos la obra con seguimiento continuo. Como diseñamos el proyecto, las decisiones en sitio respetan la intención original y se resuelven con rapidez.',
    entregable: 'Avances periódicos y comunicación directa.',
  },
  {
    titulo: 'Entrega',
    corto: 'Recorremos la obra contigo y cerramos detalles.',
    texto:
      'Revisamos juntos cada espacio terminado, atendemos los últimos ajustes y te entregamos la información necesaria para usar y mantener tu proyecto.',
    entregable: 'Tu proyecto terminado, listo para habitarse.',
  },
];

export const serviciosPrincipales = [
  {
    id: 'arquitectura',
    titulo: 'Arquitectura',
    intro: 'Convertimos una necesidad en un proyecto claro, bien pensado y listo para construirse.',
    incluye: [
      'Análisis del terreno o del espacio existente',
      'Anteproyecto: distribución, volumen y materiales',
      'Imágenes y modelos para entender el proyecto antes de construirlo',
      'Proyecto ejecutivo con planos y especificaciones',
    ],
    valor:
      'Sabes qué vas a construir, cómo se verá y por qué cada decisión tiene sentido, antes de invertir en obra.',
  },
  {
    id: 'construccion',
    titulo: 'Construcción',
    intro: 'Llevamos el proyecto a la obra con orden, seguimiento y cuidado en los detalles.',
    incluye: [
      'Presupuesto de obra a partir del proyecto',
      'Programa de trabajo por etapas',
      'Ejecución y coordinación de la obra',
      'Seguimiento y reportes de avance',
    ],
    valor:
      'Un solo responsable de que lo diseñado se construya tal como se pensó, con comunicación directa durante toda la obra.',
  },
];

/**
 * Servicios complementarios. Solo se publican los que tienen `confirmado: true`.
 * Cambia a true los que ALVRA STUDIO ofrezca realmente.
 */
export const serviciosPropuestos = [
  { titulo: 'Remodelación y ampliación', texto: 'Transformar o crecer un espacio existente.', confirmado: false },
  { titulo: 'Diseño de interiores', texto: 'Materiales, mobiliario fijo e iluminación coherentes con la arquitectura.', confirmado: false },
  { titulo: 'Gestión de permisos', texto: 'Acompañamiento en trámites y licencias de construcción.', confirmado: false },
  { titulo: 'Supervisión de obra', texto: 'Para proyectos que construye otra empresa.', confirmado: false },
  { titulo: 'Visualización arquitectónica', texto: 'Renders y recorridos para proyectos de terceros.', confirmado: false },
];

export const serviciosComplementarios = serviciosPropuestos.filter((s) => s.confirmado);

/** Equipo: añade personas reales; la sección se muestra solo si hay al menos una. */
export const equipo: { nombre: string; rol: string; foto?: ImageMetadata; bio?: string }[] = [];

/** Trayectoria verificable (opcional). La sección se muestra solo si hay datos. */
export const trayectoria: { dato: string; texto: string }[] = [];
