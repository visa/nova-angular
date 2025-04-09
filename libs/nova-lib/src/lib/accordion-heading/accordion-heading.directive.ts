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
  ContentChildren,
  Directive,
  EventEmitter,
  HostBinding,
  Input,
  Optional,
  Output,
  QueryList,
  signal
} from '@angular/core';
import { ButtonColor, ButtonSize } from '../button/button.constants';
import { ButtonDirective } from '../button/button.directive';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-accordion-heading]'
})
export class AccordionHeadingDirective implements AfterContentInit {
  @ContentChildren(ButtonDirective) buttons: QueryList<ButtonDirective>;
  _subtle = signal(false);
  _index: number;
  _buttonHeading: ButtonDirective;

  constructor(@Optional() public hostButton?: ButtonDirective) {}

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-accordion-heading
   */
  @Input()
  get class(): string {
    return [this._class, 'v-accordion-heading'].join(' ');
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
   * Sets expanded state of accordion heading. <br />
   * <strong>This property is overriden when used with details/summary version of accordion. Instead, refer to the native <code>open</code> property of the details element.</strong>
   * @default false
   */
  @Input()
  get expanded(): boolean {
    return this._expanded;
  }
  set expanded(value: BooleanInput) {
    this._expanded = coerceBooleanProperty(value);
    this.toggled.emit(this._index);
  }
  _expanded: boolean = false;

  /**
   * Emits item index when accordion item is toggled (collapsed and expanded).
   */
  @Output() toggled = new EventEmitter<number>();

  @HostBinding('style.--v-button-default-background')
  @HostBinding('style.--v-accordion-background')
  get hostBackground(): string | void {
    if (this._subtle()) {
      return 'transparent';
    }
  }

  @HostBinding('style.--v-button-default-gap')
  @HostBinding('style.--v-accordion-items-gap')
  get hostGap(): string | void {
    if (this._subtle()) {
      return '2px';
    }
  }

  @HostBinding('style.--v-accordion-foreground-initial')
  get hostForeground(): string | void {
    // only apply subtle foreground color if the button is not disabled
    if (this._subtle() && !(this.hostButton?.disabled || this.hostButton?.ariaDisabled)) {
      return 'var(--palette-default-active)';
    }
  }

  ngAfterContentInit(): void {
    // children buttons
    if (this.buttons) {
      this.buttons.toArray().forEach((button) => {
        if (button.toggleIcon || button.toggleIconComponent) {
          this._buttonHeading = button;
        }
      });
    }

    // [v-button][v-accordion-heading] instance
    if (this.hostButton) {
      if (!this.hostButton._buttonSizeSetByUser) {
        this.hostButton.buttonSize = ButtonSize.LARGE;
        this.hostButton._buttonSizeSetByUser = false;
      }
      if (!this.hostButton._buttonColorSetByUser) {
        this.hostButton.buttonColor = ButtonColor.SECONDARY;
        this.hostButton._buttonColorSetByUser = false;
      }
    }
  }
}
