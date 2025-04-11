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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { ResposniveExpandedWithCustomPlacementPanelComponent } from './responsive-expanded-with-custom-placement/responsive-expanded-with-custom-placement.docs';
import { ModalDefaultPanelComponent } from './modal-default/modal-default.docs';
import { ModalExpandableTabbedPanelComponent } from './modal-expandable-tabbed/modal-expandable-tabbed.docs';
import { ModalExpandableSecondaryButtonPanelComponent } from './modal-expandable-with-secondary-button/modal-expandable-with-secondary-button.docs';
import { ModalExpandableSkrimPanelComponent } from './modal-expandable-with-skrim/modal-expandable-with-skrim.docs';
import { ModalExpandablePanelComponent } from './modal-expandable/modal-expandable.docs';
import { DefaultResponsivePanelComponent } from './responsive-default/responsive-default.docs';
import { ResponsiveExpandedTabbedPanelComponent } from './responsive-expanded-tabbed/responsive-expanded-tabbed.docs';
import { ResponsiveExpandedPanelComponent } from './responsive-expanded/responsive-expanded.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModalDefaultPanelComponent,
    ResponsiveExpandedPanelComponent,
    ModalExpandableSecondaryButtonPanelComponent,
    ModalExpandablePanelComponent,
    ResposniveExpandedWithCustomPlacementPanelComponent,
    ResponsiveExpandedTabbedPanelComponent,
    DefaultResponsivePanelComponent,
    ModalExpandableTabbedPanelComponent,
    ModalExpandableSkrimPanelComponent
  ],
  standalone: true,
  selector: 'vds-docs-panel',
  templateUrl: './panel.docs.html'
})
export class PanelDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Panel');
    this.workshopService.neededAPI.set([
      { name: 'PanelComponent', type: 'component' },
      { name: 'PanelBodyDirective', type: 'directive' },
      { name: 'PanelContentDirective', type: 'directive' },
      { name: 'PanelToggleDirective', type: 'directive' },
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
