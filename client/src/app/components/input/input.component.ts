import { Component, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  FormControl,
  NG_VALIDATORS,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';

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
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, Validator {
  @Input() type: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() prefix: string;
  @Input() suffix: string;

  public control$: BehaviorSubject<AbstractControl> = new BehaviorSubject(
    {} as AbstractControl
  );

  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (_ctrl: FormControl): boolean => {
      return this.control$.value.dirty ? this.control$.value.invalid : false;
    },
  };

  private _value: string;

  get value(): string {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(this._value);
  }

  public onChange(_: any): void {}

  onValidationChange = () => {};

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(): void {}

  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    this.control$.next(control);
    return null;
  }
}
