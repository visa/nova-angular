/**
 *              © 2025-2026 Visa
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
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { InputDirective, NovaLibModule } from '@visa/nova-angular';
import {
  VisaArrowBackTiny,
  VisaArrowForwardTiny,
  VisaCheckmarkTiny,
  VisaCloseTiny,
  VisaErrorAltTiny,
  VisaErrorLow,
  VisaErrorTiny,
} from '@visa/nova-icons-angular';
import { SharedWizardExitDialogComponent } from '../shared/exit-dialog/exit-dialog.docs';
import { SharedWizardSaveFlagComponent } from '../shared/save-flag/save-flag.docs';
import { SharedWizardSuccessPageComponent } from '../shared/success-page/success-page.docs';
import { SharedWizardSummaryPageComponent } from '../shared/summary-page/summary-page.docs';

/**
 * Multi-page wizard with vertical step navigation.
 * Steps are displayed in a vertical sidebar, with each step shown on a separate page.
 * Users navigate forward through validation, and can return to previous completed steps.
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-wizard-vertical',
  templateUrl: './vertical.docs.html',
  standalone: true,
  imports: [
    FormsModule,
    NgTemplateOutlet,
    NovaLibModule,
    VisaCheckmarkTiny,
    VisaCloseTiny,
    VisaErrorLow,
    VisaErrorAltTiny,
    VisaErrorTiny,
    VisaArrowForwardTiny,
    VisaArrowBackTiny,
    SharedWizardSuccessPageComponent,
    SharedWizardExitDialogComponent,
    SharedWizardSaveFlagComponent,
    SharedWizardSummaryPageComponent,
  ],
})
export class VerticalWizardComponent {
  /** Reference to the exit confirmation dialog component */
  readonly exitDialog =
    viewChild<SharedWizardExitDialogComponent>('exitDialog');

  /** References to all input elements in the wizard steps */
  readonly inputs = viewChildren<InputDirective, ElementRef<HTMLInputElement>>(
    InputDirective,
    { read: ElementRef },
  );

  /** Index of the currently active step (zero-based) */
  readonly currentStep = signal(0);

  /** Controls visibility of the save success flag notification */
  readonly showFlag = signal(false);

  /** Controls whether the success page is displayed after submission */
  readonly showSuccess = signal(false);

  /**
   * Configuration for each wizard step including label, validation state, and input values.
   * Each step tracks its own completion status, availability, and error state.
   */
  readonly steps = [
    {
      stepLabel: 'Step 1 label',
      id: 'vertical-0',
      invalid: false,
      complete: false,
      available: true,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
    {
      stepLabel: 'Step 2 label',
      id: 'vertical-1',
      invalid: false,
      complete: false,
      available: false,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
    {
      stepLabel: 'Step 3 label',
      id: 'vertical-2',
      invalid: false,
      complete: false,
      available: false,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
    {
      stepLabel: 'Step 4 label',
      id: 'vertical-3',
      invalid: false,
      complete: false,
      available: false,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
    {
      stepLabel: 'Step 5 label',
      id: 'vertical-4',
      invalid: false,
      complete: false,
      available: false,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
  ];

  /**
   * Navigates to the previous step in the wizard.
   */
  previousStep() {
    this.goTo(this.currentStep() - 1);
  }

  /**
   * Advances to the next step after validating the current step's input.
   * If called with isSave=true, displays the save flag instead of advancing.
   * @param {boolean} isSave - Whether this is a save action rather than navigation
   */
  nextStep(isSave: boolean = false) {
    if (isSave) return this.showFlag.set(true);

    const currentStep = this.steps[this.currentStep()];
    currentStep.invalid = !currentStep.inputValue;

    this.validateStep(this.currentStep());
    if (!currentStep.invalid) {
      // Only make the next step available if current is valid
      if (this.currentStep() + 1 < this.steps.length) {
        this.steps[this.currentStep() + 1].available = true;
      }
      this.goTo(this.currentStep() + 1);
      return;
    }

    currentStep.complete = false;

    // Focus the input field if validation failed
    setTimeout(() => {
      const input = this.inputs()[this.currentStep()];
      if (
        input &&
        currentStep.inputLabel &&
        input.nativeElement !== document.activeElement
      ) {
        input.nativeElement.focus();
      }
    }, 0);
  }

  /**
   * Navigates to a specific step by index.
   * Validates the current step if navigating forward. Clears error states when navigating away.
   * @param {number} index - Zero-based index of the target step
   */
  goTo(index: number) {
    const currentStep = this.steps[this.currentStep()];

    // Clear error state for the current step when navigating away
    currentStep.invalid = false;
    currentStep.showErrorMessage = false;

    // Validate the current step if navigating forward
    if (index > this.currentStep()) {
      this.validateStep(this.currentStep());
      if (currentStep.invalid) {
        currentStep.complete = false;
        return;
      }
      currentStep.complete = true;
    }

    this.steps[index].available = true;
    this.currentStep.set(index);

    // Wait for DOM update before setting focus
    setTimeout(() => {
      if (this.currentStep() < this.steps.length - 1) {
        const input = this.inputs()[this.currentStep()];
        const nextStep = this.steps[this.currentStep()];
        if (
          input &&
          nextStep.inputLabel &&
          input.nativeElement !== document.activeElement
        ) {
          input.nativeElement.focus();
        }
      } else {
        // On summary page, focus the first edit button
        const firstEditButton = document.querySelector('[aria-label^="edit"]');
        if (firstEditButton && firstEditButton !== document.activeElement) {
          (firstEditButton as HTMLElement).focus();
        }
      }
    }, 0);
  }

  /**
   * Completes the wizard submission, displays the success page, and resets all step data.
   */
  submit() {
    this.showSuccess.set(true);
    this.steps.forEach((input, index) => {
      input.available = index === 0 ? true : false;
      input.complete = false;
      input.inputValue = '';
    });
    this.currentStep.set(0);
  }

  /**
   * Hides the error message banner for a specific step.
   * @param {number} index - Index of the step whose error message should be hidden
   */
  hideErrorMessage(index: number): void {
    this.steps[index].showErrorMessage = false;
  }

  /**
   * Validates a step's input value and updates its error state.
   * A step is invalid if its input value is empty or contains only whitespace.
   * @param {number} index - Index of the step to validate
   */
  validateStep(index: number): void {
    const step = this.steps[index];
    if (!step.inputValue || step.inputValue.trim() === '') {
      step.invalid = true;
      step.showErrorMessage = true;
    } else {
      step.invalid = false;
      step.showErrorMessage = false;
    }
  }
}
