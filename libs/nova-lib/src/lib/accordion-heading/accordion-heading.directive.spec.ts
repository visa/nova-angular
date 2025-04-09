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
import { Component } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VisaChevronDownTiny, VisaChevronRightTiny } from '@visa/nova-icons-angular';
import { AccordionDirective } from '../accordion/accordion.directive';
import { NovaLibModule } from '../nova-lib.module';
import { AccordionHeadingDirective } from './accordion-heading.directive';

@Component({
  template: `
    <div v-accordion>
      <button v-button v-accordion-heading>
        <v-icon-visa-toggle>
          <svg v-toggle-default-template v-icon-visa-chevron-right-tiny></svg>
          <svg v-toggle-rotated-template v-icon-visa-chevron-down-tiny></svg>
        </v-icon-visa-toggle>
        Accordion title
      </button>
    </div>
  `,
  imports: []
})
class TestComponent {}
describe('AccordionHeadingDirective', () => {
  let directive: AccordionHeadingDirective;
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        AccordionDirective,
        AccordionHeadingDirective,
        VisaChevronRightTiny,
        VisaChevronDownTiny,
        NovaLibModule
      ],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directive = fixture.debugElement
      .query(By.directive(AccordionHeadingDirective))
      .injector.get(AccordionHeadingDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
