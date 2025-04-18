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
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[v-floating-ui-element]'
})
export class FloatingUIElementDirective {
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   */
  @Input() class: string;
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class].join(' ');
  }

  @HostBinding('style.inline-size')
  get hostInlineSize(): string {
    return '100%';
  }

  @HostBinding('style.z-index')
  get hostZIndex(): string {
    return '200';
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

  constructor(public el: ElementRef) {}
}
