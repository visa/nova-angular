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
import { Directive, HostBinding, Input } from '@angular/core';
import { TableSize } from './table.constants';

@Directive({
  standalone: true,
  selector: '[v-table]'
})
export class TableDirective {
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-table
   */
  @Input() class: string;
  @HostBinding('class')
  get hostClasses(): string {
    return [
      this.class,
      'v-table',
      this.keyValue ? 'v-table-key-value' : '',
      this.alternate ? 'v-table-alt' : '',
      this.subtle ? 'v-table-subtle' : '',
      this.dividerLines ? 'v-table-border' : '',
      this.horizontalDividerLines ? 'v-table-border-block' : ''
    ].join(' ');
  }

  /**
   * Sets table as subtle variant when true.
   * @default false
   */
  @Input()
  get subtle(): boolean {
    return this._subtle;
  }
  set subtle(value: BooleanInput) {
    this._subtle = coerceBooleanProperty(value);
  }
  _subtle: boolean = false;

  /**
   * Adds vertical and horizontal divider lines when true.
   * @default false
   */
  @Input()
  get dividerLines(): boolean {
    return this._dividerLines;
  }
  set dividerLines(value: BooleanInput) {
    this._dividerLines = coerceBooleanProperty(value);
  }
  _dividerLines: boolean = false;

  /**
   * Adds horizontal divider lines when true.
   * @default false
   */
  @Input()
  get horizontalDividerLines(): boolean {
    return this._horizontalDividerLines;
  }
  set horizontalDividerLines(value: BooleanInput) {
    this._horizontalDividerLines = coerceBooleanProperty(value);
  }
  _horizontalDividerLines: boolean = false;

  /**
   * Sets table as key-value variant when true.
   * @default false
   */
  @Input()
  get keyValue(): boolean {
    return this._keyValue;
  }
  set keyValue(value: BooleanInput) {
    this._keyValue = coerceBooleanProperty(value);
  }
  _keyValue: boolean = false;

  /**
   * Sets table as alternate variant when true (alternate rows have different background color).
   * @default false
   */
  @Input()
  get alternate(): boolean {
    return this._alternate;
  }
  set alternate(value: BooleanInput) {
    this._alternate = coerceBooleanProperty(value);
  }
  _alternate: boolean = false;

  @HostBinding('style.--v-table-data-block-default')
  get hostTableBlockDefault(): string | void {
    switch (this._tableSize) {
      case 'compact':
        return 'var(--v-table-data-block-small)';
      case 'medium':
        return '';
      case 'large':
        return 'var(--v-table-data-block-large)';
      default:
        return '';
    }
  }

  @HostBinding('style.--v-table-data-padding-block-default')
  get hostTablePaddingBlock(): string | void {
    switch (this._tableSize) {
      case 'compact':
        return 'var(--v-table-data-padding-block-small)';
      case 'medium':
        return '';
      case 'large':
        return 'var(--v-table-data-padding-block-large)';
      default:
        return '';
    }
  }

  /**
   * Sets table size.
   * @default 'medium' / TableSize.MEDIUM
   * @options 'compact' | TableSize.COMPACT | <br> 'medium' | TableSize.MEDIUM | <br> 'large' | TableSize.LARGE
   */
  @Input()
  get tableSize(): TableSize {
    return this._tableSize;
  }
  set tableSize(value: TableSize) {
    this._tableSize = value;
  }
  _tableSize: TableSize = TableSize.MEDIUM;

  constructor() {}
}
