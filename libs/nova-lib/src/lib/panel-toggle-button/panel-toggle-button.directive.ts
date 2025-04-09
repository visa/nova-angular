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
import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { ButtonDirective } from '../button/button.directive';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-panel-toggle]'
})
export class PanelToggleDirective implements OnInit {
  _expanded: boolean | null;
  _responsive: boolean;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-panel-toggle
   */
  @Input()
  get class(): string {
    return [this._class, 'v-panel-toggle'].join(' ');
  }
  set class(value: string) {
    this._class = value;
  }
  _class: string = '';
  @HostBinding('class')
  get hostClass(): string {
    return this.class;
  }

  constructor(public button?: ButtonDirective) {}
  ngOnInit() {
    // if the panel is a dialog, don't set the aria-expanded attribute.
    // if a button host exists, set the aria-expanded attribute to the button's aria-expanded attribute
    // if the button does not have an aria-expanded attribute, set it to false
    if (this._responsive) {
      this._expanded = !this.button
        ? null
        : this.button.ariaExpanded
          ? this.button.ariaExpanded
          : (this.button.ariaExpanded = false);
    }
  }
}
