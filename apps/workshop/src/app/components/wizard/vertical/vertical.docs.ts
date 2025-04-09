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
import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputDirective, NovaLibModule } from '@visa/nova-angular';
import {
  VisaArrowForwardTiny,
  VisaArrowBackTiny,
  VisaCheckmarkTiny,
  VisaChevronRightTiny,
  VisaErrorAltTiny,
  VisaErrorTiny
} from '@visa/nova-icons-angular';
import { SharedWizardExitDialogComponent } from '../shared-wizard-components/exit-dialog/exit-dialog.docs';
import { SharedWizardSaveFlagComponent } from '../shared-wizard-components/save-flag/save-flag.docs';
import { SharedWizardSuccessPageComponent } from '../shared-wizard-components/success-page/success-page.docs';
import { SharedWizardSummaryPageComponent } from '../shared-wizard-components/summary-page/summary-page.docs';
import { ExampleComponent } from '../../../shared/app-components/example/example.docs';

@Component({
  selector: 'nova-workshop-wizard-vertical',
  templateUrl: './vertical.docs.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NovaLibModule,
    ExampleComponent,
    VisaChevronRightTiny,
    VisaCheckmarkTiny,
    VisaErrorAltTiny,
    VisaErrorTiny,
    VisaArrowForwardTiny,
    VisaArrowBackTiny,
    SharedWizardSuccessPageComponent,
    SharedWizardExitDialogComponent,
    SharedWizardSaveFlagComponent,
    SharedWizardSummaryPageComponent
  ]
})
export class VerticalWizardComponent {
  @ViewChild('exitDialog') exitDialog: SharedWizardExitDialogComponent;
  @ViewChildren(InputDirective) inputs: QueryList<InputDirective>;
  currentStep: number = 0;
  showFlag = false;
  showSuccess = false;
  steps = [
    {
      stepLabel: 'Step 1 label',
      index: 0,
      invalid: false,
      complete: false,
      available: true,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step 2  label',
      index: 1,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step 3 label',
      index: 2,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step 4 label',
      index: 3,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    },
    {
      stepLabel: 'Step 5 label',
      index: 4,
      invalid: false,
      complete: false,
      available: false,
      inputLabel: 'Label (required)',
      inputValue: ''
    }
  ];

  previousStep() {
    this.goTo(this.currentStep - 1);
  }

  nextStep(isSave: boolean = false) {
    this.steps[this.currentStep].invalid = !this.steps[this.currentStep].inputValue;
    if (this.steps[this.currentStep].invalid) {
      this.steps[this.currentStep].complete = false;
      for (let i = this.currentStep + 1; i < this.steps.length; i++) {
        this.steps[i].available = false;
      }
      this.inputs.toArray()[this.currentStep].el.nativeElement.focus();
      return;
    } else if (!isSave) {
      this.goTo(this.currentStep + 1);
    } else {
      this.showFlag = true;
    }
  }

  goTo(index: number) {
    if (!this.steps[this.currentStep]) return;
    if (this.steps[index]) {
      if (index > this.currentStep) {
        // moving forward
        this.steps[this.currentStep].complete = true;
      }
      this.steps[index].available = true;
      this.currentStep = index;
      setTimeout(() => {
        // wait for new input to render before setting focus
        this.inputs.toArray()[this.currentStep].el.nativeElement.focus();
      }, 0);
    }
  }

  submit() {
    this.showSuccess = true;
    this.steps.forEach((input, index) => {
      if (index === this.steps.length - 1) return;
      input.available = index === 0 ? true : false;
      input.complete = false;
      input.inputValue = '';
    });
    this.currentStep = 0;
  }
}
