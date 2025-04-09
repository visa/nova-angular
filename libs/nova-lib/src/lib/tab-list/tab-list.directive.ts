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
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { ButtonDirective } from '../button/button.directive';
import { NovaLibService } from '../nova-lib.service';
import { TabItemDirective } from '../tab-item/tab-item.directive';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-tabs]'
})
export class TabListDirective implements AfterContentInit {
  @ContentChildren(TabListDirective, { descendants: true }) tabLists: QueryList<TabListDirective>;
  @ContentChildren(TabItemDirective) tabs: QueryList<TabItemDirective>;
  @ContentChildren(ButtonDirective, { descendants: true }) buttons: QueryList<ButtonDirective>;
  _roleSetByUser = false; // prevents parent component from overriding if role if role is given directly by user
  clickSubscriptions: any[] = [];
  activeSubscriptions: any[] = [];
  _nestedTabs: boolean = false;
  _inNav: boolean = false;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-tabs.v-tabs-&lt;orientation&gt;
   */
  @Input()
  get class(): string {
    return [this._class, 'v-tabs', this.vertical ? 'v-tabs-vertical' : 'v-tabs-horizontal'].join(' ');
  }
  set class(value: string) {
    this._class = value;
  }
  _class: string = '';
  @HostBinding('class')
  get hostClass(): string {
    return this.class;
  }

  /**
   * Sets tab list to vertical orientation when true.
   * @default false
   */
  @Input()
  get vertical(): BooleanInput {
    return this._vertical;
  }
  set vertical(value: BooleanInput) {
    this._vertical = coerceBooleanProperty(value);
  }
  _vertical: BooleanInput = false;
  @HostBinding('attr.aria-orientation')
  get hostOrientation(): string | void {
    if (this.vertical && !this._inNav) return 'vertical';
  }

  /**
   * Sets custom role.
   * @default 'tablist'
   * @default null if nested tab list or within Navigation.
   * @builtin true
   */
  @Input()
  get role(): string | null {
    return this._role;
  }
  set role(value: string | null) {
    this._role = value;
    this._roleSetByUser = true;
  }
  _role: string | null = 'tablist';
  @HostBinding('attr.role')
  get hostRole(): string | null {
    return this.role;
  }

  /**
   * Emits selected tab index when new tab is selected.
   */
  @Output() activeTabIndex = new EventEmitter<number>();

  constructor(
    private novaLibService: NovaLibService,
    private cdRef: ChangeDetectorRef,
    private el: ElementRef
  ) {}

  ngAfterContentInit(): void {
    if (this.tabLists) {
      if (this.tabLists.length > 0) {
        this._nestedTabs = true;
        this.setUpNestedTabs();
      }
      this.tabLists.changes.subscribe(() => {
        if (this.tabLists.length > 0) {
          this._nestedTabs = true;
          this.setUpNestedTabs();
        }
      });
    }
    if (this.tabs) {
      if (this.tabs.length > 0) this.setUpTabs();
      this.tabs.changes.subscribe(() => {
        this.activeSubscriptions.forEach((subscription) => subscription.unsubscribe());
        this.clickSubscriptions.forEach((subscription) => subscription.unsubscribe());
        this.activeSubscriptions = [];
        this.clickSubscriptions = [];
        this.setUpTabs();
        this.cdRef.detectChanges();
      });
    }
  }

  setUpNestedTabs() {
    // remove tab/tablist roles in nested tab lists
    // child button/a tags use aria-current="page" instead of aria-selected
    this.role = this._roleSetByUser ? this.role : null;
    this.tabLists.forEach((tablist) => {
      tablist.role = tablist._roleSetByUser ? tablist.role : null;

      tablist.tabs.toArray().forEach((tab) => {
        tab.role = tab._roleSetByUser && !tab._roleSetByTab ? tab.role : null;
        if (tab.button) {
          tab.button._isInNavOrNested = true;
          tab.button.role = tab.button._roleSetByUser && !tab.button._roleSetByTab ? tab.button.role : null;
          tab.button.ariaCurrent = tab.button.ariaSelected ? 'page' : null;
        }
      });
    });
  }

  setUpTabs() {
    if (this.buttons.length > 0) {
      if (!this._inNav) {
        this.setUpFocusListener();
        this.novaLibService.addArrowKeyNavigation(
          this.buttons.toArray(),
          true,
          this.vertical ? 'vertical' : 'horizontal'
        );
      }
    }
    this.tabs.toArray().forEach((tab, index) => {
      if (tab._roleSetByUser && !tab._roleSetByTab) {
        return;
      } else if (this.role && !tab.sectionTitle && !tab.disclosureTab && !tab.trigger) {
        tab.role = 'none';
      } else {
        tab.role = null;
      }
      this.activeSubscriptions[index] = tab.tabActive.subscribe(() => {
        this.novaLibService.deselectItems(this.tabs.toArray(), index);
      });

      this.clickSubscriptions[index] = tab.clicked.subscribe(() => {
        this.novaLibService.selectItem(this.tabs.toArray(), index);
      });

      if (tab.button) {
        if (!tab.button._roleSetByUser) {
          tab.button.role = this._nestedTabs ? null : 'tab';
          tab.button._roleSetByTab = true;
        }

        // if uer did not set button role on vertical tab, make medium
        if (
          this.vertical &&
          (!tab.button._buttonSizeSetByUser || (tab.button._buttonSizeSetByUser && tab._sizeSetByTab))
        ) {
          tab.button.buttonSize = 'medium';
        }

        if (!tab.disclosureTab && !tab.trigger && !tab.button.toggleIcon) {
          if (this.tabLists.length > 0) {
            tab.button.ariaCurrent = tab.active ? 'page' : null;
          } else {
            tab.button.ariaSelected = tab.active;
          }
        }
        this.cdRef.detectChanges();
      }
    });
  }

  setUpFocusListener() {
    this.buttons.toArray().forEach((button) => {
      button.listeners.push(
        button.blurred.subscribe((event) => {
          // if focus is leaving the tab list, find the starting focusable tab for when the list receives focus again
          // if focus stays in the tab list, relatedTarget will be a button within the tab list
          if (!event.relatedTarget || !!this.el.nativeElement.contains(event.target)) {
            this.novaLibService.findStartingFocus(this.buttons.toArray());
          }
        })
      );
    });
  }
}
