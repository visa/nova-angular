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
import { ESCAPE_KEY, NovaLibModule } from '@visa/nova-angular';
import { VisaCloseLow, VisaCloseTiny, VisaInformationLow, VisaWarningLow } from '@visa/nova-icons-angular';

/** #custom */
@Component({
  selector: 'nova-workshop-dialog-confirmation',
  templateUrl: './confirmation-dialog.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaInformationLow, VisaCloseLow, VisaWarningLow, VisaCloseTiny]
})
export class NovaConfirmationDialogComponent {
  // NOTE: for your project you may want to use `viewChildren` instead which will return an array of all matching children. We use two separate `viewChild` here for demo purposes only.
  readonly dialog1 = viewChild<ElementRef, ElementRef<HTMLDialogElement>>('dialog1', {
    read: ElementRef
  });
  readonly dialog2 = viewChild<ElementRef, ElementRef<HTMLDialogElement>>('dialog2', {
    read: ElementRef
  });

  firstDialogOpen = false;

  showModal() {
    this.dialog1()?.nativeElement.showModal();
    this.firstDialogOpen = true;
  }
  showSecondModal() {
    this.dialog2()?.nativeElement.showModal();
  }
  closeAll() {
    // close the dialogs in reverse order so focus is placed on the correct previous element
    this.dialog2()?.nativeElement.close();
    this.dialog1()?.nativeElement.close();
    this.firstDialogOpen = false;
  }
  closeSecondModal() {
    this.dialog2()?.nativeElement.close();
  }

  handleFirstModalEscape(event: KeyboardEvent) {
    if (event.key === ESCAPE_KEY && this.firstDialogOpen) {
      event.preventDefault();
      this.showSecondModal();
    }
  }

  handleSecondModalEscape(event: KeyboardEvent) {
    if (event.key === ESCAPE_KEY) {
      event.preventDefault();
      this.closeAll();
    }
  }
}
