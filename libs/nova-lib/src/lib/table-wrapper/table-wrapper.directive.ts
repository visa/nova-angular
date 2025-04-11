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
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[v-table-wrapper]'
})
export class TableWrapperDirective {
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-table-wrapper
   */
  @Input() class: string;
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class, 'v-table-wrapper'].join(' ');
  }

  /**
   * Sets CSS variable <code>--v-table-wrapper-inline-size</code> to customize the inline size of the scroll area.
   */
  @Input()
  get scrollInlineSize(): string {
    return this._scrollInlineSize;
  }
  set scrollInlineSize(inlineSize) {
    this._scrollInlineSize = `${inlineSize}px`;
  }
  _scrollInlineSize: string;

  /**
   * Sets CSS variable <code>--v-table-wrapper-block-size</code> to customize the block size of the scroll area.
   */
  @Input()
  get scrollBlockSize(): string {
    return this._scrollBlockSize;
  }
  set scrollBlockSize(blockSize) {
    this._scrollBlockSize = `${blockSize}px`;
  }
  _scrollBlockSize: string;

  @HostBinding('style.--v-table-wrapper-inline-size')
  get hostStylesInlineSize(): string {
    return this._scrollInlineSize ? `${this._scrollInlineSize}` : 'unset';
  }

  @HostBinding('style.--v-table-wrapper-block-size')
  get hostStylesBlockSize(): string {
    return this._scrollBlockSize ? `${this._scrollBlockSize}` : 'unset';
  }

  constructor() {}
}
