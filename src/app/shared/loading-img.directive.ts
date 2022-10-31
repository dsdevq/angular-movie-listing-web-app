import {
  Attribute,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appLoadingImg]',
})
export class LoadingImgDirective {
  constructor(
    @Attribute('loader') public loader: string,
    @Attribute('onErrorSrc') public onErrorSrc: string,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.loader);
  }

  @HostListener('load') onLoad(): void {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'src',
      this.el.nativeElement.src
    );
  }
  @HostListener('error') onError(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.onErrorSrc);
  }
}
