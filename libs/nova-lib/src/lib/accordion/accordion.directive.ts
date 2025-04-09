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
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  EventEmitter,
  HostBinding,
  Input,
  Optional,
  Output,
  QueryList
} from '@angular/core';
import { FlexDirective } from '../flex/flex.directive';
import { AccordionHeadingDirective } from '../accordion-heading/accordion-heading.directive';
import { AccordionDetailsDirective } from '../accordion-item/accordion-item.directive';
import { AccordionPanelDirective } from '../accordion-panel/accordion-panel.directive';
import { ButtonColor } from '../button/button.constants';
import { ButtonDirective } from '../button/button.directive';
import { WizardDirective } from '../wizard/wizard.directive';
import { AccordionService } from './accordion.service';
import { UUIDService } from '../_utilities/services/uuid.service';

@Directive({
  standalone: true,
  selector: '[v-accordion]',
  providers: [AccordionService]
})
export class AccordionDirective implements AfterContentInit {
  @ContentChildren(AccordionHeadingDirective, { descendants: true })
  headings: QueryList<AccordionHeadingDirective>;
  @ContentChildren(AccordionPanelDirective, { descendants: true })
  panels: QueryList<AccordionPanelDirective>;
  buttonClickedSubscriptions: any[] = [];
  @ContentChildren(AccordionDetailsDirective, { descendants: true })
  accordionItems: QueryList<AccordionDetailsDirective>;
  _removeDefaultFlex: boolean | undefined = false;
  _removeDefaultGap: boolean | undefined | null | any = false;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-accordion
   */
  @Input()
  get class(): string {
    return [
      this._class,
      this.accordionItems.length <= 0 && !this.wizard ? 'v-accordion' : '',
      !this._removeDefaultFlex && this.accordionItems.length > 0 ? 'v-flex v-flex-col' : '',
      !this._removeDefaultGap && this.accordionItems.length > 0 ? 'v-gap-6' : ''
    ].join(' ');
  }
  set class(value: string) {
    this._class = value;
  }
  _class: string = '';
  @HostBinding('class')
  get hostClass(): string {
    return this.class;
  }

  /**
   * Allows multiple accordion items to be expanded when true.
   * @default false
   */
  @Input()
  get multiselect(): boolean {
    return this._multiselect;
  }
  set multiselect(value: BooleanInput) {
    this._multiselect = coerceBooleanProperty(value);
  }
  _multiselect: boolean = false;

  /**
   * Applies subtle accordion styling when true.
   * @default false
   */
  @Input()
  get subtle(): boolean {
    return this._subtle;
  }
  set subtle(value: BooleanInput) {
    this._subtle = coerceBooleanProperty(value);
    this.setAsSubtle();
  }
  _subtle: boolean = false;

  /**
   * Emits indexes of expanded items when an accordion item is toggled.
   */
  @Output() itemsChanged = new EventEmitter<number[]>();

  /** variable that maintains the array of indexes of expanded items */
  itemsExpanded: Array<number> = [];

  constructor(
    private accordionService: AccordionService,
    private cdRef: ChangeDetectorRef,
    private uuidService: UUIDService,
    @Optional() private flex?: FlexDirective,
    @Optional() private wizard?: WizardDirective
  ) {}

  ngAfterContentInit(): void {
    if (!this.accordionItems.length) this.accordionService.setUpAccordion(this);
    this.cdRef.detectChanges(); // detect changes made to component within setUpAccordion
    this.setAsSubtle();

    // remove default flex and gap if user has set their own
    this._removeDefaultFlex = this.flex && this.flex.vFlexRow;
    this._removeDefaultGap = this.flex && this.flex.vGap;

    if (this.accordionItems) {
      if (this.accordionItems.length > 0) {
        this.setUpAccordionItems();
      }
      this.accordionItems.changes.subscribe(() => {
        this.setUpAccordionItems();
      });
    }

    if (this.headings) {
      // custom accessible markup
      this.setUpHeadings();

      this.headings.changes.subscribe(() => {
        this.accordionItemsChanged();
      });
    }

    if (this.panels) {
      this.panels.changes.subscribe(() => {
        this.accordionItemsChanged();
      });
    }
  }

  setUpAccordionItems() {
    const singleSelectName = this.uuidService.getUUID('accordion-details-');
    // detail/summary markup
    this.accordionItems.toArray().forEach((item, index) => {
      if (item.expanded) this.itemsExpanded.push(index);
      if (!this.multiselect && item.heading.hostButton) {
        item.name = singleSelectName;
        // a new item is clicked in a non-multiselect
        item.heading.hostButton.clicked.subscribe(() => {
          if (item.expanded) {
            // clear all expanded items if an expanded item is clicked (it's closing)
            this.itemsExpanded = [];
            return;
          }
          this.itemsExpanded = [index];
        });
      } else if (this.multiselect) {
        item.toggled.subscribe((expanded) => {
          this.handleToggle(index, expanded, true);
        });
      }
    });
  }

  setUpHeadings() {
    // prioritize the accordion items (native details/summary behavior) if they are present
    if (this.accordionItems.length > 0) return;
    // loop through the headings
    this.headings.toArray().forEach((heading) => {
      // subscribe to clicks and programmatic toggles
      if (heading.hostButton) {
        this.buttonSubscribe(heading.hostButton, heading._index);
      } else if (heading._buttonHeading) {
        this.buttonSubscribe(heading._buttonHeading, heading._index);
      }
      if (heading.expanded) this.itemsExpanded.push(heading._index);

      // subscribe to changes in heading.expanded
      heading.toggled.subscribe((index) => {
        this.handleToggle(index, heading.expanded, false);
      });
    });
  }

  setAsSubtle() {
    if (this.headings) {
      this.headings.toArray().forEach((heading) => {
        heading._subtle.set(this.subtle);
        if (this.subtle) {
          const button = heading._buttonHeading || heading.hostButton;
          if (!button._buttonColorSetByUser) button.buttonColor = ButtonColor.TERTIARY;
        }
      });
    }
    if (this.panels) {
      this.panels.toArray().forEach((panel) => {
        panel._subtle.set(this.subtle);
      });
    }
  }

  buttonSubscribe(button: ButtonDirective, index: number) {
    this.buttonClickedSubscriptions[index] = button.clicked.subscribe(() => {
      this.accordionService.toggleItem(index);
    });
  }

  accordionItemsChanged() {
    // when accordion items change we need to recreate the accordion and service
    if (this.headings.length !== this.panels.length) return; // accordion hasn't been fully changed yet, waiting on matching heading or panel

    // reset
    this.buttonClickedSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.buttonClickedSubscriptions = [];
    this.accordionService.setUpAccordion(this);
    this.setAsSubtle();
    if (this.headings) this.setUpHeadings();
    this.cdRef.detectChanges();
  }

  handleToggle(index: number, expanded: boolean, isDetails: boolean) {
    const _prevItemsExpanded = this.itemsExpanded;
    if (expanded) {
      if (!isDetails) this.accordionService.expandItem(index);
      if (!this.multiselect) {
        const prevExpanded = this.itemsExpanded[0];
        const arr = this.accordionItems.length > 0 ? this.accordionItems.toArray() : this.headings.toArray();
        if (prevExpanded >= 0 && prevExpanded !== index) arr[prevExpanded].expanded = false;
        this.itemsExpanded = [index];
      } else if (!this.itemsExpanded.includes(index)) this.itemsExpanded.push(index);
    } else {
      if (!isDetails) this.accordionService.collapseItem(index);
      this.itemsExpanded.filter((item) => item !== index);
    }
    if (this.itemsExpanded !== _prevItemsExpanded) this.itemsChanged.emit(this.itemsExpanded);
  }
}
