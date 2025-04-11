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
import { ChangeDetectorRef, Component, effect } from '@angular/core';
import { WorkshopService } from '../../../shared/services/workshop.service';
import { CommonModule } from '@angular/common';
import { NovaLibModule } from '@visa/nova-angular';
import { GlobalBannerComponent } from '../global-banner/global-banner.component';

@Component({
  selector: 'nova-workshop-page-hero',
  templateUrl: './page-hero.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule]
})
export class PageHeroComponent {
  componentName: string;

  constructor(
    private workshopService: WorkshopService,
    private cdRef: ChangeDetectorRef
  ) {
    effect(() => {
      this.componentName = this.workshopService.componentName();
      this.cdRef.detectChanges();
    });
  }
}
