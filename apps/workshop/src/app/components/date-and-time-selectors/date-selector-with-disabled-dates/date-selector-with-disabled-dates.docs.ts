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
import { NovaLibModule } from '@visa/nova-angular';

@Component({
  imports: [NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-date-time-selector-date-selector-with-disabled-dates',
  templateUrl: './date-selector-with-disabled-dates.docs.html'
})
export class WithDisabledDatesDateTimeComponent {
  today: Date;
  minDate: string;
  maxDate: string;

  constructor() {}

  ngOnInit() {
    this.today = new Date();

    let weekPrior = new Date();
    weekPrior.setDate(this.today.getDate() - 7);
    // min date format should be in yyyy-mm-dd
    this.minDate = weekPrior.toISOString().split('T')[0];

    let weekLater = new Date();
    weekLater.setDate(this.today.getDate() + 7);
    // max date format should be in yyyy-mm-dd
    this.maxDate = weekLater.toISOString().split('T')[0];
  }
}
