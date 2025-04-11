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
import { ContentChild, Directive, HostBinding, HostListener, Input } from '@angular/core';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { RadioDirective } from '../radio/radio.directive';
import { ToggleControlService } from '../toggle-control/toggle-control.service';

@Directive({
  standalone: true,
  selector: '[v-checkbox-panel], [v-radio-panel]'
})
export class CheckboxPanelDirective {
  @ContentChild(CheckboxDirective) checkbox: CheckboxDirective;
  @ContentChild(RadioDirective) radio: RadioDirective;
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-action.v-action-secondary.v-checkbox-panel
   */
  @Input() class: string = '';
  @HostBinding('class')
  get hostClasses(): string {
    this.class = ['v-action', 'v-action-secondary', 'v-checkbox-panel'].join(' ');

    return this.class;
  }

  constructor(private toggleControlService: ToggleControlService) {}

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    this.toggleControlService.toggleControl(this.checkbox || this.radio, event);
  }
}
