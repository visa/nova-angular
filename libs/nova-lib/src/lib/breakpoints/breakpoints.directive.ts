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
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { Directive, HostBinding, Input } from '@angular/core';

export const BreakpointType = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XXL: 'xxl',
  MOBILE: 'mobile',
  DESKTOP: 'desktop'
} as const;

export type BreakpointType = (typeof BreakpointType)[keyof typeof BreakpointType];

@Directive({
  standalone: true,
  selector: '[vContainerHide], [vMediaHide], [vHide], '
})
export class BreakpointsDirective {
  @HostBinding('class')
  get hostClasses(): string {
    const containerClasses = this.getClasses('container');
    const mediaClasses = this.getClasses('media');
    return [
      this.vHide ? 'v-hide' : null,
      this.vContainerHide && !(this.vContainerHide instanceof Array) ? `v-${this.vContainerHide}-container-hide` : null,
      this.vMediaHide && !(this.vMediaHide instanceof Array) ? `v-${this.vMediaHide}-media-hide` : null,
      containerClasses && containerClasses.length > 0 ? containerClasses : null,
      mediaClasses && mediaClasses.length > 0 ? mediaClasses : null
    ].join(' ');
  }

  /**
   * Hides element when true.
   */
  @Input()
  get vHide(): boolean {
    return this._vHide;
  }
  set vHide(value: BooleanInput) {
    this._vHide = coerceBooleanProperty(value);
  }
  _vHide: boolean;

  /**
   * Hides element when within given _container_ breakpoint.
   */
  @Input()
  get vContainerHide(): BreakpointType | BreakpointType[] | null {
    return this._vContainerHide;
  }
  set vContainerHide(value) {
    this._vContainerHide = value;
  }
  _vContainerHide: BreakpointType | BreakpointType[] | null;

  /**
   * Hides element when within given _media_ breakpoint.
   */
  @Input()
  get vMediaHide(): BreakpointType | BreakpointType[] | null {
    return this._vMediaHide;
  }
  set vMediaHide(value) {
    this._vMediaHide = value;
  }
  _vMediaHide: BreakpointType | BreakpointType[] | null;

  getClasses(type: 'container' | 'media'): string | void {
    let classes: string[] = [];
    if (type === 'container' && this.vContainerHide instanceof Array) {
      this.vContainerHide.forEach((bp) => classes.push(`v-${bp}-container-hide`));
    } else if (type === 'media' && this.vMediaHide instanceof Array) {
      this.vMediaHide.forEach((bp) => classes.push(`v-${bp}-media-hide`));
    }
    if (classes.length > 0) return classes.join(' ');
  }
}
