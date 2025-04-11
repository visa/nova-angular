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
import { Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { CommonModule } from '@angular/common';
import { VisaMediaPlayAltTiny, VisaMediaPauseAltTiny } from '@visa/nova-icons-angular';

@Component({
  imports: [NovaLibModule, CommonModule, VisaMediaPlayAltTiny, VisaMediaPauseAltTiny],
  standalone: true,
  selector: 'nova-workshop-progress-custom-linear-progress',
  templateUrl: './custom-linear-progress.docs.html'
})
export class NovaCustomLinearProgressComponent {
  constructor() {}

  isPaused = false;
  togglePause() {
    this.isPaused = !this.isPaused;
  }

  srStatusMessage = 'Loading';
  initiate: boolean = false;
  initiateProgress() {
    this.initiate = !this.initiate;
    setTimeout(() => {
      this.srStatusMessage = this.initiate ? 'Loading' : '';
    }, 500);
  }

  resetProgress() {
    this.initiate = false;
    this.srStatusMessage = '';
    this.isPaused = false;
  }
}
