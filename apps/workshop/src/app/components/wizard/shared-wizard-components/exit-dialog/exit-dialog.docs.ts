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
import { Component, ElementRef, Output, ViewChild } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaCloseTiny, VisaWarningLow } from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-wizard-shared-exit-dialog',
  templateUrl: './exit-dialog.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaWarningLow, VisaCloseTiny]
})
export class SharedWizardExitDialogComponent {
  @ViewChild('dialog', { read: ElementRef }) dialog: ElementRef<HTMLDialogElement>;

  openDialog() {
    this.dialog.nativeElement.showModal();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
  }
}
