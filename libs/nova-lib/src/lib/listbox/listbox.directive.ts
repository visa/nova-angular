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
import { BooleanInput, NumberInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  QueryList,
  WritableSignal,
  forwardRef,
  signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { UUIDService } from '../_utilities/services/uuid.service';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { NovaLibService } from '../nova-lib.service';
import { ListboxService } from './listbox.service';

@Directive({
  standalone: true,
  selector: '[v-listbox] ',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListboxDirective),
      multi: true
    }
  ]
})
export class ListboxDirective implements ControlValueAccessor, AfterContentInit {
  @ContentChildren(ListboxItemComponent) listItems: QueryList<ListboxItemComponent>;
  _isRoleListboxVariant = signal(false);
  _childrenDisabled = false;
  _childrenInvalid = false;
  _internalValue: (string | number)[] | string | number | null;
  _inCombobox = false;

  // used in service
  _listboxHeight: number;
  _listboxItemHeight: number;
  _listboxGap: number;
  _listboxScrollStylesSet: boolean = false;

  _keyword: String = '';
  _highlightIndex: number | null = null;
  _isHotkeyEvent: Boolean = false;
  _recentSelectedIndex: number | null = null;
  _timeoutId: number = 0;
  ariaActiveDescendant: WritableSignal<string | null> = signal(null);

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-listbox
   */
  @Input()
  get class(): string {
    return [this._class, 'v-listbox', this.containHeight ? 'v-listbox-scroll' : ''].join(' ');
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
   * @default uuidService.getUUID('v-listbox-')
   * @builtin true
   */
  @Input()
  id: string = this.uuidService.getUUID('v-listbox-');
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  /**
   * Sets listbox to multiselect variant when true.
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
   * Sets component and any ListboxItemComponent children as disabled when true. <br>
   * Will automatically become true if all children are disabled.
   * @default false
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    if (this.listItems && this.disabled !== this._childrenDisabled) this.setChildrenDisabled();
    this.informState();
  }
  _disabled: boolean = false;
  /** Fires when a formControl's disabled state updates  */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.listItems && this.disabled !== this._childrenDisabled) this.setChildrenDisabled();
    this.informState();
  }

  /**
   * Sets component and any ListboxItemComponent children as invalid when true. <br>
   * Will automatically become true if any child is invalid.
   * @default false
   */
  @Input()
  get invalid(): boolean {
    return this._invalid;
  }
  set invalid(value: BooleanInput) {
    this._invalid = coerceBooleanProperty(value);
    if (this.listItems && this.invalid !== this._childrenInvalid) this.setChildrenInvalid();
    this.informState();
  }
  _invalid: boolean = false;

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
   * Sets custom role.
   * @default 'group' if no child list item contains a child radio or checkbox.
   * @default not present if any child list item contains a child radio or checkbox.
   * @builtin true
   */
  @Input() role: string;
  @HostBinding('attr.role')
  get hostRole(): string {
    if (this._isRoleListboxVariant() && !this.role) {
      this.role = 'group';
    }
    return this.role;
  }

  /**
   * Sets CSS variable <code>--v-listbox-block-size-scroll</code>. <br />
   * If true, the default 180px will be the listbox's <code>max-block-size</code>. <br />
   * If set to a number or string representing a number (ie <code>[containHeight]="250"</code>), the variable will be set to that amount of pixels.
   */
  @Input()
  get containHeight(): NumberInput | BooleanInput {
    return this._containHeight;
  }
  set containHeight(value: NumberInput | BooleanInput) {
    if (value && value !== true) {
      this._containHeight = value;
    } else {
      this._containHeight = coerceBooleanProperty(value);
    }
  }
  _containHeight: NumberInput | BooleanInput;
  @HostBinding('style.--v-listbox-block-size-scroll')
  get scrollHeight(): NumberInput | void | boolean {
    if (this.containHeight && this.containHeight !== true) {
      return parseInt(this.containHeight.toString()) + 'px'; // allows "250" or "250px" for example
    }
  }

  /**
   * Value of listbox.
   */
  @Input()
  get value() {
    return this._value;
  }
  set value(value: (string | number)[] | string | number | null) {
    this.setValue(value);
  }

  // keep val for backwards compatibility
  get val() {
    return this._value;
  }
  set val(value: (string | number)[] | string | number | null) {
    this.setValue(value);
  }

  setValue(value: (string | number)[] | string | number | null) {
    this._value = value;

    if (this.appReadyService.isBrowserAndDomAvailable()) {
      this.el.nativeElement.value = value;
    }

    if (this.listItems && this._internalValue !== value) {
      if (Array.isArray(value)) {
        // multiselect
        this.listItems
          .filter((item) => value?.includes(item.value))
          .forEach((item) => {
            item.active = true;
          });
      } else if (value) {
        // single select
        const selectedItem = this.listItems.find((item) => item.value === value);
        if (selectedItem) selectedItem.active = true;
      }
      this._internalValue = value;
    }
    if (!value || (this.multiselect && Array.isArray(value) && value.length === 0)) {
      // reset items
      this.resetListbox();
    }
    this.valueUpdated.emit(this.value);
    this.onChange(value);
  }
  _value: string | number | (string | number)[] | null;

  /**
   * Overrides default scroll control behavior. <br />
   * By default the listbox will scroll to the last selected item.
   * @default false
   */
  @Input()
  get customScrollControl(): boolean {
    return this._customScrollControl;
  }
  set customScrollControl(value: BooleanInput) {
    this._customScrollControl = coerceBooleanProperty(value);
  }
  _customScrollControl: boolean = false;

  /**
   * Emits disabled, invalid, and required state of input when updated.
   */
  @Output() communicateState = new EventEmitter<any>();

  /**
   * Emits new listbox value.
   */
  @Output() valueUpdated = new EventEmitter<any>();

  constructor(
    private uuidService: UUIDService,
    private novaLibService: NovaLibService,
    private listboxService: ListboxService,
    private cdRef: ChangeDetectorRef,
    public el: ElementRef,
    private appReadyService: AppReadyService
  ) {}

  @HostListener('focus', ['$event'])
  handleFocus(event: Event) {
    this.onTouched(event);
  }
  @HostListener('blur', ['$event'])
  handleBlur(event: Event) {}

  ngAfterContentInit(): void {
    if (this.listItems) {
      this.setUpListbox();
      this.listItems.changes.subscribe(() => {
        this.setUpListbox();
      });
    }
  }

  setUpListbox() {
    if (this.disabled) {
      // if listbox disabled is true, disable all items
      this.setChildrenDisabled();
    } else if (
      // if all items are disabled, set listbox disabled to true
      this.listItems.length > 0 &&
      this.listItems.toArray().length === this.listItems.toArray().filter((item) => item.disabled).length
    ) {
      this._childrenDisabled = true;
      this.disabled = true;
    } else {
      this._childrenDisabled = false;
      this.disabled = false;
    }
    if (this.invalid) {
      // if listbox invalid is true, set children as invalid
      this.setChildrenInvalid();
    } else if (this.listItems.find((item) => item.invalid)) {
      // if any item is invalid, set invalid class
      this._childrenInvalid = true;
      this.invalid = true;
    } else {
      this._childrenInvalid = false;
      this.invalid = false;
    }
    this._invalid = this.listItems.find((item) => item.invalid) ? true : false;

    this.addListItemSubscriptions();
    this.setInitialValue();

    // if standard listbox and not in combobox, add arrow key navigation
    if (this._isRoleListboxVariant() && !this._inCombobox) {
      this.listboxService.setUpListbox(this);
    }

    if (!this.customScrollControl) {
      setTimeout(() => {
        this.listboxService.scrollItemIntoView(this);
      }, 500); // on initial load, extra time is needed for getComputedStyle
    }
  }

  setInitialValue() {
    if (
      /**
       * If value is an array, make sure the array is not empty
       * If value is not an array, make sure value exists.
       * This check ensures the function isn't called when value = []
       */
      (this.multiselect && Array.isArray(this.value) && this.value.length > 0) ||
      (!this.multiselect && this.value)
    ) {
      this.updateItemsFromValue();
    } else {
      // if no value is given, find any active items and set value to those
      this.updateValueFromItems();
    }
    this.cdRef.detectChanges();
  }

  addListItemSubscriptions() {
    this.listItems.forEach((item, index) => {
      item.onFocus.subscribe((event: FocusEvent) => {
        if (this._highlightIndex === null)
          this._highlightIndex = this.novaLibService.firstEnabledItem(this.listItems.toArray());
      });
      // subscribe to changes in disabled and invalid
      item._disabledEmitter.subscribe(() => {
        // if ALL children are disabled, entire listbox is disabled
        if (this.listItems.toArray().length === this.listItems.filter((item) => item.disabled).length) {
          this._childrenDisabled = true;
          this.disabled = true;
        } else {
          this._childrenDisabled = false;
          this.disabled = false;
        }
      });
      item._invalidEmitter.subscribe(() => {
        // if ANY child is invalid, listbox shows as invalid
        if (this.listItems.find((item) => item.invalid)) {
          this._childrenInvalid = true;
          this.invalid = true;
        } else {
          this._childrenInvalid = false;
          this.invalid = false;
        }
      });
      // if standard listbox, add role="listbox" and change underlying class to radio or checkbox accordingly
      if (item._isRoleOptionVariant) {
        if (!this._isRoleListboxVariant()) this._isRoleListboxVariant.set(true);
        item._multi = this.multiselect;
        item.index = index;
        // subscribe to when item is selected or clicked
        item.itemChanged.subscribe((isSelected) => {
          if (index !== item.index) return; // subscription is still being triggered for old rendered item
          this.novaLibService.deselectItems(this.listItems.toArray(), index, 'highlighted');

          if (!this.multiselect && isSelected) {
            this.novaLibService.deselectItems(this.listItems.toArray(), index);
            this.updateValueFromItems();
          } else if (this.multiselect) {
            // not calling update value because we need to maintain order
            if (isSelected) {
              if (Array.isArray(this.value)) {
                if (!this.value.includes(item.value)) this.value = [...this.value, item.value];
              } else {
                this.value = [item.value];
              }
            } else {
              if (Array.isArray(this.value)) {
                this.value = this.value.filter((val) => val !== item.value);
              } else {
                this.value = [];
              }
            }
            // set aria-activedescendant to first value
            this.ariaActiveDescendant.set(this.listItems.find((item) => item.active)?.id || null);
          }

          // Update highlight index if indexes do not match and click event is not triggered by hot key
          // Used for click event
          if (this._highlightIndex !== index && !this._isHotkeyEvent) {
            this._highlightIndex = index;
            // item.highlighted = true;
            this._recentSelectedIndex = item.index;
          }
        });
        this.cdRef.detectChanges();
      }
    });
  }

  // value is given, update items so active items reflect listbox value
  updateItemsFromValue() {
    if (this.multiselect && Array.isArray(this.value) && this.value.length > 0) {
      // if value is an array, select all items that match the value
      this.listItems
        .filter((item) => (this.value as (string | number)[]).includes(item.value))
        .forEach((item) => {
          item.active = true;
        });
    } else if (!this.multiselect && this.value) {
      // if item is string, select item that matches the value
      this.listItems
        .filter((item) => this.value === item.value)
        .forEach((item) => {
          item.active = true;
        });
    }

    // set aria-activedescendant to first value
    this.ariaActiveDescendant.set(this.listItems.find((item) => item.active)?.id || null);
  }

  // no value is given, update value so it reflects active items
  updateValueFromItems() {
    // if multiselect, return value in array
    if (this.multiselect) {
      this.value = this.listItems.filter((item) => item.active).map((item) => item.value);
    } else {
      // if single select, return single value
      this.value = this.listItems.find((item) => item.active)?.value || null;
    }

    // set aria-activedescendant to first value
    this.ariaActiveDescendant.set(this.listItems.find((item) => item.active)?.id || null);
  }

  setChildrenDisabled() {
    this.listItems.forEach((item) =>
      item.checkbox
        ? (item.checkbox.disabled = this.disabled)
        : item.radio
          ? (item.radio.disabled = this.disabled)
          : (item.disabled = this.disabled)
    );
    this._childrenDisabled = this.listItems.toArray().length === this.listItems.filter((item) => item.disabled).length;
  }

  setChildrenInvalid() {
    this.listItems.forEach((item) =>
      item.checkbox
        ? (item.checkbox.invalid = this.invalid)
        : item.radio
          ? (item.radio.invalid = this.invalid)
          : (item.invalid = this.invalid)
    );
    this._childrenInvalid = this.listItems.some((item) => item.invalid);
  }

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

  resetListbox() {
    if (this.listItems?.find((item) => item.active)) {
      // reset items
      this.novaLibService.deselectItems(this.listItems.toArray());
    }
    this.ariaActiveDescendant.set(null);
  }

  informState() {
    this.communicateState.emit({
      disabled: this.disabled,
      invalid: this.invalid,
      required: this.required
    });
  }
}
