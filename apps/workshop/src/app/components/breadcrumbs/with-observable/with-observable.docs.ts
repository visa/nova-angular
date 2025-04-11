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
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { of } from 'rxjs';

@Component({
  imports: [CommonModule, NovaLibModule, RouterModule],
  standalone: true,
  selector: 'nova-workshop-breadcrumbs-with-observable',
  templateUrl: './with-observable.docs.html'
})
export class WithObservableBreadcrumbsComponent {
  items = [
    { name: 'L1 label', route: '' },
    { name: 'L2 label', route: '/components/accordion' },
    { name: 'L3 label', route: './' }
  ];
  crumbsObservable = of(this.items);

  crumbSelected(crumb: { name: string; route: string }) {
    // Since only the non-last crumb can be selected, we need to remove all of the other crumbs from our list of crumbs
    this.items.splice(this.items.findIndex((current) => crumb.route === current.route) + 1);
  }

  addCrumb() {
    this.items.push({
      name: `L${this.next()} label`,
      route: `/level-${this.next()}`
    });
  }

  removeCrumb() {
    this.items.pop();
  }

  next() {
    return this.items.length + 1;
  }
}
