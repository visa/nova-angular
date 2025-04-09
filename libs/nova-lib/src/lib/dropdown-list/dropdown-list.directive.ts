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
  selector: '[v-dropdown-list]'
})
export class DropdownListDirective extends BaseInteractiveDirective {
  buttonItem: boolean = false;

  constructor(override el: ElementRef) {
    super(el);
  }

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   */
  @Input() class = ''; // override the standard class attr with a new one.
  @HostBinding('class')
  get hostClasses(): string | '' | null {
    return [this.class, 'v-listbox'].join(' ');
  }
}
