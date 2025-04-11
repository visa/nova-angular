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
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { WorkshopService } from '../../services/workshop.service';

@Component({
  imports: [CommonModule, RouterModule, NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-examples-layout',
  templateUrl: './examples-layout.component.html'
})
export class ExampleLayoutComponent {
  constructor(private workshopService: WorkshopService) {
    if (!this.workshopService.docsJsonData) {
      fetch('./assets/app/workshop/documentation.json')
        .then((res) => res.json())
        .then((data) => {
          this.workshopService.docsJsonData = data.components; // only load data on app init
          this.workshopService.docsJsonDataReady.set(true);
        });
    }
  }
}
