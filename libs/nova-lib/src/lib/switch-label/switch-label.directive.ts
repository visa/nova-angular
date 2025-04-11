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
import { Directive, Input, HostBinding } from '@angular/core';
@Directive({
  standalone: true,
  selector: '[v-switch-label]'
})
export class SwitchLabelDirective {
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-switch-label.v-label
   */
  @Input() class: string;
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class, 'v-switch-label v-label'].join(' ');
  }
}
