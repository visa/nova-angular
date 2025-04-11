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
import { VisaMaximizeTiny } from '@visa/nova-icons-angular';
import { MarkdownModule } from 'ngx-markdown';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { AlternateComponent } from './alternate/alternate.docs';
import { SurfaceDefaultComponent } from './surface/surface.docs';

@Component({
  imports: [
    CommonModule,
    AlternateComponent,
    SurfaceDefaultComponent,
    NovaLibModule,
    NovaSharedModule,
    MarkdownModule,
    VisaMaximizeTiny
  ],
  standalone: true,
  selector: 'nova-workshop-surface',
  templateUrl: './surface.docs.html'
})
export class SurfaceComponent {
  constructor(private workshopService: WorkshopService) {
    this.workshopService.componentName.set('Surface');
    this.workshopService.neededAPI.set([{ name: 'SurfaceDirective' }, { name: 'AlternateDirective' }]);
  }
}
