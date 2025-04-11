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
import { sentenceCase } from 'change-case';
import { TITLE_SEPARATOR, TITLE_SUFFIX } from '../../assets/app.constants';

export const utilitiesRoutes: ({ path: string } & Route)[] = [
  {
    path: 'breakpoints',
    loadChildren: () => import('./breakpoints/breakpoints.routes')
  },
  {
    path: 'elevation',
    loadChildren: () => import('./elevation/elevation.routes')
  },
  {
    path: 'flex',
    loadChildren: () => import('./flex/flex.routes')
  },
  {
    path: 'open-in-new-tab',
    loadChildren: () => import('./open-in-new-tab/open-in-new-tab.routes')
  },
  {
    path: 'spacing',
    loadChildren: () => import('./spacing/spacing.routes')
  },
  {
    path: 'accessibility',
    loadChildren: () => import('./accessibility/accessibility.routes')
  },
  {
    path: 'surface',
    loadChildren: () => import('./surface/surface.routes')
  },
  {
    path: 'typography',
    loadChildren: () => import('./typography/typography.routes')
  }
];

export const utilitiesRoutesWithTitle: ({ name: string; path: string } & Route)[] = utilitiesRoutes.map(
  (utilitiesRoute) => ({
    name: sentenceCase(utilitiesRoute.path),
    title: sentenceCase(utilitiesRoute.path) + ' | Utilities' + TITLE_SEPARATOR + TITLE_SUFFIX,
    ...utilitiesRoute
  })
);

export default utilitiesRoutes;
