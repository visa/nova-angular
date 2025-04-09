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
import { APITypes } from '../../shared/services/workshop.constants';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { NovaDecorativeDividerComponent } from './decorative/decorative.docs';
import { NovaDefaultDividerComponent } from './default/default.docs';
import { NovaSectionDividerComponent } from './section/section.docs';
import { VerticalDividerComponent } from './vertical/vertical.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    NovaDefaultDividerComponent,
    NovaSectionDividerComponent,
    NovaDecorativeDividerComponent,
    VerticalDividerComponent
  ],
  standalone: true,
  selector: 'nova-docs-divider',
  templateUrl: './divider.docs.html'
})
export class DividerDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Divider');
    this.workshopService.neededAPI.set([
      { name: 'DividerDirective' },
      { name: 'DividerType', type: APITypes.CONSTANT }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
