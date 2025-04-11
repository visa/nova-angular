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
import { MarkdownModule } from 'ngx-markdown';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { ScreenreaderOnlyTableComponent } from './table/table.docs';
import { ScreenreaderOnlyProgressLabelComponent } from './progress-label/progress-label.docs';
import { ScreenreaderOnlyTextComponent } from './text/text.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    MarkdownModule,
    ScreenreaderOnlyTextComponent,
    ScreenreaderOnlyTableComponent,
    ScreenreaderOnlyProgressLabelComponent
  ],
  standalone: true,
  selector: 'nova-workshop-accessibility',
  templateUrl: './accessibility.docs.html'
})
export class AccessibilityComponent {
  constructor(private workshopService: WorkshopService) {
    this.workshopService.componentName.set('Accessibility');
    this.workshopService.neededAPI.set([{ name: 'ScreenreaderOnlyDirective' }]);
  }
}
