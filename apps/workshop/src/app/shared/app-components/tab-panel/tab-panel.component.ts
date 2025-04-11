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
import { Component, HostBinding, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopService } from '../../../shared/services/workshop.service';
import { NumberInput } from '@angular/cdk/coercion';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'nova-workshop-tab-panel',
  templateUrl: './tab-panel.component.html'
})
export class TabPanelComponent {
  @Input() index: NumberInput;

  @HostBinding('class')
  get hostClasses(): string {
    return this._showPanel() ? 'v-flex v-flex-row-reverse v-flex-wrap' : 'v-hide';
  }

  @HostBinding('style.block-size')
  get hostBlockSize(): string {
    return '100%';
  }

  constructor(private workshopService: WorkshopService) {}
  _showPanel = computed(() => this.index == this.workshopService.selectedHeroTab());
}
