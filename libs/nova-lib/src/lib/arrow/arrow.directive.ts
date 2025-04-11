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
import { Directive, Input, HostBinding, ElementRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[v-tooltip-arrow], '
})
export class TooltipArrowDirective {
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @class .v-tooltip-arrow
   */
  @Input() class: string = 'v-tooltip-arrow'; // override the standard class attr with a new one.
  @HostBinding('class')
  get hostClasses(): string {
    return this.class;
  }

  /**
   * Sets the background color to the same variable as the tooltip itself.
   */
  @HostBinding('style.background-color')
  get hostBackground(): string {
    return 'var(--v-surface-background)';
  }

  @HostBinding('style.position')
  get hostPosition(): string {
    return 'absolute';
  }

  /**
   * This ensures the arrow is behind the tooltip content.
   */
  @HostBinding('style.z-index')
  get hostZIndex(): string {
    return '-1';
  }

  /**
   * Sets custom size *in pixels* for the arrow.
   * @default 8
   */
  @Input() customSize: number = 8;
  @HostBinding('style.inline-size')
  get hostWidth(): string {
    return this.customSize + 'px';
  }

  @HostBinding('style.block-size')
  get hostHeight(): string {
    return this.customSize + 'px';
  }

  @HostBinding('style.transform')
  get hostTransform(): string {
    return 'rotate(45deg)';
  }

  constructor(public el: ElementRef) {} // ElementRef needed for floating-ui-container
}
