/**
 * Geometría de las láminas de demostración (alzados esquemáticos).
 * Una misma geometría se dibuja de dos maneras: como trazo (plano) y como
 * obra (materiales). Sistema de coordenadas: viewBox 1600 × 1000, suelo en y=820.
 *
 * Estas láminas son marcadores de posición: se sustituyen por planos,
 * renders y fotografías reales definidos en cada proyecto.
 */
export type Material = 'concreto' | 'madera' | 'enlucido' | 'piedra' | 'metal';

export interface Volumen { x: number; y: number; w: number; h: number; mat: Material }
export interface Hueco { x: number; y: number; w: number; h: number; tipo?: 'vidrio' | 'puerta' }
export interface Extra { tipo: 'arbol' | 'andamio' | 'losas'; x: number; y: number; w?: number; h?: number; r?: number }

export interface Dibujo {
  nombre: string;
  vols: Volumen[];
  huecos: Hueco[];
  ejes: number[];
  extras?: Extra[];
}

export const SUELO = 820;

function retícula(x0: number, y0: number, cols: number, filas: number, w: number, h: number, dx: number, dy: number): Hueco[] {
  const out: Hueco[] = [];
  for (let f = 0; f < filas; f++) for (let c = 0; c < cols; c++) out.push({ x: x0 + c * dx, y: y0 + f * dy, w, h });
  return out;
}

export const dibujos: Record<string, Dibujo> = {
  voladizo: {
    nombre: 'Alzado principal',
    vols: [
      { x: 440, y: 620, w: 560, h: 200, mat: 'piedra' },
      { x: 300, y: 420, w: 900, h: 200, mat: 'enlucido' },
    ],
    huecos: [
      { x: 350, y: 462, w: 560, h: 118 },
      { x: 980, y: 472, w: 160, h: 98 },
      { x: 640, y: 660, w: 210, h: 160, tipo: 'puerta' },
    ],
    ejes: [300, 440, 1000, 1200],
    extras: [{ tipo: 'arbol', x: 1360, y: SUELO, r: 110 }],
  },
  patio: {
    nombre: 'Alzado al patio',
    vols: [
      { x: 180, y: 560, w: 460, h: 260, mat: 'madera' },
      { x: 640, y: 660, w: 340, h: 160, mat: 'enlucido' },
      { x: 980, y: 560, w: 440, h: 260, mat: 'madera' },
    ],
    huecos: [
      { x: 250, y: 630, w: 300, h: 190 },
      { x: 1050, y: 630, w: 120, h: 190, tipo: 'puerta' },
      { x: 1220, y: 630, w: 140, h: 120 },
    ],
    ejes: [180, 640, 980, 1420],
    extras: [{ tipo: 'arbol', x: 810, y: SUELO, r: 150 }],
  },
  urbano: {
    nombre: 'Alzado a calle',
    vols: [
      { x: 520, y: 640, w: 560, h: 180, mat: 'concreto' },
      { x: 520, y: 220, w: 560, h: 420, mat: 'concreto' },
    ],
    huecos: [
      { x: 560, y: 672, w: 480, h: 148 },
      ...retícula(560, 250, 4, 3, 90, 90, 130, 140),
    ],
    ejes: [520, 800, 1080],
    extras: [
      { tipo: 'losas', x: 520, y: 220, w: 560, h: 140 },
      { tipo: 'andamio', x: 1080, y: 180, w: 120, h: 640 },
    ],
  },
  pabellon: {
    nombre: 'Alzado longitudinal',
    vols: [
      { x: 200, y: 800, w: 1200, h: 20, mat: 'concreto' },
      { x: 240, y: 430, w: 1120, h: 36, mat: 'metal' },
      { x: 320, y: 466, w: 14, h: 334, mat: 'metal' },
      { x: 793, y: 466, w: 14, h: 334, mat: 'metal' },
      { x: 1266, y: 466, w: 14, h: 334, mat: 'metal' },
    ],
    huecos: [{ x: 420, y: 540, w: 760, h: 260 }],
    ejes: [327, 800, 1273],
    extras: [{ tipo: 'arbol', x: 120, y: SUELO, r: 90 }],
  },
};
