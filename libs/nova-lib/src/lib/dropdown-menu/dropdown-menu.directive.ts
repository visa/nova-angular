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
import { Directive, Input, HostBinding, ElementRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[v-menu], [v-dropdown-menu]'
})
export class DropdownMenuDirective {
  // the following is determined by floating-ui-container and used to set aria attributes
  _isShown = false;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-surface.v-dropdown-menu
   */
  @Input() class: string = 'v-surface v-dropdown-menu'; // override the standard class attr with a new one.
  @HostBinding('class')
  get hostClasses(): string {
    return this.class;
  }

  @HostBinding('attr.aria-hidden')
  get hostAriaHidden(): boolean | null | void {
    return !this._isShown;
  }

  @HostBinding('style.inline-size')
  get hostInlineSize(): string {
    return '180px';
  }

  @HostBinding('style.max-inline-size')
  get hostMaxInlineSize(): string {
    return '100%';
  }

  // this is an angular-specific override. Spacing between dropdown-menu and button/trigger
  // is handled within floating-ui.service
  @HostBinding('style.--v-dropdown-menu-surface-margin-block-start')
  get hostMarginBlockStart(): string {
    return '0';
  }

  /**
   * Provides custom z-index to control stacking order.
   * @default 200;
   */
  @Input() zIndex: number = 200;
  @HostBinding('style.z-index')
  get hostZIndex(): string {
    return this.zIndex.toString();
  }

  /**
   * Sets custom ID.
   */
  @Input()
  id: string;
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  constructor(public el: ElementRef) {} // ElementRef needed for floating-ui-container
}
