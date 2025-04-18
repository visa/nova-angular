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
/** This file is autogenerated */
import { Routes } from '@angular/router';
import { TITLE_SEPARATOR, TITLE_SUFFIX } from 'apps/workshop/src/assets/app.constants';

export const avatarRoutes: Routes = [
	{ loadComponent: () => import('./avatar.docs').then(m => m.AvatarDocsComponent), path: '' },
	{ loadComponent: () => import('./as-button/as-button.docs').then(m => m.AsButtonAvatarComponent), path: 'as-button', title: 'As button avatar component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./inline-directive/inline-directive.docs').then(m => m.InlineDirectiveAvatarComponent), path: 'inline-directive', title: 'Inline directive avatar component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./large-fictitious-brand/large-fictitious-brand.docs').then(m => m.LargeFictitiousBrandAvatarComponent), path: 'large-fictitious-brand', title: 'Large fictitious brand avatar component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./large-icon/large-icon.docs').then(m => m.LargeIconAvatarComponent), path: 'large-icon', title: 'Large icon avatar component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./large-image/large-image.docs').then(m => m.LargeImageAvatarComponent), path: 'large-image', title: 'Large image avatar component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./large-initials/large-initials.docs').then(m => m.LargeInitialsAvatarComponent), path: 'large-initials', title: 'Large initials avatar component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./small-horizontal-icon/small-horizontal-icon.docs').then(m => m.SmallHorizontalIconAvatarComponent), path: 'small-horizontal-icon', title: 'Small horizontal icon avatar component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./small-image/small-image.docs').then(m => m.SmallImageAvatarComponent), path: 'small-image', title: 'Small image avatar component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./small-initials/small-initials.docs').then(m => m.SmallInitialsAvatarComponent), path: 'small-initials', title: 'Small initials avatar component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./small-vertical-icon/small-vertical-icon.docs').then(m => m.SmallVerticalIconAvatarComponent), path: 'small-vertical-icon', title: 'Small vertical icon avatar component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX }
];

export default avatarRoutes;