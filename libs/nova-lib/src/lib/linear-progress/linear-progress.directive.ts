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
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[v-progress-linear], [v-linear-progress]'
})
export class LinearProgressDirective {
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-progress.v-progress-bar
   */
  @Input() class: string = '';
  @HostBinding('class')
  get hostClasses(): string {
    return [
      this.class,
      'v-progress',
      'v-progress-bar',
      this.determinate ? '' : 'v-progress-indeterminate',
      this.determinate && this.percentage === this.max ? 'v-progress-complete' : '',
      this.invalid ? 'v-progress-error' : ''
    ].join(' ');
  }

  /**
   * Sets progress to determinate when true.
   * @default false
   */
  @Input()
  get determinate(): boolean {
    return this._determinate;
  }
  set determinate(value: BooleanInput) {
    this._determinate = coerceBooleanProperty(value);
  }
  _determinate: boolean = false;

  /**
   * Marks progress as invalid when true.
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

  /**
   * Sets the percentage for a <code>determinate</code> progress bar.
   * @default 0
   */
  @Input()
  get percentage(): number {
    return this._percentage;
  }
  set percentage(value: NumberInput) {
    this._percentage = coerceNumberProperty(value);
  }
  _percentage: number = 0;

  /**
   * The max value for a <code>determinate</code> progress bar.
   * @default 100
   */
  @Input()
  get max(): number {
    return this._max;
  }
  set max(value: NumberInput) {
    this._max = coerceNumberProperty(value);
  }
  _max: number = 100;
  @HostBinding('max')
  get hostMax(): number {
    if (this.determinate) {
      return this.max;
    } else return 1;
  }

  /**
   * Hide indeterminate progress bar from screen readers when true.
   * @default 'true' when <code>determinate</code> is false
   * @default null when <code>determinate</code> is true
   * @builtin true
   */
  @Input() ariaHidden: string | void | null = null;
  @HostBinding('attr.aria-hidden')
  get hostAriaHidden(): string | void | null {
    if (this.ariaHidden) {
      return this.ariaHidden;
    }
    if (!this.determinate) {
      return 'true';
    }
    return null;
  }

  /**
   * The current value for a <code>determinate</code> progress bar.
   */
  @Input()
  get value(): number {
    return this._value;
  }
  set value(value: NumberInput) {
    this._value = coerceNumberProperty(value);
  }
  _value: number;
  @HostBinding('attr.value')
  get hostValue(): number | void {
    if (this.determinate) {
      return this.value ? this.value : this.percentage;
    }
  }

  constructor() {}
}
