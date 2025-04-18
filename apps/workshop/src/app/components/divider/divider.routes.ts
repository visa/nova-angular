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

export const dividerRoutes: Routes = [
	{ loadComponent: () => import('./divider.docs').then(m => m.DividerDocsComponent), path: '' },
	{ loadComponent: () => import('./decorative/decorative.docs').then(m => m.NovaDecorativeDividerComponent), path: 'decorative', title: 'Decorative divider component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./default/default.docs').then(m => m.NovaDefaultDividerComponent), path: 'default', title: 'Default divider component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./section/section.docs').then(m => m.NovaSectionDividerComponent), path: 'section', title: 'Section divider component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./vertical/vertical.docs').then(m => m.VerticalDividerComponent), path: 'vertical', title: 'Vertical divider component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX }
];

export default dividerRoutes;