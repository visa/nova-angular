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
import { ContentChild, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { ButtonDirective } from '../button/button.directive';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-chip]'
})
export class ChipDirective {
  @ContentChild(CheckboxDirective) checkbox: CheckboxDirective;
  @ContentChild(ButtonDirective) button: ButtonDirective;
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-button
   */
  @Input()
  get class(): string {
    return [this._class, 'v-chip', this.compact ? 'v-chip-compact' : '', this.checkbox ? 'v-chip-selection' : ''].join(
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
   * Sets chip to compact variant when true.
   * @default false
   */
  @Input()
  get compact(): boolean {
    return this._compact;
  }
  set compact(value: BooleanInput) {
    this._compact = coerceBooleanProperty(value);
  }
  _compact: boolean = false;

  constructor(readonly el: ElementRef) {} // used in floating-ui-container
}
