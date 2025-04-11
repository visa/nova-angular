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
import { AfterContentInit, Directive } from '@angular/core';
import { AccordionHeadingDirective } from '../accordion-heading/accordion-heading.directive';
import { ButtonColor, ButtonSize } from '../button/button.constants';
import { ButtonDirective } from '../button/button.directive';

/**
 * Directive to be used in conjunction with accordion-heading to provide a button to control the accordion item.
 * @deprecated
 * @deprecationMessage Use the accordion-heading directive instead.
 */
@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-accordion-heading][v-button], [v-accordion-toggle-button]'
})
export class AccordionButtonHeadingDirective implements AfterContentInit {
  constructor(
    public accordionHeading: AccordionHeadingDirective,
    public button?: ButtonDirective
  ) {}

  ngAfterContentInit(): void {
    if (!this.accordionHeading && this.button) {
      if (!this.button._buttonSizeSetByUser) {
        this.button.buttonSize = ButtonSize.LARGE;
        this.button._buttonSizeSetByUser = false;
      }
      if (!this.button._buttonColorSetByUser) {
        this.button.buttonColor = ButtonColor.SECONDARY;
        this.button._buttonColorSetByUser = false;
      }
    }
  }
}
