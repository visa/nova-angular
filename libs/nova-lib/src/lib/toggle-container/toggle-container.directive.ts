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
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { UUIDService } from '../_utilities/services/uuid.service';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { RadioDirective } from '../radio/radio.directive';
import { ToggleButtonDirective } from '../toggle-button/toggle-button.directive';

@Directive({
  standalone: true,
  selector: '[v-toggle-container]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleContainerDirective),
      multi: true
    }
  ]
})
export class ToggleContainerDirective implements ControlValueAccessor, AfterContentInit {
  @ContentChildren(RadioDirective, { descendants: true })
  radios: QueryList<RadioDirective>;
  @ContentChildren(CheckboxDirective, { descendants: true })
  checkboxes: QueryList<CheckboxDirective>;
  @ContentChildren(ToggleButtonDirective, { descendants: true })
  buttons: QueryList<ToggleButtonDirective>;

  /**
   * Sets custom name.
   * @default this.uuidService.getUUID('v-toggle-');
   * @builtin true
   */
  @Input() name: string = this.uuidService.getUUID('v-toggle-');

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-toggle-container
   */
  @Input() class: string = 'v-toggle-container';
  @HostBinding('class')
  get hostClasses(): string {
    return this.class;
  }

  /**
   * Allows multiple buttons to be selected when true. <br />
   * To be used with child Button components, not Radio or Checkbox.
   * @default false
   */
  @Input()
  get multiselect(): boolean {
    return this._multiselect;
  }
  set multiselect(value: BooleanInput) {
    this._multiselect = coerceBooleanProperty(value);
  }
  _multiselect: boolean = false;

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
    this.informDisabledState();
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
  }
  _required: boolean = false;

  /**
   * Value of toggle button.
   */
  @Input()
  get value() {
    return this._value;
  }
  set value(value: (string | number)[] | string | number | null) {
    let tempValue = value;
    // convert single value to array if multiselect
    if ((this.multiselect || this.checkboxes?.length > 0) && tempValue && !Array.isArray(tempValue)) {
      tempValue = [tempValue];
    }
    this._value = tempValue;
    if ((this.multiselect && (this.value as (string | number)[])?.length === 0) || !this._value) {
      this.clear();
    } else {
      this.updateValue(this._value);
    }

    this.onChange(this.value);
    this.onTouched(this.value);
  }
  _value: (string | number)[] | string | number | null;

  updateValue(value: (string | number)[] | string | number | null) {
    if (this.multiselect) {
      if (this.buttons?.length > 0) {
        // if the active buttons do not reflect the new value..
        if (this.buttons.filter((b) => b.active).map((b) => b.value) != (this.value as (string | number)[])) {
          // update them
          this.buttons.forEach((button) => {
            button.active = (value as (string | number)[]).includes(button.value);
          });
        }
      } else if (this.checkboxes?.length > 0) {
        // if the checked checkboxes do not reflect the new value..
        if (this.checkboxes.filter((c) => c.checked).map((c) => c.checkboxValue) != (value as (string | number)[])) {
          // update them
          this.checkboxes.forEach((checkbox) => {
            this.updateCheckboxRadioVal(checkbox, (value as (string | number)[]).includes(checkbox.checkboxValue));
          });
        }
      }
    } else {
      if (this.buttons?.length > 0) {
        // if the active button does not reflect the new value..
        if (this.buttons.find((b) => b.active)?.value != (value as string | number)) {
          // update it
          this.buttons.forEach((button) => {
            button.active = button.value === value;
          });
        }
      } else if (this.radios?.length > 0) {
        // if the checked radio does not reflect the new value..
        if (this.radios.find((r) => r.checked)?.radioValue != (value as string | number)) {
          // update it
          this.radios.forEach((radio) => {
            this.updateCheckboxRadioVal(radio, radio.radioValue === value);
          });
        }
      }
    }
    this.onChange(this.value);
  }

  constructor(
    private uuidService: UUIDService,
    private cdRef: ChangeDetectorRef,
    private appReadyService: AppReadyService
  ) {}

  ngAfterContentInit(): void {
    this.multiselect = this.multiselect ? this.multiselect : this.checkboxes?.length > 0 ? true : false;
    if (this.value) {
      this.writeValue(this.value);
    }
    if (this.disabled) {
      this.informDisabledState();
    }
    if (this.buttons && this.buttons.length > 0) {
      this.setUpButtons();

      this.buttons.changes.subscribe(() => {
        this.unsubscribeFromListeners(this.buttons);
        this.setUpButtons();
        this.cdRef.detectChanges();
      });
    }
    if (this.radios && this.radios.length > 0) {
      // single select, using radios
      this.setUpRadios();

      this.radios.changes.subscribe(() => {
        this.unsubscribeFromListeners(this.radios);
        this.setUpRadios();
        this.cdRef.detectChanges();
      });
    }
    if (this.checkboxes && this.checkboxes.length > 0) {
      // multiselect, using checkboxes
      this.setUpCheckboxes();

      this.checkboxes.changes.subscribe(() => {
        this.unsubscribeFromListeners(this.checkboxes);
        this.setUpCheckboxes();
        this.cdRef.detectChanges();
      });
    }
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: Event) {
    this.onTouched(event);
  }

  setUpButtons() {
    this.buttons.forEach((button) => {
      button.listeners.push(
        button.clicked.subscribe(() => {
          if (this.multiselect) {
            button.active = !button.active;
            const tempValue = (this.value as (string | number)[]) || [];
            if (button.active) {
              this.value = [...tempValue, button.value];
            } else {
              this.value = tempValue.filter((v) => v !== button.value);
            }
          } else {
            if (this.value === button.value) return;
            this.buttons.forEach((b) => {
              b.active = false;
            });
            button.active = true;
            this.value = button.value;
          }
        })
      );
    });
    // find active buttons and set value
    const activeValues = this.buttons.filter((b) => b.active).map((b) => b.value);
    if (this.multiselect && this.value !== activeValues) {
      this.value = activeValues;
    } else if (!this.multiselect && this.value !== activeValues[0]) {
      this.value = activeValues[0];
    }
  }

  setUpRadios() {
    this.radios.forEach((radio) => {
      radio.radioValue = radio.radioValue ? radio.radioValue : this.uuidService.getUUID('v-radio-');
      radio.name = radio.name ? radio.name : this.name;
      // find checked radio buttons and set value
      radio.listeners.push(
        radio.clicked.subscribe(() => {
          if (this.value !== radio.radioValue) {
            this.value = radio.radioValue;
          }
        })
      );
    });
    const activeValues = this.radios.find((r) => r.checked);
    if (activeValues && this.value !== activeValues.radioValue) {
      this.value = activeValues.radioValue;
    }
  }

  setUpCheckboxes() {
    this.checkboxes.forEach((checkbox) => {
      checkbox.checkboxValue = checkbox.checkboxValue
        ? checkbox.checkboxValue
        : this.uuidService.getUUID('v-checkbox-');
      checkbox.listeners.push(
        checkbox.clicked.subscribe((event) => {
          if (event.target.checked) {
            // add value
            this.value = [...(this.value as (string | number)[]), checkbox.checkboxValue];
          } else {
            // remove value
            this.value = (this.value as (string | number)[]).filter((v) => v !== checkbox.checkboxValue);
          }
        })
      );
    });
    // find checked checkboxes and set value
    const activeValues = this.checkboxes.filter((c) => c.checked).map((c) => c.checkboxValue);
    if (activeValues && this.value !== activeValues) {
      this.value = activeValues;
    }
  }

  onChange = (_: any) => {};

  onTouched = (_: any) => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: (string | number)[] | string | number | null): void {
    this.value = value;
  }

  clear() {
    // clear value from radio and visual check
    this.radios?.forEach((radio) => {
      this.updateCheckboxRadioVal(radio);
    });

    this.checkboxes?.forEach((checkbox) => {
      this.updateCheckboxRadioVal(checkbox);
    });

    this.buttons?.forEach((button) => {
      button.active = false;
    });

    if (this.multiselect && this.value && (this.value as (string | number)[]).length > 0) {
      this.value = [];
    } else if (this.value) {
      this.value = null;
    }
  }

  updateCheckboxRadioVal(item: RadioDirective | CheckboxDirective, checked: boolean = false) {
    item.checked = checked;
    if (this.appReadyService.isBrowserAndDomAvailable()) {
      item.el.nativeElement.checked = checked;
    }
  }

  unsubscribeFromListeners(
    items: QueryList<RadioDirective> | QueryList<CheckboxDirective> | QueryList<ToggleButtonDirective>
  ) {
    items.forEach((item) => {
      item.listeners.forEach((sub) => {
        sub.unsubscribe();
      });
    });
  }

  informDisabledState() {
    if (this.buttons) {
      this.buttons.forEach((button) => {
        button.disabled = this.disabled;
      });
    }
    if (this.radios) {
      this.radios.forEach((radio) => {
        radio.disabled = this.disabled;
      });
    }
    if (this.checkboxes) {
      this.checkboxes.forEach((checkbox) => {
        checkbox.disabled = this.disabled;
      });
    }
  }
}
