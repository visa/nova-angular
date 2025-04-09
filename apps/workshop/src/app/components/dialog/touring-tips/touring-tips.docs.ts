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
import { DialogComponent, NovaLibModule } from '@visa/nova-angular';
import { VisaCloseTiny } from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-dialog-touring-tips',
  templateUrl: './touring-tips.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaCloseTiny]
})
export class NovaTouringTipsDialogComponent {
  readonly dialog = viewChild<DialogComponent, ElementRef<HTMLDialogElement>>(DialogComponent, {
    read: ElementRef
  });

  toggleDialog(open: boolean) {
    open ? this.dialog()?.nativeElement.showModal() : this.dialog()?.nativeElement.close();
  }
}
