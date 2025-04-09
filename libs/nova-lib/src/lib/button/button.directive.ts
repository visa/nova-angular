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
import { BooleanInput, NumberInput, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { BaseInteractiveDirective } from '../_utilities/angular-specific-directives/base-interactive.directive';
import { BadgeDirective } from '../badge/badge.directive';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';
import { IconToggleDirective } from '../icon-toggle/icon-toggle.directive';
import { IconComponent } from '../icon/icon.component';
import { ButtonColor, ButtonSize } from './button.constants';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-button], [v-button-icon], [v-button-stacked], [v-panel-toggle]'
})
export class ButtonDirective extends BaseInteractiveDirective implements AfterContentInit {
  @ContentChild(BadgeDirective) badge: BadgeDirective;
  _roleSetByUser = false; // prevents parent component from overriding if role if role is given directly by user
  _buttonColorSetByUser = false; // prevents parent component from overriding if buttonColor if buttonColor is given directly by user
  _buttonSizeSetByUser = false; // prevents parent component from overriding if buttonSize if buttonSize is given directly by user

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
   * Sets custom type.
   * @default 'button'
   */
  @Input()
  type: string = 'button';
  @HostBinding('attr.type')
  get hostType(): string {
    return this.type;
  }

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-button.v-button-&lt;buttonColor&gt;.v-button-&lt;buttonSize&gt;
   */
  @Input()
  get class(): string {
    return [
      this._class,
      'v-button',
      this.buttonColor !== ButtonColor.PRIMARY ? 'v-button-' + this.buttonColor : '',
      this.buttonSize !== ButtonSize.MEDIUM ? 'v-button-' + this.buttonSize : '',
      this.subtle ? 'v-button-subtle' : '',
      this.destructive ? 'v-button-destructive' : ''
    ].join(' ');
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
   * Sets button size.
   * @default 'medium' / ButtonSize.MEDIUM
   * @options 'small' | ButtonSize.SMALL | <br> 'medium' | ButtonSize.MEDIUM | <br> 'large' | ButtonSize.LARGE
   */
  @Input()
  get buttonSize(): ButtonSize {
    return this._buttonSize;
  }
  set buttonSize(value: ButtonSize) {
    this._buttonSize = value;
    this._buttonSizeSetByUser = true;
  }
  _buttonSize: ButtonSize = ButtonSize.MEDIUM;

  /**
   * Sets button color scheme.
   * @default 'primary' / ButtonColor.PRIMARY
   * @options 'primary' | ButtonSize.PRIMARY | <br> 'secondary' | ButtonSize.SECONDARY | <br> 'tertiary' | ButtonSize.TERTIARY
   */
  @Input()
  get buttonColor(): ButtonColor {
    return this._buttonColor;
  }
  set buttonColor(value: ButtonColor) {
    this._buttonColor = value;
    this._buttonColorSetByUser = true;
  }
  _buttonColor: ButtonColor = ButtonColor.PRIMARY;

  /**
   * Sets button to subtle variant when true.
   * @default false
   */
  @Input()
  get subtle(): boolean {
    return this._subtle;
  }
  set subtle(value: BooleanInput) {
    this._subtle = coerceBooleanProperty(value);
  }
  _subtle: boolean = false;

  /**
   * Sets button to destructive variant when true.
   * @default false
   */
  @Input()
  get destructive(): boolean {
    return this._destructive;
  }
  set destructive(value: BooleanInput) {
    this._destructive = coerceBooleanProperty(value);
  }
  _destructive: boolean = false;

  /**
   * Disables button when true.
   * @default false
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this.disabledChange.emit(this.disabled);
  }
  _disabled: boolean = false;

  /**
   * Emits a boolean value indicating the new disabled state when the disabled state changes.
   */
  @Output() readonly disabledChange = new EventEmitter<boolean>();

  /**
   * Aria attribute pointing to id of descriptive element. <br />
   * If the button has a badge, the <code>aria-describedby</code> will be set to the badge's id by default.
   * @default false
   */
  @Input('aria-describedby')
  get ariaDescribedby(): string | null {
    return this._ariaDescribedby;
  }
  set ariaDescribedby(value) {
    this._ariaDescribedby = value;
  }
  _ariaDescribedby: string | null = null;

  @HostBinding('attr.aria-describedby')
  get hostAriaDescribedby(): string | void {
    if (this.ariaDescribedby !== null) {
      return this.ariaDescribedby;
    }
  }

  constructor(el: ElementRef) {
    super(el);
  } // used in accordion service

  ngAfterContentInit(): void {
    if (this.badge) {
      this.ariaDescribedby = this.badge.id;
    }
  }

  /** Below items needed for tab */
  @ContentChildren(IconComponent) icons: QueryList<IconComponent>;
  _roleSetByTab: boolean = false;
  _isInNavOrNested: boolean = false;
  /**
   * Sets role of button. <br />
   * If no custom role is set, role may be set by a parent component (nav, tabs, etc.).
   * @builtin true
   */
  @Input()
  get role(): string | null {
    return this._role;
  }
  set role(value: string | null) {
    this._role = value;
    this._roleSetByUser = true;
  }
  _role: string | null;
  @HostBinding('attr.role')
  get hostRole(): string | void | null {
    if (this.role || this.role === null) return this.role;
  }

  /**
   * Aria attribute relaying whether button is selected. <br />
   * <code>aria-current</code> and <code>aria-selected</code> should not be used together.
   * @default null
   * @builtin true
   */
  @Input('aria-selected')
  get ariaSelected(): boolean | null {
    return this._ariaSelected;
  }
  set ariaSelected(value: BooleanInput) {
    this._ariaSelected = coerceBooleanProperty(value);
  }
  _ariaSelected: boolean | null = null;

  @HostBinding('attr.aria-selected')
  get hostAriaSelected(): string | void {
    if (this.ariaSelected !== null && !this._isInNavOrNested) {
      return this.ariaSelected.toString();
    }
  }

  /**
   * Aria attribute relaying whether button is selected. <br />
   * <code>aria-current</code> and <code>aria-selected</code> should not be used together.
   * @default null
   * @builtin true
   */
  @Input('aria-current')
  get ariaCurrent(): boolean | string | null {
    return this._ariaCurrent;
  }
  set ariaCurrent(value: BooleanInput) {
    if (value === 'page') {
      this._ariaCurrent = value;
    } else this._ariaCurrent = coerceBooleanProperty(value);
  }
  _ariaCurrent: boolean | string | null = null;

  @HostBinding('attr.aria-current')
  get hostAriaCurrent(): string | void {
    if (this.ariaCurrent !== null) {
      return this.ariaCurrent.toString();
    }
  }

  /**
   * Aria attribute relaying whether button is expanded.
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
   * Sets aria disabled state for accessibility purposes. <br />
   * When true, indicates that the button is disabled and not interactive.
   * @default false
   */
  @Input('aria-disabled')
  get ariaDisabled(): boolean {
    return this._ariaDisabled;
  }
  set ariaDisabled(value: BooleanInput) {
    this._ariaDisabled = coerceBooleanProperty(value);
  }
  _ariaDisabled: boolean = false;

  /** Below needed for Accordion */
  @ContentChild(IconToggleDirective) toggleIcon: IconToggleDirective;
  @ContentChild(IconToggleComponent) toggleIconComponent: IconToggleComponent;

  /**
   * Aria attribute relaying what element the button controls.
   * @default null
   * @default '&lt;accordion-panel-id&gt;' when button is used within Accordion.
   * @default '&lt;panel-content-id&gt;' when button is used within Panel.
   * @builtin true
   */
  @Input('aria-controls')
  get ariaControls(): string | null {
    return this._ariaControls;
  }
  set ariaControls(value) {
    this._ariaControls = value;
  }
  _ariaControls: string | null = null;

  @HostBinding('attr.aria-controls')
  get hostAriaControls(): string | void {
    if (this.ariaControls !== null) {
      return this.ariaControls;
    }
  }

  /** Below needed for combobox */
  _inCombobox = false;

  /**
   * Sets button to combobox toggle button when true.
   * @default false
   * @default true when button is used within combobox and no custom value is given.
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
    if (!this.ariaHaspopup && this._inCombobox) {
      return 'true';
    } else if (this.ariaHaspopup) {
      return this.ariaHaspopup.toString();
    }
  }

  /**
   * Sets button's tabIndex.
   * @default null
   * @default -1 when button is used within combobox and no custom value is given.
   * @builtin true
   */
  @Input()
  get tabindex(): number | null {
    return this._tabindex;
  }
  set tabindex(value: NumberInput) {
    this._tabindex = coerceNumberProperty(value);
  }
  _tabindex: number | null;
  @HostBinding('attr.tabindex')
  get hostTabindex(): string | void {
    if (!this.tabindex && (this._inCombobox || this.ariaDisabled)) {
      return '-1';
    } else if (this.tabindex) {
      return this.tabindex.toString();
    }
  }
}
