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
import { VisaInformationLow } from '@visa/nova-icons-angular';
import { MarkdownModule } from 'ngx-markdown';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { NovaDefaultNestedAnchorLinkMenuComponent } from './default-nested/default-nested.docs';
import { NovaDefaultNoTitleAnchorLinkMenuComponent } from './default-no-title/default-no-title.docs';
import { NovaDefaultAnchorLinkMenuComponent } from './default/default.docs';
import { NovaRightToLeftAnchorLinkMenuComponent } from './right-to-left/right-to-left.docs';

@Component({
  imports: [
    CommonModule,
    MarkdownModule,
    NovaLibModule,
    NovaSharedModule,
    VisaInformationLow,
    NovaDefaultAnchorLinkMenuComponent,
    NovaDefaultNoTitleAnchorLinkMenuComponent,
    NovaDefaultNestedAnchorLinkMenuComponent,
    NovaRightToLeftAnchorLinkMenuComponent
  ],
  standalone: true,
  selector: 'nova-workshop-anchor-link-menu',
  templateUrl: './anchor-link-menu.docs.html'
})
export class AnchorLinkMenuDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Anchor link menu');
    this.workshopService.neededAPI.set([
      { name: 'AnchorLinkMenuDirective' },
      { name: 'AnchorLinkMenuHeaderDirective' },
      { name: 'LinkDirective' },
      { name: 'NovaLibService', type: 'service-source' },
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
