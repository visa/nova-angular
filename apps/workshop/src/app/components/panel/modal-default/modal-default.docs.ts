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
import { Component, ElementRef, viewChild } from '@angular/core';
import { NovaLibModule, PanelComponent } from '@visa/nova-angular';
import { VisaCloseTiny } from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-panel-modal-default',
  templateUrl: './modal-default.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaCloseTiny]
})
export class ModalDefaultPanelComponent {
  readonly panel = viewChild<PanelComponent, ElementRef<HTMLDialogElement>>(PanelComponent, {
    read: ElementRef
  });

  togglePanel(open: boolean) {
    open ? this.panel()?.nativeElement.showModal() : this.panel()?.nativeElement.close();
  }
}
