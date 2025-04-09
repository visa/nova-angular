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
import { Directive, HostBinding, Input } from '@angular/core';

export const TypographyColor = {
  Default: 'default',
  Active: 'active',
  Subtle: 'subtle',
  OnActive: 'on-active'
} as const;

export type TypographyColor = (typeof TypographyColor)[keyof typeof TypographyColor];

@Directive({
  standalone: true,
  selector: '[vTypographyColor], [vFontColor]'
})
export class TypographyColorDirective {
  @HostBinding('class')
  get hostClasses(): string | void {
    if (this.vTypographyColor) {
      return `v-typography-color-${this.vTypographyColor}`;
    }
  }

  /**
   * Applies given typography color class.
   */
  @Input()
  get vTypographyColor(): TypographyColor | '' | null {
    return this._vTypographyColor;
  }
  set vTypographyColor(value) {
    this._vTypographyColor = value;
  }

  /**
   * Applies given typography color class. <br>
   * Can be used as a more succinct alias for <code>vTypographyColor</code>.
   */
  @Input()
  get vFont(): TypographyColor | '' | null {
    return this._vTypographyColor;
  }

  set vFont(value: TypographyColor | '' | null) {
    this._vTypographyColor = value;
  }
  _vTypographyColor: TypographyColor | '' | null;
}
