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
import { ContentChild, Directive, HostBinding, Input } from '@angular/core';
import { AnchorLinkMenuHeaderDirective } from '../anchor-link-menu-header/anchor-link-menu-header.directive';

@Directive({
  standalone: true,
  selector: '[v-anchor-link-menu]'
})
export class AnchorLinkMenuDirective {
  @ContentChild(AnchorLinkMenuHeaderDirective) almHeader: AnchorLinkMenuHeaderDirective;

  constructor() {}
  /**
   * Aria attribute to provide a label for the anchor link menu.
   * @default null
   */
  @Input('aria-label') label: string | null;
  @HostBinding('attr.aria-label')
  get hostLabel(): string | null {
    return this.label ? this.label : null;
  }

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-anchor-link-menu
   */
  @Input() class: string;
  @HostBinding('class')
  get hostClass(): string {
    return [this.class, 'v-anchor-link-menu'].join(' ');
  }
}
