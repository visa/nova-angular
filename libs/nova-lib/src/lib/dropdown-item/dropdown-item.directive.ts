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
import { BaseInteractiveDirective } from '../_utilities/angular-specific-directives/base-interactive.directive';

@Directive({
  standalone: true,
  selector: '[v-dropdown-item]'
})
export class DropdownItemDirective extends BaseInteractiveDirective {
  buttonItem: boolean = false;

  cssClasses = '';
  constructor(override el: ElementRef) {
    super(el);
    this.cssClasses = 'v-listbox-item v-dropdown-item';
    if (this.el.nativeElement.tagName.toLowerCase() === 'button') {
      this.buttonItem = true;
      this.cssClasses = 'v-listbox-item v-dropdown-item v-button v-button-tertiary v-justify-content-start';
    }
  }

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-listbox-item.v-dropdown-item
   * @default .v-listbox-item.v-dropdown-item.v-button.v-button-tertiary.v-justify-content-start when the host element is a button.
   */
  @Input() class = ''; // override the standard class attr with a new one.
  @HostBinding('class')
  get hostClasses(): string | '' | null {
    return [this.class, this.cssClasses].join(' ');
  }
}
