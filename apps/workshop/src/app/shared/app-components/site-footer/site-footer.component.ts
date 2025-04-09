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
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaMaximizeTiny } from '@visa/nova-icons-angular';
import { WorkshopService } from '../../../shared/services/workshop.service';

@Component({
  selector: 'nova-workshop-site-footer',
  templateUrl: './site-footer.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, NovaLibModule, VisaMaximizeTiny, VisaChevronUpTiny, VisaChevronDownTiny],
  providers: [HttpClient]
})
export class SiteFooterComponent implements OnInit {
  @HostBinding('class')
  get hostClasses(): string {
    return 'layout__footer';
  }
  themeList: { key: string; label: string }[];
  currentTheme: string | null;
  currentYear = new Date().getFullYear();
  checked: boolean = false;
  THEMEKEY = 'v-preferences-angular';

  constructor(
    private workshopService: WorkshopService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (window.localStorage.getItem(this.THEMEKEY)) {
      this.currentTheme = window.localStorage.getItem(this.THEMEKEY);
    } else {
      this.currentTheme = 'visa-light';
    }
    this.http.get('assets/themes/themes-list.json').subscribe((data: any) => {
      this.themeList = data;
    });
  }
  switch() {
    this.checked = !this.checked;
    document.body.setAttribute('dir', this.checked ? 'rtl' : 'ltr');
    this.workshopService.displayRTL.set(this.checked);
  }

  selectTheme(event: Event) {
    const newTheme = (event.target as HTMLSelectElement).value;
    this.currentTheme = newTheme;
    this.workshopService.setTheme(newTheme);
  }
}
