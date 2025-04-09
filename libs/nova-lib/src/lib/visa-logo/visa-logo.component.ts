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
import { NumberInput } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: '[v-logo-visa]',
  templateUrl: './visa-logo.component.html'
})
export class VisaLogoComponent {
  /**
   * Sets height of logo image.
   * @default 23
   */
  @Input()
  height: NumberInput = 23;
  @HostBinding('attr.height')
  get hostHeight() {
    return this.height;
  }

  /**
   * Sets width of logo image.
   * @default 71
   */
  @Input() width: NumberInput = 71;
  @HostBinding('attr.width')
  get hostWidth() {
    return this.width;
  }

  // viewBox set to original dimensions of logo svg
  @HostBinding('attr.viewBox')
  get hostViewbox() {
    return '0 0 156 51';
  }

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-logo
   */
  @Input() class: string; // override the standard class attr with a new one.
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class, 'v-logo'].join(' ');
  }
}
