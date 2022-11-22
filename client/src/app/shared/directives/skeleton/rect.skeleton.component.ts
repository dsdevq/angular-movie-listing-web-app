import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'skeleton-rect',
  host: {
    class: 'pulse',
  },
  template: ``,
  styles: [
    `
      :host {
        display: block;
        width: var(--skeleton-rect-width);
        height: var(--skeleton-rect-height);
        max-width: var(--skeleton-rect-max-width);
        border-radius: var(--skeleton-rect-border-radius);
        background: var(--skeleton-rect-darker);
      }
    `,
  ],
})
export class RectComponent {
  width: string;
  maxWidth: string;
  height: string;
  borderRadius: string;
  className: string;
  darker: boolean;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const host = this.host.nativeElement;

    if (this.className) {
      host.classList.add(this.className);
    }

    host.style.setProperty('--skeleton-rect-width', this.width || '100%');
    host.style.setProperty('--skeleton-rect-height', this.height || '16px');
    host.style.setProperty(
      '--skeleton-rect-border-radius',
      this.borderRadius || '8px'
    );
    host.style.setProperty(
      '--skeleton-rect-max-width',
      this.maxWidth || '100%'
    );
    host.style.setProperty(
      '--skeleton-rect-darker',
      (!this.darker && 'rgb(42, 50, 72) no-repeat') ||
        ' rgba(0, 0, 0, 0.2) no-repeat'
    );
  }
}
