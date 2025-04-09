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
import { Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaInformationLow } from '@visa/nova-icons-angular';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { NovaCompletedProgressBarProgressComponent } from './completed-progress-bar/completed-progress-bar.docs';
import { NovaCustomLinearProgressComponent } from './custom-linear-progress/custom-linear-progress.docs';
import { NovaCustomSizeCircularProgressComponent } from './custom-size-circular-progress/custom-size-circular-progress.docs';
import { NovaCustomSlowCircularProgressComponent } from './custom-slow-circular-progress/custom-slow-circular-progress.docs';
import { NovaDeterminateCircularProgressCompletedComponent } from './determinate-circular-progress-completed/determinate-circular-progress-completed.docs';
import { NovaDeterminateCircularProgressComponent } from './determinate-circular-progress/determinate-circular-progress.docs';
import { NovaDeterminateProgressBarNoLabelProgressComponent } from './determinate-progress-bar-no-label/determinate-progress-bar-no-label.docs';
import { NovaErrorProgressCircularProgressComponent } from './error-circular-progress/error-circular-progress.docs';
import { NovaErrorProgressBarProgressComponent } from './error-progress-bar/error-progress-bar.docs';
import { NovaIndeterminateCircularProgressSmallComponent } from './indeterminate-circular-progress-small/indeterminate-circular-progress-small.docs';
import { NovaIndeterminateCircularProgressComponent } from './indeterminate-circular-progress/indeterminate-circular-progress.docs';
import { NovaIndeterminateProgressBarNoLabelProgressComponent } from './indeterminate-progress-bar-no-label/indeterminate-progress-bar-no-label.docs';
import { NovaIndeterminateProgressBarProgressComponent } from './indeterminate-progress-bar/indeterminate-progress-bar.docs';
import { NovaLiveCircularProgressComponent } from './live-circular-progress/live-circular-progress.docs';
import { NovaLiveProgressBarProgressComponent } from './live-progress-bar/live-progress-bar.docs';
import { ProgressService } from './progress.service';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    NovaCompletedProgressBarProgressComponent,
    NovaErrorProgressBarProgressComponent,
    NovaErrorProgressCircularProgressComponent,
    VisaInformationLow,
    NovaIndeterminateProgressBarProgressComponent,
    NovaIndeterminateProgressBarNoLabelProgressComponent,
    NovaDeterminateCircularProgressComponent,
    NovaDeterminateCircularProgressCompletedComponent,
    NovaDeterminateProgressBarNoLabelProgressComponent,
    NovaIndeterminateCircularProgressComponent,
    NovaIndeterminateCircularProgressSmallComponent,
    NovaLiveCircularProgressComponent,
    NovaLiveProgressBarProgressComponent,
    NovaCustomSizeCircularProgressComponent,
    NovaCustomLinearProgressComponent,
    NovaCustomSlowCircularProgressComponent
  ],
  standalone: true,
  selector: 'nova-workshop-progress',
  templateUrl: './progress.docs.html'
})
export class ProgressDocsComponent {
  constructor(
    private progressService: ProgressService,
    public workshopService: WorkshopService
  ) {
    this.workshopService.componentName.set('Progress');
    this.workshopService.neededAPI.set([
      { name: 'CircularProgressComponent', type: 'component' },
      { name: 'LinearProgressDirective' },
      { name: 'LabelDirective' },
      { name: 'AppReadyService', type: 'service-source' },
      { name: 'UUIDService', type: 'service-source' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }

  onChange() {
    if (this.progressService.isPaused()) {
      this.progressService.isPaused.set(null);
    } else {
      this.progressService.isPaused.set(true);
    }
  }
}
