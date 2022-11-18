import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() prefix: string;
  @Input() suffix: string;

  private _value: string;

  get value(): string {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(this._value);
  }

  public onChange(_: any): void {}

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(): void {}
}
