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
import { VisaInformationLow, VisaMaximizeTiny } from '@visa/nova-icons-angular';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { CustomButtonsDropdownmenuComponent } from './custom-buttons/custom-buttons.docs';
import { CustomLinksDropdownmenuComponent } from './custom-links/custom-links.docs';
import { FormDropdownmenuComponent } from './form/form.docs';
import { IconButtonDropdownmenuComponent } from './icon-button/icon-button.docs';
import { NativePopoverDropdownmenuComponent } from './native-popover/native-popover.docs';
import { TextButtonDropdownmenuComponent } from './text-button/text-button.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    VisaInformationLow,
    VisaMaximizeTiny,
    TextButtonDropdownmenuComponent,
    CustomLinksDropdownmenuComponent,
    FormDropdownmenuComponent,
    CustomButtonsDropdownmenuComponent,
    IconButtonDropdownmenuComponent,
    NativePopoverDropdownmenuComponent
  ],
  standalone: true,
  selector: 'nova-docs-dropdown-menu',
  templateUrl: './dropdown-menu.docs.html'
})
export class DropdownMenuDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Dropdown menu');
    this.workshopService.neededAPI.set([
      { name: 'DropdownMenuDirective' },
      { name: 'DropdownItemDirective' },
      { name: 'DropdownListDirective' },
      { name: 'AddArrowKeysDirective' },
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
