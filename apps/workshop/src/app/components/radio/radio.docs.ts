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
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import { MarkdownModule } from 'ngx-markdown';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { DisabledAndSelectedRadioComponent } from './disabled-and-selected/disabled-and-selected.docs';
import { DisabledPanelRadioComponent } from './disabled-panel/disabled-panel.docs';
import { DisabledRadioComponent } from './disabled/disabled.docs';
import { GroupWithErrorRadioComponent } from './group-with-error/group-with-error.docs';
import { GroupRadioComponent } from './group/group.docs';
import { HorizontalGroupRadioComponent } from './horizontal-group/horizontal-group.docs';
import { ModelDrivenFbRadioComponent } from './model-driven-fb/model-driven-fb.docs';
import { ModelDrivenFormRadioComponent } from './model-driven-form/model-driven-form.docs';
import { PanelGroupWithErrorRadioComponent } from './panel-group-with-error/panel-group-with-error.docs';
import { PanelGroupRadioComponent } from './panel-group/panel-group.docs';
import { PanelWithoutDescriptionRadioComponent } from './panel-without-description/panel-without-description.docs';
import { PanelRadioComponent } from './panel/panel.docs';
import { SelectedRadioComponent } from './selected/selected.docs';
import { TemplateDrivenFormRadioComponent } from './template-driven-form/template-driven-form.docs';
import { WithDescriptionRadioComponent } from './with-description/with-description.docs';
import { WithLabelRadioComponent } from './with-label/with-label.docs';
import { WithoutVisibleLabelRadioComponent } from './without-visible-label/without-visible-label.docs';
import { VisaInformationLow, VisaCloseTiny } from '@visa/nova-icons-angular';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    VisaInformationLow,
    VisaCloseTiny,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule,
    TemplateDrivenFormRadioComponent,
    GroupWithErrorRadioComponent,
    PanelGroupWithErrorRadioComponent,
    ModelDrivenFormRadioComponent,
    ModelDrivenFbRadioComponent,
    DisabledAndSelectedRadioComponent,
    DisabledPanelRadioComponent,
    DisabledRadioComponent,
    GroupRadioComponent,
    HorizontalGroupRadioComponent,
    PanelGroupRadioComponent,
    PanelRadioComponent,
    PanelWithoutDescriptionRadioComponent,
    SelectedRadioComponent,
    WithDescriptionRadioComponent,
    WithLabelRadioComponent,
    WithoutVisibleLabelRadioComponent
  ],
  standalone: true,
  selector: 'nova-workshop-radio',
  templateUrl: './radio.docs.html'
})
export class RadioDocsComponent {
  radioVal = true;
  radioVal2 = true;
  radioFormControl = new FormControl(true);
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Radio');
    this.workshopService.neededAPI.set([
      { name: 'RadioDirective' },
      { name: 'RadioGroupDirective' },
      { name: 'CheckboxPanelDirective' },
      { name: 'InputContainerComponent', type: 'component' },
      { name: 'LabelDirective' },
      { name: 'InputMessageDirective' },
      { name: 'ToggleControlService', type: 'service-source' },
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
