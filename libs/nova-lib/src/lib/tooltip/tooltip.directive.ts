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
import { ContentChild, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { TooltipArrowDirective } from '../arrow/arrow.directive';

@Directive({
  standalone: true,
  selector: '[v-tooltip], '
})
export class TooltipDirective {
  @ContentChild(TooltipArrowDirective) arrow: TooltipArrowDirective;
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-tooltip.v-surface
   */
  @Input() class: string = 'v-tooltip v-surface'; // override the standard class attr with a new one.
  @HostBinding('class')
  get hostClasses(): string {
    return this.class;
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

  /**
   * Sets custom display when tooltip is visible. Initial display is set to none to hide tooltip.
   * @builtin true
   */
  @Input()
  get display(): string {
    return this._display;
  }
  set display(value: string) {
    this._display = value;
  }
  _display: string;
  @HostBinding('style.display')
  get hostInitialDisplay(): string {
    return 'none';
  }

  @HostBinding('style.z-index')
  get hostZIndex(): string {
    return '700';
  }

  @HostBinding('attr.role')
  get hostRole(): string {
    return 'tooltip';
  }

  constructor(public el: ElementRef) {} // ElementRef needed for floating-ui-container
}
