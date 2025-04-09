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
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { CustomItemsBreadcrumbsComponent } from './custom-items/custom-items.docs';
import { CustomSeparatorBreadcrumbsComponent } from './custom-separator/custom-separator.docs';
import { DefaultBreadcrumbsComponent } from './default/default.docs';
import { InlineSeparatorBreadcrumbsComponent } from './inline-separator/inline-separator.docs';
import { ServiceBasedActiveCrumbBreadcrumbsComponent } from './service-based-active-crumb/service-based-active-crumb.docs';
import { SvgSeparatorBreadcrumbsComponent } from './svg-separator/svg-separator.docs';
import { WithObservableBreadcrumbsComponent } from './with-observable/with-observable.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    RouterModule,
    CustomItemsBreadcrumbsComponent,
    SvgSeparatorBreadcrumbsComponent,
    CustomSeparatorBreadcrumbsComponent,
    DefaultBreadcrumbsComponent,
    InlineSeparatorBreadcrumbsComponent,
    ServiceBasedActiveCrumbBreadcrumbsComponent,
    WithObservableBreadcrumbsComponent
  ],
  standalone: true,
  selector: 'nova-workshop-breadcrumbs',
  templateUrl: './breadcrumbs.docs.html'
})
export class BreadcrumbsDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Breadcrumbs');
    this.workshopService.neededAPI.set([
      { name: 'BreadcrumbsDirective', type: 'directive' },
      { name: 'LinkDirective', type: 'directive' },
      { name: 'NovaLibService', type: 'service-source' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
