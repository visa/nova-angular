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
import { Directive, HostBinding, Input } from '@angular/core';
import { DividerType } from './divider.constants';

@Directive({
  standalone: true,
  selector: '[v-divider]'
})
export class DividerDirective {
  /**
   * Sets divider style.
   * @default 'default' / DividerType.DEFAULT
   * @options 'default' | DividerType.DEFAULT | <br> 'section' | DividerType.SECTION | <br> 'decorative' | DividerType.DECORATIVE
   */
  @Input()
  get dividerType(): DividerType {
    return this._dividerType;
  }
  set dividerType(value: DividerType) {
    this._dividerType = value;
  }
  _dividerType: DividerType = DividerType.DEFAULT;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-divider.v-divider-&lt;dividerType&gt;
   */
  @Input() class: string = '';
  @HostBinding('class')
  get hostClasses(): string {
    return [
      this.class,
      'v-divider',
      this.dividerType !== DividerType.DEFAULT ? 'v-divider-' + this.dividerType : ''
    ].join(' ');
  }

  @HostBinding('attr.aria-hidden')
  get ariaHidden() {
    return this.dividerType === DividerType.DECORATIVE ? 'true' : null;
  }

  constructor() {}
}
