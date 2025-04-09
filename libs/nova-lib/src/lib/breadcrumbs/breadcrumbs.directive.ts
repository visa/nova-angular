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
import { ContentChildren, Directive, HostBinding, Input, QueryList } from '@angular/core';
import { LinkDirective } from '../link/link.directive';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-breadcrumbs]'
})
export class BreadcrumbsDirective {
  @ContentChildren(LinkDirective, { descendants: true }) links: QueryList<LinkDirective>;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-breadcrumbs
   */
  @Input()
  get class(): string {
    return [this._class, 'v-breadcrumbs', this.hasInlineSeparator ? 'v-breadcrumbs-custom' : ''].join(' ');
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
   * Replaces the default '<code>/</code>' separator with the string provided.
   * @default false
   */
  @Input()
  get separator(): string {
    return this._separator;
  }
  set separator(value) {
    this._separator = value;
  }
  _separator: string;
  @HostBinding('style.--v-breadcrumbs-pseudo-separator')
  get breadcrumbsSeparator(): string | void {
    if (this.separator) {
      return "'" + this.separator + "'";
    }
  }

  /**
   * Removes separator inserted by CSS and allows you to provide your own separator within the markup.
   * @default false
   */
  @Input()
  get hasInlineSeparator(): boolean {
    return this._hasInlineSeparator;
  }
  set hasInlineSeparator(value: BooleanInput) {
    this._hasInlineSeparator = coerceBooleanProperty(value);
  }
  _hasInlineSeparator: boolean = false;

  constructor() {}
}
