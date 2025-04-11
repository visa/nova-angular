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

/**
 * This directive sets the role of an element to "img" when the element is not an \<img\> tag.
 */
@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-avatar]:not(img)'
})
export class AvatarRoleImgDirective {
  /**
   * Provides custom role.
   * @default 'img' when **not** on an <code>&lt;img&gt;</code> element.
   * @builtin true
   */
  @Input()
  get role(): string {
    return this._role;
  }
  set role(value: string) {
    this._role = value;
  }
  _role: string = 'img';
  @HostBinding('role')
  get hostRole(): string {
    return this.role;
  }
}
