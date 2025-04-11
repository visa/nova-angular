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
import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, HostBinding, Input } from '@angular/core';
import { IconToggleDefaultTemplateDirective } from '../icon-toggle-default/icon-toggle-default.directive';
import { IconToggleRotatedTemplateDirective } from '../icon-toggle-rotated/icon-toggle-rotated.directive';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'v-icon-visa-toggle',
  templateUrl: './icon-toggle.component.html'
})
export class IconToggleComponent {
  @ContentChild(IconToggleDefaultTemplateDirective) defaultTemplate: IconToggleDefaultTemplateDirective;
  @ContentChild(IconToggleRotatedTemplateDirective) rotatedTemplate: IconToggleRotatedTemplateDirective;
  _floatingUIToggle: boolean = false;
  _selectToggle: boolean = false;
  _accordionToggle: boolean = false;

  constructor(public el: ElementRef) {} // used for tabs

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-accordion-toggle-icon
   */
  @Input()
  get class(): string {
    return [this._class, 'v-icon', 'v-icon-tiny', this._accordionToggle ? 'v-accordion-toggle-icon' : ''].join(' ');
  }
  set class(value: string) {
    this._class = value;
  }
  _class: string = '';
  @HostBinding('class')
  get hostClass(): string {
    return this.class;
  }

  /**
   * Shows the rotated template when true and the default template when false.
   * @default false
   **/
  @Input()
  get rotated(): boolean {
    return this._rotated;
  }
  set rotated(value: boolean) {
    this._rotated = value;
  }
  _rotated: boolean = false;

  /** @ignore */
  @HostBinding('style.align-items')
  @HostBinding('style.justify-content')
  @Input()
  alignment: string = 'center';

  // don't allow this component to be styled with colors
  // "pass" the colors to the child svg
  /** @ignore */
  @HostBinding('style.--v-icon-primary')
  @HostBinding('style.--v-icon-secondary')
  @Input()
  color: string = 'inherit';

  /** @ignore */
  @HostBinding('style.pointer-events')
  @Input()
  pointerEvents: string = 'none';
}
