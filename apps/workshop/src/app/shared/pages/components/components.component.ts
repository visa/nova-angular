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
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaChevronLinkTiny, VisaCloseTiny, VisaSearchLow } from '@visa/nova-icons-angular';
import { componentRoutesWithTitleWithHiddenRoutes } from '../../../components/components.routes';
import { ThumbnailComponent } from '../../app-components/thumbnail/thumbnail';

@Component({
  selector: 'nova-workshop-components',
  templateUrl: './components.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NovaLibModule,
    VisaCloseTiny,
    VisaChevronLinkTiny,
    VisaSearchLow,
    ThumbnailComponent
  ]
})
export class ComponentsPageComponent {
  @ViewChild('search') search: ElementRef;
  components = componentRoutesWithTitleWithHiddenRoutes.sort((a, b) => {
    var compA = a.path?.toUpperCase() || '';
    var compB = b.path?.toUpperCase() || '';

    return compA?.localeCompare(compB);
  });

  filteredComponents = this.components;

  setFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.value === '') this.filteredComponents = this.components;
    this.filteredComponents = this.components.filter((component) =>
      component.path?.split('-').join(' ').includes(target.value.toLowerCase())
    );
  }
  clearValue() {
    // this.filteredComponents = this.components;
    this.search.nativeElement.focus();
  }
}
