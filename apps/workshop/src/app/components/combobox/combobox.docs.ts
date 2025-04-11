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
import { MarkdownModule } from 'ngx-markdown';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { AutoAutocompleteComboboxComponent } from './auto-autocomplete/auto-autocomplete.docs';
import { DefaultComboboxComponent } from './default/default.docs';
import { DisabledComboboxComponent } from './disabled/disabled.docs';
import { DynamicDataSetComboboxComponent } from './dynamic-data-set/dynamic-data-set.docs';
import { ErrorComboboxComponent } from './error/error.docs';
import { CustomFilterComboboxComponent } from './fully-custom-filter/fully-custom-filter.docs';
import { HighlightOnCloseComboboxComponent } from './highlight-on-close/highlight-on-close.docs';
import { ManualAutocompleteComboboxComponent } from './manual-autocomplete/manual-autocomplete.docs';
import { ModelDrivenComboboxComponent } from './model-driven/model-driven.docs';
import { ReadOnlyComboboxComponent } from './read-only/read-only.docs';
import { TemplateDrivenComboboxComponent } from './template-driven/template-driven.docs';
import { WithClearButtonComboboxComponent } from './with-clear-button/with-clear-button.docs';
import { DisabledOptionComboboxComponent } from './with-disabled-option/with-disabled-option.docs';
import { WithInlineLabelComboboxComponent } from './with-inline-label/with-inline-label.docs';
import { WithInlineMessageComboboxComponent } from './with-inline-message/with-inline-message.docs';
import { WithLeadingIconComboboxComponent } from './with-leading-icon/with-leading-icon.docs';
import { ScrollBarComboboxComponent } from './with-scroll-bar/with-scroll-bar.docs';
import { WithSelectedOptionComboboxComponent } from './with-selected-option/with-selected-option.docs';
import { WithoutDropdownChevronComboboxComponent } from './without-dropdown-chevron/without-dropdown-chevron.docs';
import { OpenOnSelectComboboxComponent } from './open-on-select/open-on-select.docs';
import { InfiniteScrollComboboxComponent } from './infinite-scroll/infinite-scroll.docs';
import { ModelDrivenFbComboboxComponent } from './model-driven-fb/model-driven-fb.docs';
import { DisplayedComboboxDocsComponent } from './shared-combobox-with-delayed-data/shared-combobox-with-delayed-data.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule,
    AutoAutocompleteComboboxComponent,
    CustomFilterComboboxComponent,
    DefaultComboboxComponent,
    DisabledComboboxComponent,
    DisabledOptionComboboxComponent,
    DisplayedComboboxDocsComponent,
    DynamicDataSetComboboxComponent,
    ErrorComboboxComponent,
    HighlightOnCloseComboboxComponent,
    ManualAutocompleteComboboxComponent,
    ModelDrivenComboboxComponent,
    ModelDrivenFbComboboxComponent,
    ReadOnlyComboboxComponent,
    ScrollBarComboboxComponent,
    TemplateDrivenComboboxComponent,
    WithClearButtonComboboxComponent,
    WithInlineLabelComboboxComponent,
    WithInlineMessageComboboxComponent,
    WithLeadingIconComboboxComponent,
    WithSelectedOptionComboboxComponent,
    WithoutDropdownChevronComboboxComponent,
    OpenOnSelectComboboxComponent,
    InfiniteScrollComboboxComponent
  ],
  standalone: true,
  selector: 'vds-combobox',
  templateUrl: './combobox.docs.html',
  styles: [':host .docs-example { z-index: auto }']
})
export class ComboboxDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Combobox');
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
