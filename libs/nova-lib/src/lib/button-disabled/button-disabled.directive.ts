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
import { Directive, HostBinding } from '@angular/core';
import { ButtonDirective } from '../button/button.directive';

/**
 * This directive sets the <code>disabled</code> attribute on \<button\> tags when they are disabled. <br>
 * Note: The <code>disabled</code> attribute is not valid for \<a\> tags. <br>
 * For disabling \<a\> tags, visit <code>ButtonAsDisabledATagDirective</code>.
 */
@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-button]:not(a), [v-button-icon]:not(a), [v-button-stacked]:not(a), [v-panel-toggle]:not(a)'
})
export class ButtonDisabledDirective {
  constructor(private buttonHost: ButtonDirective) {}
  @HostBinding('attr.aria-disabled')
  get hostAriaDisabled(): string | void {
    if (this.buttonHost?.disabled || this.buttonHost?.ariaDisabled) return 'true';
  }
  @HostBinding('disabled')
  @HostBinding('attr.disabled')
  get hostDisabled(): string | void {
    if (this.buttonHost?.disabled) return 'disabled';
  }
}
