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
import { coerceBooleanProperty, BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { Directive, HostBinding, Input } from '@angular/core';
import { SpacingProperties } from '../nova-lib.constants';

@Directive({
  standalone: true,
  selector: `[vFlex], [vFlexInline], [vGap], [vFlexGrow], [vFlexGrow0], 
  [vFlexShrink], [vFlexShrink0], [vFlexBasis], [vAlignSelfStart], [vAlignSelfEnd], 
  [vAlignSelfCenter], [vAlignSelfStretch], [vAlignSelfAuto], [vAlignSelfBaseline],`
})
export class FlexDirective {
  @HostBinding('class')
  get hostClasses(): string {
    return [
      this.vFlex ? (this.vFlexCol ? 'v-flex' : 'v-flex v-flex-row') : null,
      this.vFlexInline ? 'v-flex-inline' : null,
      this.vFlexCol ? 'v-flex-col' : null,
      this.vFlexColReverse ? 'v-flex-col-reverse' : null,
      this.vFlexRow ? 'v-flex-row' : null,
      this.vFlexRowReverse ? 'v-flex-row-reverse' : null,
      this.vFlexWrap ? 'v-flex-wrap' : null,
      this.vFlexWrapReverse ? 'v-flex-wrap-reverse' : null,
      this.vFlexNoWrap ? 'v-flex-nowrap' : null,
      this.vFlexGrow ? 'v-flex-grow' : null,
      this.vFlexGrow0 ? 'v-flex-grow-0' : null,
      this.vFlexShrink ? 'v-flex-shrink' : null,
      this.vFlexShrink0 ? 'v-flex-shrink-0' : null,
      this.vAlignContentCenter ? 'v-align-content-center' : null,
      this.vAlignContentStart ? 'v-align-content-start' : null,
      this.vAlignContentEnd ? 'v-align-content-end' : null,
      this.vAlignContentBetween ? 'v-align-content-between' : null,
      this.vAlignContentAround ? 'v-align-content-around' : null,
      this.vAlignContentEvenly ? 'v-align-content-evenly' : null,
      this.vAlignItemsStart ? 'v-align-items-start' : null,
      this.vAlignItemsEnd ? 'v-align-items-end' : null,
      this.vAlignItemsCenter ? 'v-align-items-center' : null,
      this.vAlignItemsBaseline ? 'v-align-items-baseline' : null,
      this.vAlignItemsStretch ? 'v-align-items-stretch' : null,
      this.vAlignSelfStart ? 'v-align-self-start' : null,
      this.vAlignSelfEnd ? 'v-align-self-end' : null,
      this.vAlignSelfCenter ? 'v-align-self-center' : null,
      this.vAlignSelfBaseline ? 'v-align-self-baseline' : null,
      this.vAlignSelfStretch ? 'v-align-self-stretch' : null,
      this.vAlignSelfAuto ? 'v-align-self-auto' : null,
      this.vJustifyContentStart ? 'v-justify-content-start' : null,
      this.vJustifyContentEnd ? 'v-justify-content-end' : null,
      this.vJustifyContentCenter ? 'v-justify-content-center' : null,
      this.vJustifyContentBetween ? 'v-justify-content-between' : null,
      this.vJustifyContentAround ? 'v-justify-content-around' : null,
      this.vJustifyContentEvenly ? 'v-justify-content-evenly' : null,
      this.vGap ? `v-flex v-gap-${this.vGap}` : null, // vGap="4"
      this.vColGap ? `v-col-gap-${this.vColGap}` : null, // vGap="4"
      this.vRowGap ? `v-row-gap-${this.vRowGap}` : null // vGap="4"
    ].join(' ');
  }

  /**
   * Sets property <code>display: flex</code>. <br>
   * This property is also a selector and can be used by itself on a flex element.
   */
  @Input()
  get vFlex(): boolean {
    return this._vFlex;
  }
  set vFlex(value: BooleanInput) {
    this._vFlex = coerceBooleanProperty(value);
  }
  _vFlex: boolean;

  /**
   * Sets property <code>display: inline-flex</code>. <br>
   * This property is also a selector and can be used by itself on a flex element.
   */
  @Input()
  get vFlexInline(): boolean {
    return this._vFlexInline;
  }
  set vFlexInline(value: BooleanInput) {
    this._vFlexInline = coerceBooleanProperty(value);
  }
  _vFlexInline: boolean;

  /**
   * Sets property <code>flex-direction: column</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vFlexCol(): boolean {
    return this._vFlexCol;
  }
  set vFlexCol(value: BooleanInput) {
    this._vFlexCol = coerceBooleanProperty(value);
  }
  _vFlexCol: boolean;

  /**
   * Sets property <code>flex-direction: column-reverse</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vFlexColReverse(): boolean {
    return this._vFlexColReverse;
  }
  set vFlexColReverse(value: BooleanInput) {
    this._vFlexColReverse = coerceBooleanProperty(value);
  }
  _vFlexColReverse: boolean;

  /**
   * Sets property <code>flex-direction: row</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vFlexRow(): boolean {
    return this._vFlexRow;
  }
  set vFlexRow(value: BooleanInput) {
    this._vFlexRow = coerceBooleanProperty(value);
  }
  _vFlexRow: boolean;

  /**
   * Sets property <code>flex-direction: row-reverse</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vFlexRowReverse(): boolean {
    return this._vFlexRowReverse;
  }
  set vFlexRowReverse(value: BooleanInput) {
    this._vFlexRowReverse = coerceBooleanProperty(value);
  }
  _vFlexRowReverse: boolean;

  /**
   * Sets property <code>flex-wrap: wrap</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vFlexWrap(): boolean {
    return this._vFlexWrap;
  }
  set vFlexWrap(value: BooleanInput) {
    this._vFlexWrap = coerceBooleanProperty(value);
  }
  _vFlexWrap: boolean;

  /**
   * Sets property <code>flex-wrap: wrap-reverse</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vFlexWrapReverse(): boolean {
    return this._vFlexWrapReverse;
  }
  set vFlexWrapReverse(value: BooleanInput) {
    this._vFlexWrapReverse = coerceBooleanProperty(value);
  }
  _vFlexWrapReverse: boolean;

  /**
   * Sets property <code>flex-wrap: no-wrap</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vFlexNoWrap(): boolean {
    return this._vFlexNoWrap;
  }
  set vFlexNoWrap(value: BooleanInput) {
    this._vFlexNoWrap = coerceBooleanProperty(value);
  }
  _vFlexNoWrap: boolean;

  /**
   * Sets property <code>flex-basis: &lt;value&gt;</code>. <br>
   * Accepts a string that should be in the form of a percentage or CSS unit. <br />
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  @Input()
  get vFlexBasis(): string {
    return this._vFlexBasis;
  }
  set vFlexBasis(value) {
    this._vFlexBasis = value;
  }
  _vFlexBasis: string;
  @HostBinding('style.flex-basis')
  get hostFlexBasis(): string | null {
    return this.vFlexBasis ? this.vFlexBasis : null;
  }

  /**
   * Sets property <code>flex-grow: 1</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  @Input()
  get vFlexGrow(): boolean {
    return this._vFlexGrow;
  }
  set vFlexGrow(value: BooleanInput) {
    this._vFlexGrow = coerceBooleanProperty(value);
  }
  _vFlexGrow: boolean;

  /**
   * Sets property <code>flex-grow: 0</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  @Input()
  get vFlexGrow0(): boolean {
    return this._vFlexGrow0;
  }
  set vFlexGrow0(value: BooleanInput) {
    this._vFlexGrow0 = coerceBooleanProperty(value);
  }
  _vFlexGrow0: boolean;

  /**
   * Sets property <code>flex-shrink: 1</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  @Input()
  get vFlexShrink(): boolean {
    return this._vFlexShrink;
  }
  set vFlexShrink(value: BooleanInput) {
    this._vFlexShrink = coerceBooleanProperty(value);
  }
  _vFlexShrink: boolean;

  /**
   * Sets property <code>flex-shrink: 0</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  @Input()
  get vFlexShrink0(): boolean {
    return this._vFlexShrink0;
  }
  set vFlexShrink0(value: BooleanInput) {
    this._vFlexShrink0 = coerceBooleanProperty(value);
  }
  _vFlexShrink0: boolean;

  /**
   * Sets property <code>align-content: center</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vAlignContentCenter(): boolean {
    return this._vAlignContentCenter;
  }
  set vAlignContentCenter(value: BooleanInput) {
    this._vAlignContentCenter = coerceBooleanProperty(value);
  }
  _vAlignContentCenter: boolean;

  /**
   * Sets property <code>align-content: start</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vAlignContentStart(): boolean {
    return this._vAlignContentStart;
  }
  set vAlignContentStart(value: BooleanInput) {
    this._vAlignContentStart = coerceBooleanProperty(value);
  }
  _vAlignContentStart: boolean;

  /**
   * Sets property <code>align-content: end</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vAlignContentEnd(): boolean {
    return this._vAlignContentEnd;
  }
  set vAlignContentEnd(value: BooleanInput) {
    this._vAlignContentEnd = coerceBooleanProperty(value);
  }
  _vAlignContentEnd: boolean;

  /**
   * Sets property <code>align-content: space-between</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vAlignContentBetween(): boolean {
    return this._vAlignContentBetween;
  }
  set vAlignContentBetween(value: BooleanInput) {
    this._vAlignContentBetween = coerceBooleanProperty(value);
  }
  _vAlignContentBetween: boolean;

  /**
   * Sets property <code>align-content: space-around</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vAlignContentAround(): boolean {
    return this._vAlignContentAround;
  }
  set vAlignContentAround(value: BooleanInput) {
    this._vAlignContentAround = coerceBooleanProperty(value);
  }
  _vAlignContentAround: boolean;

  /**
   * Sets property <code>align-content: space-evenly</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vAlignContentEvenly(): boolean {
    return this._vAlignContentEvenly;
  }
  set vAlignContentEvenly(value: BooleanInput) {
    this._vAlignContentEvenly = coerceBooleanProperty(value);
  }
  _vAlignContentEvenly: boolean;

  /**
   * Sets property <code>align-content: center</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vAlignItemsCenter(): boolean {
    return this._vAlignItemsCenter;
  }
  set vAlignItemsCenter(value: BooleanInput) {
    this._vAlignItemsCenter = coerceBooleanProperty(value);
  }
  _vAlignItemsCenter: boolean;

  /**
   * Sets property <code>align-content: start</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vAlignItemsStart(): boolean {
    return this._vAlignItemsStart;
  }
  set vAlignItemsStart(value: BooleanInput) {
    this._vAlignItemsStart = coerceBooleanProperty(value);
  }
  _vAlignItemsStart: boolean;

  /**
   * Sets property <code>align-content: end</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vAlignItemsEnd(): boolean {
    return this._vAlignItemsEnd;
  }
  set vAlignItemsEnd(value: BooleanInput) {
    this._vAlignItemsEnd = coerceBooleanProperty(value);
  }
  _vAlignItemsEnd: boolean;

  /**
   * Sets property <code>align-items: baseline</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vAlignItemsBaseline(): boolean {
    return this._vAlignItemsBaseline;
  }
  set vAlignItemsBaseline(value: BooleanInput) {
    this._vAlignItemsBaseline = coerceBooleanProperty(value);
  }
  _vAlignItemsBaseline: boolean;

  /**
   * Sets property <code>align-items: stretch</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vAlignItemsStretch(): boolean {
    return this._vAlignItemsStretch;
  }
  set vAlignItemsStretch(value: BooleanInput) {
    this._vAlignItemsStretch = coerceBooleanProperty(value);
  }
  _vAlignItemsStretch: boolean;

  /**
   * Sets property <code>align-self: center</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  @Input()
  get vAlignSelfCenter(): boolean {
    return this._vAlignSelfCenter;
  }
  set vAlignSelfCenter(value: BooleanInput) {
    this._vAlignSelfCenter = coerceBooleanProperty(value);
  }
  _vAlignSelfCenter: boolean;

  /**
   * Sets property <code>align-self: start</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  @Input()
  get vAlignSelfStart(): boolean {
    return this._vAlignSelfStart;
  }
  set vAlignSelfStart(value: BooleanInput) {
    this._vAlignSelfStart = coerceBooleanProperty(value);
  }
  _vAlignSelfStart: boolean;

  /**
   * Sets property <code>align-self: end</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  @Input()
  get vAlignSelfEnd(): boolean {
    return this._vAlignSelfEnd;
  }
  set vAlignSelfEnd(value: BooleanInput) {
    this._vAlignSelfEnd = coerceBooleanProperty(value);
  }
  _vAlignSelfEnd: boolean;

  /**
   * Sets property <code>align-self: baseline</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  @Input()
  get vAlignSelfBaseline(): boolean {
    return this._vAlignSelfBaseline;
  }
  set vAlignSelfBaseline(value: BooleanInput) {
    this._vAlignSelfBaseline = coerceBooleanProperty(value);
  }
  _vAlignSelfBaseline: boolean;

  /**
   * Sets property <code>align-self: stretch</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  @Input()
  get vAlignSelfStretch(): boolean {
    return this._vAlignSelfStretch;
  }
  set vAlignSelfStretch(value: BooleanInput) {
    this._vAlignSelfStretch = coerceBooleanProperty(value);
  }
  _vAlignSelfStretch: boolean;

  /**
   * Sets property <code>align-self: auto</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  @Input()
  get vAlignSelfAuto(): boolean {
    return this._vAlignSelfAuto;
  }
  set vAlignSelfAuto(value: BooleanInput) {
    this._vAlignSelfAuto = coerceBooleanProperty(value);
  }
  _vAlignSelfAuto: boolean;

  /**
   * Sets property <code>justify-content: center</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vJustifyContentCenter(): boolean {
    return this._vJustifyContentCenter;
  }
  set vJustifyContentCenter(value: BooleanInput) {
    this._vJustifyContentCenter = coerceBooleanProperty(value);
  }
  _vJustifyContentCenter: boolean;

  /**
   * Sets property <code>justify-content: start</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vJustifyContentStart(): boolean {
    return this._vJustifyContentStart;
  }
  set vJustifyContentStart(value: BooleanInput) {
    this._vJustifyContentStart = coerceBooleanProperty(value);
  }
  _vJustifyContentStart: boolean;

  /**
   * Sets property <code>justify-content: end</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vJustifyContentEnd(): boolean {
    return this._vJustifyContentEnd;
  }
  set vJustifyContentEnd(value: BooleanInput) {
    this._vJustifyContentEnd = coerceBooleanProperty(value);
  }
  _vJustifyContentEnd: boolean;

  /**
   * Sets property <code>justify-content: space-between</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vJustifyContentBetween(): boolean {
    return this._vJustifyContentBetween;
  }
  set vJustifyContentBetween(value: BooleanInput) {
    this._vJustifyContentBetween = coerceBooleanProperty(value);
  }
  _vJustifyContentBetween: boolean;

  /**
   * Sets property <code>justify-content: space-around</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vJustifyContentAround(): boolean {
    return this._vJustifyContentAround;
  }
  set vJustifyContentAround(value: BooleanInput) {
    this._vJustifyContentAround = coerceBooleanProperty(value);
  }
  _vJustifyContentAround: boolean;

  /**
   * Sets property <code>justify-content: space-evenly</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  @Input()
  get vJustifyContentEvenly(): boolean {
    return this._vJustifyContentEvenly;
  }
  set vJustifyContentEvenly(value: BooleanInput) {
    this._vJustifyContentEvenly = coerceBooleanProperty(value);
  }
  _vJustifyContentEvenly: boolean;

  /**
   * Sets property <code>gap</code>. <br>Accepts gap: 0 - 48 and SpacingProperties.
   */
  @Input()
  get vGap(): number | SpacingProperties | NumberInput {
    return this._vGap;
  }
  set vGap(value) {
    this._vGap = value;
  }
  _vGap: number | SpacingProperties | NumberInput;

  /**
   * Sets property <code>column-gap</code>. <br>Accepts gap: 0 - 48 and SpacingProperties.
   */
  @Input()
  get vColGap(): number | SpacingProperties | NumberInput {
    return this._vColGap;
  }
  set vColGap(value) {
    this._vColGap = value;
  }
  _vColGap: number | SpacingProperties | NumberInput;

  /**
   * Sets property <code>row-gap</code>. <br>Accepts gap: 0 - 48 and SpacingProperties.
   */
  @Input()
  get vRowGap(): number | SpacingProperties | NumberInput {
    return this._vRowGap;
  }
  set vRowGap(value) {
    this._vRowGap = value;
  }
  _vRowGap: number | SpacingProperties | NumberInput;
}
