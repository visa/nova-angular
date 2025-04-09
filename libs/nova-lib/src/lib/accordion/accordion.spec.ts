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
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionButtonHeadingDirective } from '../accordion-button-heading/accordion-button-heading.directive';
import { AccordionHeadingDirective } from '../accordion-heading/accordion-heading.directive';
import { AccordionPanelDirective } from '../accordion-panel/accordion-panel.directive';
import { ButtonIconDirective } from '../button-icon/button-icon.directive';
import { ButtonDirective } from '../button/button.directive';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';
import { AccordionDirective } from './accordion.directive';
import { AccordionService } from './accordion.service';

@Component({
  template: `
    <div v-accordion>
      <button v-button v-accordion-heading>
        <v-icon-visa-toggle>
          <svg v-toggle-default-template></svg>
          <svg v-toggle-rotated-template></svg>
        </v-icon-visa-toggle>
        Item 1
      </button>
      <div v-accordion-panel>Lorem ipsum</div>
      <button v-button v-accordion-heading>
        <v-icon-visa-toggle>
          <svg v-toggle-default-template></svg>
          <svg v-toggle-rotated-template></svg>
        </v-icon-visa-toggle>
        Item 2
      </button>
      <div v-accordion-panel>Lorem ipsum</div>
      <button v-button v-accordion-heading>
        <v-icon-visa-toggle>
          <svg v-toggle-default-template></svg>
          <svg v-toggle-rotated-template></svg>
        </v-icon-visa-toggle>
        Item 3
      </button>
      <div v-accordion-panel>Lorem ipsum</div>
      <button v-button v-accordion-heading *ngIf="showHeading">
        <v-icon-visa-toggle>
          <svg v-toggle-default-template></svg>
          <svg v-toggle-rotated-template></svg>
        </v-icon-visa-toggle>
        Item 3
      </button>
      <div v-accordion-panel *ngIf="showPanel">Lorem ipsum</div>
    </div>
  `
})
class TestBasicAccordionDirective {
  @ViewChild(AccordionDirective) accordion: AccordionDirective;
  @ViewChildren(AccordionHeadingDirective) accordionHeadings: QueryList<AccordionHeadingDirective>;
  @ViewChildren(AccordionButtonHeadingDirective) accordionButtonHeadings: QueryList<AccordionButtonHeadingDirective>;
  @ViewChildren(AccordionPanelDirective) accordionPanels: QueryList<AccordionPanelDirective>;
  showHeading = false;
  showPanel = false;
}

describe('Accordion', () => {
  let component: TestBasicAccordionDirective;
  let fixture: ComponentFixture<TestBasicAccordionDirective>;
  let nativeAccordion: HTMLElement;
  let nativePanels: HTMLElement[];
  let nativeHeadings: HTMLElement[];
  let nativeButtonHeadings: HTMLElement[];
  let firstHeading: AccordionHeadingDirective;
  let firstPanel: AccordionPanelDirective;
  const mockAccordionService = {
    setUpAccordion: jest.fn(),
    toggleItem: jest.fn(),
    expandItem: jest.fn(),
    collapseItem: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestBasicAccordionDirective],
      imports: [
        AccordionDirective,
        AccordionHeadingDirective,
        AccordionButtonHeadingDirective,
        AccordionPanelDirective,
        ButtonDirective,
        IconToggleComponent
      ],
      providers: [{ provide: AccordionService, useValue: mockAccordionService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBasicAccordionDirective);
    component = fixture.componentInstance;
    nativeAccordion = fixture.nativeElement.querySelector('[v-accordion]');
    nativePanels = fixture.nativeElement.querySelectorAll('[v-accordion-panel]');
    nativeHeadings = fixture.nativeElement.querySelectorAll('[v-accordion-heading]');
    nativeButtonHeadings = fixture.nativeElement.querySelectorAll('[v-accordion-heading][v-button]');
    fixture.detectChanges();
    firstHeading = component.accordionHeadings.first;
    firstPanel = component.accordionPanels.first;
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('AccordionDirective', () => {
    it('should exist', () => {
      expect(component.accordion).toBeTruthy();
    });

    it(`should have 'v-accordion' class by default`, () => {
      expect(nativeAccordion.classList.toString()).toEqual(expect.stringContaining('v-accordion'));
    });

    it('should add custom class', () => {
      component.accordion.class = 'v-accordion-custom';
      fixture.detectChanges();
      expect(nativeAccordion.classList.toString()).toEqual(expect.stringContaining('v-accordion-custom'));
    });

    describe('content children', () => {
      it('should recognize correct number of panels', () => {
        expect(component.accordion.panels.length).toEqual(nativePanels.length);
      });

      it('should recognize correct number of headings', () => {
        expect(component.accordion.headings.length).toEqual(nativeHeadings.length);
      });

      it('should recognize correct number of buttonHeadings', () => {
        const buttonHeadings = component.accordion.headings.filter(
          (heading) => heading._buttonHeading || heading.hostButton
        );
        expect(buttonHeadings.length).toEqual(nativeButtonHeadings.length);
      });

      it('should have a subscription for each button', () => {
        expect(component.accordion.buttonClickedSubscriptions.length).toEqual(nativeButtonHeadings.length);
      });

      it('should reset when children items have changed', () => {
        const spy = jest.spyOn(component.accordion, 'accordionItemsChanged');
        component.showHeading = true;
        component.showPanel = true;
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
      });

      it('should set items to subtle when subtle is true', () => {
        component.accordion.subtle = true;
        fixture.detectChanges();
        expect(component.accordion.headings.first._subtle).toBeTruthy();
        expect(component.accordion.panels.first._subtle).toBeTruthy();
      });
    });
  });

  describe('AccordionHeadingDirective', () => {
    it('should exist', () => {
      expect(component.accordionHeadings).toBeTruthy();
    });

    it(`should have 'v-accordion' class by default`, () => {
      expect(nativeHeadings[0].classList.toString()).toEqual(expect.stringContaining('v-accordion-heading'));
    });

    it('should add custom class', () => {
      component.accordionHeadings.first.class = 'v-accordion-heading-custom';
      fixture.detectChanges();
      expect(nativeHeadings[0].classList.toString()).toEqual(expect.stringContaining('v-accordion-heading-custom'));
    });

    it('should emit toggled event when expanded is changed', () => {
      const spy = jest.spyOn(component.accordionHeadings.first.toggled, 'emit');
      component.accordionHeadings.first.expanded = true;
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('AccordionPanelDirective', () => {
    it(`should have 'v-accordion-panel' class by default`, () => {
      expect(nativePanels[0].classList.toString()).toEqual(expect.stringContaining('v-accordion-panel'));
    });

    it('should add custom class', () => {
      component.accordionPanels.first.class = 'v-accordion-panel-custom';
      fixture.detectChanges();
      expect(nativePanels[0].classList.toString()).toEqual(expect.stringContaining('v-accordion-panel-custom'));
    });

    it('should allow a custom ID', () => {
      component.accordionPanels.first.id = 'accordion-panel-id-1';
      fixture.detectChanges();
      expect(nativePanels[0].getAttribute('id')).toBe('accordion-panel-id-1');
    });

    it('should be hidden by default if expanded is false', () => {
      expect(nativePanels[0].getAttribute('aria-hidden')).toBe('true');
    });

    it('should have aria-hidden=false when the matching headers expanded is true', () => {
      component.accordionHeadings.first.expanded = true;
      fixture.detectChanges();
      expect(nativePanels[0].getAttribute('aria-hidden')).toBe('false');
    });
  });

  describe('Accordion behaviors', () => {
    it('should open a panel when the heading is clicked', () => {
      const index = 0;
      nativeHeadings[index].click();
      fixture.detectChanges();
      expect(nativePanels[index].getAttribute('aria-hidden')).toBe('false');
    });

    it('should close other items when a new item is clicked', () => {
      const index = 0;
      nativeHeadings[index].click();
      fixture.detectChanges();
      expect(nativePanels[index].getAttribute('aria-hidden')).toBe('false');
      nativeHeadings[index + 1].click();
      fixture.detectChanges();
      expect(nativePanels[index + 1].getAttribute('aria-hidden')).toBe('false');
      expect(nativePanels[index].getAttribute('aria-hidden')).toBe('true');
    });

    it('should allow multiple open items on a multiselect', () => {
      component.accordion.multiselect = true;
      const index = 0;
      nativeHeadings[index].click();
      nativeHeadings[index + 1].click();
      fixture.detectChanges();
      expect(nativePanels[index].getAttribute('aria-hidden')).toBe('false');
      expect(nativePanels[index + 1].getAttribute('aria-hidden')).toBe('false');
    });

    it('should close an item on click when expanded', () => {
      firstHeading.expanded = true;
      nativeHeadings[0].click();
      fixture.detectChanges();
      expect(firstHeading.expanded).toBeFalsy();
      expect(nativePanels[0].getAttribute('aria-hidden')).toBe('true');
    });

    it('should emit the correct index when toggled', () => {
      const index = 2;
      const spy = jest.spyOn(component.accordionHeadings.toArray()[index].toggled, 'emit');
      nativeHeadings[index].click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(index);
    });
  });
});

@Component({
  template: `
    <div v-accordion>
      <div v-accordion-heading vFlex vAlignItemsCenter>
        Item 1
        <button v-button-icon vML="auto" buttonColor="secondary">
          <v-icon-visa-toggle>
            <svg v-toggle-default-template></svg>
            <svg v-toggle-rotated-template></svg>
          </v-icon-visa-toggle>
        </button>
      </div>
      <div v-accordion-panel>Lorem ipsum</div>
      <button v-button v-accordion-heading>
        <v-icon-visa-toggle>
          <svg v-toggle-default-template></svg>
          <svg v-toggle-rotated-template></svg>
        </v-icon-visa-toggle>
        Item 2
      </button>
      <div v-accordion-panel>Lorem ipsum</div>
      <button v-button v-accordion-heading>
        <v-icon-visa-toggle>
          <svg v-toggle-default-template></svg>
          <svg v-toggle-rotated-template></svg>
        </v-icon-visa-toggle>
        Item 3
      </button>
      <div v-accordion-panel>Lorem ipsum</div>
    </div>
  `
})
class TestComplexAccordionDirective {
  @ViewChild(AccordionDirective) accordion: AccordionDirective;
  @ViewChildren(AccordionHeadingDirective) accordionHeadings: QueryList<AccordionHeadingDirective>;
  @ViewChildren(AccordionButtonHeadingDirective) accordionButtonHeadings: QueryList<AccordionButtonHeadingDirective>;
  @ViewChildren(AccordionPanelDirective) accordionPanels: QueryList<AccordionPanelDirective>;
  showHeading = false;
  showPanel = false;
}

describe('Accordion with separate toggle button', () => {
  let component: TestComplexAccordionDirective;
  let fixture: ComponentFixture<TestComplexAccordionDirective>;
  let nativeAccordion: HTMLElement;
  let nativePanels: HTMLElement[];
  let nativeHeadings: HTMLElement[];
  let nativeButtonHeadings: HTMLElement[];
  let firstHeading: AccordionHeadingDirective;
  let firstButtonHeading: AccordionButtonHeadingDirective;
  let firstPanel: AccordionPanelDirective;
  const mockAccordionService = {
    setUpAccordion: jest.fn(),
    toggleItem: jest.fn(),
    expandItem: jest.fn(),
    collapseItem: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComplexAccordionDirective],
      imports: [
        AccordionDirective,
        AccordionHeadingDirective,
        AccordionButtonHeadingDirective,
        AccordionPanelDirective,
        ButtonDirective,
        ButtonIconDirective,
        IconToggleComponent
      ],
      providers: [{ provide: AccordionService, useValue: mockAccordionService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComplexAccordionDirective);
    component = fixture.componentInstance;
    nativeAccordion = fixture.nativeElement.querySelector('[v-accordion]');
    nativePanels = fixture.nativeElement.querySelectorAll('[v-accordion-panel]');
    nativeHeadings = fixture.nativeElement.querySelectorAll('[v-accordion-heading]');
    nativeButtonHeadings = fixture.nativeElement.querySelectorAll('[v-accordion-heading][v-button]');
    fixture.detectChanges();
    firstHeading = component.accordionHeadings.first;
    firstButtonHeading = component.accordionButtonHeadings.first;
    firstPanel = component.accordionPanels.first;
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should have one less buttonHeading than headings since one heading is not on a button element', () => {
    expect(component.accordionButtonHeadings.length).toEqual(component.accordionHeadings.length - 1);
  });

  describe('the heading with the child toggle button', () => {
    it('should recognize child buttons', () => {
      expect(component.accordionHeadings.first.buttons).toBeTruthy();
    });

    it('should recognize the toggle child button', () => {
      expect(component.accordionHeadings.first._buttonHeading).toBeTruthy();
    });

    it('should emit the correct index when the child button toggled', () => {
      const spy = jest.spyOn(component.accordionHeadings.first.toggled, 'emit');
      component.accordionHeadings.first._buttonHeading.el.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(0);
    });
  });
});
