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
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[v-content-card-title]'
})
export class ContentCardTitleDirective {
  constructor() {}
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-content-card-title
   */
  @Input() class: string;
  @HostBinding('class')
  get hostClass(): string {
    this.class = ['v-content-card-title'].join(' ');
    return this.class;
  }
}
