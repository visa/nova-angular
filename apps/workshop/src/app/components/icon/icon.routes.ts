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

export const iconRoutes: Routes = [
	{ loadComponent: () => import('./icon.docs').then(m => m.IconDocsComponent), path: '' },
	{ loadComponent: () => import('./default/default.docs').then(m => m.DefaultIconComponent), path: 'default', title: 'Default icon component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./generic/generic.docs').then(m => m.GenericIconComponent), path: 'generic', title: 'Generic icon component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./high-resolution/high-resolution.docs').then(m => m.HighResolutionIconComponent), path: 'high-resolution', title: 'High resolution icon component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./low-resolution/low-resolution.docs').then(m => m.LowResolutionIconComponent), path: 'low-resolution', title: 'Low resolution icon component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./rtl/rtl.docs').then(m => m.RTLIconComponent), path: 'rtl', title: 'Rtl icon component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./tiny-resolution/tiny-resolution.docs').then(m => m.TinyResolutionIconComponent), path: 'tiny-resolution', title: 'Tiny resolution icon component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./using-icon-sprite/using-icon-sprite.docs').then(m => m.UsingIconSpriteIconComponent), path: 'using-icon-sprite', title: 'Using icon sprite icon component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./visa/visa.docs').then(m => m.VisaIconComponent), path: 'visa', title: 'Visa icon component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX }
];

export default iconRoutes;