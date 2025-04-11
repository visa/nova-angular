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

@Component({
  imports: [NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-progress-live-progress-bar',
  templateUrl: './live-progress-bar.docs.html'
})
export class NovaLiveProgressBarProgressComponent {
  linearTimer: number | null = null;
  linearProgress = 0;
  linearMax = 256;
  percentage = 0;
  srStatusMessage = '';

  updateLinearProgress() {
    this.linearProgress += 2;
    this.percentage = Math.trunc((this.linearProgress / this.linearMax) * 100);
    if (this.linearProgress >= this.linearMax) {
      if (this.linearTimer) {
        clearInterval(this.linearTimer);
        this.linearTimer = null;
      }
    }
    if (this.linearProgress === 256) {
      this.srStatusMessage = 'Loading complete';
    }
  }

  /**
   * NOVA-1920 Show progress over time
   */
  startProgressLinear() {
    if (this.linearTimer) {
      clearInterval(this.linearTimer);
      this.linearTimer = null;
    }

    this.linearProgress = 0;
    setTimeout(() => {
      if (this.linearTimer) {
        clearInterval(this.linearTimer);
        this.linearTimer = null;
      }
      /** In Angular, when using setInterval, the return type is number. However, in Node.js, setInterval returns a NodeJS.Timeout object */
      this.linearTimer = setInterval(() => this.updateLinearProgress(), 40) as unknown as number;
      this.srStatusMessage = 'Loading...';
    }, 500);
  }

  resetProgress() {
    if (this.linearTimer) {
      clearInterval(this.linearTimer);
      this.linearTimer = null;
    }
    this.linearProgress = 0;
    this.percentage = 0;
    this.srStatusMessage = '';
  }
}
