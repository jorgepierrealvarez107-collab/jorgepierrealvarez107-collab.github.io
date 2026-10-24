/** Tipos mínimos de page-flip (StPageFlip): el paquete no publica los suyos. */
declare module 'page-flip/dist/js/page-flip.module.js' {
  type Corner = 'top' | 'bottom';
  export class PageFlip {
    constructor(el: HTMLElement, settings: Record<string, unknown>);
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    on(event: 'flip' | 'changeState' | 'changeOrientation' | 'init' | 'update', cb: (e: { data: unknown }) => void): this;
    flipNext(corner?: Corner): void;
    flipPrev(corner?: Corner): void;
    flip(page: number, corner?: Corner): void;
    turnToPage(page: number): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    getOrientation(): 'portrait' | 'landscape';
    update(): void;
    destroy(): void;
  }
}
