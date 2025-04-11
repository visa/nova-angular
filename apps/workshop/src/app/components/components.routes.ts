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
import { ProgressService } from './progress/progress.service';

export const componentRoutes: ({ path: string } & Route)[] = [
  {
    path: 'accordion',
    loadChildren: () => import('./accordion/accordion.routes')
  },
  {
    path: 'anchor-link-menu',
    loadChildren: () => import('./anchor-link-menu/anchor-link-menu.routes')
  },
  {
    path: 'avatar',
    loadChildren: () => import('./avatar/avatar.routes')
  },
  {
    path: 'badge',
    loadChildren: () => import('./badge/badge.routes')
  },
  {
    path: 'banner',
    loadChildren: () => import('./banner/banner.routes')
  },
  {
    path: 'breadcrumbs',
    loadChildren: () => import('./breadcrumbs/breadcrumbs.routes')
  },
  {
    path: 'button',
    loadChildren: () => import('./button/button.routes')
  },
  {
    path: 'checkbox',
    loadChildren: () => import('./checkbox/checkbox.routes')
  },
  {
    path: 'chip',
    loadChildren: () => import('./chip/chip.routes')
  },
  {
    path: 'color-selector',
    loadChildren: () => import('./color-selector/color-selector.routes')
  },
  {
    path: 'combobox',
    loadChildren: () => import('./combobox/combobox.routes')
  },
  {
    path: 'content-card',
    loadChildren: () => import('./content-card/content-card.routes')
  },
  {
    path: 'date-and-time-selectors',
    loadChildren: () => import('./date-and-time-selectors/date-and-time-selectors.routes')
  },
  {
    path: 'dialog',
    loadChildren: () => import('./dialog/dialog.routes')
  },
  {
    path: 'divider',
    loadChildren: () => import('./divider/divider.routes')
  },
  {
    path: 'dropdown-menu',
    loadChildren: () => import('./dropdown-menu/dropdown-menu.routes')
  },
  {
    path: 'flag',
    loadChildren: () => import('./flag/flag.routes')
  },
  {
    path: 'footer',
    loadChildren: () => import('./footer/footer.routes')
  },
  {
    path: 'icon',
    loadChildren: () => import('./icon/icon.routes')
  },
  {
    path: 'input',
    loadChildren: () => import('./input/input.routes')
  },
  {
    path: 'link',
    loadChildren: () => import('./link/link.routes')
  },
  {
    path: 'listbox',
    loadChildren: () => import('./listbox/listbox.routes')
  },
  {
    path: 'multiselect',
    loadChildren: () => import('./multiselect/multiselect.routes')
  },
  {
    path: 'navigation-drawer',
    loadChildren: () => import('./navigation-drawer/navigation-drawer.routes')
  },
  {
    path: 'horizontal-navigation',
    loadChildren: () => import('./horizontal-navigation/horizontal-navigation.routes')
  },
  {
    path: 'vertical-navigation',
    loadChildren: () => import('./vertical-navigation/vertical-navigation.routes')
  },
  {
    path: 'pagination',
    loadChildren: () => import('./pagination/pagination.routes')
  },
  {
    path: 'panel',
    loadChildren: () => import('./panel/panel.routes')
  },
  {
    path: 'progress',
    providers: [ProgressService],
    loadChildren: () => import('./progress/progress.routes')
  },
  {
    path: 'radio',
    loadChildren: () => import('./radio/radio.routes')
  },
  {
    path: 'section-message',
    loadChildren: () => import('./section-message/section-message.routes')
  },
  {
    path: 'select',
    loadChildren: () => import('./select/select.routes')
  },
  {
    path: 'switch',
    loadChildren: () => import('./switch/switch.routes')
  },
  {
    path: 'table',
    loadChildren: () => import('./table/table.routes')
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes')
  },
  {
    path: 'tests',
    loadChildren: () => import('./tests/tests.routes')
  },
  {
    path: 'toggle',
    redirectTo: 'toggle-button'
  },
  {
    path: 'toggle-button',
    loadChildren: () => import('./toggle/toggle.routes')
  },
  {
    path: 'tooltip',
    loadChildren: () => import('./tooltip/tooltip.routes')
  },
  {
    path: 'wizard',
    loadChildren: () => import('./wizard/wizard.routes')
  }
];

export const componentRoutesWithTitle: ({ name: string; path: string } & Route)[] = componentRoutes.map(
  (componentRoute) => ({
    name: sentenceCase(componentRoute.path),
    title: sentenceCase(componentRoute.path) + ' | Component' + TITLE_SEPARATOR + TITLE_SUFFIX,
    ...componentRoute
  })
);

export const componentRoutesWithTitleWithHiddenRoutes = componentRoutesWithTitle.filter(
  (componentRoute) => componentRoute.path !== 'tests' && componentRoute.loadChildren
);

export default componentRoutesWithTitle;
