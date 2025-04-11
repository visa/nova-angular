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
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { NovaFooterDefaultComponent } from './default/default.docs';
import { NovaFooterExtendedComponent } from './extended/extended.docs';

@Component({
  imports: [CommonModule, NovaSharedModule, NovaLibModule, NovaFooterDefaultComponent, NovaFooterExtendedComponent],
  standalone: true,
  selector: 'nova-workshop-footer',
  templateUrl: './footer.docs.html'
})
export class FooterDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Footer');
    this.workshopService.neededAPI.set([
      { name: 'FooterDirective', type: 'directive' },
      { name: 'VisaLogoComponent', type: 'component' },
      { name: 'LogoColor', type: 'constant' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
