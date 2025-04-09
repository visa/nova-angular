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
import { AfterViewInit, Component, effect, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule, NovaLibService } from '@visa/nova-angular';
import { WorkshopService } from '../../services/workshop.service';

import { fromEvent } from 'rxjs';
import { filter, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'nova-workshop-on-this-page',
  templateUrl: './on-this-page-alm.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, RouterModule],
  styles: [
    `
      :host {
        display: flex;
        flex-grow: 1;
      }
      .v-anchor-link-menu {
        min-inline-size: 20%;
        flex-grow: 1;

        :is(section) {
          padding: 2px;
          padding-inline-start: 0;
        }

        :is(ul) {
          max-block-size: 80vh;
          overflow-y: auto;
          padding: var(--size-scalable-4);
        }
      }
    `
  ]
})
export class OnThisPageComponent implements AfterViewInit {
  items = input<{ name: string; id: string }[] | null>();
  associatedTab = input<number>(0);

  domItems: {
    linkID: string;
    linkRef: HTMLElement;
    exampleID: string;
    exampleRef: HTMLElement;
    heightFromTop: number;
    liRef: HTMLElement;
  }[] = [];

  constructor(
    private workshopService: WorkshopService,
    private novaLibService: NovaLibService
  ) {
    effect(() => {
      // when the this.content is scrolled, update the active section every 25ms
      if (this.workshopService.content())
        fromEvent(this.workshopService.content()?.nativeElement, 'scroll')
          .pipe(
            throttleTime(25),
            filter(() => this.associatedTab() === this.workshopService.selectedHeroTab())
          )
          .subscribe(() => this.calculateactiveLink());
    });

    let prevItems: { name: string; id: string }[] | null | undefined = this.items();
    effect(() => {
      // if the selected tab changes or the items change (page changes), recalculate the dom items
      if (
        (this.workshopService.selectedHeroTab() !== null || prevItems !== this.items()) &&
        this.associatedTab() === this.workshopService.selectedHeroTab()
      ) {
        setTimeout(() => {
          // give the dom a second to repopulate with new tab content
          this.getBaseDomElements();
          this.populateDomArray();
        });

        prevItems = this.items();
      }
    });
  }

  navigateTo(id: string) {
    this.workshopService.navigateTo(id, id + '-link');
  }

  ngAfterViewInit(): void {
    this.getBaseDomElements();
    this.populateDomArray();
  }

  _calculated = false;
  stickyALM: HTMLElement;
  private calculateactiveLink() {
    let currentSection: {
      linkID: string;
      liRef: HTMLElement;
    } | null = null;
    if (!this.workshopService.content()) return;
    const scrollTop = this.workshopService.content()!.nativeElement.scrollTop;
    let found = false;

    this.domItems?.forEach((section, index) => {
      // calculate *once* the height from the top of the page for each section
      // this must be done here because prior to this, the elements are not loaded
      if (!this._calculated) {
        this.domItems[index].heightFromTop = section.exampleRef?.offsetTop + section.exampleRef?.offsetHeight;
      }

      // if (
      //   Math.abs(
      //     this.workshopService.content()!.nativeElement.scrollHeight -
      //       this.workshopService.content()!.nativeElement.clientHeight -
      //       this.workshopService.content()!.nativeElement.scrollTop
      //   ) <= 1
      // ) {
      //   // if at the bottom of the page, set the last section as active
      //   currentSection = this.domItems?.[this.domItems.length - 1];
      // } else
      if (scrollTop < section.heightFromTop) {
        // if the scroll top is less than the height of the current section..
        if (index === 0) {
          // if at the top of the page, set the first section as active
          currentSection = section;
        }
        // otherwise, set found to true so we don't loop through any more items
        found = true;
      } else if (!found && scrollTop >= section.heightFromTop && this.domItems?.[index + 1]) {
        // if the scroll top is greater than the height of the current section, set the next section as active
        currentSection = this.domItems?.[index + 1];
      }
    });
    this._calculated = true;

    // set the aria-current attribute on the active section
    if (currentSection) {
      this.novaLibService.setAriaCurrent(currentSection['linkID']);
      if (this.stickyALM) this.scrollALMToActive(currentSection['liRef']);
    }
  }

  getBaseDomElements() {
    this.stickyALM = this.workshopService
      .content()
      ?.nativeElement.querySelector('nova-workshop-on-this-page .v-anchor-link-menu > section > ul') as HTMLElement;
  }

  populateDomArray() {
    // reset dom items and allow dom calculation to happen again on first scroll
    this.domItems = [];
    this._calculated = false;
    if (this.items() && this.items()!.length > 0) {
      // add a dom element for each item in list
      this.items()!.forEach((section) => {
        const link = document.querySelector('#' + section['id'] + '-link') as HTMLElement;
        const li = link?.parentElement as HTMLElement;
        const example = document.querySelector('#' + section['id'] + '-example') as HTMLElement;
        this.domItems.push({
          linkID: section['id'] + '-link',
          linkRef: link,
          exampleID: section['id'] + '-example',
          exampleRef: example,
          heightFromTop: 0,
          liRef: li
        });
      });

      if (!this.workshopService.urlFragment) {
        // if the url fragment is not set, set the first section as active
        this.novaLibService.setAriaCurrent(this.domItems[0].linkID);
      }

      if (this.workshopService.content()) {
        // reset content scroll to top
        this.workshopService.content()!.nativeElement.scrollTop = 0;
      }
    }
  }

  scrollALMToActive(liLink: HTMLElement) {
    if (liLink === this.stickyALM.firstChild) {
      // if li is the first child, scroll to top
      this.stickyALM.scrollTop = 0;
    } else if (
      liLink &&
      liLink.offsetTop + liLink.clientHeight > this.stickyALM.clientHeight + this.stickyALM.scrollTop
    ) {
      // if li is below the current view of the ALM, scroll down to it
      this.stickyALM.scrollBy({
        top: liLink.offsetTop + liLink.clientHeight - (this.stickyALM.offsetHeight - this.stickyALM.scrollTop)
      });
    } else if (liLink && liLink.offsetTop < this.stickyALM.scrollTop) {
      // if li is above the current view of the ALM, scroll up to it
      this.stickyALM.scrollBy({ top: -liLink.offsetTop });
    }
  }
}
