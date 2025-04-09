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
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[v-link]'
})
export class LinkDirective {
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-link
   */
  @Input() class: string = '';
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class, 'v-link', this.noUnderline ? 'v-link-no-underline' : ''].join(' ');
  }

  /**
   * Disables link when true. <br />
   * Adds <code>role="link"</code> and <code>aria-disabled="true"</code> when true for a11y.
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

  /**
   * Removes underline on link when true.
   * @default false
   */
  @Input()
  get noUnderline(): boolean {
    return this._noUnderline;
  }
  set noUnderline(value: BooleanInput) {
    this._noUnderline = coerceBooleanProperty(value);
  }
  _noUnderline: boolean;

  @HostBinding('attr.aria-disabled')
  get attrDisabled(): string | null {
    return this.disabled ? 'true' : null;
  }

  @HostBinding('attr.role')
  get attrRole(): string | null {
    return this.disabled ? 'link' : null;
  }
  constructor(public el: ElementRef) {}
}
