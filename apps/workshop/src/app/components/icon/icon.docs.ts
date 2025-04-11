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
import { NovaLibModule } from '@visa/nova-angular';
import { VisaInformationLow, VisaMaximizeTiny } from '@visa/nova-icons-angular';
import { APITypes } from '../../shared/services/workshop.constants';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { DefaultIconComponent } from './default/default.docs';
import { GenericIconComponent } from './generic/generic.docs';
import { HighResolutionIconComponent } from './high-resolution/high-resolution.docs';
import { LowResolutionIconComponent } from './low-resolution/low-resolution.docs';
import { RTLIconComponent } from './rtl/rtl.docs';
import { TinyResolutionIconComponent } from './tiny-resolution/tiny-resolution.docs';
import { UsingIconSpriteIconComponent } from './using-icon-sprite/using-icon-sprite.docs';
import { VisaIconComponent } from './visa/visa.docs';

@Component({
  imports: [
    CommonModule,
    VisaInformationLow,
    VisaMaximizeTiny,
    NovaLibModule,
    NovaSharedModule,
    DefaultIconComponent,
    GenericIconComponent,
    VisaIconComponent,
    UsingIconSpriteIconComponent,
    HighResolutionIconComponent,
    LowResolutionIconComponent,
    TinyResolutionIconComponent,
    RTLIconComponent
  ],
  standalone: true,
  selector: 'nova-docs-icon',
  templateUrl: './icon.docs.html'
})
export class IconDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Icon');
    this.workshopService.neededAPI.set([
      { name: 'IconComponent', type: APITypes.COMPONENT },
      { name: 'IconLibrary', type: APITypes.CONSTANT },
      { name: 'IconSize', type: APITypes.CONSTANT }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
