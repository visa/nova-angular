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
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { IconLibrary, IconSize } from './icon.constants';

/**
 * <code>IconComponent</code> is intended <i>only</i> for use with icons used with an icon sprite. <br />
 * <strong>Standalone icons from @visa/nova-icons-angular is recommended over using the <code>IconComponent</code>.</strong>. <br />
 * Icon component for displaying icons from VPDS' [Icon Library](https://design.visa.com/icons). <br />
 */
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: '[v-icon]',
  templateUrl: './icon.component.html'
})
export class IconComponent implements OnInit {
  _computedSize: number = 24;
  _iconRef: string;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-icon.v-icon-&lt;iconSize&gt;.v-icon-&lt;library&gt;
   */
  @Input()
  get class(): string {
    return [
      this._class,
      'v-icon',
      'v-icon-' + this.iconSize,
      'v-icon-' + this.library,
      this.isBadgeEllipse ? 'v-badge-ellipse' : '',
      this.rtl ? 'v-icon-rtl' : ''
    ].join(' ');
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
   * Flips icon from right to left when true and <code>dir="rtl" is present on a parent element.
   * @default false
   */
  @Input()
  get rtl(): boolean {
    return this._rtl;
  }
  set rtl(value: BooleanInput) {
    this._rtl = coerceBooleanProperty(value);
  }
  _rtl: boolean = false;

  /**
   * Sets icon resolution/size.
   * @default 'tiny' / IconSize.TINY
   * @options 'tiny' | IconSize.TINY | <br> 'low' | IconSize.LOW | <br> 'high' | IconSize.HIGH
   */
  // default of tiny chosen because it is the default for majority of buttons
  @Input()
  get iconSize(): IconSize {
    return this._iconSize;
  }
  set iconSize(value: IconSize) {
    this._iconSize = value;
    this.setIcon();
  }
  _iconSize: IconSize = IconSize.TINY;

  /**
   * Tells icon which library to reference.
   * @default 'visa' / IconLibrary.VISA
   * @options 'visa' | IconLibrary.VISA | <br> 'generic' | IconLibrary.GENERIC
   */
  @Input()
  get library(): IconLibrary {
    return this._library;
  }
  set library(value: IconLibrary) {
    this._library = value;
  }
  _library: IconLibrary = IconLibrary.VISA;

  /**
   * Name of icon to display. <br />
   * Should refer to an icon in VPDS' [Icon Library](https://design.visa.com/icons).
   */
  @Input()
  get icon(): string {
    return this._icon;
  }
  set icon(value: string) {
    this._icon = value;
    this.setIcon();
  }
  _icon: string;

  /**
   * Sets icon to badge-ellipse variant when true. <br />
   * Intended for use in badges with an indicator.
   * @default false
   */
  @Input()
  get isBadgeEllipse(): boolean {
    return this._isBadgeEllipse;
  }
  set isBadgeEllipse(value: BooleanInput) {
    this._isBadgeEllipse = coerceBooleanProperty(value);
  }
  _isBadgeEllipse: boolean = false;

  @HostBinding('style.--v-icon-primary')
  @HostBinding('style.--v-icon-secondary')
  get hostStyleFill(): string | void {
    if (this.isBadgeEllipse) {
      return 'var(--v-badge-ellipse-color)';
    }
  }

  @HostBinding('style.--v-icon-height')
  get hostStyleIconHeight(): string | void {
    if (this.isBadgeEllipse) {
      return `var(--size-scalable-${this.customHeight})`;
    }
  }

  @HostBinding('style.--v-icon-width')
  get hostStyleIconWidth(): string | void {
    if (this.isBadgeEllipse) {
      return `var(--size-scalable-${this.customWidth})`;
    }
  }

  /**
   * Set CSS variable <code>--v-icon-height</code> which customizes icon height.
   * @default '--size-scalable-8'
   */
  @Input()
  get customHeight(): string {
    return this._customHeight;
  }
  set customHeight(value: string) {
    this._customHeight = value;
  }
  _customHeight: string = '8';

  /**
   * Set CSS variable <code>--v-icon-width</code> which customizes icon width.
   * @default '--size-scalable-8'
   */
  @Input()
  get customWidth(): string {
    return this._customWidth;
  }
  set customWidth(value: string) {
    this._customWidth = value;
  }
  _customWidth: string = '8';

  /**
   * Name of <strong>custom</strong> icon reference. <br />
   * Should refer to an icon within an icon sprite in your application. <br />
   * The href will reference the string provided directly. No library or iconSize will be added.
   */
  @Input()
  get customIcon(): string {
    return this._customIcon;
  }
  set customIcon(value: string) {
    this._customIcon = value;
    this.setIcon();
  }
  _customIcon: string;

  @HostBinding('attr.viewBox')
  get hostViewBox() {
    return `0 0 ${this._computedSize} ${this._computedSize}`;
  }

  @HostBinding('attr.height')
  get hostHeight() {
    return `${this._computedSize}`;
  }

  @HostBinding('attr.width')
  get hostWidth() {
    return `${this._computedSize}`;
  }

  @HostBinding('attr.focusable')
  get hostFocusable() {
    return 'false';
  }

  @HostBinding('attr.aria-hidden')
  get hostAriaHidden() {
    return 'true';
  }

  constructor() {}

  ngOnInit(): void {
    this.setIcon();
  }

  setIcon() {
    this._computedSize = this.iconSize === IconSize.LOW ? 24 : this.iconSize === IconSize.HIGH ? 48 : 16;
    this._iconRef = this.customIcon
      ? this.customIcon
      : this.icon
        ? `${this.library}-${this.icon}-${this.iconSize}`
        : '';
  }
}
