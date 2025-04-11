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
import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { ListboxItemComponent, NovaLibModule, NovaLibService } from '@visa/nova-angular';
import singleSelectBasic from '../example-data/single-select-basic';

/** #docs */
@Component({
  imports: [CommonModule, NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-listbox-single-select-automatic-selection',
  templateUrl: './single-select-automatic-selection.docs.html'
})
export class AutomaticSingleSelectListboxComponent implements AfterViewInit {
  @ViewChildren(ListboxItemComponent)
  listItems: QueryList<ListboxItemComponent>;

  items = singleSelectBasic;

  constructor(private novaLibService: NovaLibService) {}

  ngAfterViewInit(): void {
    this.novaLibService.addAutomaticActivation(this.listItems.toArray());
  }
}
