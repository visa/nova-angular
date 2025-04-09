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
import { Routes } from '@angular/router';
import { TITLE_SEPARATOR, TITLE_SUFFIX } from '../assets/app.constants';
import { servicesRoutesWithTitle } from './services/services.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/pages/docs-layout/docs-layout.docs').then((m) => m.DocsLayoutComponent),
    title: TITLE_SUFFIX,
    children: [
      {
        path: '',
        loadComponent: () => import('./shared/pages/home/home.component').then((m) => m.HomeComponent)
      },
      {
        path: '',
        loadComponent: () =>
          import('./shared/app-components/site-header/site-header.component').then((m) => m.SiteHeaderComponent)
      },
      {
        path: 'components',
        loadComponent: () =>
          import('./shared/pages/components/components.component').then((m) => m.ComponentsPageComponent),
        title: 'Components' + TITLE_SEPARATOR + TITLE_SUFFIX
      },
      {
        path: '',
        loadComponent: () =>
          import('./shared/pages/component-layout/component-layout.component').then((m) => m.ComponentLayoutComponent),
        children: [
          {
            path: 'components',
            loadChildren: () => import('./components/components.routes').then((m) => m.componentRoutesWithTitle)
          },
          {
            path: 'utilities',
            loadChildren: () => import('./utilities/utilities.routes').then((m) => m.utilitiesRoutesWithTitle)
          }
        ]
      },
      {
        path: 'foundations',
        loadChildren: () => import('./foundations/foundations.routes').then((m) => m.foundationRoutes)
      },
      {
        path: 'services',
        children: servicesRoutesWithTitle
      }
    ]
  },
  {
    path: 'examples',
    loadComponent: () =>
      import('./shared/pages/examples-layout/examples-layout.component').then((m) => m.ExampleLayoutComponent),
    children: [
      {
        path: 'components',
        loadChildren: () => import('./components/components.routes').then((m) => m.componentRoutesWithTitle)
      },
      {
        path: 'utilities',
        loadChildren: () => import('./utilities/utilities.routes').then((m) => m.utilitiesRoutesWithTitle)
      }
    ]
  },
  {
    path: 'site-map',
    loadComponent: () => import('./shared/app-components/site-map/site-map.component').then((m) => m.SiteMapComponent),
    title: 'Site Map' + TITLE_SEPARATOR + TITLE_SUFFIX
  },
  {
    path: '**',
    loadComponent: () => import('./shared/pages/docs-layout/docs-layout.docs').then((m) => m.DocsLayoutComponent),
    children: [
      {
        path: '**',
        loadComponent: () => import('./shared/pages/404-page/404-page.docs').then((m) => m.PageNotFoundComponent),
        title: 'Page not found' + TITLE_SEPARATOR + TITLE_SUFFIX
      }
    ]
  }
];
