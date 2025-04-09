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
import { Component } from '@angular/core';
import { WorkshopService } from '../../shared/services/workshop.service';
import { CommonModule } from '@angular/common';
import { NovaLibModule } from '@visa/nova-angular';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { BottomTooltipComponent } from './bottom/bottom.docs';
import { CustomEventsTooltipComponent } from './custom-events/custom-events.docs';
import { CustomMiddlewareTooltipComponent } from './custom-middleware/custom-middleware.docs';
import { LeftTooltipComponent } from './left/left.docs';
import { RightTooltipComponent } from './right/right.docs';
import { TopTooltipComponent } from './top/top.docs';
import { WithArrowTooltipComponent } from './with-arrow/with-arrow.docs';
import { VisaInformationLow, VisaMaximizeTiny } from '@visa/nova-icons-angular';

@Component({
  imports: [
    CommonModule,
    TopTooltipComponent,
    BottomTooltipComponent,
    LeftTooltipComponent,
    RightTooltipComponent,
    CustomMiddlewareTooltipComponent,
    WithArrowTooltipComponent,
    CustomEventsTooltipComponent,
    NovaLibModule,
    NovaSharedModule,
    VisaInformationLow,
    VisaMaximizeTiny
  ],
  standalone: true,
  selector: 'nova-docs-tooltip',
  templateUrl: './tooltip.docs.html'
})
export class TooltipDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Tooltip');
    this.workshopService.neededAPI.set([
      { name: 'TooltipDirective', type: 'directive' },
      { name: 'TooltipArrowDirective', type: 'directive' },
      { name: 'FloatingUIContainer', type: 'directive' },
      { name: 'FloatingUITriggerDirective', type: 'directive' },
      { name: 'FloatingUIService', type: 'service-source' },
      { name: 'UUIDService', type: 'service-source' },
      { name: 'FloatingUIPlacements', type: 'constant' },
      { name: 'FloatingUIVisibility', type: 'constant' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
