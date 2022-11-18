import { Component, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  NG_VALIDATORS,
  FormGroup,
  NgControl,
  FormControl,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject, map } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  // !!!!!!!!!!!! TODO NG_VALIDATORS
  providers: [
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => InputComponent),
    //   multi: true,
    // },
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => InputComponent),
    //   multi: true,
    // },
  ],
})
export class InputComponent implements ControlValueAccessor, Validator {
  @Input() type: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() prefix: string;
  @Input() suffix: string;

  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (ctrl: FormControl) => {
      // ! TODO CTRL
      return this.ngControl.control ? this.ngControl.control.invalid : false;
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

  constructor(public ngControl: NgControl) {
    ngControl.valueAccessor = this;
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

  // ! TODO
  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null;
  }
  public registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }
}
