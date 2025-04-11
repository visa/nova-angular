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
import { Route } from '@angular/router';
import { TITLE_SEPARATOR, TITLE_SUFFIX } from 'apps/workshop/src/assets/app.constants';
import { sentenceCase } from 'change-case';

export const servicesRoutes: ({ name?: string; path: string } & Route)[] = [
  {
    path: 'accordion',
    loadChildren: () => import('./accordion/accordion.routes')
  },
  {
    path: 'app-ready',
    loadChildren: () => import('./app-ready/app-ready.routes')
  },
  {
    path: 'combobox',
    loadChildren: () => import('./combobox/combobox.routes')
  },
  {
    name: 'Floating UI',
    path: 'floating-ui',
    loadChildren: () => import('./floating-ui/floating-ui.routes'),
    title: 'Floating UI | Service' + TITLE_SEPARATOR + TITLE_SUFFIX
  },
  {
    path: 'id-generator',
    loadChildren: () => import('./id-generator/id-generator.routes')
  },
  {
    path: 'listbox',
    loadChildren: () => import('./listbox/listbox.routes')
  },
  {
    path: 'nova-lib',
    loadChildren: () => import('./nova-lib/nova-lib.routes')
  },
  {
    path: 'pagination',
    loadChildren: () => import('./pagination/pagination.routes')
  }
];

export const servicesRoutesWithTitle: ({ name: string; path: string } & Route)[] = servicesRoutes.map(
  (serviceRoute) => ({
    name: sentenceCase(serviceRoute.path),
    title: sentenceCase(serviceRoute.path) + ' | Service' + TITLE_SEPARATOR + TITLE_SUFFIX,
    ...serviceRoute
  })
);

export default servicesRoutes;
