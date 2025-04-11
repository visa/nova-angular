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
import { NovaLibModule } from '@visa/nova-angular';
import { VisaDeveloperHigh, VisaTransitTrainHigh, VisaWrenchHigh } from '@visa/nova-icons-angular';
import packageJson from 'package.json';
import { HeroComponent } from '../../app-components/hero/hero.component';
import { QuickStartComponent } from '../quick-start-guide/quick-start-guide.component';
import { SideBySideGuideComponent } from '../side-by-side-guide/side-by-side-guide.docs';

@Component({
  selector: 'nova-workshop-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NovaLibModule,
    QuickStartComponent,
    SideBySideGuideComponent,
    HeroComponent,
    VisaTransitTrainHigh,
    VisaWrenchHigh,
    VisaDeveloperHigh
  ]
})
export class HomeComponent {
  version = packageJson.version;
  isLoading: boolean = false;
  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.isLoading = true;
  }
}
