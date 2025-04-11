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
import { NovaLibModule } from '@visa/nova-angular';
import { MarkdownModule } from 'ngx-markdown';
import { NovaSharedModule } from '../../shared/nova-shared.module';

@Component({
  imports: [CommonModule, NovaLibModule, NovaSharedModule, MarkdownModule],
  standalone: true,
  selector: 'nova-workshop-floating-ui-service',
  templateUrl: './floating-ui.docs.html'
})
export class FloatingUIServiceDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Floating UI service');
    this.workshopService.neededAPI.set([{ name: 'FloatingUIService', type: 'service' }]);
  }
}
