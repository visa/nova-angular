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
import { NumberInput } from '@angular/cdk/coercion';
import { Directive, HostBinding, Input } from '@angular/core';
import { SpacingProperties } from '../nova-lib.constants';

@Directive({
  standalone: true,
  selector:
    '[vPT], ' + // padding block start
    '[vPR], ' + // padding inline end
    '[vPB], ' + // padding block end
    '[vPL], ' + // padding inline start
    '[vPX], ' + // padding inline
    '[vPY], ' + // padding block
    '[vP], ' // all paddings
})
export class PaddingDirective {
  @HostBinding('class')
  get hostClasses(): string {
    return [
      this.vPT || this.vPT === 0
        ? this.convertToString(this.vPT).startsWith('-')
          ? `-v-pt${this.vPT}`
          : `v-pt-${this.vPT}`
        : null,
      this.vPR || this.vPR === 0
        ? this.convertToString(this.vPR).startsWith('-')
          ? `-v-pr${this.vPR}`
          : `v-pr-${this.vPR}`
        : null,
      this.vPB || this.vPB === 0
        ? this.convertToString(this.vPB).startsWith('-')
          ? `-v-pb${this.vPB}`
          : `v-pb-${this.vPB}`
        : null,
      this.vPL || this.vPL === 0
        ? this.convertToString(this.vPL).startsWith('-')
          ? `-v-pl${this.vPL}`
          : `v-pl-${this.vPL}`
        : null,
      this.vPX || this.vPX === 0
        ? this.convertToString(this.vPX).startsWith('-')
          ? `-v-px${this.vPX}`
          : `v-px-${this.vPX}`
        : null,
      this.vPY || this.vPY === 0
        ? this.convertToString(this.vPY).startsWith('-')
          ? `-v-py${this.vPY}`
          : `v-py-${this.vPY}`
        : null,
      this.vP || this.vP === 0
        ? this.convertToString(this.vP).startsWith('-')
          ? `-v-p${this.vP}`
          : `v-p-${this.vP}`
        : null
    ].join(' ');
  }

  private convertToString(value: number | SpacingProperties | NumberInput): string {
    return value ? value.toString() : '';
  }

  /**
   * Sets padding-block-start property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vPT(): number | SpacingProperties | NumberInput {
    return this._vPT;
  }
  set vPT(value) {
    this._vPT = value;
  }
  _vPT: number | SpacingProperties | NumberInput;

  /**
   * Sets padding-inline-end property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vPR(): number | SpacingProperties | NumberInput {
    return this._vPR;
  }
  set vPR(value) {
    this._vPR = value;
  }
  _vPR: number | SpacingProperties | NumberInput;

  /**
   * Sets padding-block-end property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vPB(): number | SpacingProperties | NumberInput {
    return this._vPB;
  }
  set vPB(value) {
    this._vPB = value;
  }
  _vPB: number | SpacingProperties | NumberInput;

  /**
   * Sets padding-inline-start property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vPL(): number | SpacingProperties | NumberInput {
    return this._vPL;
  }
  set vPL(value) {
    this._vPL = value;
  }
  _vPL: number | SpacingProperties | NumberInput;

  /**
   * Sets padding-inline property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vPX(): number | SpacingProperties | NumberInput {
    return this._vPX;
  }
  set vPX(value) {
    this._vPX = value;
  }
  _vPX: number | SpacingProperties | NumberInput;

  /**
   * Sets padding-block property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vPY(): number | SpacingProperties | NumberInput {
    return this._vPY;
  }
  set vPY(value) {
    this._vPY = value;
  }
  _vPY: number | SpacingProperties | NumberInput;

  /**
   * Sets padding property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vP(): number | SpacingProperties | NumberInput {
    return this._vP;
  }
  set vP(value) {
    this._vP = value;
  }
  _vP: number | SpacingProperties | NumberInput;
}
