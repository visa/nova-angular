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
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { componentRoutesWithTitleWithHiddenRoutes } from '../../../components/components.routes';
import { servicesRoutesWithTitle } from '../../../services/services.routes';
import { utilitiesRoutesWithTitle } from '../../../utilities/utilities.routes';
import { SiteFooterComponent } from '../site-footer/site-footer.component';
import { SiteHeaderComponent } from '../site-header/site-header.component';
import { routeSorter } from '../site-nav/site-nav.component';
/** #docs */
@Component({
  selector: 'nova-workshop-site-map',
  templateUrl: './site-map.component.html',
  styleUrl: './site-map.component.scss',
  standalone: true,
  imports: [CommonModule, NovaLibModule, RouterModule, SiteHeaderComponent, SiteFooterComponent]
})
export class SiteMapComponent {
  navLinks = [
    { title: 'Getting Started', link: '../' },
    { title: 'Foundations', link: '../foundations/grid' }
  ];
  components = componentRoutesWithTitleWithHiddenRoutes.sort(routeSorter);
  services = servicesRoutesWithTitle.sort(routeSorter);
  utilities = utilitiesRoutesWithTitle.sort(routeSorter);
  siteMapData = [
    { title: 'Components', data: this.components },
    { title: 'Services', data: this.services },
    { title: 'Utilities', data: this.utilities }
  ];
}
