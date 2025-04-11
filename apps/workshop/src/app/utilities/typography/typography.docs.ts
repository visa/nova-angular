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
import { Component } from '@angular/core';
import { WorkshopService } from '../../shared/services/workshop.service';
import { CommonModule } from '@angular/common';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaMaximizeTiny } from '@visa/nova-icons-angular';
import { MarkdownModule } from 'ngx-markdown';
import { Body1Component } from './body-1/body-1.docs';
import { Body2MediumComponent } from './body-2-medium/body-2-medium.docs';
import { Body2Component } from './body-2/body-2.docs';
import { Body3Component } from './body-3/body-3.docs';
import { ButtonLargeComponent } from './button-large/button-large.docs';
import { ButtonMediumComponent } from './button-medium/button-medium.docs';
import { ButtonSmallComponent } from './button-small/button-small.docs';
import { ColorActiveComponent } from './color-active/color-active.docs';
import { ColorDefaultComponent } from './color-default/color-default.docs';
import { ColorOnActiveComponent } from './color-on-active/color-on-active.docs';
import { ColorSubtleComponent } from './color-subtle/color-subtle.docs';
import { Display1Component } from './display-1/display-1.docs';
import { Display2Component } from './display-2/display-2.docs';
import { Headline1Component } from './headline-1/headline-1.docs';
import { Headline2Component } from './headline-2/headline-2.docs';
import { Headline3Component } from './headline-3/headline-3.docs';
import { Headline4Component } from './headline-4/headline-4.docs';
import { LabelActiveComponent } from './label-active/label-active.docs';
import { LabelLargeActiveComponent } from './label-large-active/label-large-active.docs';
import { LabelLargeComponent } from './label-large/label-large.docs';
import { LabelSmallComponent } from './label-small/label-small.docs';
import { LabelComponent } from './label/label.docs';
import { OverlineComponent } from './overline/overline.docs';
import { Subtitle1Component } from './subtitle-1/subtitle-1.docs';
import { Subtitle2Component } from './subtitle-2/subtitle-2.docs';
import { Subtitle3Component } from './subtitle-3/subtitle-3.docs';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { Body2BoldComponent } from './body-2-bold/body-2-bold.docs';
import { LabelSmallActiveComponent } from './label-small-active/label-small-active.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    MarkdownModule,
    VisaMaximizeTiny,
    Subtitle3Component,
    Subtitle2Component,
    Body1Component,
    Body2MediumComponent,
    Body2Component,
    Body2BoldComponent,
    Body3Component,
    ButtonLargeComponent,
    ButtonMediumComponent,
    ButtonSmallComponent,
    ColorActiveComponent,
    ColorDefaultComponent,
    ColorOnActiveComponent,
    ColorSubtleComponent,
    Display1Component,
    Display2Component,
    Headline1Component,
    Headline2Component,
    Headline3Component,
    Headline4Component,
    LabelActiveComponent,
    LabelLargeActiveComponent,
    LabelLargeComponent,
    LabelSmallComponent,
    LabelSmallActiveComponent,
    LabelComponent,
    OverlineComponent,
    Subtitle1Component
  ],
  standalone: true,
  selector: 'nova-workshop-typography',
  templateUrl: './typography.docs.html'
})
export class TypographyComponent {
  constructor(private workshopService: WorkshopService) {
    this.workshopService.componentName.set('Typography');
    this.workshopService.neededAPI.set([
      { name: 'TypographyDirective' },
      { name: 'TypographyColorDirective' },
      { name: 'TypographyType', type: 'constant' }
    ]);
  }
}
