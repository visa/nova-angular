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
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule, NovaLibService } from '@visa/nova-angular';
import { VisaChevronRightTiny, VisaFolderTiny, VisaOptionHorizontalTiny } from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-breadcrumbs-with-custom-items',
  templateUrl: './custom-items.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, RouterModule, VisaOptionHorizontalTiny, VisaFolderTiny, VisaChevronRightTiny]
})
export class CustomItemsBreadcrumbsComponent implements OnInit {
  constructor(private novaLibService: NovaLibService) {}

  activeIndex: number;
  currentCrumbCount: number;
  crumbLimit = 1;
  pages = [
    { path: '', text: 'L1 label', icon: 'folder' },
    { path: '/components', text: 'L2 label' },
    { path: '/components', text: 'L3 label' },
    { path: '/components/#', text: 'L4 label' },
    { path: '/components/breadcrumbs', text: 'L5 label' },
    { path: '/examples/components/breadcrumbs/custom-items', text: 'L6 label' }
  ];

  ngOnInit(): void {
    this.novaLibService.routeChange.subscribe((route) => {
      this.activeIndex = this.pages.findIndex((page) => page.path === route);
      this.currentCrumbCount = this.pages.slice(0, this.activeIndex).length;
    });
    const route = this.novaLibService.getCurrentRoute();
    this.activeIndex = this.pages.findIndex((page) => page.path === route);
    this.currentCrumbCount = this.pages.slice(0, this.activeIndex).length;
  }

  showOverflow() {
    this.crumbLimit = this.currentCrumbCount;
  }
}
