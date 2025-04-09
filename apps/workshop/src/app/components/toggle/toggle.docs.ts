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
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { NovaToggleDefaultComponent } from './default/default.docs';
import { NovaToggleDisabledComponent } from './disabled/disabled.docs';
import { NovaToggleIconOnlyComponent } from './icon-only/icon-only.docs';
import { NovaMultiSelectToggleComponent } from './multi-select/multi-select.docs';
import { NovaToggleOneButtonDisabledComponent } from './one-button-disabled/one-button-disabled.docs';
import { NovaStandaloneMultiSelectToggleComponent } from './standalone-multi-select/standalone-multi-select.docs';
import { NovaToggleWithLeadingIconComponent } from './with-leading-icon/with-leading-icon.docs';
import { NovaToggleWithTrailingIconComponent } from './with-trailing-icon/with-trailing-icon.docs';
import { ModelDrivenFormToggleComponent } from './model-driven-form/model-driven-form.docs';
import { ModelDrivenFbToggleComponent } from './model-driven-fb/model-driven-fb.docs';
import { TemplateDrivenFormToggleComponent } from './template-driven-form/template-driven-form.docs';
import { SingleSelectRadioButtonToggleComponent } from './single-select-with-radio-buttons/single-select-with-radio-buttons.docs';
import { MultiSelectCheckboxesToggleComponent } from './multi-select-with-checkboxes/multi-select-with-checkboxes.docs';

@Component({
  imports: [
    CommonModule,
    NovaSharedModule,
    NovaLibModule,
    NovaMultiSelectToggleComponent,
    NovaToggleDefaultComponent,
    NovaStandaloneMultiSelectToggleComponent,
    NovaToggleOneButtonDisabledComponent,
    NovaToggleIconOnlyComponent,
    NovaToggleDisabledComponent,
    NovaToggleWithLeadingIconComponent,
    NovaToggleWithTrailingIconComponent,
    ModelDrivenFormToggleComponent,
    ModelDrivenFbToggleComponent,
    TemplateDrivenFormToggleComponent,
    SingleSelectRadioButtonToggleComponent,
    MultiSelectCheckboxesToggleComponent
  ],
  standalone: true,
  selector: 'nova-workshop-footer',
  templateUrl: './toggle.docs.html'
})
export class ToggleDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Toggle button');
    this.workshopService.neededAPI.set([
      { name: 'ToggleDirective', type: 'directive' },
      { name: 'ToggleContainerDirective', type: 'directive' },
      { name: 'RadioDirective', type: 'directive' },
      { name: 'CheckboxDirective', type: 'directive' },
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
