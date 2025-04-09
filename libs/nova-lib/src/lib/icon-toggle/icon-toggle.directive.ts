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
import { IconComponent } from '../icon/icon.component';
import { IconToggle } from '../icon/icon.constants';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-icon-toggle]'
})
export class IconToggleDirective implements OnInit {
  _expanded: boolean = false;
  _iconSet: boolean = false;
  _expandedSet: boolean = false;
  _collapsedSet: boolean = false;
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-accordion-toggle-icon
   */
  @Input()
  get class(): string {
    return [this._class].join(' ');
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
   * Icon to show when item is expanded / shown. <br>
   * Will render this icon when no <code>icon</code> or <code>customIcon</code> is provided to <code>v-icon</code>. <br>
   * Should refer to an icon in VPDS' [Icon Library](https://design.visa.com/icons).
   * @default 'chevron-down' / IconToggle.EXPANDED <br>
   * @builtin true
   */
  @Input()
  get expandedIcon(): string {
    return this._expandedIcon;
  }
  set expandedIcon(value: string) {
    this._expandedIcon = value;
    this._expandedSet = true;
  }
  _expandedIcon: string = IconToggle.EXPANDED;

  /**
   * Icon to show when item is collapsed / hidden. <br>
   * Will render this icon when no <code>icon</code> or <code>customIcon</code> is provided to <code>v-icon</code>. <br>
   * Should refer to an icon in VPDS' [Icon Library](https://design.visa.com/icons).
   * @default 'chevron-right' / IconToggle.COLLAPSED <br>
   * @builtin true
   */
  @Input()
  get collapsedIcon(): string {
    return this._collapsedIcon;
  }
  set collapsedIcon(value: string) {
    this._collapsedIcon = value;
    this._collapsedSet = true;
  }
  _collapsedIcon: string = IconToggle.COLLAPSED;

  constructor(public icon: IconComponent) {} // used in floating-ui or accordion service

  ngOnInit(): void {
    if (this.icon && (this.icon.icon || this.icon.customIcon)) {
      this._iconSet = true;
    }
  }
}
