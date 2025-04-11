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
import { WorkshopService } from '../../shared/services/workshop.service';
import { CommonModule } from '@angular/common';
import { NovaLibModule } from '@visa/nova-angular';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { NovaCategoryCardComponent } from './category/category.docs';
import { NovaClickableCardDisabledComponent } from './clickable-card-disabled/clickable-card-disabled.docs';
import { NovaClickableCardComponent } from './clickable-card/clickable-card.docs';
import { NovaCompactDashboardCardComponent } from './compact-dashboard/compact-dashboard.docs';
import { NovaCompactCardComponent } from './compact/compact.docs';
import { NovaDefaultDashboardCardComponent } from './default-dashboard/default-dashboard.docs';
import { NovaDefaultWithUIButtonsCardComponent } from './default-with-ui-buttons/default-with-ui-buttons.docs';
import { NovaDefaultCardComponent } from './default/default.docs';
import { NovaIconCardComponent } from './icon/icon.docs';
import { NovaImageCardComponent } from './image/image.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    NovaCompactDashboardCardComponent,
    NovaCategoryCardComponent,
    NovaClickableCardComponent,
    NovaClickableCardDisabledComponent,
    NovaCompactCardComponent,
    NovaDefaultCardComponent,
    NovaDefaultWithUIButtonsCardComponent,
    NovaIconCardComponent,
    NovaImageCardComponent,
    NovaDefaultDashboardCardComponent,
    CommonModule,
    NovaLibModule,
    NovaSharedModule
  ],
  standalone: true,
  selector: 'nova-workshop-content-card',
  templateUrl: './content-card.docs.html'
})
export class ContentCardDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Content card');
    this.workshopService.neededAPI.set([
      { name: 'ContentCardDirective', type: 'directive' },
      { name: 'ContentCardBodyDirective', type: 'directive' },
      { name: 'ContentCardImageDirective', type: 'directive' },
      { name: 'ContentCardSubtitleDirective', type: 'directive' },
      { name: 'ContentCardTitleDirective', type: 'directive' },
      { name: 'ContentCardTitleLinkDirective', type: 'directive' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
