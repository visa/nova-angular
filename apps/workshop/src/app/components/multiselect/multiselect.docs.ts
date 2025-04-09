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
import { MarkdownModule } from 'ngx-markdown';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectWithMultipleSelectionsAndVerticalScrollComponent } from './with-multiple-selections-and-vertical-scroll/with-multiple-selections-and-vertical-scroll.docs';
import { DefaultMultiselectComponent } from './default/default.docs';
import { ReadOnlyMultiselectComponent } from './read-only/read-only.docs';
import { InlineMessageMultiselectComponent } from './inline-message/inline-message.docs';
import { WithoutDropdownChevronMultiselectComponent } from './without-dropdown-chevron/without-dropdown-chevron.docs';
import { ErrorMultiselectComponent } from './error/error.docs';
import { DisabledMultiselectComponent } from './disabled/disabled.docs';
import { WithScrollMultiselectComponent } from './with-scroll-bar/with-scroll-bar.docs';
import { SelectAndUnselectAllMenuMultiselectComponent } from './with-select-and-unselect-all-buttons/with-select-and-unselect-all-buttons.docs';
import { WithDisabledOptionMultiselectComponent } from './with-disabled-option/with-disabled-option.docs';
import { InfiniteScrollMultiselectComponent } from './infinite-scroll/infinite-scroll.docs';
import { AutoAutocompleteMultiselectComponent } from './auto-autocomplete/auto-autocomplete.docs';
import { ManualAutocompleteMultiselectComponent } from './manual-autocomplete/manual-autocomplete.docs';
import { ModelDrivenMultiselectComponent } from './model-driven/model-driven.docs';
import { ModelDrivenFbMultiselectComponent } from './model-driven-fb/model-driven-fb.docs';
import { ModelDrivenProgrammticSelectionMultiselectComponent } from './model-driven-with-programmatic-selection/model-driven-with-programmatic-selection.docs';
import { TemplateDrivenProgrammaticSelectionMultiselectComponent } from './template-driven-with-programmatic-selection/template-driven-with-programmatic-selection.docs';
import { TemplateDrivenMultiselectComponent } from './template-driven/template-driven.docs';
import { ArchivedMultiselectComponent } from './archived/archived.docs';
import { VisaInformationLow } from '@visa/nova-icons-angular';

@Component({
  standalone: true,
  selector: 'vds-docs-multiselect',
  templateUrl: './multiselect.docs.html',
  imports: [
    CommonModule,
    MarkdownModule,
    NovaLibModule,
    NovaSharedModule,
    FormsModule,
    ReactiveFormsModule,
    VisaInformationLow,
    ArchivedMultiselectComponent,
    AutoAutocompleteMultiselectComponent,
    DefaultMultiselectComponent,
    DisabledMultiselectComponent,
    ErrorMultiselectComponent,
    InfiniteScrollMultiselectComponent,
    InlineMessageMultiselectComponent,
    ManualAutocompleteMultiselectComponent,
    ModelDrivenFbMultiselectComponent,
    ModelDrivenMultiselectComponent,
    // ModelDrivenProgrammticSelectionMultiselectComponent,
    MultiselectWithMultipleSelectionsAndVerticalScrollComponent,
    ReadOnlyMultiselectComponent,
    SelectAndUnselectAllMenuMultiselectComponent,
    TemplateDrivenMultiselectComponent,
    // TemplateDrivenProgrammaticSelectionMultiselectComponent,
    WithDisabledOptionMultiselectComponent,
    WithoutDropdownChevronMultiselectComponent,
    WithScrollMultiselectComponent
  ]
})
export class MultiselectDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Multiselect');
    this.workshopService.neededAPI.set([
      { name: 'ComboboxDirective' },
      { name: 'FloatingUIContainer' },
      { name: 'InputContainerComponent', type: 'component' },
      { name: 'LabelDirective' },
      { name: 'InputDirective' },
      { name: 'FloatingUITriggerDirective', type: 'directive' },
      { name: 'ListboxDirective' },
      { name: 'ListboxItemComponent' },
      { name: 'FloatingUIElementDirective', type: 'directive' },
      { name: 'IconToggleComponent', type: 'component' },
      { name: 'ComboboxService', type: 'service-source' },
      { name: 'ListboxService', type: 'service-source' },
      { name: 'FloatingUIService', type: 'service-source' },
      { name: 'AppReadyService', type: 'service-source' },
      { name: 'UUIDService', type: 'service-source' },
      { name: 'NovaLibService', type: 'service-source' },
      { name: 'ComboboxFilterType', type: 'constant' },
      { name: 'FloatingUIPlacements', type: 'constant' },
      { name: 'FloatingUIVisibility', type: 'constant' },
      { name: 'IconToggle', type: 'constant' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
