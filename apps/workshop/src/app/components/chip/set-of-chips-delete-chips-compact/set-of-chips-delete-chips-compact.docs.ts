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
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaClearAltTiny } from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-set-of-chips-delete-chips-compact',
  templateUrl: './set-of-chips-delete-chips-compact.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaClearAltTiny]
})
export class SetOfChipsDeleteChipsCompactChipComponent {
  initiallabels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7'];
  labels = this.initiallabels;

  makeButtonId(label: string) {
    return 'removable-compact-' + label.replace(/\s/g, '-').toLowerCase();
  }

  deleteLabel(labelToDelete: string) {
    let labelToFocus = '';
    for (let i = 0; i < this.labels.length; i++) {
      if (this.labels[i] === labelToDelete) {
        if (i === 0 && this.labels.length === 1) {
          // last only one in the list
          labelToFocus = 'removable-compact-reset-button';
        } else if (i === this.labels.length - 1) {
          // the last one in the list
          labelToFocus = this.makeButtonId(this.labels[i - 1]);
        } else {
          // not the last one in the list
          labelToFocus = this.makeButtonId(this.labels[i + 1]);
        }
        this.labels = this.labels.filter((item) => item != labelToDelete);
      }
    }
    let focusedElement = this.el.nativeElement.querySelector('#' + labelToFocus);
    if (focusedElement) {
      focusedElement.focus();
    }
  }

  reset() {
    this.labels = this.initiallabels;
  }

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
}
