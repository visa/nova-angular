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
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { AsButtonAvatarComponent } from './as-button/as-button.docs';
import { InlineDirectiveAvatarComponent } from './inline-directive/inline-directive.docs';
import { LargeFictitiousBrandAvatarComponent } from './large-fictitious-brand/large-fictitious-brand.docs';
import { LargeIconAvatarComponent } from './large-icon/large-icon.docs';
import { LargeImageAvatarComponent } from './large-image/large-image.docs';
import { LargeInitialsAvatarComponent } from './large-initials/large-initials.docs';
import { SmallHorizontalIconAvatarComponent } from './small-horizontal-icon/small-horizontal-icon.docs';
import { SmallImageAvatarComponent } from './small-image/small-image.docs';
import { SmallInitialsAvatarComponent } from './small-initials/small-initials.docs';
import { SmallVerticalIconAvatarComponent } from './small-vertical-icon/small-vertical-icon.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    AsButtonAvatarComponent,
    SmallHorizontalIconAvatarComponent,
    SmallVerticalIconAvatarComponent,
    LargeFictitiousBrandAvatarComponent,
    LargeIconAvatarComponent,
    InlineDirectiveAvatarComponent,
    SmallInitialsAvatarComponent,
    LargeInitialsAvatarComponent,
    LargeImageAvatarComponent,
    SmallImageAvatarComponent
  ],
  standalone: true,
  selector: 'vds-docs-avatar',
  templateUrl: './avatar.docs.html'
})
export class AvatarDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Avatar');
    this.workshopService.neededAPI.set([
      { name: 'AvatarDirective', type: 'directive' },
      { name: 'AvatarRoleImgDirective', type: 'directive' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
