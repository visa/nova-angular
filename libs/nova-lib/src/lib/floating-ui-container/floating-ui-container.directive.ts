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
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  QueryList,
  Renderer2
} from '@angular/core';
import { Middleware } from '@floating-ui/dom';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { UUIDService } from '../_utilities/services/uuid.service';
import { AccordionHeadingDirective } from '../accordion-heading/accordion-heading.directive';
import { ButtonDirective } from '../button/button.directive';
import { TabItemDisclosureDirective } from '../disclosure-tab-item/disclosure-tab-item.directive';
import { DropdownItemDirective } from '../dropdown-item/dropdown-item.directive';
import { DropdownListDirective } from '../dropdown-list/dropdown-list.directive';
import { DropdownMenuDirective } from '../dropdown-menu/dropdown-menu.directive';
import { FloatingUIElementDirective } from '../floating-ui-element/floating-ui-element.directive';
import { FloatingUITriggerDirective } from '../floating-ui-trigger/floating-ui-trigger.directive';
import {
  FloatingUIPlacements,
  FloatingUIVisibility,
  UIEventVisibilityPair
} from '../floating-ui/floating-ui.constants';
import { FloatingUIService } from '../floating-ui/floating-ui.service';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';
import { IconToggleDirective } from '../icon-toggle/icon-toggle.directive';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { ListboxDirective } from '../listbox/listbox.directive';
import { NovaLibService } from '../nova-lib.service';
import { TooltipDirective } from '../tooltip/tooltip.directive';

@Directive({
  standalone: true,
  selector: '[v-floating-ui-container], [v-combobox]',
  providers: [FloatingUIService]
})
export class FloatingUIContainer implements AfterContentInit {
  @ContentChildren(FloatingUIContainer, { descendants: true }) containers: QueryList<FloatingUIContainer>;
  @ContentChildren(TabItemDisclosureDirective, { descendants: true })
  disclosureTabs: QueryList<TabItemDisclosureDirective>;
  @ContentChild(DropdownMenuDirective) menu: DropdownMenuDirective;
  @ContentChild(TooltipDirective) tooltip: TooltipDirective;
  @ContentChild(FloatingUIElementDirective)
  genericDropdown: FloatingUIElementDirective;
  @ContentChild(FloatingUITriggerDirective) trigger: FloatingUITriggerDirective;
  @ContentChild(IconToggleDirective) toggleIcon: IconToggleDirective;
  @ContentChild(IconToggleComponent) toggleIconComponent: IconToggleComponent;
  @ContentChild(ListboxDirective) listbox: ListboxDirective;
  @ContentChildren(ButtonDirective, { descendants: true }) buttons: QueryList<ButtonDirective>;
  @ContentChildren(DropdownListDirective, { descendants: true }) dropdownItems: QueryList<DropdownItemDirective>;
  @ContentChildren(AccordionHeadingDirective, { descendants: true }) accordionHeadings: QueryList<AccordionHeadingDirective>;

  _isCombobox: boolean = false;
  dropdownMenuShown: boolean;
  _tooltipDefaultEvents: UIEventVisibilityPair = [
    [new UIEvent('mouseenter'), FloatingUIVisibility.SHOW],
    [new UIEvent('mouseleave'), FloatingUIVisibility.HIDE],
    [new UIEvent('focus'), FloatingUIVisibility.SHOW],
    [new UIEvent('blur'), FloatingUIVisibility.HIDE]
  ];
  _dropdownMenuDefaultEvents: UIEventVisibilityPair = [[new UIEvent('click')]];

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   */
  @Input()
  public get class(): string {
    return this._class;
  }
  public set class(value: string) {
    this._class = value;
  }
  _class: string = ''; // override the standard class attr with a new one.
  @HostBinding('class')
  get hostClasses(): string {
    return this.class;
  }

  /** @ignore */
  @Input()
  get isShown(): boolean {
    return this._isShown;
  }
  set isShown(value: BooleanInput) {
    this._isShown = coerceBooleanProperty(value);
  }
  _isShown: boolean = false;

  /**
   * Placement of floating content relevant to triggering element.
   * @default FloatingUIPlacements.BOTTOM_START
   * @see 'FloatingUIPlacements'.
   */
  @Input()
  get placement(): FloatingUIPlacements {
    return this._placement;
  }
  set placement(value: FloatingUIPlacements) {
    this._placement = value;
  }
  _placement: FloatingUIPlacements = FloatingUIPlacements.BOTTOM_START;

  /**
   * Middleware for FloatingUIService.
   * @default [ offset(2), flip(), shift() ] for tooltip <br />
   * @default [ offset(0), flip(), shift() ] for combobox <br />
   * @see [Floating UI](https://floating-ui.com/docs/middleware) for options.
   */
  @Input()
  get middleware(): Middleware[] {
    return this._middleware;
  }
  set middleware(value: Middleware[]) {
    this._middleware = value;
  }
  _middleware: Middleware[];

  /**
   * Events array for FloatingUIService. <br />
   * This array specifies whether to show or hide the floating element on a given UIEvent. <br />
   * This should be an array of [UIEvent, FloatingUIVisibility].
   * @default [ [new UIEvent('mouseenter'), FloatingUIVisibility.SHOW], <br /> [new UIEvent('mouseleave'), FloatingUIVisibility.HIDE], <br /> [new UIEvent('focus'), FloatingUIVisibility.SHOW], <br /> [new UIEvent('blur'), FloatingUIVisibility.HIDE] <br />] for tooltip
   * @default [ [new UIEvent('click')] ] for dropdown-menu and floating-ui-element
   * @default [] Ie. events are removed for combobox.
   */
  @Input()
  get eventsArray(): UIEventVisibilityPair {
    return this._eventsArray;
  }
  set eventsArray(value: UIEventVisibilityPair) {
    this._eventsArray = value;
  }
  _eventsArray: UIEventVisibilityPair;

  /**
   * Closes the menu on item is click/select when true. <br>
   * If <code>multiselect</code> is set to <code>true</code>, it will not take effect.<br>
   * @default true
   */
  @Input()
  get closeOnClick(): boolean {
    return this._closeOnClick;
  }
  set closeOnClick(value: BooleanInput) {
    this._closeOnClick = coerceBooleanProperty(value);
  }
  _closeOnClick: boolean = true;

  /**
   * Emits whether or not the floating UI element is visible.
   */
  @Output() floatingUIToggled = new EventEmitter<boolean>();

  // this is an angular-specific override. Spacing between dropdown-menu and button/trigger
  // is handled within floating-ui.service
  @HostBinding('style.--v-dropdown-menu-surface-margin-block-start')
  get hostMarginBlockStart(): string {
    return '0';
  }

  constructor(
    public el: ElementRef,
    public floatingUIService: FloatingUIService,
    private uuidService: UUIDService,
    public novaLibService: NovaLibService,
    private renderer: Renderer2,
    private appReadyService: AppReadyService
  ) { }

  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    // listen for document click and close menu if click is outside of component
    if (
      this.appReadyService.isBrowserAndDomAvailable() &&
      this.isShown &&
      !this.el.nativeElement.contains(event.target)
    ) {
      this.floatingUIService.hidefloatingUI();
    }
  }

  _tabPressed = false;
  @HostListener('document:keydown', ['$event'])
  tab(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      // used in focusout function
      this._tabPressed = true;
    }
  }

  @HostListener('focusout', ['$event'])
  focusout(event: FocusEvent) {
    if (this._tabPressed) {
      // if focus out is a result of tabbing out of this component, hide the floating UI
      if (event.relatedTarget && !this.el.nativeElement.contains(event.relatedTarget)) {
        this.floatingUIService.hidefloatingUI();
      }
      this._tabPressed = false;
    }
  }

  ngAfterContentInit(): void {
    let floatingElem: DropdownMenuDirective | TooltipDirective | FloatingUIElementDirective | null = null;
    let _toggleIcon: IconToggleDirective;
    let _toggleIconComponent: IconToggleComponent;
    const toggleInChildContainer =
      this.containers.some((container) => container.toggleIcon === this.toggleIcon) ||
      this.disclosureTabs.some((tab) => tab.button.toggleIcon === this.toggleIcon) ||
      this.accordionHeadings.some(
        (heading) =>
          heading.hostButton?.toggleIcon === this.toggleIcon || heading._buttonHeading?.toggleIcon === this.toggleIcon
      );
    const toggleComponentInChildContainer =
      this.containers.some((container) => container.toggleIconComponent === this.toggleIconComponent) ||
      this.disclosureTabs.some((tab) => tab.button.toggleIconComponent === this.toggleIconComponent) ||
      this.accordionHeadings.some(
        (heading) =>
          heading.hostButton?.toggleIconComponent === this.toggleIconComponent ||
          heading._buttonHeading?.toggleIconComponent === this.toggleIconComponent
      );

    if (this.toggleIcon && !toggleInChildContainer) {
      _toggleIcon = this.toggleIcon;
      _toggleIcon.icon.icon = this.isShown ? _toggleIcon.expandedIcon : _toggleIcon.collapsedIcon;
    } else if (this.toggleIconComponent && !toggleComponentInChildContainer) {
      _toggleIconComponent = this.toggleIconComponent;
      _toggleIconComponent._floatingUIToggle = true;
      _toggleIconComponent.rotated = this.isShown;
    }

    const tooltipInChildContainer = this.containers.some((container) => container.tooltip === this.tooltip);
    const menuInChildContainer = this.containers.some((container) => container.menu === this.menu);
    const dropdownInChildContainer = this.containers.some(
      (container) => container.genericDropdown === this.genericDropdown
    );

    if (this.menu && !menuInChildContainer) {
      floatingElem = this.menu;
      this.renderer.setStyle(this.menu.el.nativeElement, 'position', 'absolute');
      this.trigger._triggersDropdownMenu = true;
      floatingElem.id = this.menu.id ? this.menu.id : this.uuidService.getUUID('v-floating-');
      this.menu._isShown = this.isShown;
      this.eventsArray = this.eventsArray ? this.eventsArray : this._dropdownMenuDefaultEvents;
      this.setUpListItems();
    } else if (this.tooltip && !tooltipInChildContainer) {
      floatingElem = this.tooltip;
      this.trigger._triggersTooltip = true;
      this.eventsArray = this.eventsArray ? this.eventsArray : this._tooltipDefaultEvents;
    } else if (this.genericDropdown && !dropdownInChildContainer) {
      floatingElem = this.genericDropdown;
      this.renderer.setStyle(this.genericDropdown.el.nativeElement, 'position', 'absolute');
      this.eventsArray = this.eventsArray ? this.eventsArray : this._dropdownMenuDefaultEvents;
      this.setUpListItems();
    }

    if (this.trigger?.el && floatingElem?.el) {
      floatingElem.id = floatingElem.id ? floatingElem.id : this.uuidService.getUUID('v-floating-');
      this.trigger._floatingElemID = floatingElem.id;
      if (this.tooltip?.arrow) {
        this.floatingUIService.customizeFloatingUI(
          this.placement,
          this.middleware,
          this.tooltip.display || 'block',
          this.tooltip.arrow
        );
      } else {
        if (!this.middleware && this._isCombobox) {
          this.middleware = this.floatingUIService.comboboxMiddleware;
        }
        this.floatingUIService.customizeFloatingUI(this.placement, this.middleware);
      }
      this.floatingUIService.setUpfloatingUI(this.trigger.el, floatingElem.el, this.eventsArray);
    }

    this.floatingUIService.isShownEmitter.subscribe((isShown) => {
      if (this.trigger) this.trigger._isShown = isShown;
      if (this.menu) this.menu._isShown = isShown;

      if (this.accordionHeadings.length === 0) {
        if (_toggleIcon) {
          _toggleIcon.icon.icon = isShown ? _toggleIcon.expandedIcon : _toggleIcon.collapsedIcon;
        } else if (_toggleIconComponent) {
          _toggleIconComponent.rotated = isShown;
        }
      }
      this.isShown = isShown;
      this.floatingUIToggled.emit(isShown);
    });
  }

  setUpListItems() {
    const isMultiSelect = this.listbox?.multiselect ? true : false;
    if (this.closeOnClick && !isMultiSelect) {
      if (this.menu) {
        // this is for v-dropdown-menu
        let children;
        if (this.dropdownItems.length > 0) {
          // using dropdownItems
          children = this.dropdownItems.length > 0 ? this.dropdownItems : null;
          if (children) {
            children.forEach((item) => {
              if (!item.el.nativeElement.disabled) {
                this.renderer.listen(item.el.nativeElement, 'click', (event) => {
                  this.floatingUIService.hidefloatingUI();
                });
              }
            });
          }
        } else {
          // not using dropdownItems, gather all children, for buttons, disregard the triggering button
          children =
            this.buttons.length > 1 ? this.buttons : this.listbox?.listItems.length > 0 ? this.listbox.listItems : null;

          if (children) {
            children.forEach((child: ButtonDirective | ListboxItemComponent) => {
              // don't call for the trigger button
              if (child.el.nativeElement === this.trigger?.el.nativeElement) return;
              child.clicked.subscribe(() => {
                this.floatingUIService.hidefloatingUI();
              });
            });
          }
        }
      } else if (this.listbox) {
        // this is for v-combobox
        this.listItemClose();
        this.listbox.listItems.changes.subscribe(() => {
          this.listItemClose();
        });
      }
    }
  }

  listItemClose() {
    this.listbox.listItems.forEach((item) => {
      item.clicked.subscribe(() => {
        this.floatingUIService.hidefloatingUI();
      });
    });
  }
}
