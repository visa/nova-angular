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
import { AfterContentInit, Directive, HostBinding, Input } from '@angular/core';
import { TableDirective } from '../table/table.directive';

@Directive({
  standalone: true,
  selector: '[v-th]'
})
export class ThDirective implements AfterContentInit {
  private _cellHeaderClass: string = 'v-th';
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   */
  @Input() class: string = '';
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class, this._groupHeader ? 'v-th-alt v-typography-overline' : this._cellHeaderClass].join(' ');
  }

  /**
   * Alternate header for when there are two levels of headers (group headers).
   */
  @Input()
  get groupHeader(): boolean {
    return this._groupHeader;
  }
  set groupHeader(value: BooleanInput) {
    this._groupHeader = coerceBooleanProperty(value);
  }
  _groupHeader: boolean;

  constructor(private tableDirective: TableDirective) {}

  ngAfterContentInit() {
    this.tableDirective._keyValue ? (this._cellHeaderClass = 'v-td') : (this._cellHeaderClass = 'v-th');
  }
}
