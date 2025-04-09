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
import { Component, inject, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { WorkshopService } from './shared/services/workshop.service';
@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, NovaLibModule],
  selector: 'nova-workshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private workshopService: WorkshopService) {}

  private readonly router = inject(Router);

  isLoadingRouteConfig = false;
  ngOnInit(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof RouteConfigLoadStart) {
        this.isLoadingRouteConfig = true;
      } else if (ev instanceof RouteConfigLoadEnd) {
        this.isLoadingRouteConfig = false;
      }
    });
    // initialize themer style element
    this.workshopService.createThemeElement();
  }
}
