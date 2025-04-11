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
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AddArrowKeysDirective } from './_utilities/angular-specific-directives/add-arrow-keys.directive';
import { BaseInteractiveDirective } from './_utilities/angular-specific-directives/base-interactive.directive';
import { OpensInNewTabDirective } from './_utilities/angular-specific-directives/opens-in-new-tab.directive';
import { AccordionButtonHeadingDirective } from './accordion-button-heading/accordion-button-heading.directive';
import { AccordionHeadingDirective } from './accordion-heading/accordion-heading.directive';
import { AccordionDetailsDirective } from './accordion-item/accordion-item.directive';
import { AccordionPanelDirective } from './accordion-panel/accordion-panel.directive';
import { AccordionDirective } from './accordion/accordion.directive';
import { AlternateDirective } from './alternate/alternate.directive';
import { AnchorLinkMenuHeaderDirective } from './anchor-link-menu-header/anchor-link-menu-header.directive';
import { AnchorLinkMenuDirective } from './anchor-link-menu/anchor-link-menu.directive';
import { TooltipArrowDirective } from './arrow/arrow.directive';
import { AvatarRoleImgDirective } from './avatar-role-img/avatar-role-img.directive';
import { AvatarDirective } from './avatar/avatar.directive';
import { BadgeDirective } from './badge/badge.directive';
import { BannerDirective } from './banner/banner.directive';
import { BreadcrumbsDirective } from './breadcrumbs/breadcrumbs.directive';
import { BreakpointsDirective } from './breakpoints/breakpoints.directive';
import { ButtonAsDisabledATagDirective } from './button-as-disabled-a-tag/button-as-disabled-a-tag.directive';
import { ButtonDisabledDirective } from './button-disabled/button-disabled.directive';
import { ButtonIconDirective } from './button-icon/button-icon.directive';
import { ButtonStackedDirective } from './button-stacked/button-stacked.directive';
import { ButtonDirective } from './button/button.directive';
import { CheckboxPanelDirective } from './checkbox-panel/checkbox-panel.directive';
import { CheckboxDirective } from './checkbox/checkbox.directive';
import { ChipDirective } from './chip/chip.directive';
import { CircularProgressComponent } from './circular-progress/circular-progress.component';
import { ComboboxDirective } from './combobox/combobox.directive';
import { ContentCardBodyDirective } from './content-card-body/content-card-body.directive';
import { ContentCardImageDirective } from './content-card-image/content-card-image.directive';
import { ContentCardSubtitleDirective } from './content-card-subtitle/content-card-subtitle.directive';
import { ContentCardTitleLinkDirective } from './content-card-title-link/content-card-title-link.directive';
import { ContentCardTitleDirective } from './content-card-title/content-card-title.directive';
import { ContentCardDirective } from './content-card/content-card.directive';
import { DialogHeaderDirective } from './dialog-header/dialog-header.directive';
import { DialogTextDirective } from './dialog-text/dialog-text.directive';
import { DialogComponent } from './dialog/dialog.component';
import { TabItemDisclosureDirective } from './disclosure-tab-item/disclosure-tab-item.directive';
import { DividerDirective } from './divider/divider.directive';
import { DropdownItemDirective } from './dropdown-item/dropdown-item.directive';
import { DropdownListDirective } from './dropdown-list/dropdown-list.directive';
import { DropdownMenuDirective } from './dropdown-menu/dropdown-menu.directive';
import { DualIconDirective } from './dual-icons/dual-icons.directive';
import { ElevationDirective } from './elevation/elevation.directive';
import { FlagDirective } from './flag/flag.directive';
import { FlexDirective } from './flex/flex.directive';
import { FloatingUIContainer } from './floating-ui-container/floating-ui-container.directive';
import { FloatingUIElementDirective } from './floating-ui-element/floating-ui-element.directive';
import { FloatingUITriggerDirective } from './floating-ui-trigger/floating-ui-trigger.directive';
import { FooterDirective } from './footer/footer.directive';
import { IconToggleDefaultTemplateDirective } from './icon-toggle-default/icon-toggle-default.directive';
import { IconToggleRotatedTemplateDirective } from './icon-toggle-rotated/icon-toggle-rotated.directive';
import { IconToggleComponent } from './icon-toggle/icon-toggle.component';
import { IconToggleDirective } from './icon-toggle/icon-toggle.directive';
import { IconComponent } from './icon/icon.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { InputMessageDirective } from './input-message/input-message.directive';
import { InputDirective } from './input/input.directive';
import { LabelDirective } from './label/label.directive';
import { LinearProgressDirective } from './linear-progress/linear-progress.directive';
import { LinkDirective } from './link/link.directive';
import { ListboxContainerDirective } from './listbox-container/listbox-container.directive';
import { ListboxItemComponent } from './listbox-item/listbox-item.component';
import { ListboxDirective } from './listbox/listbox.directive';
import { MarginDirective } from './margin/margin.directive';
import { MessageContentDirective } from './message-content/message-content.directive';
import { MessageIconDirective } from './message-icon/message-icon.directive';
import { MessageDirective } from './message/message.directive';
import { NavDirective } from './nav/nav.directive';
import { PaddingDirective } from './padding/padding.directive';
import { PaginationOverflowDirective } from './pagination-overflow/pagination-overflow.directive';
import { PaginationDirective } from './pagination/pagination.directive';
import { PanelBodyDirective } from './panel-body/panel-body.directive';
import { PanelContentDirective } from './panel-content/panel-content.directive';
import { PanelToggleDirective } from './panel-toggle-button/panel-toggle-button.directive';
import { PanelComponent } from './panel/panel.component';
import { RadioGroupDirective } from './radio-group/radio-group.directive';
import { RadioDirective } from './radio/radio.directive';
import { ScreenreaderOnlyDirective } from './screenreader-only/screenreader-only.directive';
import { SectionMessageDirective } from './section-message/section-message.directive';
import { SelectDirective } from './select/select.directive';
import { SkipToContentDirective } from './skip-to-content/skip-to-content.component';
import { SurfaceDirective } from './surface/surface.directive';
import { SwitchLabelDirective } from './switch-label/switch-label.directive';
import { SwitchDirective } from './switch/switch.directive';
import { TabItemDirective } from './tab-item/tab-item.directive';
import { TabListDirective } from './tab-list/tab-list.directive';
import { TableWrapperDirective } from './table-wrapper/table-wrapper.directive';
import { TableDirective } from './table/table.directive';
import { TbodyDirective } from './tbody/tbody.directive';
import { TdDirective } from './td/td.directive';
import { ThDirective } from './th/th.directive';
import { ToggleButtonDirective } from './toggle-button/toggle-button.directive';
import { ToggleContainerDirective } from './toggle-container/toggle-container.directive';
import { ToggleDirective } from './toggle/toggle.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { TrDirective } from './tr/tr.directive';
import { TypographyColorDirective } from './typography-color/typography-color.directive';
import { TypographyDirective } from './typography/typography.directive';
import { VisaLogoComponent } from './visa-logo/visa-logo.component';
import { WizardStepDirective } from './wizard-step/wizard-step.directive';
import { WizardDirective } from './wizard/wizard.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    AccordionButtonHeadingDirective,
    AccordionDetailsDirective,
    AccordionDirective,
    AccordionHeadingDirective,
    AccordionPanelDirective,
    AddArrowKeysDirective,
    AlternateDirective,
    AnchorLinkMenuDirective,
    AnchorLinkMenuHeaderDirective,
    AvatarDirective,
    AvatarRoleImgDirective,
    BadgeDirective,
    BannerDirective,
    BaseInteractiveDirective,
    BreadcrumbsDirective,
    BreakpointsDirective,
    ButtonAsDisabledATagDirective,
    ButtonDirective,
    ButtonDisabledDirective,
    ButtonIconDirective,
    ButtonStackedDirective,
    CheckboxDirective,
    CheckboxPanelDirective,
    ChipDirective,
    CircularProgressComponent,
    ComboboxDirective,
    ContentCardBodyDirective,
    ContentCardDirective,
    ContentCardImageDirective,
    ContentCardSubtitleDirective,
    ContentCardTitleDirective,
    ContentCardTitleLinkDirective,
    DialogComponent,
    DialogHeaderDirective,
    DialogTextDirective,
    DividerDirective,
    DropdownItemDirective,
    DropdownListDirective,
    DropdownMenuDirective,
    DualIconDirective,
    ElevationDirective,
    FlagDirective,
    FlexDirective,
    FloatingUIContainer,
    FloatingUIElementDirective,
    FloatingUITriggerDirective,
    FooterDirective,
    IconComponent,
    IconToggleComponent,
    IconToggleDefaultTemplateDirective,
    IconToggleDirective,
    IconToggleRotatedTemplateDirective,
    InputContainerComponent,
    InputDirective,
    InputMessageDirective,
    LabelDirective,
    LinearProgressDirective,
    LinkDirective,
    ListboxContainerDirective,
    ListboxDirective,
    ListboxItemComponent,
    MarginDirective,
    MessageContentDirective,
    MessageDirective,
    MessageIconDirective,
    NavDirective,
    OpensInNewTabDirective,
    PaddingDirective,
    PaginationDirective,
    PaginationOverflowDirective,
    PanelBodyDirective,
    PanelComponent,
    PanelContentDirective,
    PanelToggleDirective,
    RadioDirective,
    RadioGroupDirective,
    ScreenreaderOnlyDirective,
    SectionMessageDirective,
    SelectDirective,
    SkipToContentDirective,
    SurfaceDirective,
    SwitchDirective,
    SwitchLabelDirective,
    TabItemDirective,
    TabItemDisclosureDirective,
    TableDirective,
    TableWrapperDirective,
    TabListDirective,
    TbodyDirective,
    TdDirective,
    ThDirective,
    ToggleButtonDirective,
    ToggleContainerDirective,
    ToggleDirective,
    TooltipDirective,
    TooltipArrowDirective,
    TrDirective,
    TypographyColorDirective,
    TypographyDirective,
    VisaLogoComponent,
    WizardDirective,
    WizardStepDirective
  ],
  declarations: [],
  exports: [
    AccordionButtonHeadingDirective,
    AccordionDetailsDirective,
    AccordionDirective,
    AccordionHeadingDirective,
    AccordionPanelDirective,
    AddArrowKeysDirective,
    AlternateDirective,
    AnchorLinkMenuDirective,
    AnchorLinkMenuHeaderDirective,
    AvatarDirective,
    AvatarRoleImgDirective,
    BadgeDirective,
    BannerDirective,
    BaseInteractiveDirective,
    BreadcrumbsDirective,
    BreakpointsDirective,
    ButtonAsDisabledATagDirective,
    ButtonDirective,
    ButtonDisabledDirective,
    ButtonIconDirective,
    ButtonStackedDirective,
    CheckboxDirective,
    CheckboxPanelDirective,
    ChipDirective,
    CircularProgressComponent,
    ComboboxDirective,
    ContentCardBodyDirective,
    ContentCardDirective,
    ContentCardImageDirective,
    ContentCardSubtitleDirective,
    ContentCardTitleDirective,
    ContentCardTitleLinkDirective,
    DialogComponent,
    DialogHeaderDirective,
    DialogTextDirective,
    DividerDirective,
    DropdownItemDirective,
    DropdownListDirective,
    DropdownMenuDirective,
    DualIconDirective,
    ElevationDirective,
    FlagDirective,
    FlexDirective,
    FloatingUIContainer,
    FloatingUIElementDirective,
    FloatingUITriggerDirective,
    FooterDirective,
    IconComponent,
    IconToggleComponent,
    IconToggleDefaultTemplateDirective,
    IconToggleDirective,
    IconToggleRotatedTemplateDirective,
    InputContainerComponent,
    InputDirective,
    InputMessageDirective,
    LabelDirective,
    LinearProgressDirective,
    LinkDirective,
    ListboxContainerDirective,
    ListboxDirective,
    ListboxItemComponent,
    MarginDirective,
    MessageContentDirective,
    MessageDirective,
    MessageIconDirective,
    NavDirective,
    OpensInNewTabDirective,
    PaddingDirective,
    PaginationDirective,
    PaginationOverflowDirective,
    PanelBodyDirective,
    PanelComponent,
    PanelContentDirective,
    PanelToggleDirective,
    RadioDirective,
    RadioGroupDirective,
    ScreenreaderOnlyDirective,
    SectionMessageDirective,
    SelectDirective,
    SkipToContentDirective,
    SurfaceDirective,
    SwitchDirective,
    SwitchLabelDirective,
    TabItemDirective,
    TabItemDisclosureDirective,
    TableDirective,
    TableWrapperDirective,
    TabListDirective,
    TbodyDirective,
    TdDirective,
    ThDirective,
    ToggleButtonDirective,
    ToggleContainerDirective,
    ToggleDirective,
    TooltipDirective,
    TooltipArrowDirective,
    TrDirective,
    TypographyColorDirective,
    TypographyDirective,
    VisaLogoComponent,
    WizardDirective,
    WizardStepDirective
  ]
})
export class NovaLibModule {}
