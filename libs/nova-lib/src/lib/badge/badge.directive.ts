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
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, HostBinding, Input } from '@angular/core';
import { UUIDService } from '../_utilities/services/uuid.service';

export const BadgeType = {
  DEFAULT: 'default',
  NEUTRAL: 'neutral',
  CRITICAL: 'critical',
  NEGATIVE: 'negative',
  STABLE: 'stable',
  WARNING: 'warning',
  SUBTLE: 'subtle',
  NUMBER: 'number',
  ACTIVE: 'active'
} as const;

export type BadgeType = (typeof BadgeType)[keyof typeof BadgeType];
@Directive({
  standalone: true,
  selector: '[v-badge]'
})
export class BadgeDirective {
  /**
   * Sets badge type.
   * @default 'default' | BadgeType.DEFAULT
   * @options 'default' | BadgeType.DEFAULT | <br> 'neutral' | BadgeType.NEUTRAL | <br> 'critical' | BadgeType.CRITICAL | <br> 'stable' | BadgeType.STABLE | <br> 'warning' | BadgeType.WARNING | <br> 'subtle' | BadgeType.SUBTLE | <br> 'number' | BadgeType.NUMBER
   */
  @Input()
  get badgeType(): BadgeType {
    return this._badgeType;
  }
  set badgeType(value: BadgeType) {
    this._badgeType = value;
  }
  _badgeType: BadgeType = BadgeType.DEFAULT;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-badge
   */
  @Input()
  get class(): string {
    return [
      this._class,
      this.badgeType && this.badgeType != 'default'
        ? this.badgeType === BadgeType.NEGATIVE
          ? 'v-badge-critical'
          : `v-badge-${this.badgeType}`
        : '',
      this.number ? 'v-badge-number' : '',
      this.noBackground ? 'v-badge-clear' : '',
      this.icon ? 'v-badge-icon' : ''
    ].join(' ');
  }
  set class(value: string) {
    this._class = value;
  }
  _class: string = 'v-badge';
  @HostBinding('class')
  get hostClass(): string {
    return this.class;
  }

  /**
   * Sets custom id.
   * @default uuidService.getUUID('v-badge-')
   * @builtin true
   */
  @Input()
  id: string = this.uuidService.getUUID('v-badge-');
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  constructor(private uuidService: UUIDService) {}

  /**
   * Sets badge to number variant when true. <br />
   * Using this flag rather than <code>badgeType="number"</code> allows for number badges with other badge types.
   * @default false
   */
  @Input()
  get number(): boolean {
    return this._number;
  }
  set number(value: BooleanInput) {
    this._number = coerceBooleanProperty(value);
  }
  _number: boolean = false;

  /**
   * Whether or not badge contains an icon.
   * @default false
   */
  @Input()
  get icon(): boolean {
    return this._icon;
  }
  set icon(value: BooleanInput) {
    this._icon = coerceBooleanProperty(value);
  }
  _icon: boolean = false;

  /**
   * Removes background color from badge when true.
   */
  @Input()
  get noBackground(): boolean {
    return this._noBackground;
  }
  set noBackground(value: BooleanInput) {
    this._noBackground = coerceBooleanProperty(value);
  }
  _noBackground: boolean = false;
}
