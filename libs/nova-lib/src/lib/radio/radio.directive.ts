/**
 *              © 2025 Visa
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
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { UUIDService } from '../_utilities/services/uuid.service';
import { BaseInteractiveDirective } from '../_utilities/angular-specific-directives/base-interactive.directive';

@Directive({
  standalone: true,
  selector: '[v-radio]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioDirective),
      multi: true
    }
  ]
})
export class RadioDirective extends BaseInteractiveDirective implements ControlValueAccessor {
  _disabledEmitter = new EventEmitter<any>();
  _invalidEmitter = new EventEmitter<any>();
  /**
   * Value of radio input.
   */
  @Input('value') radioValue: string | number;
  @HostBinding('attr.value')
  @HostBinding('value')
  get hostValue() {
    return this.radioValue;
  }

  /**
   * Sets custom id.
   * @default uuidService.getUUID('v-radio-')
   * @builtin true
   */
  @Input() id: string = this.uuidService.getUUID('v-radio-');
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  // @TODO: could avoid this by extending RadioControlValueAccessor?
  /**
   * @ignore
   */
  @Input('formControlName') formName: string;
  /**
   * @ignore
   */
  @Input() name: string;
  @HostBinding('name')
  get hostName(): string | void {
    if (this.name || this.formName) {
      return this.name || this.formName;
    }
  }

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-radio
   */
  @Input() class: string = ''; // override the standard class attr with a new one.
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class, 'v-radio'].join(' ');
  }

  @HostBinding('type')
  get hostType() {
    return 'radio';
  }

  /**
   * Sets radio as disabled when true.
   * @default false
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabledEmitter.emit();
  }
  _disabled: boolean = false;
  @HostBinding('attr.disabled')
  get hostDisabled() {
    return this.disabled ? 'disabled' : null;
  }
  /** Fires when a formControl's disabled state updates.  */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Marks radio as invalid when true.
   * @default false
   */
  @Input()
  get invalid(): boolean {
    return this._invalid;
  }
  set invalid(value: BooleanInput) {
    this._invalid = coerceBooleanProperty(value);
    this._invalidEmitter.emit();
  }
  _invalid: boolean = false;
  @HostBinding('attr.aria-invalid')
  get hostAriaInvalid() {
    return this.invalid;
  }

  /**
   * Marks component as required when true.
   * @default false
   */
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  _required: boolean = false;
  @HostBinding('attr.required')
  get hostRequired() {
    return this.required ? 'required' : null;
  }

  /**
   * Sets checked state of component.
   * @default false
   */
  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: BooleanInput) {
    this._checked = coerceBooleanProperty(value);
  }
  _checked: boolean = false;
  // @HostBinding('attr.checked')
  // @HostBinding('checked')
  // get hostChecked() {
  //   return this.checked ? 'checked' : null;
  // }

  // prevent toggle from adding extra scroll
  _isToggle: boolean;
  @HostBinding('style.position')
  get hostStyle() {
    return this._isToggle ? 'fixed' : 'unset';
  }

  val: string | number | null = '';
  set value(value: string | number) {
    this.val = value;

    this.onChange(value);
  }

  @HostListener('change', ['$event'])
  handleChange(event: Event) {
    if (this.appReadyService.isBrowserAndDomAvailable()) {
      this.onChange(this.radioValue);
      this.checked = this.el.nativeElement.checked;
    }
  }

  @HostListener('focus', ['$event'])
  handleFocus(event: Event) {
    this.onTouched('');
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: Event) {}

  constructor(
    el: ElementRef,
    private uuidService: UUIDService,
    private appReadyService: AppReadyService
  ) {
    super(el);
  }

  onChange = (_: string | number) => {};

  onTouched = (_: string | number) => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: string | number): void {
    this.val = value;
    this.checked = this.radioValue === value;

    if (this.appReadyService.isBrowserAndDomAvailable()) {
      this.el.nativeElement.checked = this.checked;
    }
  }
}
