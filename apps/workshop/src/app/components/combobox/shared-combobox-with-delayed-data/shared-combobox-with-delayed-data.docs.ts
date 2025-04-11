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
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NovaLibModule, SelectDirective } from '@visa/nova-angular';
import { VisaChevronDownTiny } from '@visa/nova-icons-angular';
import { MockDataService } from '../../../shared/services/mock-data.service';
import { ComboboxItem, SharedComboboxDocsComponent } from './shared-combobox/shared-combobox.docs';
import { ExampleComponent } from '../../../shared/app-components/example/example.docs';

/** #custom */
@Component({
  selector: 'nova-workshop-combobox-shared-combobox-with-delayed-data',
  templateUrl: './shared-combobox-with-delayed-data.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, ExampleComponent, SharedComboboxDocsComponent, VisaChevronDownTiny]
})
export class DisplayedComboboxDocsComponent {
  @ViewChild(SelectDirective) select: SelectDirective;
  items: ComboboxItem[] = [];
  selectedValue: ComboboxItem;
  comboboxValue: { label: string; value: string | number | (string | number)[] } | null = null;

  /**
   * get value of select, note it's empty originally
   */
  selectChanged() {
    this.getMockData(this.select.value);
  }

  constructor(
    private mockDataService: MockDataService,
    private cdRef: ChangeDetectorRef
  ) {}

  getMockData(option: string) {
    switch (option) {
      case '1':
        this.mockDataService.getAgriProduce().subscribe((data: Array<any>) => {
          this.items = data;
          this.updateSelectedValue(this.items[0]);
        });
        break;
      case '2':
        this.mockDataService.getHeroes().subscribe((data: Array<any>) => {
          this.items = data;
          this.updateSelectedValue(this.items[0]);
        });
        break;
      case '3':
        this.mockDataService.getLargeData().subscribe((data: Array<any>) => {
          this.items = data.map((item) => {
            return { label: item.actor.login, value: item.id };
          });
          this.updateSelectedValue(this.items[0]);
        });
        break;
      default:
        console.log('No option selected');
    }
  }

  updateSharedValue(value: { label: string; value: string | number | (string | number)[] } | null) {
    this.comboboxValue = value;
    this.cdRef.detectChanges();
  }

  updateSelectedValue(value: ComboboxItem) {
    // wait for new list of items to render before setting new selected value
    setTimeout(() => {
      this.selectedValue = value;
    }, 0);
  }
}
