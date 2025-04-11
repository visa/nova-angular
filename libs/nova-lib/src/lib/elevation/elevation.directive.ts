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

export const ElevationType = {
  NONE: 'none',
  INSET: 'inset',
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XXL: 'xxl'
} as const;

export type ElevationType = (typeof ElevationType)[keyof typeof ElevationType];

@Directive({
  standalone: true,
  selector: '[vElevation], '
})
export class ElevationDirective {
  @HostBinding('class')
  get hostClasses(): string {
    return [
      this.vElevation === ElevationType.NONE || this.vElevation === ElevationType.INSET
        ? `v-elevation-${this.vElevation}`
        : '',
      this.vElevation === ElevationType.XS ? 'v-elevation-xsmall' : '',
      this.vElevation === ElevationType.SM ? 'v-elevation-small' : '',
      this.vElevation === ElevationType.MD ? 'v-elevation-medium' : '',
      this.vElevation === ElevationType.LG ? 'v-elevation-large' : '',
      this.vElevation === ElevationType.XL ? 'v-elevation-xlarge' : '',
      this.vElevation === ElevationType.XXL ? 'v-elevation-xxlarge' : ''
    ].join(' ');
  }

  /**
   * Applies elevation given.
   */
  @Input()
  get vElevation(): ElevationType {
    return this._vElevation;
  }
  set vElevation(value) {
    this._vElevation = value;
  }
  _vElevation: ElevationType;
}
