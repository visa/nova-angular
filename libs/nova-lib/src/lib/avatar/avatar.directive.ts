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
  selector: '[v-avatar]'
})
export class AvatarDirective {
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-avatar
   */
  @Input()
  get class(): string {
    return [this._class, 'v-avatar', this.small ? 'v-avatar-small' : ''].join(' ');
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
   * Sets avatar to small variant when true.
   * @default false
   */
  @Input()
  get small(): boolean {
    return this._small;
  }
  set small(value: BooleanInput) {
    this._small = coerceBooleanProperty(value);
  }
  _small: boolean = false;
}
