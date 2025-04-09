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
import { ButtonDisabledDirective } from '../button-disabled/button-disabled.directive';
import { ButtonDirective } from '../button/button.directive';
import { IconToggleDefaultTemplateDirective } from '../icon-toggle-default/icon-toggle-default.directive';
import { IconToggleRotatedTemplateDirective } from '../icon-toggle-rotated/icon-toggle-rotated.directive';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';
import { IconComponent } from '../icon/icon.component';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { TabListDirective } from '../tab-list/tab-list.directive';
import { TabItemDisclosureDirective } from './disclosure-tab-item.directive';

@Component({
  template: `<ul v-tabs>
    <li v-tab-item disclosureTab>
      <button v-button>
        <svg v-icon></svg>
        Alex Miller
        <svg v-icon></svg>
      </button>
    </li>
    <li v-tab-item disclosureTab expanded>
      <button v-button>
        Alex Miller
        <v-icon-visa-toggle>
          <svg v-toggle-default-template v-icon-visa-chevron-down-tiny></svg>
          <svg v-toggle-rotated-template v-icon-visa-chevron-up-tiny></svg>
        </v-icon-visa-toggle>
      </button>
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
  </ul>`
})
class TestTabDisclosureDirective {
  @ViewChild(TabItemDisclosureDirective) disclosure: TabItemDisclosureDirective;
}

describe('TabItemDisclosureDirective', () => {
  let component: TestTabDisclosureDirective;
  let fixture: ComponentFixture<TestTabDisclosureDirective>;
  let nativeTabList: HTMLElement;
  let disclosureTab: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTabDisclosureDirective],
      imports: [
        IconToggleDefaultTemplateDirective,
        IconToggleRotatedTemplateDirective,
        TabListDirective,
        TabItemDisclosureDirective,
        TabItemDirective,
        ButtonDirective,
        IconComponent,
        IconToggleComponent,
        ButtonDisabledDirective
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTabDisclosureDirective);
    component = fixture.componentInstance;
    nativeTabList = fixture.nativeElement.querySelector('[v-tabs]');
    disclosureTab = fixture.nativeElement.querySelector('[disclosureTab]');
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component.disclosure).toBeTruthy();
  });

  it('should have aria-expanded = false by default', () => {
    const disclosureButton = disclosureTab.querySelector('button');
    expect(disclosureButton?.getAttribute('aria-expanded')).toEqual('false');
  });

  it('should have aria-expanded = true by default if expanded is true', () => {
    const disclosureButton = disclosureTab.querySelector('button');
    component.disclosure.expanded = true;
    component.disclosure.ngAfterContentInit(); // "start at init"
    fixture.detectChanges();
    expect(disclosureButton?.getAttribute('aria-expanded')).toEqual('true');
  });

  it('should toggle expanded when button is clicked', () => {
    const currentExpanded = component.disclosure.expanded;
    const disclosureButton = disclosureTab.querySelector('button');
    if (!disclosureButton) return;
    disclosureButton.click();
    fixture.detectChanges();
    expect(component.disclosure.expanded).toEqual(!currentExpanded);
  });

  it('should emit disclosureTabToggled when clicked', () => {
    const disclosureButton = disclosureTab.querySelector('button');
    if (!disclosureButton) return;
    const buttonClicked = jest.spyOn(component.disclosure.disclosureTabToggled, 'emit');
    disclosureButton.click();
    expect(buttonClicked).toHaveBeenCalled();
  });

  it('should add toggle class to its last button by default', () => {
    const lastIcon = component.disclosure.button.icons.last;
    expect(lastIcon.hostClass).toEqual(expect.stringContaining('v-tab-suffix'));
  });

  it('should add toggle class to its last button if expanded is true', () => {
    component.disclosure.expanded = true;
    fixture.detectChanges();
    const lastIcon = component.disclosure.button.icons.last;
    expect(lastIcon.hostClass).toEqual(expect.stringContaining('v-tab-suffix'));
  });
});
