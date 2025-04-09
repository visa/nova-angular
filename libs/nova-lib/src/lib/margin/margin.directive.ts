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
    '[vMT], ' + // margin block start
    '[vMR], ' + // margin inline end
    '[vMB], ' + // margin block end
    '[vML], ' + // margin inline start
    '[vMX], ' + // margin inline
    '[vMY], ' + // margin block
    '[vM], ' // all margins
})
export class MarginDirective {
  @HostBinding('class')
  get hostClasses(): string {
    return [
      this.vMT || this.vMT === 0
        ? this.convertToString(this.vMT).startsWith('-')
          ? `-v-mt${this.vMT}`
          : `v-mt-${this.vMT}`
        : null,
      this.vMR || this.vMR === 0
        ? this.convertToString(this.vMR).startsWith('-')
          ? `-v-mr${this.vMR}`
          : `v-mr-${this.vMR}`
        : null,
      this.vMB || this.vMB === 0
        ? this.convertToString(this.vMB).startsWith('-')
          ? `-v-mb${this.vMB}`
          : `v-mb-${this.vMB}`
        : null,
      this.vML || this.vML === 0
        ? this.convertToString(this.vML).startsWith('-')
          ? `-v-ml${this.vML}`
          : `v-ml-${this.vML}`
        : null,
      this.vMX || this.vMX === 0
        ? this.convertToString(this.vMX).startsWith('-')
          ? `-v-mx${this.vMX}`
          : `v-mx-${this.vMX}`
        : null,
      this.vMY || this.vMY === 0
        ? this.convertToString(this.vMY).startsWith('-')
          ? `-v-my${this.vMY}`
          : `v-my-${this.vMY}`
        : null,
      this.vM || this.vM === 0
        ? this.convertToString(this.vM).startsWith('-')
          ? `-v-m${this.vM}`
          : `v-m-${this.vM}`
        : null
    ].join(' ');
  }

  private convertToString(value: number | SpacingProperties | NumberInput): string {
    return value ? value.toString() : '';
  }

  /**
   * Sets margin-block-start property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vMT(): number | SpacingProperties | NumberInput {
    return this._vMT;
  }
  set vMT(value) {
    this._vMT = value;
  }
  _vMT: number | SpacingProperties | NumberInput;

  /**
   * Sets margin-inline-end property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vMR(): number | SpacingProperties | NumberInput {
    return this._vMR;
  }
  set vMR(value) {
    this._vMR = value;
  }
  _vMR: number | SpacingProperties | NumberInput;

  /**
   * Sets margin-block-end property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vMB(): number | SpacingProperties | NumberInput {
    return this._vMB;
  }
  set vMB(value) {
    this._vMB = value;
  }
  _vMB: number | SpacingProperties | NumberInput;

  /**
   * Sets margin-inline-start property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vML(): number | SpacingProperties | NumberInput {
    return this._vML;
  }
  set vML(value) {
    this._vML = value;
  }
  _vML: number | SpacingProperties | NumberInput;

  /**
   * Sets margin-inline property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vMX(): number | SpacingProperties | NumberInput {
    return this._vMX;
  }
  set vMX(value) {
    this._vMX = value;
  }
  _vMX: number | SpacingProperties | NumberInput;

  /**
   * Sets margin-block property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vMY(): number | SpacingProperties | NumberInput {
    return this._vMY;
  }
  set vMY(value) {
    this._vMY = value;
  }
  _vMY: number | SpacingProperties | NumberInput;

  /**
   * Sets margin property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  @Input()
  get vM(): number | SpacingProperties | NumberInput {
    return this._vM;
  }
  set vM(value) {
    this._vM = value;
  }
  _vM: number | SpacingProperties | NumberInput;
}
