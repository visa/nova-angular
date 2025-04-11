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
import { ButtonDirective } from '../button/button.directive';
import { ButtonDisabledDirective } from '../button-disabled/button-disabled.directive';
import { NovaLibService } from '../nova-lib.service';
import { TabListDirective } from '../tab-list/tab-list.directive';
import { TabItemDirective } from './tab-item.directive';

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

describe('TabItemDirective', () => {
  let component: TestTabListDirective;
  let fixture: ComponentFixture<TestTabListDirective>;
  let nativeTabList: HTMLElement;
  let firstNativeTab: HTMLElement;
  let firstTab: TabItemDirective;
  const mockNovaService = {
    selectItem: jest.fn(),
    deselectItems: jest.fn(),
    addArrowKeyNavigation: jest.fn()
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
    expect(component).toBeTruthy();
  });

  describe('Input props', () => {
    it('shoud have v-tab class by default', () => {
      expect(firstTab.hostClass).toEqual(expect.stringContaining('v-tab'));
    });

    it('shoud have v-tab-section-title class if section title is true', () => {
      firstTab.sectionTitle = true;
      fixture.detectChanges();
      expect(firstTab.hostClass).toEqual(expect.stringContaining('v-tab-section-title'));
    });

    it('should allow for custom classes', () => {
      firstTab.class = 'v-tab-custom';
      fixture.detectChanges();
      expect(firstTab.hostClass).toEqual(expect.stringContaining('v-tab-custom'));
    });

    it('should have role = none by default', () => {
      expect(firstNativeTab.getAttribute('role')).toEqual('none');
    });

    it('should allow for a custom role', () => {
      firstTab.role = 'tab';
      fixture.detectChanges();
      expect(firstNativeTab.getAttribute('role')).toEqual('tab');
    });
  });

  describe('Tab item set up (ngAfterContentInit)', () => {
    it('should contain a child with role=tab by default', () => {
      expect(firstNativeTab.querySelector('[role="tab"]')).toBeTruthy();
    });

    it('should show a child button as aria-selected if active by default', () => {
      firstTab.active = true;
      firstTab.ngAfterContentInit(); // "start at init"
      expect((firstTab.button.ariaSelected = true));
    });

    it('should allow custom role on child button', () => {
      firstTab.button.role = 'button';
      firstTab.ngAfterContentInit(); // "start at init"
      expect(firstTab.button.role).toEqual('button');
    });

    it('should allow custom color on child button', () => {
      firstTab.button.buttonColor = 'secondary';
      firstTab.ngAfterContentInit(); // "start at init"
      expect(firstTab.button.buttonColor).toEqual('secondary');
    });
  });

  describe('Events', () => {
    describe('Click event', () => {
      it('should emit click event on click', () => {
        const button = firstTab.button.el.nativeElement;
        const buttonClicked = jest.spyOn(firstTab.clicked, 'emit');
        button.click();
        expect(buttonClicked).toHaveBeenCalled();
      });

      it('should not emit the click event if it is a disclosure tab', () => {
        firstTab.disclosureTab = true;
        fixture.detectChanges();
        const button = firstTab.button.el.nativeElement;
        const buttonClicked = jest.spyOn(firstTab.clicked, 'emit');
        button.click();
        expect(buttonClicked).not.toHaveBeenCalled();
      });
    });

    describe('tabActive event', () => {
      it('should emit when programmatically set to active', () => {
        const activated = jest.spyOn(firstTab.tabActive, 'emit');
        firstTab.active = true;
        fixture.detectChanges();
        expect(activated).toHaveBeenCalled();
      });
    });
  });
});
