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
import { Component, OnInit } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'nova-workshop-skip-to-content',
  template: `<span tabIndex="-1"></span
    ><a [routerLink]="'./' + currentRoute" fragment="content" v-link> skip to content </a>`,
  standalone: true,
  imports: [CommonModule, NovaLibModule, RouterModule]
})
export class SkipToContentComponent implements OnInit {
  currentRoute: string;

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.currentRoute = window.location.pathname;
    });
  }

  ngOnInit() {
    this.currentRoute = window.location.pathname;
  }
}
