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
import { VisaInformationLow, VisaMaximizeTiny } from '@visa/nova-icons-angular';
import { MarkdownModule } from 'ngx-markdown';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { CharacterCounterInputComponent } from './character-counter/character-counter.docs';
import { DefaultInputComponent } from './default/default.docs';
import { DisabledInputComponent } from './disabled/disabled.docs';
import { ErrorInputComponent } from './error/error.docs';
import { InitialValueInputComponent } from './initial-value/initial-value.docs';
import { InlineInputComponent } from './inline/inline.docs';
import { InlineMessageInputComponent } from './inline-message/inline-message.docs';
import { LeadingIconInputComponent } from './leading-icon/leading-icon.docs';
import { ModelDrivenFbInputComponent } from './model-driven-fb/model-driven-fb.docs';
import { ModelDrivenFormInputComponent } from './model-driven-form/model-driven-form.docs';
import { ModelDrivenInputComponent } from './model-driven/model-driven.docs';
import { OneTimePasscodeInputComponent } from './one-time-passcode/one-time-passcode.docs';
import { PrefixInputComponent } from './prefix/prefix.docs';
import { ReadOnlyInputComponent } from './read-only/read-only.docs';
import { SuffixInputComponent } from './suffix/suffix.docs';
import { TemplateDrivenFormInputComponent } from './template-driven-form/template-driven-form.docs';
import { TemplateDrivenInputComponent } from './template-driven/template-driven.docs';
import { TextareaWithFixedHeightAndResizeInputComponent } from './textarea-with-fixed-height-and-resize/textarea-with-fixed-height-and-resize.docs';
import { TextareaWithFixedHeightInputComponent } from './textarea-with-fixed-height/textarea-with-fixed-height.docs';
import { TextareaWithNativeRowsAttributeInputComponent } from './textarea-with-native-rows-attribute/textarea-with-native-rows-attribute.docs';
import { TextareaWithoutResizeInputComponent } from './textarea-without-resize/textarea-without-resize.docs';
import { TextareaWithResizeInputComponent } from './textarea-with-resize/textarea-with-resize.docs';
import { WithActionButtonInputComponent } from './with-action-button/with-action-button.docs';
import { WithClearTextButtonInputComponent } from './with-clear-text-button/with-clear-text-button.docs';
import { WithMaskedFieldInputComponent } from './with-masked-field/with-masked-field.docs';

@Component({
  imports: [
    CommonModule,
    MarkdownModule,
    NovaLibModule,
    NovaSharedModule,
    FormsModule,
    ReactiveFormsModule,
    VisaMaximizeTiny,
    VisaInformationLow,
    CharacterCounterInputComponent,
    DefaultInputComponent,
    DefaultInputComponent,
    DisabledInputComponent,
    ErrorInputComponent,
    InitialValueInputComponent,
    InlineInputComponent,
    InlineMessageInputComponent,
    LeadingIconInputComponent,
    ModelDrivenFbInputComponent,
    ModelDrivenFormInputComponent,
    ModelDrivenInputComponent,
    OneTimePasscodeInputComponent,
    PrefixInputComponent,
    ReadOnlyInputComponent,
    ReadOnlyInputComponent,
    SuffixInputComponent,
    TemplateDrivenFormInputComponent,
    TemplateDrivenInputComponent,
    TextareaWithFixedHeightAndResizeInputComponent,
    TextareaWithFixedHeightInputComponent,
    TextareaWithFixedHeightInputComponent,
    TextareaWithNativeRowsAttributeInputComponent,
    TextareaWithoutResizeInputComponent,
    TextareaWithResizeInputComponent,
    WithActionButtonInputComponent,
    WithClearTextButtonInputComponent,
    WithMaskedFieldInputComponent
  ],
  standalone: true,
  selector: 'nova-workshop-input',
  templateUrl: './input.docs.html'
})
export class InputDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Input');
    this.workshopService.neededAPI.set([
      { name: 'InputDirective' },
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
