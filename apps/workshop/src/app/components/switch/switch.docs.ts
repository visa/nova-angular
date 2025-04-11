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
import { NovaLibModule } from '@visa/nova-angular';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { NovaDisabledOffSwitchDocsComponent } from './disabled-off/disabled-off.docs';
import { NovaDisabledSelectedSwitchDocsComponent } from './disabled-selected/disabled-selected.docs';
import { NovaOptionalTextSwitchDocsComponent } from './optional-text/optional-text.docs';
import { NovaStandardSwitchComponent } from './standard/standard.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    NovaStandardSwitchComponent,
    NovaDisabledOffSwitchDocsComponent,
    NovaDisabledSelectedSwitchDocsComponent,
    NovaOptionalTextSwitchDocsComponent
  ],
  standalone: true,
  selector: 'nova-workshop-switch',
  templateUrl: './switch.docs.html'
})
export class SwitchDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Switch');
    this.workshopService.neededAPI.set([
      { name: 'SwitchDirective' },
      { name: 'SwitchLabelDirective' },
      { name: 'LabelDirective' },
      { name: 'InputMessageDirective' },
      { name: 'AppReadyService', type: 'service-source' },
      { name: 'UUIDService', type: 'service-source' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
