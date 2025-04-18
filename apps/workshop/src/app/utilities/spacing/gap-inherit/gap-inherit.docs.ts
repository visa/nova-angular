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
import { Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';

@Component({
  imports: [NovaLibModule],
  standalone: true,
  styleUrl: '../gap.docs.scss',
  selector: 'nova-workshop-gap-inherit',
  templateUrl: './gap-inherit.docs.html',
  styles: [
    `
      .user-card {
        align-items: center;
        background: var(--palette-default-surface-1);
        display: flex;
        padding: var(--size-scalable-6) var(--size-scalable-80) var(--size-scalable-6) var(--size-scalable-20);
      }
    `
  ]
})
export class GapInheritComponent {}
