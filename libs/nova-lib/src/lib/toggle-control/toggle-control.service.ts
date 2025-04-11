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
import { Injectable } from '@angular/core';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { RadioDirective } from '../radio/radio.directive';

/**
 * Service to toggle checkbox or radio programmatically.
 */
@Injectable({
  providedIn: 'root'
})
export class ToggleControlService {
  constructor(private appReadyService: AppReadyService) {}

  /**
   * Toggles checkbox or radio programmatically.
   * @param control Checkbox or Radio item to toggle.
   * @param event Event to check if target is the control.
   */
  toggleControl(control: RadioDirective | CheckboxDirective, event: Event) {
    // check that browser is available before manipulating/checking DOM elements
    if (this.appReadyService.isBrowserAndDomAvailable() && control) {
      if (control.el.nativeElement.contains(event.target)) {
        return;
      } else {
        control.el.nativeElement.click();
      }
    }
  }
}
