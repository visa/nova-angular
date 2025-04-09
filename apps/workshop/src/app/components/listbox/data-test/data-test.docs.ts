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
import { Component, OnInit } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import singleSelectBasic from '../example-data/single-select-basic';

/** #docs */

/** @ignore */
@Component({
  imports: [CommonModule, NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-listbox-data-test',
  templateUrl: './data-test.docs.html'
})
export class DataTestListboxComponent implements OnInit {
  fullArr = singleSelectBasic;
  max = this.fullArr.length - 1;
  items: { value: string; label: string }[] = [];

  ngOnInit() {
    this.createArray();
  }

  onChange() {
    this.items = [];
    this.createArray();
  }

  getRandomNumbers() {
    return Math.floor(Math.random() * this.max);
  }

  createArray() {
    for (let i = 0; i < 3; i++) {
      let random = this.getRandomNumbers();
      while (this.items.includes(this.fullArr[random])) {
        random = this.getRandomNumbers();
      }
      this.items.push(this.fullArr[random]);
    }
  }
}
