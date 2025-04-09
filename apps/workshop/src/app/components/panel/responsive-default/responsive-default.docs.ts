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
import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaCloseTiny } from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-panel-responsive-default',
  templateUrl: './responsive-default.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaCloseTiny]
})
export class DefaultResponsivePanelComponent {
  readonly closeButton = viewChild('closeButton', { read: ElementRef });
  readonly openButton = viewChild('openButton', { read: ElementRef });
  readonly panelOpen = signal(true);

  togglePanel() {
    this.panelOpen.update((open) => !open);

    // if panel is displayed, focus on close button, otherwise focus on open button
    if (this.panelOpen()) {
      setTimeout(() => {
        // set focus after button is visible
        this.closeButton()?.nativeElement.focus();
      });
    } else if (!this.panelOpen()) {
      this.openButton()?.nativeElement.focus();
    }
  }
}
