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
import { Injectable } from '@angular/core';
import { UUIDService } from '../_utilities/services/uuid.service';
import { AccordionHeadingDirective } from '../accordion-heading/accordion-heading.directive';
import { AccordionPanelDirective } from '../accordion-panel/accordion-panel.directive';
import { ButtonDirective } from '../button/button.directive';
import { AccordionDirective } from './accordion.directive';

/**
 * AccordionService is an internal service used to create accordion behavior and is used within the accordion component.
 */
@Injectable()
export class AccordionService {
  constructor(private uuidService: UUIDService) {}

  /** @ignore */
  accordion: AccordionDirective;
  /** @ignore */
  items: { heading: AccordionHeadingDirective; button: ButtonDirective; panel: AccordionPanelDirective }[] = [];
  /** @ignore */
  headings: AccordionHeadingDirective[];
  /** @ignore */
  panels: AccordionPanelDirective[];

  /**
   * The setUpAccordion method sets up the accordion by pairing accordion headings with their respective panels and having them reflect the same expanded state.
   * @param accordion Accordion to set up.
   * @returns void
   */
  setUpAccordion(accordion: AccordionDirective) {
    this.items = []; // reset items array
    // provide service with necessary Directives
    this.accordion = accordion;
    this.headings = accordion.headings.toArray();
    this.panels = accordion.panels.toArray();

    // return or warn for edge cases of no or mismatched headings + panels
    if (this.headings.length === 0 || this.panels.length === 0) return;
    if (this.headings.length !== this.panels.length) {
      console.warn(`
        The number of accordion headings and panels are not equal. 
        Behavior may be off as a result. 
        Please ensure each heading has a matching panel.
      `);
    }

    this.headings.forEach((heading, index) => {
      // set index at heading level.
      heading._index = index;

      /**
       * Each item requires a controlling button
       * This will either be an [v-button][v-accordion-heading] or a child button of an accordion-heading
       */
      let buttonHeading: ButtonDirective | undefined = heading.hostButton
        ? heading.hostButton
        : heading._buttonHeading
          ? heading._buttonHeading
          : undefined;

      // create array of items with each controlling button and respective panel
      if (this.panels[index] && buttonHeading) {
        this.items.push({ heading: heading, button: buttonHeading, panel: this.panels[index] });

        this.setUpPanel(index, heading.expanded);
        this.setUpButton(buttonHeading, index, heading.expanded);
      }
    });
  }

  /**
   * The setUpPanel method configures a panel with index, expanded state, and assigns an id if not provided.
   * @param index Index of panel to set up.
   * @param expanded Expanded state of panel's associated accordion item.
   */
  setUpPanel(index: number, expanded: boolean) {
    // aligns panel index and expanded to associated heading
    this.panels[index]._index = index;
    this.panels[index]._expanded = expanded;
    this.panels[index].id = this.panels[index].id
      ? this.panels[index].id
      : this.uuidService.getUUID('v-accordion-panel-');
  }

  /**
   * The setUpButton method configures a button with id, aria-controls, aria-expanded attributes, and the appropriate toggle icon.
   * @param buttonHeading Button to set up.
   * @param index Index of button to set up.
   * @param expanded Expanded state of button's associated accordion item.
   */
  setUpButton(buttonHeading: ButtonDirective, index: number, expanded: boolean) {
    // sets up controlling button's aria properties
    buttonHeading.id = buttonHeading.id ? buttonHeading.id : this.uuidService.getUUID('v-accordion-button-');
    buttonHeading.ariaControls = this.panels[index].id;
    buttonHeading.ariaExpanded = expanded;
    if (buttonHeading.toggleIcon) {
      buttonHeading.toggleIcon.class = [buttonHeading.toggleIcon.class, 'v-accordion-toggle-icon'].join(' ');
      if (!buttonHeading.toggleIcon._iconSet) {
        if (!buttonHeading.toggleIcon._expandedSet) buttonHeading.toggleIcon.expandedIcon = 'chevron-down';
        if (!buttonHeading.toggleIcon._collapsedSet) buttonHeading.toggleIcon.collapsedIcon = 'chevron-right';
        buttonHeading.toggleIcon.icon.icon = expanded
          ? buttonHeading.toggleIcon.expandedIcon
          : buttonHeading.toggleIcon.collapsedIcon;
      }
    } else if (buttonHeading.toggleIconComponent) {
      buttonHeading.toggleIconComponent._accordionToggle = true;
      buttonHeading.toggleIconComponent.rotated = expanded;
    }
  }

  /**
   * The toggleItem method reverses the current state of the accordion. If collapsed, it expands; if expanded, it collapses. If it was collapsed, the function will expand. If it was expanded, the function will collapse.
   * @param index Index of accordion item to toggle.
   */
  toggleItem(index: number) {
    this.items[index]['heading'].expanded = !this.items[index]['heading'].expanded;
  }

  /**
   * The expandItem method expands the accordion by showing panel content, setting the button’s aria-expanded to true, and changing the toggle icon to expandedIcon.
   * @param index Index of accordion item to expand.
   */
  expandItem(index: number) {
    if (this.items[index]) {
      this.items[index]['panel']._expanded = true;
      this.items[index]['button'].ariaExpanded = true;
      if (this.items[index]['button'].toggleIcon && !this.items[index]['button'].toggleIcon._iconSet) {
        this.items[index]['button'].toggleIcon.icon.icon = this.items[index]['button'].toggleIcon.expandedIcon;
      } else if (this.items[index]['button'].toggleIconComponent) {
        this.items[index]['button'].toggleIconComponent.rotated = true;
      }
    }
  }

  /**
   * The collapseItem method collapses the accordion by hiding panel content, setting the button’s aria-expanded to false, and changing the toggle icon to collapsedIcon.
   * @param index Index of accordion item to collapse.
   */
  collapseItem(index: number) {
    if (this.items[index]) {
      this.items[index]['panel']._expanded = false;
      this.items[index]['button'].ariaExpanded = false;
      if (this.items[index]['button'].toggleIcon && !this.items[index]['button'].toggleIcon._iconSet) {
        this.items[index]['button'].toggleIcon.icon.icon = this.items[index]['button'].toggleIcon.collapsedIcon;
      } else if (this.items[index]['button'].toggleIconComponent) {
        this.items[index]['button'].toggleIconComponent.rotated = false;
      }
    }
  }
}
