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
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { ButtonDisabledDirective } from '../button-disabled/button-disabled.directive';
import { ButtonDirective } from '../button/button.directive';
import { NovaLibService } from '../nova-lib.service';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { TabListDirective } from './tab-list.directive';

@Component({
  template: `<ul v-tabs>
    <li v-tab-item>
      <button v-button>Introduction</button>
    </li>
    <li v-tab-item>
      <button v-button>Visa</button>
    </li>
    <li v-tab-item>
      <button v-button>Accordion</button>
    </li>
    <li v-tab-item>
      <button v-button>Chat</button>
    </li>
    <li *ngIf="show" v-tab-item><button v-button>Dynamic</button></li>
  </ul>`
})
class TestTabListDirective {
  @ViewChild(TabListDirective) tabList: TabListDirective;
  show: boolean = false;
}

@Component({
  template: `<ul v-tabs>
    <ul v-tabs>
      <li v-tab-item>
        <button v-button>Introduction</button>
      </li>
      <li v-tab-item>
        <button v-button>Visa</button>
      </li>
      <li v-tab-item>
        <button v-button>Accordion</button>
      </li>
      <li v-tab-item>
        <button v-button>Chat</button>
      </li>
      <li *ngIf="show" v-tab-item><button v-button>Dynamic</button></li>
    </ul>
    <li v-tab-item>
      <button v-button>Visa</button>
    </li>
    <li v-tab-item>
      <button v-button>Accordion</button>
    </li>
    <li v-tab-item>
      <button v-button>Chat</button>
    </li>
    <li *ngIf="show" v-tab-item><button v-button>Dynamic</button></li>
  </ul>`
})
class NestedTestTabListDirective {
  @ViewChild(TabListDirective) tabList: TabListDirective;
  show: boolean = false;
}

describe('TabListDirective', () => {
  describe('class', () => {
    let component: TestTabListDirective;
    let fixture: ComponentFixture<TestTabListDirective>;
    let nativeTabList: HTMLElement;
    let firstNativeTab: HTMLElement;
    let firstTab: TabItemDirective;
    const mockNovaService = {
      selectItem: jest.fn(),
      deselectItems: jest.fn(),
      addArrowKeyNavigation: jest.fn(),
      findStartingFocus: jest.fn()
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestTabListDirective],
        imports: [TabListDirective, TabItemDirective, ButtonDirective, ButtonDisabledDirective],
        providers: [{ provide: NovaLibService, useValue: mockNovaService }]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestTabListDirective);
      component = fixture.componentInstance;
      nativeTabList = fixture.nativeElement.querySelector('[v-tabs]');
      firstNativeTab = fixture.nativeElement.querySelector('[v-tab-item]');
      fixture.detectChanges();
      firstTab = component.tabList.tabs.first;
    });

    it('should exist', () => {
      expect(component.tabList).toBeTruthy();
    });

    describe('Input properties', () => {
      it('should have v-tabs class by default', () => {
        expect(nativeTabList.classList.toString()).toEqual(expect.stringContaining('v-tabs'));
      });

      it('should have v-tabs-vertical class when vertical is true', () => {
        component.tabList.vertical = true;
        fixture.detectChanges();
        expect(nativeTabList.classList.toString()).toEqual(expect.stringContaining('v-tabs-vertical'));
      });

      it('should allow custom classes', () => {
        component.tabList.class = 'v-tabs-custom';
        fixture.detectChanges();
        expect(nativeTabList.classList.toString()).toEqual(expect.stringContaining('v-tabs-custom'));
      });

      it('should have role = tablist by default', () => {
        expect(nativeTabList.getAttribute('role')).toEqual('tablist');
      });

      it('should allow custom roles', () => {
        component.tabList.role = 'none';
        fixture.detectChanges();
        expect(nativeTabList.getAttribute('role')).toEqual('none');
      });
    });

    describe('Events', () => {
      it('should call selectItem on click', () => {
        const button = firstTab.button.el.nativeElement;
        button.click();
        fixture.detectChanges();
        expect(mockNovaService.selectItem).toHaveBeenCalled();
      });

      it('should call deselectItems when an item becomes active', () => {
        firstTab.active = true;
        fixture.detectChanges();
        expect(mockNovaService.deselectItems).toHaveBeenCalled();
      });
    });

    it('should update subscriptions when the tab items change', () => {
      const numberTabs = component.tabList.tabs.length;
      component.show = true;
      fixture.detectChanges();
      expect(component.tabList.clickSubscriptions.length).toEqual(numberTabs + 1);
    });

    it('should set up nested tabs correctly', () => {
      component.tabList.setUpNestedTabs();

      expect(firstTab.button.role).toEqual('tab');
    });

    it('should not call findStartingFocus if focus stays within the tab list', () => {
      component.tabList.setUpFocusListener();
      const button = component.tabList.buttons.first;
      button.blurred.emit({ relatedTarget: button.el.nativeElement, target: button.el.nativeElement });
      fixture.detectChanges();
      expect(mockNovaService.findStartingFocus).toHaveBeenCalled();
    });

    it('should set up focus listener correctly', () => {
      component.tabList.setUpFocusListener();
      const button = component.tabList.buttons.first;
      button.blurred.emit({ relatedTarget: null, target: button.el.nativeElement });
      fixture.detectChanges();
      expect(mockNovaService.findStartingFocus).toHaveBeenCalled();
    });
  });

  describe('rendering', () => {
    it('should render nested tabs correctly', async () => {
      await render(
        `<ul v-tabs>
   			<li>
   				<ul v-tabs>
     				<li v-tab-item>
        				<button v-button>Introduction</button>
      				</li>
      				<li *ngIf="show" v-tab-item><button v-button>Dynamic</button></li>
    			</ul>
			</li>
			<li v-tab-item>
				<button v-button>Visa</button>
			</li>
 		</ul>`,
        {
          imports: [TabListDirective, TabItemDirective, ButtonDirective, ButtonDisabledDirective]
        }
      );
      const firstButton = screen.getByText('Introduction') as HTMLButtonElement;
      expect(firstButton.getAttribute('aria-current')).toBe('false');
    });

    it('should render nested active tab roles correctly', async () => {
      await render(
        `<ul v-tabs role="list">
   			<li>
   				<ul v-tabs role="tab">
     				<li v-tab-item role="tab" >
        				<button v-button role="tab">Introduction</button>
      				</li>
      				<li *ngIf="show" v-tab-item><button v-button>Dynamic</button></li>
    			</ul>
			</li>
			<li v-tab-item active>
				<button v-button>Visa</button>
			</li>
 		</ul>`,
        {
          imports: [TabListDirective, TabItemDirective, ButtonDirective, ButtonDisabledDirective]
        }
      );
      const firstButton = screen.getByText('Introduction') as HTMLButtonElement;
      expect(firstButton.getAttribute('role')).toBe('tab');
    });

    it('should adjust button size to medium if in vertical tab list', async () => {
      await render(
        `<ul v-tabs vertical>
			<li v-tab-item>
				<button v-button>Introduction</button>
			</li>
		</ul>`,
        {
          imports: [TabListDirective, TabItemDirective, ButtonDirective, ButtonDisabledDirective]
        }
      );
      const button = screen.getByText('Introduction') as HTMLButtonElement;
      expect(button.classList.contains('v-button-tertiary')).toBe(true);
    });
  });
});
