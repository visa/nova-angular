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
import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkDirective, NovaLibModule, NovaLibService } from '@visa/nova-angular';

@Component({
  imports: [NovaLibModule, RouterModule],
  standalone: true,
  selector: 'nova-workshop-anchor-link-menu-default',
  templateUrl: './default.docs.html'
})
export class NovaDefaultAnchorLinkMenuComponent implements AfterViewInit {
  @ViewChildren(LinkDirective) links: QueryList<LinkDirective>;
  constructor(private novaLibService: NovaLibService) {}

  ngAfterViewInit(): void {
    this.novaLibService.handleAriaCurrent(this.links);
  }
}
