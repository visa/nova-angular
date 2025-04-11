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
import { Component } from '@angular/core';
import { FloatingUIVisibility, NovaLibModule } from '@visa/nova-angular';

/** #custom */
@Component({
  imports: [NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-tooltip-custom-events',
  templateUrl: './custom-events.docs.html'
})
export class CustomEventsTooltipComponent {
  events = [
    [new UIEvent('mouseenter'), FloatingUIVisibility.SHOW],
    [new UIEvent('mouseleave'), FloatingUIVisibility.HIDE],
    [new UIEvent('focus'), FloatingUIVisibility.SHOW],
    [new UIEvent('blur'), FloatingUIVisibility.HIDE],
    [new UIEvent('keydown.space'), FloatingUIVisibility.HIDE]
  ];
}
