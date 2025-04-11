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
import { BooleanInput, NumberInput, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { BaseInteractiveDirective } from '../_utilities/angular-specific-directives/base-interactive.directive';
import { UUIDService } from '../_utilities/services/uuid.service';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { END_KEY, ENTER_KEY, HOME_KEY, SPACE_KEY } from '../nova-lib.constants';
import { RadioDirective } from '../radio/radio.directive';
import { ToggleControlService } from '../toggle-control/toggle-control.service';
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: '[v-listbox-item] ',
  templateUrl: './listbox-item.component.html'
})
export class ListboxItemComponent extends BaseInteractiveDirective implements AfterContentInit {
  @ContentChild(RadioDirective) radio: RadioDirective;
  @ContentChild(CheckboxDirective) checkbox: CheckboxDirective;
  _isRoleOptionVariant = false;
  _multi = false;
  _disabledEmitter = new EventEmitter<boolean>();
  _invalidEmitter = new EventEmitter<boolean>();

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-listbox-item
   */
  @Input()
  get class(): string {
    return [this._class, 'v-listbox-item', this.highlighted ? 'v-listbox-item-highlighted' : ''].join(' ');
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
   * Marks item as selected when true.
   * @default false
   */
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(value: BooleanInput) {
    const changed = this._active !== coerceBooleanProperty(value);
    this._active = coerceBooleanProperty(value);
    if (changed) this.itemChanged.emit(this._active);
  }
  _active: boolean = false;

  /**
   * Marks item as highlighted when true. Occurs natively with :focus-visible.
   * @default false
   * @builtin true
   */
  @Input()
  get highlighted(): boolean {
    return this._highlighted;
  }
  set highlighted(value: BooleanInput) {
    this._highlighted = coerceBooleanProperty(value);
  }
  _highlighted: boolean = false;

  // index of item within listbox, supplied by listbox directive
  /** @ignore */
  @Input()
  get index(): number {
    return this._index;
  }
  set index(value: NumberInput) {
    this._index = coerceNumberProperty(value);
  }
  _index: number;

  /**
   * Sets custom role.
   * @default 'option' if no child radio or checkbox is present.
   * @default not present if child radio or checkbox is present.
   * @builtin true
   */
  @Input() role: string;
  @HostBinding('attr.role')
  get hostRole(): string {
    if (this._isRoleOptionVariant && !this.role) {
      this.role = 'option';
    }
    return this.role;
  }

  /**
   * Value of listbox item. <br />
   * A value <strong>must</strong> be present on every list item if it does not have a child radio or checkbox.
   */
  @Input()
  get value(): string | number {
    return this._value;
  }
  set value(value: string | number) {
    this._value = value;
  }
  _value: string | number;
  @HostBinding('attr.value')
  get hostValue(): string | number | void {
    if (this._isRoleOptionVariant) {
      return this.value;
    }
  }

  /**
   * Sets list item with <strong>no child radio or checkbox</strong> as disabled. <br />
   * If using a child radio or checkbox, set <code>disabled</code> directly on those components.
   * @default false
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    if (!this._isRoleOptionVariant) this._disabledEmitter.emit(this.disabled);
  }
  _disabled: boolean = false;
  @HostBinding('attr.disabled')
  get hostDisabled(): null {
    return null;
  }
  @HostBinding('attr.aria-disabled')
  get hostAriaDisabled(): string | null | void {
    if (this._isRoleOptionVariant) {
      return this.disabled ? 'true' : null;
    }
  }

  /**
   * Sets list item with <strong>no child radio or checkbox</strong> as invalid. <br />
   * If using a child radio or checkbox, set <code>invalid</code> directly on those components.
   * @default false
   */
  @Input()
  get invalid(): boolean {
    return this._invalid;
  }
  set invalid(value: BooleanInput) {
    this._invalid = coerceBooleanProperty(value);
    if (!this._isRoleOptionVariant) this._invalidEmitter.emit(this.invalid);
  }
  _invalid: boolean = false;
  @HostBinding('attr.invalid')
  get hostInvalid(): string | null | void {
    if (this._isRoleOptionVariant) {
      return this.invalid ? 'invalid' : null;
    }
  }

  /**
   * Sets custom id.
   * @default uuidService.getUUID('v-listbox-item-')
   * @builtin true
   */
  @Input()
  id: string = this.uuidService.getUUID('v-listbox-item-');
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  @HostBinding('attr.aria-selected')
  get hostAriaSelected(): boolean | void {
    if (this._isRoleOptionVariant) {
      return this.active;
    }
  }

  /**
   * Emits active state of item when toggled.
   */
  @Output() itemChanged = new EventEmitter<boolean>();

  /**
   * Emits when this item is focused.
   */
  @Output() onFocus: EventEmitter<FocusEvent> = new EventEmitter();

  @HostListener('focus', ['$event'])
  handleFocus(event: FocusEvent) {
    this.onFocus.emit(event);
  }

  constructor(
    el: ElementRef,
    private uuidService: UUIDService,
    private toggleControlService: ToggleControlService
  ) {
    super(el);
  }

  ngAfterContentInit(): void {
    if (!this.radio && !this.checkbox) {
      this._isRoleOptionVariant = true;
    } else {
      const child = this.radio ? this.radio : this.checkbox ? this.checkbox : null;
      if (child) {
        // the following is needed to apply the correct classes at the listbox-container level
        this.invalid = child.invalid;
        this.disabled = child.disabled;
        child._disabledEmitter.subscribe(() => {
          this.disabled = child.disabled;
        });
        child._invalidEmitter.subscribe(() => {
          this.invalid = child.invalid;
        });
      }
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (!this._isRoleOptionVariant) {
      this.toggleControlService.toggleControl(this.radio || this.checkbox, event);
    }
    this.selectItem();
  }

  @HostListener('keyup', ['$event'])
  handleKeyup(event: KeyboardEvent) {
    if (!this._isRoleOptionVariant) return;
    if (event.key === ENTER_KEY || event.key === SPACE_KEY) {
      event.preventDefault(); // prevent scrolling
      this.clicked.emit();
      if (!event.shiftKey) this.selectItem();
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this._isRoleOptionVariant) return;
    if (event.key === ENTER_KEY || event.key === SPACE_KEY || event.key === HOME_KEY || event.key === END_KEY) {
      event.preventDefault(); // prevent scrolling
    }
  }

  selectItem() {
    if (this._multi) {
      this.active = !this.active;
    } else {
      this.active = true;
    }
  }
}
