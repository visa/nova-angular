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
import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaCloseTiny,
  VisaMaximizeTiny,
  VisaMenuTiny
} from '@visa/nova-icons-angular';
import { WorkshopService } from '../../../shared/services/workshop.service';
import { SkipToContentComponent } from '../../pages/docs-layout/skip-to-content.docs';

@Component({
  selector: 'nova-workshop-site-header',
  templateUrl: './site-header.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NovaLibModule,
    SkipToContentComponent,
    VisaMenuTiny,
    VisaMaximizeTiny,
    VisaChevronUpTiny,
    VisaChevronDownTiny,
    VisaCloseTiny
  ],
  styles: [
    `
      :host {
        .v-button.v-button-tertiary {
          --v-button-default-foreground: #fff;
        }
      }
    `
  ]
})
export class SiteHeaderComponent {
  constructor(
    private workshopService: WorkshopService,
    private router: Router
  ) {}

  @Input() content: ElementRef;

  @HostBinding('class')
  get hostClasses(): string {
    return 'layout__header';
  }
  currentRoute: string;
  sideNavOpen = this.workshopService.sideNavOpen;
  isDark = this.workshopService.isDarkTheme;
  isShown = false;
  version = this.workshopService.version;
  versionLinks = this.workshopService.versionLinks;
  supportLinks = this.workshopService.supportLinks;

  focusToContent() {
    // Update the URL with the fragment
    this.router.navigate([], { fragment: 'content' });

    // Set focus to the content element
    this.content.nativeElement.focus();
  }

  toggleTheme() {
    this.workshopService.toggleTheme();
  }
  toggleShown(_toggledOutput: boolean) {
    this.isShown = _toggledOutput;
  }
  toggleNav() {
    this.workshopService.toggleNav();
  }
}
