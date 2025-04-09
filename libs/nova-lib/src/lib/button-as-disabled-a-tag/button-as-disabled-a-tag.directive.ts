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
 * This directive sets the role and aria-disabled attributes on \<a\> tags when disabled. Disabled \<a\> tags do not natively accept the disabled attribute, so this directive adds <code>role="link"</code> and <code>aria-disabled="true"</code>. Additionally, disabled \<a\> tags must not have an href attribute. For disabling \<button\> tags, <code>visit ButtonDisabledDirective</code>.
 */
@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: 'a[v-button], a[v-button-icon], a[v-button-stacked], a[v-panel-toggle]'
})
export class ButtonAsDisabledATagDirective {
  constructor(private buttonHost: ButtonDirective) {}
  @HostBinding('attr.role')
  get hostDisabledRole(): string | void {
    if (this.buttonHost?.disabled) return 'link';
  }

  @HostBinding('attr.aria-disabled')
  get hostAriaDisabledRole(): string | void {
    if (this.buttonHost?.disabled) return 'true';
  }
}
