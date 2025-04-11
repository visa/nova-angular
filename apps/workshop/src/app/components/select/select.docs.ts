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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import { MarkdownModule } from 'ngx-markdown';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { DefaultSelectComponent } from './default/default.docs';
import { DisabledSelectComponent } from './disabled/disabled.docs';
import { ErrorSelectComponent } from './error/error.docs';
import { MockDataSelectComponent } from './mock-data/mock-data.docs';
import { ModelDrivenFbSelectComponent } from './model-driven-fb/model-driven-fb.docs';
import { ModelDrivenFormSelectComponent } from './model-driven-form/model-driven-form.docs';
import { ModelDrivenObjectSelectComponent } from './model-driven-object/model-driven-object.docs';
import { ModelDrivenSelectComponent } from './model-driven/model-driven.docs';
import { ReadOnlySelectComponent } from './read-only/read-only.docs';
import { TemplateDrivenFormSelectComponent } from './template-driven-form/template-driven-form.docs';
import { TemplateDrivenObjectSelectComponent } from './template-driven-object/template-driven-object.docs';
import { TemplateDrivenSelectComponent } from './template-driven/template-driven.docs';
import { WithInlineLabelSelectComponent } from './with-inline-label/with-inline-label.docs';
import { WithInlineMessageSelectComponent } from './with-inline-message/with-inline-message.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule,
    ErrorSelectComponent,
    DefaultSelectComponent,
    WithInlineLabelSelectComponent,
    DisabledSelectComponent,
    TemplateDrivenSelectComponent,
    WithInlineMessageSelectComponent,
    ModelDrivenSelectComponent,
    TemplateDrivenObjectSelectComponent,
    ModelDrivenObjectSelectComponent,
    MockDataSelectComponent,
    ReadOnlySelectComponent,
    TemplateDrivenFormSelectComponent,
    ModelDrivenFormSelectComponent,
    ModelDrivenFbSelectComponent
  ],
  standalone: true,
  selector: 'nova-workshop-select',
  templateUrl: './select.docs.html'
})
export class SelectDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Select');
    this.workshopService.neededAPI.set([
      { name: 'SelectDirective' },
      { name: 'InputContainerComponent', type: 'component' },
      { name: 'LabelDirective' },
      { name: 'InputMessageDirective' },
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
