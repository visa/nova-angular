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
import { RouterModule } from '@angular/router';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaMaximizeTiny } from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-hero',
  templateUrl: './hero.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, NovaLibModule, VisaMaximizeTiny]
})
export class HeroComponent implements OnInit {
  @HostBinding('class')
  get hostClasses(): string {
    return 'home__hero';
  }

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) {
        this.onClick(fragment);
      }
    });
  }

  public onClick(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView(true);
  }
}
