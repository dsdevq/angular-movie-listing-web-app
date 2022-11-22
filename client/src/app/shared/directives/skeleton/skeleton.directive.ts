import {
  Directive,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { RectComponent } from './rect.skeleton.component';

@Directive({ selector: '[skeleton]' })
export class SkeletonDirective {
  @Input('skeleton') isLoading = false;
  @Input('skeletonRepeat') size = 1;
  @Input('skeletonWidth') width: string;
  @Input('skeletonMaxWidth') maxWidth: string;
  @Input('skeletonDarker') darker: boolean;
  @Input('skeletonHeight') height: string;
  @Input('skeletonRadius') borderRadius: string;
  @Input('skeletonClassName') className: string;

  constructor(private tpl: TemplateRef<any>, private vcr: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoading']) {
      this.vcr.clear();

      if (changes['isLoading'].currentValue) {
        Array.from({ length: this.size }).forEach(() => {
          const ref = this.vcr.createComponent(RectComponent);

          Object.assign(ref.instance, {
            width: this.width,
            maxWidth: this.maxWidth,
            height: this.height,
            borderRadius: this.borderRadius,
            className: this.className,
            darker: this.darker,
          });
        });
      } else {
        this.vcr.createEmbeddedView(this.tpl);
      }
    }
  }
}
