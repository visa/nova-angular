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
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { CompactWizardComponent } from './compact/compact.docs';
import { InPageWizardComponent } from './in-page/in-page.docs';
import { InPageCustomMarkupWizardComponent } from './in-page-custom-markup/in-page-custom-markup.docs';
import { HorizontalWizardComponent } from './horizontal/horizontal.docs';
import { VerticalWizardComponent } from './vertical/vertical.docs';
import { VisaInformationLow } from '@visa/nova-icons-angular';

@Component({
  imports: [
    CommonModule,
    NovaSharedModule,
    NovaLibModule,
    HorizontalWizardComponent,
    VerticalWizardComponent,
    VisaInformationLow,
    CompactWizardComponent,
    InPageWizardComponent,
    InPageCustomMarkupWizardComponent
  ],
  standalone: true,
  selector: 'nova-workshop-wizard',
  templateUrl: './wizard.docs.html'
})
export class WizardDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Wizard');
    this.workshopService.neededAPI.set([
      { name: 'WizardDirective', type: 'directive' },
      { name: 'WizardStepDirective', type: 'directive' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
