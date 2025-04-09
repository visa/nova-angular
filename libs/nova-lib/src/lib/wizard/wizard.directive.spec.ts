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
import { Component, Input } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NovaLibModule } from '../nova-lib.module';
import { WizardStepDirective } from '../wizard-step/wizard-step.directive';
import { WizardDirective } from './wizard.directive';
import exp = require('constants');

@Component({
  template: `
    <ol v-wizard>
      <ng-container *ngIf="showSteps">
        @for (step of steps; track step.index) {
          <li v-wizard-step [vTypography]="step.index === currentStep ? 'label-large-active' : ''">
            @if (step.available && currentStep !== step.index) {
              <button
                v-button
                buttonColor="tertiary"
                (click)="goTo(step.index)"
                vTypography="body-2"
                vTypographyColor="default"
              >
                <ng-template [ngTemplateOutlet]="stepContent" [ngTemplateOutletContext]="{ step: step }"></ng-template>
              </button>
            } @else {
              <ng-template [ngTemplateOutlet]="stepContent" [ngTemplateOutletContext]="{ step: step }"></ng-template>
            }
          </li>
        }
      </ng-container>
    </ol>
  `,
  imports: [Input]
})
class TestComponent {
  showSteps = false;
  steps = [
    {
      stepLabel: 'Step label',
      active: false,
      invalid: false,
      complete: false,
      available: true,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step label',
      active: false,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step label',
      active: false,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    }
  ];
}

describe('WizardDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: WizardDirective;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      imports: [WizardDirective, WizardStepDirective, NovaLibModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directive = fixture.debugElement.query(By.directive(WizardDirective)).injector.get(WizardDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should assign a default class', () => {
    expect(directive.class).toContain('v-wizard');
  });
  it('should assign an additional class', () => {
    directive.class = 'additional-class';
    expect(directive.class).toContain('v-wizard');
    expect(directive.class).toContain('additional-class');
  });

  it('should handle no steps present', () => {
    expect(() => directive.ngAfterContentInit()).not.toThrow();
  });
  it('should handle steps present', () => {
    component.showSteps = true;
    expect(() => directive.ngAfterContentInit()).not.toThrow();
  });
  it('should find active step', () => {
    component.showSteps = true;
    fixture.detectChanges();
    expect(directive.steps.length).toBe(3);
    directive.steps.toArray()[1].active = true;
    directive.ngAfterContentInit();
    expect(directive._activeIndex).toBe(1);
  });

  it('should assign a default vertical', () => {
    expect(directive.vertical).toBe(false);
  });

  it('should assign a vertical class', () => {
    directive.vertical = true;
    expect(directive.class).toContain('v-wizard-vertical');
  });
  it('should assign a vertical class with a true string', () => {
    directive.vertical = 'true';
    expect(directive.class).toContain('v-wizard-vertical');
  });

  it('should assign a vertical class with a false string', () => {
    directive.vertical = 'false';
    expect(directive.class).not.toContain('v-wizard-vertical');
  });

  it('should assign aria-live attribute', () => {
    directive.ariaLive = 'off';
    expect(directive.ariaLive).toBe('off');
  });

  it('should assign a default aria-live', () => {
    expect(directive.ariaLive).toBe('polite');
  });

  it('should assign compact class', () => {
    directive.compact = 'true';
    expect(directive.compact).toBeTruthy();
    expect(directive.class).toBe(' v-wizard  v-wizard-compact');
  });
});
