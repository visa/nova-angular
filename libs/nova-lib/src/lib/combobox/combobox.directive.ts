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
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { UUIDService } from '../_utilities/services/uuid.service';
import { FloatingUIContainer } from '../floating-ui-container/floating-ui-container.directive';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputDirective } from '../input/input.directive';
import { LabelDirective } from '../label/label.directive';
import { ListboxContainerDirective } from '../listbox-container/listbox-container.directive';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { ListboxDirective } from '../listbox/listbox.directive';
import { ListboxService } from '../listbox/listbox.service';
import {
  BACKSPACE_KEY,
  DOWN_ARROW_KEY,
  ENTER_KEY,
  LEFT_ARROW_KEY,
  RIGHT_ARROW_KEY,
  TAB_KEY,
  UP_ARROW_KEY
} from '../nova-lib.constants';
import { NovaLibService } from '../nova-lib.service';
import { ComboboxFilterType } from './combobox.constants';
import { ButtonDirective } from '../button/button.directive';
import { ChipDirective } from '../chip/chip.directive';

enum STATE {
  READONLY = 'readonly',
  DISABLED = 'disabled',
  INVALID = 'invalid',
  REQUIRED = 'required'
}

@Directive({
  standalone: true,
  selector: '[v-combobox]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxDirective),
      multi: true
    }
  ]
})
export class ComboboxDirective implements ControlValueAccessor, OnInit, AfterContentInit {
  @ContentChild(InputContainerComponent)
  inputContainer: InputContainerComponent;
  @ContentChild(InputDirective) input: InputDirective;
  @ContentChild(ListboxContainerDirective) listboxContainer: ListboxContainerDirective;
  @ContentChild(ListboxDirective) listbox: ListboxDirective;
  @ContentChild(LabelDirective) label: LabelDirective;
  @ContentChildren(ButtonDirective, { descendants: true })
  interactiveChildren: QueryList<ButtonDirective>;
  @ContentChildren(ChipDirective, { descendants: true }) chips: QueryList<ChipDirective>;
  _highlightedIndex: number | null = null;
  _activeIndex: number | null = null;
  _lastHighlightedOnClose: number | null; //stores last highlighted index before nulling highlightedIndex when menu is closed
  initialListItems: ListboxItemComponent[];
  currentListItems: QueryList<ListboxItemComponent>;
  listboxSubscription: Subscription;
  // used in service only to store previously active item of type ListboxItemComponent or of type of array passed with custom filter
  _prevActiveItem: ListboxItemComponent | any;
  private _fromInput = false;
  private _inputFocused = false;
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-combobox
   */
  @Input()
  get class(): string {
    return [this._class, 'v-combobox'].join(' ');
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
   * Removes appended screenreader readonly text when true. <br>
   * By default &#40;when <code>removeReadonlyText="false"</code>&#41;, if a combobox is readonly, a span element with text '&#40;readonly&#41;' will be appended to the label element for screenreader support.
   * @default false
   */
  @Input()
  get removeReadonlyText(): boolean {
    return this._removeReadonlyText;
  }
  set removeReadonlyText(value: BooleanInput) {
    this._removeReadonlyText = coerceBooleanProperty(value);
  }
  _removeReadonlyText: boolean = false;

  /**
   * Temporary prop to opt into new **multiselect** behavior. <br>
   * Will be deprecated and defaulted to in the next breaking change release.
   */
  @Input()
  get EXPERIMENTAL_ADA_OPT_IN(): boolean {
    return this._EXPERIMENTAL_ADA_OPT_IN;
  }
  set EXPERIMENTAL_ADA_OPT_IN(value: BooleanInput) {
    this._EXPERIMENTAL_ADA_OPT_IN = coerceBooleanProperty(value);
  }
  _EXPERIMENTAL_ADA_OPT_IN: boolean = false;

  /**
   * Sets component as readonly when true.
   * @default false
   */
  @Input()
  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(value: BooleanInput) {
    this._readonly = coerceBooleanProperty(value);
    if (!this.removeReadonlyText) this.appendReadonlyText();
    this.updateChildrenStates(STATE.READONLY);
  }
  _readonly: boolean = false;

  /**
   * Sets component as disabled when true.
   * @default false
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this.updateChildrenStates(STATE.DISABLED);
  }
  _disabled: boolean = false;
  @HostBinding('attr.disabled')
  get hostDisabled() {
    return this.disabled ? 'disabled' : null;
  }
  /** Fires when a formControl's disabled state updates  */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Marks component as invalid when true.
   * @default false
   */
  @Input()
  get invalid(): boolean {
    return this._invalid;
  }
  set invalid(value: BooleanInput) {
    this._invalid = coerceBooleanProperty(value);
    this.updateChildrenStates(STATE.INVALID);
  }
  _invalid: boolean = false;
  @HostBinding('attr.aria-invalid')
  get ariaInvalid() {
    return this.invalid;
  }

  /**
   * Marks component as required when true.
   * @default false
   */
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.updateChildrenStates(STATE.REQUIRED);
  }
  _required: boolean = false;

  /**
   * Value of combobox.
   */
  @Input()
  get value() {
    return this._value;
  }
  set value(value: any) {
    this.updateValue(value);
  }

  // keep val for backwards compatibility
  get val() {
    return this._value;
  }
  set val(value: any) {
    this.updateValue(value);
  }
  _value: { label: string; value: string } | null | '' = null;

  updateValue(value: any) {
    this._value = value;
    if (this.input && this.listbox) {
      if (
        value &&
        !this._fromInput &&
        ((value['label'] && this.input.value !== value['label']) ||
          (value['value'] && this.listbox.value !== value['value']))
      ) {
        const selectIndex = this.getList()?.findIndex((item) => item.value === value['value']);
        if (selectIndex != -1) {
          this.selectItem(selectIndex);
        } else {
          // deselect also reset aria active descendant
          if (this._activeIndex) {
            this.novaLibService.deselectItem(this.getList(), this._activeIndex!, 'active');
            this._activeIndex = null;
            if (this.input) this.input.ariaActiveDescendant = null;
            if (this.listbox) this.listbox.ariaActiveDescendant.set(null);
          }
        }
      } else if (!value) {
        this.clearCombobox();
      }
    }

    this.onChange(value);
  }

  /**
   * Emits value of selected item(s).
   */
  @Output() itemSelected = new EventEmitter<string | number | (string | number)[] | null>();

  /**
   * Emitted when a listbox item is selected, when an input value is entered, and when the combobox is reset. <br />
   * Subscribe to provide your own filter function when this event is emitted. <br />
   * Emits { type: 'selection' | 'input' | 'reset'; listbox: string; input: string } where type is the type of filter event, listbox is the value of the selected item(s), and input is the value of the input.
   */
  @Output() filter = new EventEmitter<{
    type: ComboboxFilterType;
    listbox: string | number | (string | number)[] | null;
    input: string;
  }>();

  /**
   * Emits the filtered array of ListboxItemComponents when the list is filtered by ComboboxService.
   */
  @Output() filteredListEmitter: EventEmitter<ListboxItemComponent[]> = new EventEmitter<ListboxItemComponent[]>();

  constructor(
    public novaLibService: NovaLibService,
    private listboxService: ListboxService,
    private appReadyService: AppReadyService,
    private renderer: Renderer2,
    private UUIDService: UUIDService,
    public floatingContainer?: FloatingUIContainer
  ) {}

  @HostListener('focus', ['$event'])
  handleFocus(event: Event) {
    this.onTouched(event);
  }

  ngOnInit(): void {
    if (this.floatingContainer) {
      this.floatingContainer._isCombobox = true;
      if (!this.floatingContainer.eventsArray) {
        this.floatingContainer.eventsArray = [];
      }
    }
  }

  ngAfterContentInit(): void {
    if (this.input) {
      this.setUpInput();
    }
    if (this.listbox) {
      if (!this.listbox.multiselect) {
        this.listbox.value = '';
      }
      this.initialListItems = this.listbox.listItems.toArray();
      this.currentListItems = this.listbox.listItems;
      this.setUpListItems();

      this.listbox.listItems.changes.subscribe(() => {
        if (!this.listbox.multiselect) {
          // remove previous subscription
          this.listboxSubscription.unsubscribe();
          this.setUpListItems();
        }
      });
    }

    if (this.inputContainer?.buttons.length > 0 && this.floatingContainer) {
      // last button should be toggle button
      this.inputContainer.buttons.last._inCombobox = true;
      this.inputContainer.buttons.last.clicked.subscribe(() => {
        this.input?.el.nativeElement.focus();
        this.floatingContainer?.floatingUIService.toggleFloatingUI();
      });
    }

    if (this.floatingContainer) {
      this.setUpFloatingContainer();
    }

    if (this.chips) {
      this.chips.changes.subscribe(() => {
        if (this.chips.length === 0 && this.appReadyService.isBrowserAndDomAvailable()) {
          this.input?.el.nativeElement.focus();
        }
      });
    }

    this.setState();
  }

  setUpInput() {
    this.input._inCombobox = true;
    this.input.role = this.input.role ? this.input.role : 'combobox';
    this.input.inputEvent.subscribe((val) => {
      this.filter.emit({ type: ComboboxFilterType.INPUT, listbox: this.listbox?.value || [], input: this.input.value });
      this._fromInput = true;

      // if the listbox has a value (probably only multiselect..), retain that value
      if (
        (!this.listbox?.multiselect && this.listbox.value) ||
        (this.listbox?.multiselect && Array.isArray(this.listbox.value) && this.listbox.value.length > 0)
      ) {
        this.writeValue({ label: this.input.value, value: this.listbox.value });
      } else {
        //otherwise pass the input value to the value
        this.writeValue({ value: this.input.value });
      }
      this.floatingContainer?.floatingUIService.showfloatingUI();
      this._fromInput = false;
    });

    if (this.listboxContainer) {
      this.input.ariaOwns = this.listboxContainer.id;
    }

    if (this.label) {
      this.label.for = this.input.id;
    }

    this.input.focused.subscribe(() => {
      this._inputFocused = true;
    });
    this.input.blurred.subscribe(() => {
      this._inputFocused = false;
    });

    this.input.communicateState.subscribe((state) => {
      if (this.readonly !== state.readonly) {
        this.readonly = state.readonly;
      }
      if (this.disabled !== state.disabled) {
        this.disabled = state.disabled;
      }
      if (this.invalid !== state.invalid) {
        this.invalid = state.invalid;
      }
      if (this.required !== state.required) {
        this.required = state.required;
      }
    });
  }

  setUpListItems() {
    this.listbox._inCombobox = true;
    this.listboxSubscription = this.listbox.valueUpdated.subscribe((val) => {
      if (!this.listbox.multiselect && !val) return;
      // wait for app to be ready before accessing list item native elements
      if (this.appReadyService.isBrowserAndDomAvailable()) {
        if (this.listbox?.multiselect && Array.isArray(val) && val.length > 0) {
          if (this.input.value) this.input.value = ''; // make optional?
        } else if (!this.listbox?.multiselect && val) {
          const index = this.listbox.listItems.toArray().findIndex((item) => item.value === val);
          this.input.value = this.getListItem(index)?.el.nativeElement.innerText.trim();
        }
        this.writeValue({ label: this.input.value || '', value: this.listbox.value });
        this.filter.emit({
          type: ComboboxFilterType.SELECTION,
          listbox: this.listbox.value,
          input: this.input.value || ''
        });
        // @TODO: remove first if statement in next major release
        if (this.listbox.multiselect && Array.isArray(this.listbox.value) && !this.EXPERIMENTAL_ADA_OPT_IN) {
          return; // handled in docs
        } else if (this.listbox?.multiselect && this.input?.value) {
          // if a multiselect still has a value, that means no item is selected and the user is typing; return.
          return;
        } else {
          this.itemSelected.emit(this.listbox.value);
        }
      }
    });
    this.listbox.listItems.forEach((item, index) => {
      item.clicked.subscribe(() => {
        if (this.appReadyService.isBrowserAndDomAvailable()) {
          // wait for app to be ready before accessing input native elements
          this.input?.el.nativeElement.focus();
        }
      });

      item.itemChanged.subscribe((isSelected) => {
        // any time an item is clicked, entered, or programmatically selected, the below will set the value of the combobox
        if (!this.listbox?.multiselect && isSelected && this.getListItem(index)) {
          this.novaLibService.deselectItems(this.getList(), index, 'highlighted');
          this._activeIndex = index;
        }
      });
    });
    this.setInitialValue();
    if (this._highlightedIndex !== null) this.highlightIndex(this._highlightedIndex);
  }

  setUpFloatingContainer() {
    if (this.input) this.input.ariaExpanded = this.floatingContainer!.isShown;
    this.floatingContainer!.floatingUIService.isShownEmitter.subscribe((isShown) => {
      if (this.input) this.input.ariaExpanded = isShown;

      if (!isShown) {
        // when menu is closed, unhighlight all items
        if (this._highlightedIndex !== null) this._lastHighlightedOnClose = this._highlightedIndex;
        this._highlightedIndex = null;
        this.listbox?.listItems.forEach((item) => {
          item.highlighted = false;
        });

        // remove aria-controls from input and reset aria-activeDescendant to null or active item id
        if (this.input) {
          this.input.ariaControls = null;
          const listItem = this.getListItem(this._activeIndex);
          if (this._activeIndex === null) {
            if (this.input) this.input.ariaActiveDescendant = null;
            if (this.listbox) this.listbox.ariaActiveDescendant.set(null);
          } else if (this.listbox && listItem) {
            this.input.ariaActiveDescendant = listItem.id;
            this.listbox.ariaActiveDescendant.set(listItem.id);
          }
        }
      } else {
        if (this.input) this.input.ariaControls = this.listbox?.id;
      }
    });
  }

  setInitialValue() {
    let selectedIndex: number = -1;
    // note that initial value precedence is combobox initial value, input initial value, and then listbox
    if (this.value) {
      // initial value given to combobox directly
      if (this.listbox) {
        if (this.listbox.multiselect) {
          if (Array.isArray(this.value['value'])) {
            const selectedItems = this.value['value'].filter((val: any) => {
              return this.getList()?.some((item) => item.value === val);
            });
            this.listbox.value = selectedItems;
          } else {
            // allow a non-array value (single value) to propagate the multiselect
            selectedIndex = this.getList()?.findIndex((item) => item.value === this.value['value']);
            if (selectedIndex > -1) {
              this.selectItem(selectedIndex);
            }
          }
          if (this.value['label']) {
            this.input.value = this.value['label'];
          }
        } else {
          selectedIndex = this.getList()?.findIndex((item) => item.value === this.value['value']); // check is within if statement?
          // allow input to still have initial value even if it doesn't match a listbox item
          if (selectedIndex < 0 && this.value['label']) {
            this.input.value = this.value['label'];
          }
        }
      }
    } else if (this.input?.value) {
      // initial value given to input
      selectedIndex = this.findListItem(this.input.value);
    } else if (this.listbox?.value) {
      if (this.listbox.multiselect && Array.isArray(this.listbox.value) && this.listbox.value.length > 0) {
        // if value is an array, select all items that match the value
        return;
      } else {
        // initial value given to listbox
        selectedIndex = this.getList()?.findIndex((item) => item.active);
      }
    }

    // if the item is already selected, no need to select it again
    if (selectedIndex > -1 && !this.getListItem(selectedIndex)?.active) {
      this.selectItem(selectedIndex);
    }
  }

  setState() {
    if (this.input && this.listbox) {
      // set initial state of input and listbox based on what's passed to combobox
      // if input or listbox is readonly or disabled, set combobox to readonly or disabled
      if (this.readonly) {
        this.input.readonly = true;
      } else if (this.input.readonly) {
        this.readonly = true;
      }

      if (this.disabled) {
        this.input.disabled = true;
        this.listbox.disabled = true;
      } else if (this.input.disabled) {
        this.disabled = true;
      } else if (this.listbox.disabled) {
        this.disabled = true;
      }

      if (this.invalid) {
        this.input.invalid = true;
        this.listbox.invalid = true;
      } else if (this.input.invalid) {
        this.invalid = true;
      } else if (this.listbox.invalid) {
        this.invalid = true;
      }

      if (this.required) {
        this.input.required = true;
        this.listbox.required = true;
      } else if (this.input.required) {
        this.required = true;
      } else if (this.listbox.required) {
        this.required = true;
      }
    }
  }

  @HostListener('keydown', ['$event'])
  hostKeyDown(event: KeyboardEvent) {
    // don't perform any keboard functions if readonly or disabled
    // also don't open menu if no floating container exists
    if (this.input.readonly || this.input.disabled || !this._inputFocused || !this.floatingContainer) {
      return;
    }
    if (event.key === DOWN_ARROW_KEY || event.key === RIGHT_ARROW_KEY) {
      // highlight next item and show menu
      if (event.key === DOWN_ARROW_KEY) event.preventDefault(); // allow right arrow to navigate through input
      this.highlightNextPrevItem('next');
      if (!this.floatingContainer?.isShown) this.floatingContainer.floatingUIService.showfloatingUI();
      if (this._highlightedIndex !== null && this.listbox)
        this.listboxService.scrollItemIntoView(this.listbox, this._highlightedIndex);
    } else if (event.key === UP_ARROW_KEY || event.key === LEFT_ARROW_KEY) {
      // highlight previous item and show menu
      if (event.key === UP_ARROW_KEY) event.preventDefault(); // allow left arrow to navigate through input
      this.highlightNextPrevItem('prev');
      if (!this.floatingContainer?.isShown) this.floatingContainer.floatingUIService.showfloatingUI();
      if (this._highlightedIndex !== null && this.listbox) {
        this.listboxService.scrollItemIntoView(this.listbox, this._highlightedIndex);
      }
    } else if (event.key === ENTER_KEY) {
      if (this.floatingContainer?.isShown) {
        event.preventDefault(); // prevent form submission if enter is triggered on list item
      }
      // select currently highlighted item
      if (this._highlightedIndex !== null) {
        this.selectItem(this._highlightedIndex);
        this.getListItem(this._highlightedIndex)?.clicked.emit(); // emit click event (closes item when close on click is called)
      }
    } else if (event.key === TAB_KEY && event.shiftKey) {
      if (this.listbox?.multiselect && this.chips.length > 0) {
        // if shift+tab is pressed and there is a chip (aka a value), close the menu
        // @note, possibly make this optional by providing an opt-out input
        this._highlightedIndex = null;
        this.floatingContainer.floatingUIService.hidefloatingUI();
      }
    } else if (event.key === BACKSPACE_KEY) {
      if (this.listbox?.multiselect && !this.input.value && this.chips.length > 0) {
        // remove last chip if backspace is pressed on empty input and there are chips (aka a value)
        // I know there's a better way to do this but it's not working??
        const lastValue = this.value.value[this.value.value.length - 1];
        const lastItem = this.listbox?.listItems?.find((item) => item.value === lastValue);
        lastItem?.selectItem();
      }
    }
  }

  @HostListener('keyup', ['$event'])
  hostKeyup(event: KeyboardEvent) {
    if (event.key === BACKSPACE_KEY && !this.listbox?.multiselect) {
      // remove highlight for any backspace event?
      if (this.input.value === '' || !this.input.value) {
        if (this.value) this.value = '';
      }

      const selectedItems = this.getList()?.filter((item) => item.active);
      if (selectedItems) {
        selectedItems.forEach((item) => (item.active = false));
        if (this.listbox) this.listbox.value = this.listbox.multiselect ? [] : null;
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  documentKeydown(event: KeyboardEvent) {
    if (
      // if we press escape while on this combobox
      event.key === 'Escape' &&
      this.floatingContainer?.el.nativeElement.contains(event.target)
    ) {
      // return focus to input when escape is pressed and menu (was) open
      if (!this._inputFocused && this.floatingContainer?.isShown) {
        this.input?.el.nativeElement.focus();
      } else if (!this.floatingContainer?.isShown) {
        // if menu is already closed, do not select "highlighted" option
        this._highlightedIndex = null;
        this._lastHighlightedOnClose = null;
      }
    }
  }

  /**
   * Highlight next enabled item or previous enabled item depending on type.
   * @param type 'next' | 'prev'
   */
  highlightNextPrevItem(type: 'next' | 'prev') {
    let filteredIndex: number | null = null;
    if (this._highlightedIndex !== null) {
      // find next item given current item
      if (type === 'next') filteredIndex = this.novaLibService.nextEnabledItem(this.getList(), this._highlightedIndex);
      if (type === 'prev')
        filteredIndex = this.novaLibService.previousEnabledItem(this.getList(), this._highlightedIndex);
    } else if (this._activeIndex !== null) {
      filteredIndex = this._activeIndex;
    } else {
      // find next item initially
      if (type === 'next') filteredIndex = this.novaLibService.nextEnabledItem(this.getList());
      if (type === 'prev') filteredIndex = this.novaLibService.previousEnabledItem(this.getList());
    }

    if (filteredIndex !== null) this.highlightIndex(filteredIndex);
  }

  highlightIndex(index: number) {
    if (this.getListItem(index)) {
      this._highlightedIndex = index;
      const item = this.getListItem(this._highlightedIndex);
      if (item) {
        if (this.input) this.input.ariaActiveDescendant = item.id;
        if (this.listbox) this.listbox.ariaActiveDescendant.set(item.id);
      }
      if (this._highlightedIndex !== null) {
        this.novaLibService.selectItem(this.getList(), this._highlightedIndex, 'highlighted');
        this.novaLibService.deselectItems(this.getList(), this._highlightedIndex, 'highlighted');
      }
    }
  }

  selectItem(index: number) {
    this.getListItem(index)?.selectItem();
  }

  /**
   * @param index
   * @returns ListboxItemComponent at index given.
   */
  getListItem(index: number | null) {
    if (index === null || !this.currentListItems?.toArray()[index]) {
      return;
    }
    return this.currentListItems.toArray()[index];
  }

  /**
   * Update children (input and listbox) state based on parent state.
   */
  updateChildrenStates(prop: STATE) {
    if (!this.input || !this.listbox) return;
    switch (prop) {
      case STATE.READONLY:
        this.input.readonly = this.readonly;
        break;
      case STATE.DISABLED:
        this.input.disabled = this.disabled;
        this.listbox.disabled = this.disabled;
        break;
      case STATE.INVALID:
        this.input.invalid = this.invalid;
        this.listbox.invalid = this.invalid;
        break;
      case STATE.REQUIRED:
        this.input.required = this.required;
        this.listbox.required = this.required;
        break;
      default:
        break;
    }
  }

  currentID: string;
  appendReadonlyText() {
    if (this.appReadyService.isBrowserAndDomAvailable()) {
      if (this.readonly) {
        const span = this.renderer.createElement('span');
        this.renderer.addClass(span, 'v-sr');
        this.currentID = this.UUIDService.getUUID('v-label-');
        this.renderer.setAttribute(span, 'id', this.currentID);
        const text = this.renderer.createText(' (read-only)');
        this.renderer.appendChild(span, text);
        this.renderer.appendChild(this.label.el.nativeElement, span);
      } else {
        this.renderer.removeChild(this.label.el.nativeElement, document.getElementById(this.currentID));
      }
    }
  }

  clearCombobox() {
    this._activeIndex = null;
    this._highlightedIndex = null;
    this._prevActiveItem = null;
    // unhighlight items, listbox will set all active items to false
    if (this.input && this.listbox) {
      this.input.ariaActiveDescendant = null;
      this.listbox.ariaActiveDescendant.set(null);
    }
    this.novaLibService.deselectItems(this.getList(), undefined, 'highlighted');
    if (this.input && this.input.value !== '') {
      this.input.value = '';
    }
    if (this.listbox) {
      if (this.listbox.multiselect && Array.isArray(this.listbox.value) && this.listbox.value.length > 0) {
        this.listbox.value = [];
      } else if (this.listbox.value) {
        this.listbox.value = null;
      }
    }
    this.filter.emit({
      type: ComboboxFilterType.RESET,
      listbox: this.listbox?.value || [],
      input: this.input?.value || ''
    });
  }

  /**
   * @returns ListboxDirective
   */
  getList(): ListboxItemComponent[] {
    return this.currentListItems?.toArray() || [];
  }

  findListItem(text: string): number {
    if (!this.appReadyService.isBrowserAndDomAvailable()) return -1; // return if app is not bootstrapped and therefore we cannot access item native element
    return this.currentListItems
      ?.toArray()
      .findIndex((item) => item.el.nativeElement.innerText.trim().toLowerCase() == text.toLowerCase());
  }

  onChange = (_: any) => {};

  onTouched = (_: any) => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }
}
