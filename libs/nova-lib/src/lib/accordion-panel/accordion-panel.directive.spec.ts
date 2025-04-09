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
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AccordionDirective } from '../accordion/accordion.directive';
import { NovaLibModule } from '../nova-lib.module';
import { AccordionPanelDirective } from './accordion-panel.directive';

@Component({
  template: `
    <div v-accordion>
      <button v-button v-accordion-heading>
        <v-icon-visa-toggle>
          <svg v-toggle-default-template v-icon-visa-chevron-right-tiny></svg>
          <svg v-toggle-rotated-template v-icon-visa-chevron-down-tiny></svg>
        </v-icon-visa-toggle>
        Accordion title
        <div v-badge badgeType="stable" vML="auto">
          <svg v-icon-visa-success-tiny vM="0"></svg>
          <span>Label</span>
        </div>
      </button>
      <div v-accordion-panel>This is required text that describes the accordion section in more detail.</div>
    </div>
  `,
  imports: []
})
class TestComponent {}
describe('AccordionPanelDirective', () => {
  let directive: AccordionPanelDirective;
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [AccordionDirective, AccordionPanelDirective, NovaLibModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directive = fixture.debugElement.query(By.directive(AccordionPanelDirective)).injector.get(AccordionPanelDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set the class', () => {
    expect(directive.class).toContain('v-accordion-panel');
  });
  it('should set additional class', () => {
    directive.class = 'custom-class';
    expect(directive.class).toContain('v-accordion-panel');
    expect(directive.class).toContain('custom-class');
  });

  it('should set the id', () => {
    directive.id = 'test-id';
    expect(directive.id).toBe('test-id');
  });

  it('should set the native', () => {
    directive.native = true;
    expect(directive.native).toBe(true);
  });
});
