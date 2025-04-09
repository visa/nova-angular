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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import { MarkdownModule } from 'ngx-markdown';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { CheckedCheckboxComponent } from './checked/checked.docs';
import { DisabledCheckedCheckboxComponent } from './disabled-checked/disabled-checked.docs';
import { DisabledPanelCheckboxComponent } from './disabled-panel/disabled-panel.docs';
import { DisabledCheckboxComponent } from './disabled/disabled.docs';
import { ErrorCheckboxComponent } from './error/error.docs';
import { GroupWithErrorCheckboxComponent } from './group-with-error/group-with-error.docs';
import { GroupCheckboxComponent } from './group/group.docs';
import { HorizontalGroupCheckboxComponent } from './horizontal-group/horizontal-group.docs';
import { IndeterminateGroupWithErrorCheckboxComponent } from './indeterminate-group-with-error/indeterminate-group-with-error.docs';
import { IndeterminateGroupCheckboxComponent } from './indeterminate-group/indeterminate-group.docs';
import { ModelDrivenFbCheckboxComponent } from './model-driven-fb/model-driven-fb.docs';
import { ModelDrivenFormCheckboxComponent } from './model-driven-form/model-driven-form.docs';
import { ModelDrivenCheckboxComponent } from './model-driven/model-driven.docs';
import { PanelGroupWithErrorCheckboxComponent } from './panel-group-with-error/panel-group-with-error.docs';
import { PanelGroupCheckboxComponent } from './panel-group/panel-group.docs';
import { PanelWithoutDescriptionCheckboxComponent } from './panel-without-description/panel-without-description.docs';
import { PanelCheckboxComponent } from './panel/panel.docs';
import { TemplateDrivenFormCheckboxComponent } from './template-driven-form/template-driven-form.docs';
import { TemplateDrivenCheckboxComponent } from './template-driven/template-driven.docs';
import { WithDescriptionCheckboxComponent } from './with-description/with-description.docs';
import { WithLabelCheckboxComponent } from './with-label/with-label.docs';
import { WithoutVisibleLabelCheckboxComponent } from './without-visible-label/without-visible-label.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule,
    ErrorCheckboxComponent,
    GroupWithErrorCheckboxComponent,
    PanelGroupWithErrorCheckboxComponent,
    TemplateDrivenFormCheckboxComponent,
    IndeterminateGroupWithErrorCheckboxComponent,
    ModelDrivenFormCheckboxComponent,
    ModelDrivenFbCheckboxComponent,
    WithLabelCheckboxComponent,
    WithoutVisibleLabelCheckboxComponent,
    CheckedCheckboxComponent,
    DisabledCheckboxComponent,
    DisabledCheckedCheckboxComponent,
    WithDescriptionCheckboxComponent,
    GroupCheckboxComponent,
    IndeterminateGroupCheckboxComponent,
    HorizontalGroupCheckboxComponent,
    PanelCheckboxComponent,
    PanelWithoutDescriptionCheckboxComponent,
    DisabledPanelCheckboxComponent,
    PanelGroupCheckboxComponent,
    TemplateDrivenCheckboxComponent,
    ModelDrivenCheckboxComponent
  ],
  standalone: true,
  selector: 'nova-workshop-checkbox',
  templateUrl: './checkbox.docs.html'
})
export class CheckboxDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Checkbox');
    this.workshopService.neededAPI.set([
      { name: 'CheckboxDirective', type: 'directive' },
      { name: 'CheckboxPanelDirective', type: 'directive' },
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
