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
import { Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';

@Component({
  imports: [NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-progress-determinate-circular-progress',
  templateUrl: './determinate-circular-progress.docs.html'
})
export class NovaDeterminateCircularProgressComponent {
  downloadProgress = 0;
  timer: number | null = null;
  srStatusMessage = '';
  updateProgress() {
    this.downloadProgress += 2;
    if (this.downloadProgress >= 100) {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      if (this.downloadProgress === 100) {
        this.srStatusMessage = 'Loading complete';
      }
    }
  }

  /**
   * NOVA-1920 Show progress over time
   */
  startProgress() {
    setTimeout(() => {
      this.srStatusMessage = 'Loading...';
    }, 500);
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    this.downloadProgress = 0;
    setTimeout(() => {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      /** In Angular, when using setInterval, the return type is number. However, in Node.js, setInterval returns a NodeJS.Timeout object */
      this.timer = setInterval(() => this.updateProgress(), 40) as unknown as number;
    }, 500);
  }

  resetProgress() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.downloadProgress = 0;
    this.srStatusMessage = '';
  }
}
