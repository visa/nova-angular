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
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  HostBinding,
  Input,
  QueryList
} from '@angular/core';
import { NovaLibService } from '../nova-lib.service';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { TabListDirective } from '../tab-list/tab-list.directive';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-nav]'
})
export class NavDirective implements AfterContentInit {
  @ContentChildren(TabListDirective, { descendants: true }) tabLists: QueryList<TabListDirective>;
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-nav
   */
  @Input()
  get class(): string {
    return [
      this._class,
      'v-nav',
      this.vertical ? 'v-nav-vertical' : 'v-nav-horizontal',
      this.drawer ? 'v-nav-drawer' : ''
    ].join(' ');
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
   * Sets navigation to vertical orientation when true.
   * @default false
   */
  @Input()
  get vertical(): boolean {
    return this._vertical;
  }
  set vertical(value: BooleanInput) {
    this._vertical = coerceBooleanProperty(value);
  }
  _vertical: boolean = false;

  /**
   * Sets navigation to drawer variation when true.
   * @default false
   */
  @Input()
  get drawer(): boolean {
    return this._drawer;
  }
  set drawer(value: BooleanInput) {
    this._drawer = coerceBooleanProperty(value);
  }
  _drawer: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private novaLibService: NovaLibService
  ) {}

  ngAfterContentInit(): void {
    if (this.tabLists) {
      if (this.tabLists.length > 0) {
        this.setUpTabLists();

        this.tabLists.changes.subscribe(() => {
          this.setUpTabLists();
        });
      }
    }
  }

  setUpTabLists() {
    // for all instances of TabListDirective
    this.tabLists.forEach((list) => {
      list._inNav = true;
      list.role = list._roleSetByUser ? list.role : null;

      if (list.tabs) {
        if (list.tabs.length > 0) {
          this.setUpTabs(list);
        }

        list.tabs.changes.subscribe(() => {
          this.setUpTabs(list);
        });
      }
      this.cdRef.detectChanges();
    });
  }

  setUpTabs(list: TabListDirective) {
    if (list.buttons) {
      // remove arrow key navigation from tabs as links (in navigation)
      this.novaLibService.resetNavigationBehaviors(list.buttons.toArray());
    }
    // tabs = array of TabItemDirective
    list.tabs.forEach((tab: TabItemDirective) => {
      tab.role = tab._roleSetByUser && !tab._roleSetByTab ? tab.role : null;

      if (tab.button) {
        tab.button._isInNavOrNested = true;
        tab.button.role = tab.button._roleSetByUser && !tab.button._roleSetByTab ? tab.button.role : null;
      }
      this.cdRef.detectChanges();
    });
  }
}
