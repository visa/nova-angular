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
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-banner]'
})
export class BannerDirective {
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-banner
   */
  @Input() class = ''; // override the standard class attr with a new one.
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class, 'v-banner'].join(' ');
  }

  /**
   * Provides sticky styling for global banners. <br />
   * When true, the following CSS rules are applied - <code>position: sticky; top: 0; z-index: 888;</code>.
   * @default false
   */
  @Input()
  get isGlobal(): boolean {
    return this._isGlobal;
  }
  set isGlobal(value: BooleanInput) {
    this._isGlobal = coerceBooleanProperty(value);
  }
  _isGlobal: boolean = false;

  @HostBinding('style')
  get hostStyle(): string {
    return this.isGlobal ? 'position: sticky; top: 0; z-index: 888;' : '';
  }

  constructor() {}
}
