import { Directive, ElementRef, AfterViewInit, OnInit } from '@angular/core';

@Directive({
  selector: '[toggle]',
})
export class ToggleDirective implements AfterViewInit, OnInit {
  private _shown: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    Array.from(document.getElementsByTagName('mat-icon')).forEach((icon) => {
      icon.hasAttribute('matSuffix') &&
        icon.addEventListener('click', () => {
          this.toggle(icon);
        });
    });
  }

  private init(): void {
    this._shown = this.el.nativeElement.hasAttribute('type', 'password');
  }

  private toggle(icon: Element): void {
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      icon.innerHTML = 'visibility';
      this._shown = false;
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      icon.innerHTML = 'visibility_off';
      this._shown = true;
    }
  }
}
