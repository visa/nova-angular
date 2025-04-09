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
import { NovaLibModule, PaginationControl } from '@visa/nova-angular';
import { VisaInformationLow } from '@visa/nova-icons-angular';
import { WorkshopService } from '../../shared/services/workshop.service';
import { ExampleComponent } from '../../shared/app-components/example/example.docs';
import { PaginationDefaultFirstPageComponent } from './default-first-page/default-first-page.docs';
import { PaginationDefaultLastPageComponent } from './default-last-page/default-last-page.docs';
import { PaginationDefaultMiddlePageComponent } from './default-middle-page/default-middle-page.docs';
import { MultiplePaginationsComponent } from './multiple-paginations/multiple-paginations.docs';
import { PaginationSlimWithCountComponent } from './slim-with-count/slim-with-count.docs';
import { PaginationSlimComponent } from './slim/slim.docs';
import { PaginationTableComponent } from './table/table.docs';
import { PaginationControlDefaultMiddlePageComponent } from './_default-middle-page/default-middle-page.docs';

@Component({
  selector: 'nova-workshop-pagination',
  templateUrl: './pagination.docs.html',
  standalone: true,
  imports: [
    NovaLibModule,
    CommonModule,
    VisaInformationLow,
    ExampleComponent,
    PaginationDefaultFirstPageComponent,
    PaginationDefaultLastPageComponent,
    PaginationDefaultMiddlePageComponent,
    MultiplePaginationsComponent,
    PaginationSlimWithCountComponent,
    PaginationSlimComponent,
    PaginationTableComponent
  ]
})
export class PaginationDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Pagination');
    this.workshopService.neededAPI.set([
      { name: 'PaginationDirective', type: 'directive' },
      { name: 'PaginationOverflowDirective', type: 'directive' },
      { name: 'ButtonIconDirective' },
      { name: 'PaginationService', type: 'service-source' },
      { name: 'PaginationControl', type: 'service-source' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
