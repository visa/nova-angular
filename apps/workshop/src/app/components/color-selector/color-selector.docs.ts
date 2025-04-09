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
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { AvailableValuesColorSelectorComponent } from './available-values/available-values.docs';
import { DefaultColorSelectorComponent } from './default/default.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    AvailableValuesColorSelectorComponent,
    DefaultColorSelectorComponent
  ],
  standalone: true,
  selector: 'nova-docs-color-selector',
  templateUrl: './color-selector.docs.html'
})
export class ColorSelectorDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Color selector');
    this.workshopService.neededAPI.set([
      { name: 'InputDirective' },
      { name: 'InputContainerComponent', type: 'component' },
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
