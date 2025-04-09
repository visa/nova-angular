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
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  QueryList,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UUIDService } from '../_utilities/services/uuid.service';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { RadioDirective } from '../radio/radio.directive';

/**
 * This directive is used to group radio buttons together and manage their state. <br />
 * Typically used for a required group to relay that one of the group is required to be selected.
 */
@Directive({
  selector: '[v-radio-group]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupDirective),
      multi: true
    }
  ]
})
export class RadioGroupDirective implements ControlValueAccessor, AfterContentInit {
  @ContentChildren(RadioDirective, { descendants: true }) radios: QueryList<RadioDirective>;
  /**
   * Marks radio group as required when true.
   * @default false
   */
  @Input('required')
  get groupRequired(): boolean {
    return this._groupRequired;
  }
  set groupRequired(value: BooleanInput) {
    this._groupRequired = coerceBooleanProperty(value);
    this.updateChildrenState('required', this.groupRequired);
  }
  _groupRequired: boolean = false;
  @HostBinding('attr.aria-required')
  get ariaRequired(): string | void {
    if (this.groupRequired) return 'true';
  }

  /**
   * Sets radio group as disabled when true.
   * @default false
   */
  @Input('disabled')
  get groupDisabled(): boolean {
    return this._groupDisabled;
  }
  set groupDisabled(value: BooleanInput) {
    this._groupDisabled = coerceBooleanProperty(value);
    this.updateChildrenState('disabled', this.groupDisabled);
  }
  _groupDisabled: boolean = false;
  /** Fires when a formControl's disabled state updates  */
  setDisabledState(isDisabled: boolean): void {
    this.groupDisabled = isDisabled;
  }

  /**
   * Marks radio group as invalid when true.
   * @default false
   */
  @Input('invalid')
  get groupInvalid(): boolean {
    return this._groupInvalid;
  }
  set groupInvalid(value: BooleanInput) {
    this._groupInvalid = coerceBooleanProperty(value);
    this.updateChildrenState('invalid', this.groupInvalid);
  }
  _groupInvalid: boolean = false;

  /**
   * Sets custom role.
   * @default radiogroup
   * @builtin true
   */
  @Input() role: string = 'radiogroup';
  @HostBinding('attr.role')
  get hostRole() {
    return this.role;
  }

  /**
   * Value of radio group.
   */
  @Input()
  get value() {
    return this._value;
  }
  set value(value: string | number | null | undefined) {
    this._value = value;
    if (!value) this.clear();

    this.onChange(value);
    this.onTouched(value);
  }
  _value: string | number | null | undefined;

  /**
   * Shared name of radio group.
   * @default this.uuidService.getUUID('v-radio-group-');
   * @builtin true
   */
  @Input() name: string = this.uuidService.getUUID('v-radio-group-');

  @HostListener('change', ['$event'])
  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selected = this.radios.find((radio) => radio.radioValue == target.value); // double equals so number can be compared to string
    if (selected) {
      this.value = selected.radioValue;
      this.radios.forEach((radio) => (radio.checked = radio.radioValue === this.value));
    }
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: Event) {
    this.onTouched(event);
  }

  constructor(
    public el: ElementRef,
    private appReadyService: AppReadyService,
    private cdRef: ChangeDetectorRef,
    private uuidService: UUIDService
  ) { }

  ngAfterContentInit(): void {
    if (this.radios) {
      this.radios.forEach((radio) => {
        radio.name = radio.name ? radio.name : this.name;
      });

      this.radios.changes.subscribe(() => {
        this.radios.forEach((radio) => {
          radio.name = radio.name ? radio.name : this.name;
        });
        this.cdRef.detectChanges();
      });

      if (this.value) {
        // if value is given, select matching radio
        this.selectRadio();
      } else {
        // if no value is given, see if a radio is selected and update value
        const selected = this.radios.find((radio) => radio.checked);
        if (selected) {
          this.value = selected.radioValue;
        }
      }
      if (this.groupDisabled) this.updateChildrenState('disabled', this.groupDisabled);
      if (this.groupInvalid) this.updateChildrenState('invalid', this.groupInvalid);
      if (this.groupRequired) this.updateChildrenState('required', this.groupRequired);
    }
  }

  onChange = (_: any) => { };

  onTouched = (_: any) => { };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: string | number): void {
    this.value = value;
    this.selectRadio();

    this.onChange(this.value);
  }

  selectRadio() {
    const selected = this.radios?.find((radio) => radio.radioValue == this.value); // double equals so number can be compared to string
    if (selected && !selected.checked) {
      selected.checked = true;
      if (this.appReadyService.isBrowserAndDomAvailable()) {
        selected.el.nativeElement.checked = true;
      }
    }
  }

  clear() {
    if (this.radios) {
      // clear value from radio and visual check
      this.radios.forEach((radio) => {
        radio.checked = false;
        if (this.appReadyService.isBrowserAndDomAvailable()) {
          radio.el.nativeElement.checked = false;
        }
      });
    }
  }

  updateChildrenState(prop: 'disabled' | 'invalid' | 'required', groupProp: boolean) {
    if (this.radios) {
      this.radios.forEach((radio) => {
        radio[prop] = groupProp;
      });
    }
  }
}
