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

export const TypographyType = {
  Display1: 'display-1',
  Display2: 'display-2',
  Headline1: 'headline-1',
  Headline2: 'headline-2',
  Headline3: 'headline-3',
  Headline4: 'headline-4',
  Subtitle1: 'subtitle-1',
  Subtitle2: 'subtitle-2',
  Subtitle3: 'subtitle-3',
  Overline: 'overline',
  Body1: 'body-1',
  Body2: 'body-2',
  Body2Bold: 'body-2-bold',
  Body2Link: 'body-2-link',
  Body2Medium: 'body-2-medium',
  Body3: 'body-3',
  ButtonSmall: 'button-small',
  ButtonMedium: 'button-medium',
  ButtonLarge: 'button-large',
  Label: 'label',
  LabelSmall: 'label-small',
  LabelActive: 'label-active',
  LabelLarge: 'label-large',
  LabelLargeActive: 'label-large-active',
  LabelSmallActive: 'label-small-active'
} as const;

export type TypographyType = (typeof TypographyType)[keyof typeof TypographyType];

@Directive({
  standalone: true,
  selector: '[vTypography], [vFont]'
})
export class TypographyDirective {
  @HostBinding('class')
  get hostClasses(): string | void {
    if (this.vTypography) {
      return `v-typography-${this.vTypography}`;
    }
  }

  /**
   * Applies given typography class.
   */
  @Input()
  get vTypography(): TypographyType | '' | null {
    return this._vTypography;
  }
  set vTypography(value) {
    this._vTypography = value;
  }

  /**
   * Applies given typography class. <br>
   * Can be used as a more succinct alias for <code>vTypography</code>.
   */
  @Input()
  get vFont(): TypographyType | '' | null {
    return this._vTypography;
  }
  set vFont(value: TypographyType | '' | null) {
    this._vTypography = value;
  }
  _vTypography: TypographyType | '' | null;
}
