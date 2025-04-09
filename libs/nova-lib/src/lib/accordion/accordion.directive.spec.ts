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
import { FlexDirective } from '../flex/flex.directive';
import { AccordionHeadingDirective } from '../accordion-heading/accordion-heading.directive';
import { AccordionDetailsDirective } from '../accordion-item/accordion-item.directive';
import { ButtonDirective } from '../button/button.directive';
import { WizardDirective } from '../wizard/wizard.directive';
import { AccordionDirective } from './accordion.directive';

@Component({
  template: ` <div v-accordion></div> `,
  imports: []
})
class TestComponent {}
@Component({
  template: `
    <div v-wizard vertical v-accordion>
      @for (step of steps; track step.index) {
        <details v-wizard-step v-accordion-item [open]="step.index === currentStep">
          <summary
            v-accordion-heading
            v-button
            vFlex
            (click)="goTo(step.index)"
            vJustifyContentBetween
            [disabled]="!step.available"
            [vTypographyColor]="step.index === currentStep || !step.available ? '' : 'subtle'"
          >
            <div vFlex vAlignItemsCenter vGap="6">
              <ng-template [ngTemplateOutlet]="stepContent" [ngTemplateOutletContext]="{ step: step }"></ng-template>
            </div>
            <v-icon-visa-toggle>
              <svg v-toggle-default-template v-icon-visa-chevron-right-tiny></svg>
              <svg v-toggle-rotated-template v-icon-visa-chevron-down-tiny></svg>
            </v-icon-visa-toggle>
          </summary>
          <div v-accordion-panel>
            <div vFlex vFlexCol vGap="12">
              <div vFlex vGap="4" vFlexCol>
                <label v-label [for]="'in-page-wizard-' + step.index">{{ step.inputLabel }}</label>
                <div v-input-container>
                  <input
                    v-input
                    [invalid]="step.invalid"
                    [id]="'in-page-wizard-' + step.index"
                    [name]="'in-page-wizard-' + step.index"
                    [attr.aria-describedby]="step.invalid ? 'in-page-wizard-message-' + step.index : ''"
                    [(ngModel)]="step.inputValue"
                  />
                </div>
                <span
                  v-input-message
                  [id]="'in-page-wizard-message-' + step.index"
                  aria-atomic="true"
                  aria-live="assertive"
                  vMT="4"
                >
                  <ng-container *ngIf="step.invalid">
                    <svg v-icon-visa-error-tiny></svg>
                    This is required text that describes the error in more detail.
                  </ng-container>
                </span>
              </div>
              <div vFlex vGap="12" vML="auto">
                <button v-button (click)="previousStep($event)" *ngIf="step.index !== 0">Previous</button>
                <button v-button buttonColor="secondary" (click)="nextStep($event)" *ngIf="step.index !== steps.length">
                  Next
                </button>
              </div>
            </div>
          </div>
        </details>
      }
    </div>

    <ng-template #stepContent let-step="step">
      @if (step.complete) {
        <span v-badge icon [noBackground]="!(currentStep === step.index)" badgeType="stable">
          <svg v-icon-visa-checkmark-tiny></svg>
        </span>
      } @else if (step.invalid) {
        <span v-badge icon [noBackground]="!(currentStep === step.index)" badgeType="critical">
          <svg v-icon-visa-error-alt-tiny></svg>
        </span>
      } @else if (currentStep === step.index) {
        <span v-badge icon badgeType="active">{{ step.index + 1 }}</span>
      } @else {
        <span v-badge icon noBackground badgeType="subtle">{{ step.index + 1 }}</span>
      }
      {{ step.stepLabel }}
    </ng-template>
  `,
  imports: []
})
class TestWithWizardComponent {
  currentStep: number = 0;
  steps = [
    {
      stepLabel: 'Step label',
      index: 0,
      invalid: false,
      complete: false,
      available: true,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step label',
      index: 1,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step label',
      index: 2,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step label',
      index: 3,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step label',
      index: 4,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    }
  ];
}

@Component({
  template: `
    <div v-wizard vertical v-accordion vFlex vFlexRow>
      @for (step of steps; track step.index) {
        <details v-wizard-step v-accordion-item [open]="step.index === currentStep">
          <summary
            v-accordion-heading
            v-button
            hostButton
            vFlex
            vJustifyContentBetween
            [disabled]="!step.available"
            [vTypographyColor]="step.index === currentStep || !step.available ? '' : 'subtle'"
          >
            <div vFlex vAlignItemsCenter vGap="6">
              <ng-template [ngTemplateOutlet]="stepContent" [ngTemplateOutletContext]="{ step: step }"></ng-template>
            </div>
            <v-icon-visa-toggle>
              <svg v-toggle-default-template v-icon-visa-chevron-right-tiny></svg>
              <svg v-toggle-rotated-template v-icon-visa-chevron-down-tiny></svg>
            </v-icon-visa-toggle>
          </summary>
          <div v-accordion-panel>
            <div vFlex vFlexCol vGap="12">
              <div vFlex vGap="4" vFlexCol>
                <label v-label [for]="'in-page-wizard-' + step.index">{{ step.inputLabel }}</label>
                <div v-input-container>
                  <input
                    v-input
                    [invalid]="step.invalid"
                    [id]="'in-page-wizard-' + step.index"
                    [name]="'in-page-wizard-' + step.index"
                    [attr.aria-describedby]="step.invalid ? 'in-page-wizard-message-' + step.index : ''"
                    [(ngModel)]="step.inputValue"
                  />
                </div>
                <span
                  v-input-message
                  [id]="'in-page-wizard-message-' + step.index"
                  aria-atomic="true"
                  aria-live="assertive"
                  vMT="4"
                >
                  <ng-container *ngIf="step.invalid">
                    <svg v-icon-visa-error-tiny></svg>
                    This is required text that describes the error in more detail.
                  </ng-container>
                </span>
              </div>
              <div vFlex vGap="12" vML="auto">
                <button v-button (click)="previousStep($event)" *ngIf="step.index !== 0">Previous</button>
                <button v-button buttonColor="secondary" (click)="nextStep($event)" *ngIf="step.index !== steps.length">
                  Next
                </button>
              </div>
            </div>
          </div>
        </details>
      }
    </div>

    <ng-template #stepContent let-step="step">
      @if (step.complete) {
        <span v-badge icon [noBackground]="!(currentStep === step.index)" badgeType="stable">
          <svg v-icon-visa-checkmark-tiny></svg>
        </span>
      } @else if (step.invalid) {
        <span v-badge icon [noBackground]="!(currentStep === step.index)" badgeType="critical">
          <svg v-icon-visa-error-alt-tiny></svg>
        </span>
      } @else if (currentStep === step.index) {
        <span v-badge icon badgeType="active">{{ step.index + 1 }}</span>
      } @else {
        <span v-badge icon noBackground badgeType="subtle">{{ step.index + 1 }}</span>
      }
      {{ step.stepLabel }}
    </ng-template>
  `,
  imports: []
})
class TestWithFlexComponent {
  currentStep: number = 0;
  steps = [
    {
      stepLabel: 'Step label',
      index: 0,
      invalid: false,
      complete: false,
      available: true,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step label',
      index: 1,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step label',
      index: 2,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step label',
      index: 3,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step label',
      index: 4,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    }
  ];
}

describe('AccordionDirective', () => {
  describe('AccordionDirective no Wizard', () => {
    let directive: AccordionDirective;
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [AccordionDirective],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      directive = fixture.debugElement.query(By.directive(AccordionDirective)).injector.get(AccordionDirective);
      fixture.detectChanges();
    });

    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });

    it('should set the class', () => {
      expect(directive.class).toContain('v-accordion');
    });
    it('should set a custom class', () => {
      directive.class = 'custom-class';
      expect(directive.class).toContain('v-accordion');
      expect(directive.class).toContain('custom-class');
    });
  });

  describe('AccordionDirective with WizardDirective', () => {
    let directive: AccordionDirective;
    let fixture: ComponentFixture<TestWithWizardComponent>;
    let component: TestWithWizardComponent;

    beforeEach(async () => {
      TestBed.overrideProvider(WizardDirective, { useValue: WizardDirective });
      await TestBed.configureTestingModule({
        declarations: [TestWithWizardComponent],
        imports: [AccordionDirective, WizardDirective, AccordionDetailsDirective, FlexDirective],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: ComponentFixtureAutoDetect, useValue: true },
          { provide: WizardDirective, useClass: WizardDirective }
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(TestWithWizardComponent);
      component = fixture.componentInstance;
      directive = fixture.debugElement.query(By.directive(AccordionDirective)).injector.get(AccordionDirective);
      fixture.detectChanges();
    });
    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });

    it('should have accordion items', () => {
      expect(directive.accordionItems.length).toBeGreaterThan(0);
    });

    it('should not have accordion class set used as a wizard', () => {
      directive.class = 'custom-class';
      expect(directive.class).not.toContain('v-accordion');
      expect(directive.class).toContain('custom-class');
    });

    it('should have flex set', () => {
      expect(directive.class).toContain('v-flex v-flex-col');
    });
  });

  describe('AccordionDirective with FlexDirective', () => {
    let directive: AccordionDirective;
    let fixture: ComponentFixture<TestWithWizardComponent>;
    let component: TestWithFlexComponent;

    beforeEach(async () => {
      TestBed.overrideProvider(WizardDirective, { useValue: WizardDirective });
      await TestBed.configureTestingModule({
        declarations: [TestWithFlexComponent],
        imports: [
          AccordionDirective,
          WizardDirective,
          ButtonDirective,
          AccordionDetailsDirective,
          AccordionHeadingDirective,
          FlexDirective
        ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: ComponentFixtureAutoDetect, useValue: true },
          { provide: WizardDirective, useClass: WizardDirective }
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(TestWithFlexComponent);
      component = fixture.componentInstance;
      directive = fixture.debugElement.query(By.directive(AccordionDirective)).injector.get(AccordionDirective);
      fixture.detectChanges();
    });
    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });

    it('should have accordion items', () => {
      expect(directive.accordionItems.length).toBeGreaterThan(0);
    });

    it('should not have accordion class set used as a wizard', () => {
      directive.class = 'custom-class';
      expect(directive.class).not.toContain('v-accordion');
      expect(directive.class).toContain('custom-class');
    });

    it('should have flex set', () => {
      expect(directive.class).toContain('v-gap-6');
    });

    it('should subscribe to button click', () => {
      // get the first button and trigger a click event
      const button = fixture.debugElement.query(By.directive(ButtonDirective));
      button.nativeElement.click();
      fixture.detectChanges();
      expect(component.currentStep).toBe(0);
      expect(directive.itemsExpanded).toEqual([]);
    });

    it('should subscribe to button click and set itemsExpanded', () => {
      // get the first button and trigger a click event
      const button = fixture.debugElement.query(By.directive(ButtonDirective));
      button.nativeElement.click();
      directive.accordionItems.first.expanded = true;
      fixture.detectChanges();
      expect(component.currentStep).toBe(0);
      expect(directive.itemsExpanded).toEqual([]);
    });
  });
});
