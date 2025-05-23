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

export const buttonRoutes: Routes = [
	{ loadComponent: () => import('./button.docs').then(m => m.ButtonDocsComponent), path: '' },
	{ loadComponent: () => import('./button-as-link/button-as-link.docs').then(m => m.ButtonAsLinkButtonComponent), path: 'button-as-link', title: 'Button as link button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./destructive-primary/destructive-primary.docs').then(m => m.DestructivePrimaryButtonComponent), path: 'destructive-primary', title: 'Destructive primary button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./destructive-secondary/destructive-secondary.docs').then(m => m.DestructiveSecondaryButtonComponent), path: 'destructive-secondary', title: 'Destructive secondary button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./destructive-tertiary/destructive-tertiary.docs').then(m => m.DestructiveTertiaryButtonComponent), path: 'destructive-tertiary', title: 'Destructive tertiary button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./icon-button-primary/icon-button-primary.docs').then(m => m.IconButtonPrimaryButtonComponent), path: 'icon-button-primary', title: 'Icon button primary button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./icon-button-primary-alternate/icon-button-primary-alternate.docs').then(m => m.IconButtonPrimaryAlternateButtonComponent), path: 'icon-button-primary-alternate', title: 'Icon button primary alternate button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./icon-button-primary-disabled/icon-button-primary-disabled.docs').then(m => m.IconButtonPrimaryDisabledButtonComponent), path: 'icon-button-primary-disabled', title: 'Icon button primary disabled button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./icon-button-primary-label/icon-button-primary-label.docs').then(m => m.IconButtonPrimaryLabelButtonComponent), path: 'icon-button-primary-label', title: 'Icon button primary label button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./icon-button-primary-large/icon-button-primary-large.docs').then(m => m.IconButtonPrimaryLargeButtonComponent), path: 'icon-button-primary-large', title: 'Icon button primary large button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./icon-button-primary-small/icon-button-primary-small.docs').then(m => m.IconButtonPrimarySmallButtonComponent), path: 'icon-button-primary-small', title: 'Icon button primary small button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./icon-button-secondary/icon-button-secondary.docs').then(m => m.IconButtonSecondaryButtonComponent), path: 'icon-button-secondary', title: 'Icon button secondary button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./icon-button-secondary-alternate/icon-button-secondary-alternate.docs').then(m => m.IconButtonSecondaryAlternateButtonComponent), path: 'icon-button-secondary-alternate', title: 'Icon button secondary alternate button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./icon-button-secondary-disabled/icon-button-secondary-disabled.docs').then(m => m.IconButtonSecondaryDisabledButtonComponent), path: 'icon-button-secondary-disabled', title: 'Icon button secondary disabled button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./icon-button-secondary-label/icon-button-secondary-label.docs').then(m => m.IconButtonSecondaryLabelButtonComponent), path: 'icon-button-secondary-label', title: 'Icon button secondary label button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./icon-button-secondary-large/icon-button-secondary-large.docs').then(m => m.IconButtonSecondaryLargeButtonComponent), path: 'icon-button-secondary-large', title: 'Icon button secondary large button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./primary-alternate/primary-alternate.docs').then(m => m.PrimaryAlternateButtonComponent), path: 'primary-alternate', title: 'Primary alternate button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./primary-default/primary-default.docs').then(m => m.PrimaryDefaultButtonComponent), path: 'primary-default', title: 'Primary default button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./primary-disabled/primary-disabled.docs').then(m => m.PrimaryDisabledButtonComponent), path: 'primary-disabled', title: 'Primary disabled button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./primary-large/primary-large.docs').then(m => m.PrimaryLargeButtonComponent), path: 'primary-large', title: 'Primary large button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./primary-leading-icon/primary-leading-icon.docs').then(m => m.PrimaryLeadingIconButtonComponent), path: 'primary-leading-icon', title: 'Primary leading icon button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./primary-small/primary-small.docs').then(m => m.PrimarySmallButtonComponent), path: 'primary-small', title: 'Primary small button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./primary-trailing-icon/primary-trailing-icon.docs').then(m => m.PrimaryTrailingIconButtonComponent), path: 'primary-trailing-icon', title: 'Primary trailing icon button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./secondary-alternate/secondary-alternate.docs').then(m => m.SecondaryAlternateButtonComponent), path: 'secondary-alternate', title: 'Secondary alternate button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./secondary-default/secondary-default.docs').then(m => m.SecondaryDefaultButtonComponent), path: 'secondary-default', title: 'Secondary default button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./secondary-disabled/secondary-disabled.docs').then(m => m.SecondaryDisabledButtonComponent), path: 'secondary-disabled', title: 'Secondary disabled button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./secondary-large/secondary-large.docs').then(m => m.SecondaryLargeButtonComponent), path: 'secondary-large', title: 'Secondary large button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./secondary-leading-icon/secondary-leading-icon.docs').then(m => m.SecondaryLeadingIconButtonComponent), path: 'secondary-leading-icon', title: 'Secondary leading icon button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./secondary-small/secondary-small.docs').then(m => m.SecondarySmallButtonComponent), path: 'secondary-small', title: 'Secondary small button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./secondary-trailing-icon/secondary-trailing-icon.docs').then(m => m.SecondaryTrailingIconButtonComponent), path: 'secondary-trailing-icon', title: 'Secondary trailing icon button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./stacked-icon-button-alternate/stacked-icon-button-alternate.docs').then(m => m.StackedIconButtonAlternateButtonComponent), path: 'stacked-icon-button-alternate', title: 'Stacked icon button alternate button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./stacked-icon-button-default/stacked-icon-button-default.docs').then(m => m.StackedIconButtonDefaultButtonComponent), path: 'stacked-icon-button-default', title: 'Stacked icon button default button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./tertiary-alternate/tertiary-alternate.docs').then(m => m.TertiaryAlternateButtonComponent), path: 'tertiary-alternate', title: 'Tertiary alternate button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./tertiary-default/tertiary-default.docs').then(m => m.TertiaryDefaultButtonComponent), path: 'tertiary-default', title: 'Tertiary default button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./tertiary-disabled/tertiary-disabled.docs').then(m => m.TertiaryDisabledButtonComponent), path: 'tertiary-disabled', title: 'Tertiary disabled button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./tertiary-large/tertiary-large.docs').then(m => m.TertiaryLargeButtonComponent), path: 'tertiary-large', title: 'Tertiary large button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./tertiary-leading-icon/tertiary-leading-icon.docs').then(m => m.TertiaryLeadingIconButtonComponent), path: 'tertiary-leading-icon', title: 'Tertiary leading icon button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./tertiary-small/tertiary-small.docs').then(m => m.TertiarySmallButtonComponent), path: 'tertiary-small', title: 'Tertiary small button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./tertiary-trailing-icon/tertiary-trailing-icon.docs').then(m => m.TertiaryTrailingIconButtonComponent), path: 'tertiary-trailing-icon', title: 'Tertiary trailing icon button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./ui-icon-alternate/ui-icon-alternate.docs').then(m => m.UiIconAlternateButtonComponent), path: 'ui-icon-alternate', title: 'Ui icon alternate button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./ui-icon-badge/ui-icon-badge.docs').then(m => m.UiIconBadgeButtonComponent), path: 'ui-icon-badge', title: 'Ui icon badge button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./ui-icon-large/ui-icon-large.docs').then(m => m.UiIconLargeButtonComponent), path: 'ui-icon-large', title: 'Ui icon large button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./ui-icon-medium/ui-icon-medium.docs').then(m => m.UiIconMediumButtonComponent), path: 'ui-icon-medium', title: 'Ui icon medium button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./ui-icon-small/ui-icon-small.docs').then(m => m.UiIconSmallButtonComponent), path: 'ui-icon-small', title: 'Ui icon small button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX },
	{ loadComponent: () => import('./ui-icon-subtle/ui-icon-subtle.docs').then(m => m.UiIconSubtleButtonComponent), path: 'ui-icon-subtle', title: 'Ui icon subtle button component | Example' + TITLE_SEPARATOR + TITLE_SUFFIX }
];

export default buttonRoutes;