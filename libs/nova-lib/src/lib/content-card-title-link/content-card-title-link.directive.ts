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
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[v-content-card-title-link]'
})
export class ContentCardTitleLinkDirective {
  constructor(readonly el: ElementRef) {} // used in content card directive

  /**
   * Disables link and sets content card to disabled when true.
   * @default false
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  _disabled: boolean;

  @HostBinding('attr.aria-disabled')
  get hostDisabled() {
    return this.disabled ? true : false;
  }

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-content-card-title-link
   */
  @Input() class: string;
  @HostBinding('class')
  get hostClass(): string {
    this.class = ['v-content-card-title-link'].join(' ');
    return this.class;
  }
}
