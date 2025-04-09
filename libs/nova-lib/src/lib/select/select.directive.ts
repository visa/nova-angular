/**
 *              Copyright (c) 2025 Visa, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Optional,
  Output
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';

@Directive({
  standalone: true,
  selector: '[v-select]'
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => SelectDirective),
  //     multi: true,
  //   }
  // ]
})
export class SelectDirective implements ControlValueAccessor, OnInit {
  /**
   * Sets custom id.
   */
  @Input()
  id: string;
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-input
   */
  @Input() class: string;
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class, 'v-input'].join(' ');
  }

  /**
   * Sets select as disabled when true.
   * @default false
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this.informState();
  }
  _disabled: boolean = false;
  @HostBinding('disabled')
  get hostDisabled() {
    return this.disabled ? 'disabled' : null;
  }
  /** Fires when a formControl's disabled state updates.  */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setDisabledStateInit(isDisabled: boolean): void {
    this._disabled = coerceBooleanProperty(isDisabled);
    this.informState();
  }

  /**
   * Marks select as invalid when true.
   * @default false
   */
  @Input()
  get invalid(): boolean {
    return this._invalid;
  }
  set invalid(value: BooleanInput) {
    this._invalid = coerceBooleanProperty(value);
    this.informState();
  }
  _invalid: boolean = false;
  @HostBinding('attr.aria-invalid')
  get ariaInvalid() {
    return this.invalid;
  }

  /**
   * Marks select as required when true.
   * @default false
   */
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.informState();
  }
  _required: boolean = false;

  /**
   * Emits disabled, invalid, and required state of select when changed.
   */
  @Output() communicateState = new EventEmitter<any>();

  /**
   * Value of select.
   */
  @Input()
  get value(): any {
    return this._value;
  }
  set value(value: any) {
    this._value = value;

    if (this.appReadyService.isBrowserAndDomAvailable()) {
      this.el.nativeElement.value = this.value;
    }

    this.onChange(value);
  }

  // keep val for backwards compatibility
  get val(): any {
    return this._value;
  }
  set val(value: any) {
    if (!value) return;
    this._value = value;

    if (this.appReadyService.isBrowserAndDomAvailable()) {
      this.el.nativeElement.value = this.value;
    }

    this.onChange(value);
  }
  _value: any;

  @HostListener('change', ['$event'])
  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.writeValue(target.value);
  }

  @HostListener('focus', ['$event'])
  handleFocus(event: Event) {
    this.onTouched(event);
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: Event) {}

  constructor(
    public el: ElementRef,
    private appReadyService: AppReadyService,
    @Optional() @Host() public control: NgControl
  ) {}

  onChange = (_: any) => {};

  onTouched = (_: any) => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  informState() {
    this.communicateState.emit({
      disabled: this.disabled,
      invalid: this.invalid,
      required: this.required
    });
  }

  ngOnInit() {
    if (this.control?.disabled) {
      this.setDisabledStateInit(this.control?.disabled);
    }
  }
}
