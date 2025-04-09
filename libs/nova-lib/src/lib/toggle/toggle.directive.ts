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
import { AfterContentInit, ContentChild, Directive, HostBinding, Input } from '@angular/core';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { RadioDirective } from '../radio/radio.directive';

@Directive({
  standalone: true,
  selector: '[v-toggle]'
})
export class ToggleDirective implements AfterContentInit {
  @ContentChild(RadioDirective) radio: RadioDirective;
  @ContentChild(CheckboxDirective) checkbox: CheckboxDirective;

  /**
   * Sets the `for` attribute to the id of the radio or checkbox.
   * @default &lt;radio-id&gt; or &lt;checkbox-id&gt;
   * @builtin true
   */
  @Input() for: string;
  @HostBinding('attr.for')
  get hostFor(): string {
    return this.for;
  }

  /**
   * Adds <code>v-toggle-icon</code> class for when toggle has icons only.
   * @default false
   */
  @Input()
  get toggleIcon(): boolean {
    return this._toggleIcon;
  }
  set toggleIcon(value: BooleanInput) {
    this._toggleIcon = coerceBooleanProperty(value);
  }
  _toggleIcon: boolean = false;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-toggle
   */
  @Input() class: string = 'v-toggle';
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class, this.toggleIcon ? this.class + '-icon' : ''].join(' ');
  }

  ngAfterContentInit() {
    this.radio?.id ? (this.for = this.radio.id) : '';
    this.checkbox?.id ? (this.for = this.checkbox.id) : '';
    if (this.radio) this.radio._isToggle = true;
  }
}
