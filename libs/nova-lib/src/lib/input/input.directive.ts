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
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { UUIDService } from '../_utilities/services/uuid.service';
import { SPACE_KEY } from '../nova-lib.constants';
import { BaseInteractiveDirective } from '../_utilities/angular-specific-directives/base-interactive.directive';

@Directive({
  standalone: true,
  selector: '[v-input]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDirective),
      multi: true
    }
  ]
})
export class InputDirective extends BaseInteractiveDirective implements ControlValueAccessor {
  _inCombobox = false;
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-input
   */
  @Input()
  get class(): string {
    return [this._class, 'v-input', this.otp ? 'v-input-otp' : '', this.noResize ? 'v-input-resize-none' : ''].join(
      ' '
    );
  }
  set class(value: string) {
    this._class = value;
  }
  _class: string = '';
  @HostBinding('class')
  get hostClass(): string {
    return this.class;
  }

  /**
   * Sets custom id.
   * @default uuidService.getUUID('v-input-')
   * @builtin true
   */
  @Input()
  id: string = this.uuidService.getUUID('v-input-');
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  /**
   * Sets custom role.
   * @default null
   * @default 'combobox' when input is used within combobox and no custom role is provided.
   * @builtin true
   */
  @Input()
  get role(): string {
    return this._role;
  }
  set role(value: string) {
    this._role = value;
  }
  _role: string;
  @HostBinding('attr.role')
  get hostRole(): string {
    return this.role;
  }

  /**
   * Sets input as readonly when true.
   * @default false
   */
  @Input()
  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(value: BooleanInput) {
    this._readonly = coerceBooleanProperty(value);
    this.informState();
  }
  _readonly: boolean = false;
  @HostBinding('readonly')
  get hostReadonly() {
    return this.readonly ? 'readonly' : null;
  }

  /**
   * Sets component as disabled when true.
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
  /** Fires when a formControl's disabled state updates  */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  /**
   * Marks component as invalid when true.
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
   * Marks component as required when true.
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
   * Sets input to one-time-passcode (OTP) variant when true.
   * @default false
   */
  @Input()
  get otp(): boolean {
    return this._otp;
  }
  set otp(value: BooleanInput) {
    this._otp = coerceBooleanProperty(value);
  }
  _otp: boolean = false;

  /**
   * Removes resize from textarea when true.
   * @default false
   */
  @Input()
  get noResize(): boolean {
    return this._noResize;
  }
  set noResize(value: BooleanInput) {
    this._noResize = coerceBooleanProperty(value);
  }
  _noResize: boolean = false;

  /** Below needed for combobox */

  /**
   * Aria attribute relaying whether input is expanded.
   * @default null
   * @builtin true
   */
  @Input('aria-expanded')
  get ariaExpanded(): boolean | null {
    return this._ariaExpanded;
  }
  set ariaExpanded(value: BooleanInput) {
    this._ariaExpanded = coerceBooleanProperty(value);
  }
  _ariaExpanded: boolean | null = null;
  @HostBinding('attr.aria-expanded')
  get hostAriaExpanded(): string | void {
    if (this.ariaExpanded !== null) {
      return this.ariaExpanded.toString();
    }
  }

  /**
   * Aria attribute relaying autocomplete type.
   * @default null
   * @default 'list' when input is used within combobox and no custom value is provided.
   * @builtin true
   */
  @Input('aria-autocomplete')
  get ariaAutocomplete(): string {
    return this._ariaAutocomplete;
  }
  set ariaAutocomplete(value) {
    this._ariaAutocomplete = value;
  }
  _ariaAutocomplete: string;
  @HostBinding('attr.aria-autocomplete')
  get hostAriaAutocomplete(): string | void {
    if (this.ariaAutocomplete) {
      return this.ariaAutocomplete;
    } else if (this._inCombobox) {
      return 'list';
    }
  }

  /**
   * Sets input aria-haspopup attribute.
   * @default null
   * @default 'listbox' when input is used within combobox and no custom value is given.
   * @builtin true
   */
  @Input('aria-haspopup')
  get ariaHaspopup(): boolean | null {
    return this._ariaHaspopup;
  }
  set ariaHaspopup(value: BooleanInput) {
    this._ariaHaspopup = coerceBooleanProperty(value);
  }
  _ariaHaspopup: boolean | null;
  @HostBinding('attr.aria-haspopup')
  get hostAriaHaspopup(): string | void {
    if (this.ariaHaspopup) {
      return this.ariaHaspopup.toString();
    } else if (this._inCombobox) {
      return 'listbox';
    }
  }

  /**
   * Sets input aria-owns attribute.
   * @default null
   * @default '&lt;listbox-container-id&gt;' when input is used within combobox and no custom value is given.
   * @builtin true
   */
  @Input('aria-owns')
  get ariaOwns(): string {
    return this._ariaOwns;
  }
  set ariaOwns(value) {
    this._ariaOwns = value;
  }
  _ariaOwns: string;
  @HostBinding('attr.aria-owns')
  get hostAriaOwns(): string | void {
    if (this.ariaOwns) {
      return this.ariaOwns;
    }
  }

  /**
   * Aria attribute relaying what element the input controls.
   * @default null
   * @default '&lt;listbox-id&gt;' when input is used within combobox and combobox menu is open.
   * @builtin true
   */
  @Input('aria-controls')
  get ariaControls(): string | null {
    return this._ariaControls;
  }
  set ariaControls(value) {
    this._ariaControls = value;
  }
  _ariaControls: string | null;
  @HostBinding('attr.aria-controls')
  get hostAriaControls(): string | void {
    if (this.ariaControls) {
      return this.ariaControls;
    }
  }

  /**
   * Aria attribute relaying what active element the input refers to.
   * @default null
   * @default '&lt;listbox-item-id&gt;' when input is used within combobox and an option is highlighted or active.
   * @builtin true
   */
  @Input('aria-activedescendant')
  get ariaActiveDescendant(): string | null {
    return this._ariaActiveDescendant;
  }
  set ariaActiveDescendant(value) {
    this._ariaActiveDescendant = value;
  }
  _ariaActiveDescendant: string | null;
  @HostBinding('attr.aria-activedescendant')
  get hostAriaActiveDescendant(): string | void {
    if (this.ariaActiveDescendant) {
      return this.ariaActiveDescendant;
    }
  }

  /**
   * Value of input.
   */
  @Input()
  get value() {
    return this._value;
  }
  set value(value: string) {
    // if (!value) return;
    this._value = value;

    if (this.appReadyService.isBrowserAndDomAvailable()) {
      if (this.el.nativeElement.value !== value) {
        this.el.nativeElement.value = value;
      }
    }

    this.onChange(value);
  }

  // keep val for backwards compatibility
  get val() {
    return this._value;
  }
  set val(value: string) {
    // if (!value) return;
    this._value = value;

    if (this.appReadyService.isBrowserAndDomAvailable()) {
      this.el.nativeElement.value = value;
    }

    this.onChange(value);
  }
  _value: string;

  /**
   * Emits value when the input event is triggered or backspace key is pressed.
   */
  @Output() inputEvent = new EventEmitter<any>();

  /**
   * Emits readonly, disabled, invalid, and required state of input when any of these states change.
   */
  @Output() communicateState = new EventEmitter<any>();

  @HostListener('input', ['$event'])
  handleInput(event: Event) {
    if (this.appReadyService.isBrowserAndDomAvailable()) {
      this.writeValue(this.el.nativeElement.value);
      this.inputEvent.emit(this.el.nativeElement.value);
    }
  }

  @HostListener('focus', ['$event'])
  handleFocus(event: Event) {
    this.onTouched(event);
    this.focused.emit();
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: Event) {}

  @HostListener('keydown', ['$event'])
  handleReadonlySpace(event: KeyboardEvent) {
    // this resolves a bug where date/time/color menus were still opening when readonly and pressing space
    if (this.readonly && event.key === SPACE_KEY) {
      event.preventDefault();
    }
  }

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

  writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
  }

  informState() {
    this.communicateState.emit({
      readonly: this.readonly,
      disabled: this.disabled,
      invalid: this.invalid,
      required: this.required
    });
  }
}
