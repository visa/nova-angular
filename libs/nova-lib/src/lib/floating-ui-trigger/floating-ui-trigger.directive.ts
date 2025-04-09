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
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[v-floating-ui-trigger]'
})
export class FloatingUITriggerDirective {
  // the following are determined by floating-ui-container and used to set correct aria roles
  _triggersTooltip = false;
  _triggersDropdownMenu = false;
  _isShown = false;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-dropdown
   */
  @Input() class: string;
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class, 'v-dropdown'].join(' ');
  }

  @HostBinding('attr.aria-expanded')
  get hostAriaExpanded(): boolean | null | void {
    if (this._triggersDropdownMenu) {
      return this._isShown;
    }
  }

  _floatingElemID: string;
  @HostBinding('attr.aria-describedby')
  get hostDescribedby(): string | void {
    if (this._triggersTooltip) {
      return this._floatingElemID;
    }
  }

  @HostBinding('attr.aria-controls')
  get hostAriaControls(): string | void {
    if (this._triggersDropdownMenu) {
      return this._floatingElemID;
    }
  }

  constructor(public el: ElementRef) {}
}
