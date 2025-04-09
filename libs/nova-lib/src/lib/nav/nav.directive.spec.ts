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
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from '../../test-helper';
import { ButtonDirective } from '../button/button.directive';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { TabListDirective } from '../tab-list/tab-list.directive';
import { NavDirective } from './nav.directive';

@Component({
  template: `<header v-nav>
    <nav aria-label="horizontal links">
      <ul v-tabs>
        <li v-tab-item>
          <a v-button buttonColor="tertiary" buttonSize="large" href="./components/nav">L1 label 1</a>
        </li>
        <li v-tab-item>
          <a v-button buttonColor="tertiary" buttonSize="large" href="./components/nav">L1 label 2</a>
        </li>
        <li v-tab-item>
          <a v-button buttonColor="tertiary" buttonSize="large" href="./components/nav">L1 label 3</a>
        </li>
        <li v-tab-item *ngIf="tabShow">
          <a v-button buttonColor="tertiary" buttonSize="large" href="./components/nav">L1 label 4</a>
        </li>
      </ul>
      <ul v-tabs *ngIf="listShow">
        <li v-tab-item>
          <a v-button buttonColor="tertiary" buttonSize="large" href="./components/nav">L1 label 1</a>
        </li>
        <li v-tab-item>
          <a v-button buttonColor="tertiary" buttonSize="large" href="./components/nav">L1 label 2</a>
        </li>
      </ul>
    </nav>
  </header> `,
  imports: [NavDirective, TabItemDirective, TabListDirective, ButtonDirective]
})
class TestComponent {
  @ViewChild(NavDirective) nav: NavDirective;
  tabShow: boolean = false;
  listShow: boolean = false;
}

describe('NavDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directiveDebugElement;

  configureTestSuite();

  beforeEach(() => {
    // configure and create the component
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NavDirective, TabItemDirective, TabListDirective, ButtonDirective]
    }).createComponent(TestComponent);
    component = fixture.componentInstance;

    // render and bind
    fixture.detectChanges();

    // acquire the directive
    directiveDebugElement = fixture.debugElement.query(By.directive(NavDirective));
  });

  it('should create', () => {
    expect(directiveDebugElement).toBeTruthy();
  });

  describe('classes and inputs', () => {
    it('should have the correct default classes', () => {
      expect(component.nav.class).toContain('v-nav v-nav-horizontal');
    });

    it('should allow for custom classes', () => {
      component.nav.class = 'test-class';
      fixture.detectChanges();
      expect(component.nav.class).toContain('test-class');
    });

    it('should have the correct vertical class when vertical is true', () => {
      component.nav.vertical = true;
      fixture.detectChanges();
      expect(component.nav.class).toContain('v-nav-vertical');
    });

    it('should have the correct drawer class when drawer is true', () => {
      component.nav.drawer = true;
      fixture.detectChanges();
      expect(component.nav.class).toContain('v-nav-drawer');
    });
  });

  describe('children tabs', () => {
    it('should have a tab list', () => {
      expect(component.nav.tabLists.length).toBe(1);
    });

    it('should have 3 tab items', () => {
      expect(component.nav.tabLists.first.tabs.length).toBe(3);
    });

    it('should have 4 tab items when show is true', () => {
      const numberTabs = component.nav.tabLists.first.tabs.length;
      expect(component.nav.tabLists.first.tabs.length).toBe(numberTabs);
      component.tabShow = true;
      fixture.detectChanges();
      expect(component.nav.tabLists.first.tabs.length).toBe(numberTabs + 1);
    });

    it('should recognize change in tab list length', () => {
      const spy = jest.spyOn(component.nav, 'setUpTabLists');

      component.listShow = true;
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      expect(component.nav.tabLists.length).toBe(2);
    });

    describe('tab list aria attributes', () => {
      it('should remove roles from tablist if none is given', () => {
        expect(component.nav.tabLists.first.role).toBeFalsy();
      });

      it('should set the role to tablist if given', () => {
        component.nav.tabLists.first.role = 'tablist';
        fixture.detectChanges();
        expect(component.nav.tabLists.first.role).toBe('tablist');
      });

      it('should remove roles from tabs if none is given', () => {
        expect(component.nav.tabLists.first.tabs.first.role).toBeFalsy();
      });

      it('should set the role to none on tab if given', () => {
        component.nav.tabLists.first.tabs.first.role = 'none';
        fixture.detectChanges();
        expect(component.nav.tabLists.first.tabs.first.role).toBe('none');
      });
    });

    describe('tab action (button) aria attributes', () => {
      it('should set the role to none if no role is given', () => {
        expect(component.nav.tabLists.first.tabs.first.role).toBeFalsy();
      });

      it('should set the role to tab if given', () => {
        component.nav.tabLists.first.tabs.first.button.role = 'tab';
        fixture.detectChanges();
        expect(component.nav.tabLists.first.tabs.first.button.role).toBe('tab');
      });

      it('should set button to be in a nav', () => {
        expect(component.nav.tabLists.first.tabs.first.button._isInNavOrNested).toBe(true);
      });

      it('should remove button aria-selected', () => {
        const firstBtn = fixture.nativeElement.querySelector('[v-button]');
        if (firstBtn) expect(firstBtn.getAttribute('aria-selected')).toBe(null);
      });
    });
  });
});
