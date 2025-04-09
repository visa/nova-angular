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

@Component({
  imports: [CommonModule, NovaLibModule, RouterModule],
  standalone: true,
  selector: 'nova-workshop-breadcrumbs-using-service-to-get-active-crumb',
  templateUrl: './service-based-active-crumb.docs.html'
})
export class ServiceBasedActiveCrumbBreadcrumbsComponent implements OnInit {
  constructor(private novaLibService: NovaLibService) {}

  activeIndex: number;
  pages = [
    { path: '/', text: 'L1 label' },
    { path: '/components', text: 'L2 label' },
    { path: '/components', text: 'L3 label' },
    { path: '/components/breadcrumbs', text: 'L4 label' },
    { path: '/examples/components/breadcrumbs/service-based-active-crumb', text: 'L5 label' }
  ];

  ngOnInit(): void {
    this.novaLibService.routeChange.subscribe((route) => {
      this.activeIndex = this.pages.findIndex((page) => page.path === route);
    });
    const route = this.novaLibService.getCurrentRoute();
    this.activeIndex = this.pages.findIndex((page) => page.path === route);
  }
}
