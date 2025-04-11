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
import { BaseInteractiveDirective } from '../_utilities/angular-specific-directives/base-interactive.directive';
import { UUIDService } from '../_utilities/services/uuid.service';

@Directive({
  standalone: true,
  selector: '[v-checkbox]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxDirective),
      multi: true
    }
  ]
})
export class CheckboxDirective extends BaseInteractiveDirective implements ControlValueAccessor {
  _disabledEmitter = new EventEmitter<any>();
  _invalidEmitter = new EventEmitter<any>();

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-checkbox
   */
  @Input() class: string = 'v-checkbox';
  @HostBinding('class')
  get hostClasses(): string {
    return this.class;
  }

  @HostBinding('type')
  get hostType() {
    return 'checkbox';
  }

  /**
   * Sets custom id.
   * @default uuidService.getUUID('v-checkbox-')
   * @builtin true
   */
  @Input() id: string = this.uuidService.getUUID('v-checkbox-');
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  /**
   * Sets checkbox to disabled when true
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

  /** Fires when a formControl's disabled state updates  */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Marks checkbox as invalid when true.
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
   * Sets checkbox to indeterminate when true.
   * @default false
   */
  @Input()
  get indeterminate(): boolean {
    return this._indeterminate;
  }
  set indeterminate(value: BooleanInput) {
    this._indeterminate = coerceBooleanProperty(value);
    this.el.nativeElement.indeterminate = this._indeterminate;
  }
  _indeterminate: boolean = false;

  /**
   * Marks checkbox as required when true.
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
    if (
      this.appReadyService.isBrowserAndDomAvailable() &&
      this.el?.nativeElement &&
      this.el.nativeElement.checked !== this.checked
    ) {
      this.el.nativeElement.checked = this.checked;
    }
  }
  _checked: boolean = false;
  @HostBinding('attr.checked')
  @HostBinding('checked')
  get hostAttrChecked() {
    return this.checked ? 'checked' : null;
  }

  /**
   * Value of checkbox input.
   */
  @Input('value') checkboxValue: string | number;
  @HostBinding('attr.value')
  @HostBinding('value')
  get hostValue() {
    return this.checkboxValue;
  }

  val: string | number | null = '';
  set value(value: string | number) {
    this.val = value;
    this.el.nativeElement.checked = value;
    this.checked = value.toString();

    this.onChange(value);
  }

  @HostListener('change', ['$event'])
  handleChange(event: Event) {
    if (this.appReadyService.isBrowserAndDomAvailable()) {
      this.onChange(this.el.nativeElement.checked);
      this.checked = this.el.nativeElement.checked;
    }
  }
  @HostListener('focus', ['$event'])
  handleFocus(event: Event) {
    this.onTouched(event);
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

  onChange = (_: any) => {};

  onTouched = (_: any) => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: string | number): void {
    this.val = value ? value : null;
    this.checked = value ? value.toString() : null;
    if (this.appReadyService.isBrowserAndDomAvailable()) {
      this.el.nativeElement.checked = value ? value : null;
    }
  }
}
