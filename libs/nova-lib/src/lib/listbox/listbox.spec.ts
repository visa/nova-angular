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
import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { UUIDService } from '../_utilities/services/uuid.service';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { ListboxContainerDirective } from '../listbox-container/listbox-container.directive';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { NovaLibService } from '../nova-lib.service';
import { RadioDirective } from '../radio/radio.directive';
import { ToggleControlService } from '../toggle-control/toggle-control.service';
import { ListboxDirective } from './listbox.directive';
import { ListboxService } from './listbox.service';

@Component({
  template: `
    <div v-listbox-container>
      <ul v-listbox>
        <li v-listbox-item></li>
        <li v-listbox-item></li>
      </ul>
    </div>
  `
})
class TestListbox {
  @ViewChildren(ListboxItemComponent) componentListItems: QueryList<ListboxItemComponent>;
}
describe('ListboxDirective', () => {
  let directive: ListboxDirective;
  let containerDirective: ListboxContainerDirective;
  let el: ElementRef;
  let novaLibService;
  let toggleControlService: ToggleControlService;
  let cdfRef: ChangeDetectorRef;
  let appReadyService: AppReadyService;
  let listboxService: ListboxService;
  let uuidService: UUIDService;
  let item1, item2: ListboxItemComponent;
  let fixture: ComponentFixture<TestListbox>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestListbox);
    el = new ElementRef(document.createElement('div'));
    novaLibService = TestBed.inject(NovaLibService);
    uuidService = TestBed.inject(UUIDService);
    toggleControlService = TestBed.inject(ToggleControlService);
    appReadyService = TestBed.inject(AppReadyService);
    listboxService = TestBed.inject(ListboxService);
    cdfRef = { detectChanges: jest.fn() } as unknown as ChangeDetectorRef;
    directive = new ListboxDirective(uuidService, novaLibService, listboxService, cdfRef, el, appReadyService);
    directive.listItems = new QueryList<ListboxItemComponent>();
    containerDirective = new ListboxContainerDirective(uuidService);

    item1 = new ListboxItemComponent(el, uuidService, toggleControlService);
    item2 = new ListboxItemComponent(el, uuidService, toggleControlService);
    item1._isRoleOptionVariant = true;
    item2._isRoleOptionVariant = true;
    directive.listItems.reset([item1, item2]);

    directive.onChange = jest.fn();
    directive.onTouched = jest.fn();
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set invalid', () => {
    directive.invalid = true;
    expect(directive.invalid).toBe(true);
  });

  it('should set the right class', () => {
    expect(directive.hostClass).toContain('');
    directive.class = 'test-class';
    directive.containHeight = true;
    expect(directive.hostClass).toContain('test-class');
    expect(directive.hostClass).toContain('v-listbox');
    expect(directive.hostClass).toContain('v-listbox-scroll');
    directive.containHeight = false;
    expect(directive.hostClass).toBe('test-class v-listbox ');
  });

  it('should set multiselect', () => {
    directive.multiselect = true;
    directive._isRoleListboxVariant.set(true);
    fixture.detectChanges();
    expect(containerDirective.hostAriaMultiselectable).toBe('true');
  });

  it('should set disabled', () => {
    directive._childrenDisabled = false;
    directive.setChildrenDisabled = jest.fn();
    directive.informState = jest.fn();
    directive.disabled = true;
    expect(directive.setChildrenDisabled).toHaveBeenCalled();
    expect(directive.informState).toHaveBeenCalled();

    directive._childrenDisabled = true;
    directive.setDisabledState(false);
    expect(directive.disabled).toBe(false);
    expect(directive.setChildrenDisabled).toHaveBeenCalled();
    expect(directive.informState).toHaveBeenCalled();
  });

  it('should set invalid', () => {
    directive._childrenInvalid = false;
    directive.setChildrenInvalid = jest.fn();
    directive.informState = jest.fn();
    directive.invalid = true;
    expect(directive.setChildrenInvalid).toHaveBeenCalled();
    expect(directive.informState).toHaveBeenCalled();
  });

  it('should set required', () => {
    directive.informState = jest.fn();
    directive.required = true;
    expect(directive.informState).toHaveBeenCalled();
  });

  it('should set the right role', () => {
    directive.role = 'test-role';
    expect(directive.hostRole).toBe('test-role');

    directive._isRoleListboxVariant.set(true);
    directive.role = '';
    expect(directive.hostRole).toBe('listbox');
  });

  it('should set containerHeight', () => {
    directive.containHeight = 1;
    expect(directive.scrollHeight).toBe('1px');
    directive.containHeight = true;
    expect(directive.scrollHeight).toBeUndefined();
  });

  it('should set aria active descendant', () => {
    directive.ariaActiveDescendant.set('test-id');
    fixture.detectChanges();
    expect(containerDirective.hostAriaActiveDescendant).toBe('test-id');
  });

  // commenting out since touched and blur are de-coupled
  // it('should handle blur event and register touched', () => {
  // const fn = jest.fn();
  // directive.onTouched = jest.fn();
  // directive.registerOnTouched(fn);
  // directive.handleBlur(new Event('blur'));
  // expect(directive.onTouched).toHaveBeenCalled();
  // expect(fn).toHaveBeenCalled();
  // });

  it('should register on change event', () => {
    const fn = jest.fn();
    directive.registerOnChange(fn);
    directive.onChange('test');
    expect(fn).toHaveBeenCalledWith('test');
  });

  describe('setValues', () => {
    it('should handle null values', () => {
      directive.resetListbox = jest.fn();
      directive.value = '';
      expect(directive.val).toBe('');
      expect(directive.resetListbox).toHaveBeenCalled();
    });

    it('should set the right value', () => {
      const isBrowserAndDomAvailableSpy = jest.spyOn(AppReadyService.prototype, 'isBrowserAndDomAvailable');
      isBrowserAndDomAvailableSpy.mockReturnValue(true);

      directive.value = 'test';
      expect(directive.val).toBe('test');
      expect(directive.el.nativeElement.value).toBe(directive.value);

      expect(directive.onChange).toHaveBeenCalled();
      isBrowserAndDomAvailableSpy.mockRestore();
    });
  });

  it('should correctly call ngAfterContentInit', () => {
    const spy = jest.spyOn(directive.listItems.changes, 'subscribe');
    directive.setUpListbox = jest.fn();
    item1.value = 'test-change';
    directive.listItems.reset([item1]);
    directive.ngAfterContentInit();
    expect(spy).toHaveBeenCalled();
    expect(directive.setUpListbox).toHaveBeenCalled();
  });

  describe('setUpListbox', () => {
    it('should correctly set disabled and invalid behavior in setUpListbox', () => {
      item1.disabled = true;
      item2.disabled = true;
      item1.invalid = true;
      item2.invalid = true;
      directive.listItems.reset([item1, item2]);
      directive.disabled = true;
      directive.invalid = true;
      directive.setChildrenInvalid = jest.fn();
      directive.setChildrenDisabled = jest.fn();
      directive.setUpListbox();
      expect(directive.setChildrenDisabled).toHaveBeenCalled();
      expect(directive.setChildrenInvalid).toHaveBeenCalled();

      directive.disabled = false;
      directive.invalid = false;
      directive.setUpListbox();
      expect(directive._childrenDisabled).toBeTruthy();
      expect(directive.disabled).toBeTruthy();

      expect(directive._childrenInvalid).toBeTruthy();
      expect(directive.invalid).toBeTruthy();

      item1.disabled = true;
      item2.disabled = false;
      directive.listItems.reset([item1, item2]);
      directive.setUpListbox();
      expect(directive._childrenDisabled).toBeFalsy();
      expect(directive.disabled).toBeFalsy();

      item1.invalid = false;
      item2.invalid = false;
      directive.listItems.reset([item1, item2]);
      directive.setUpListbox();
      expect(directive._childrenInvalid).toBeFalsy();
      expect(directive.invalid).toBeFalsy();
    });

    it('should call listboxService.setUpListbox() if _isRoleListboxVariant is true and _inCombobox is false', () => {
      directive._isRoleListboxVariant.set(true);
      directive._inCombobox = false;
      const setUpListboxSpy = jest.spyOn(listboxService, 'setUpListbox');
      directive.setUpListbox();
      expect(setUpListboxSpy).toHaveBeenCalled();
    });

    it('should call listboxService.scrollItemIntoView(this) after a timeout', () => {
      jest.useFakeTimers();
      const scrollItemIntoViewSpy = jest.spyOn(listboxService, 'scrollItemIntoView');
      directive.setUpListbox();
      jest.advanceTimersByTime(500);
      expect(scrollItemIntoViewSpy).toHaveBeenCalled();
      jest.useRealTimers();
    });
  });

  it('should set initial value', () => {
    directive.multiselect = true;
    directive.value = ['test'];
    item1.value = 'test';
    directive.listItems.reset([item1, item2]);
    directive.setInitialValue();
    expect(item1.active).toBeTruthy();

    directive.value = [];
    item1.value = 'test';
    item1.active = true;
    directive.setInitialValue();
    if (directive._internalValue) expect(directive._internalValue[0]).toEqual(item1.value);
  });

  it('should updateValue', () => {
    const updateVal = jest.spyOn(directive, 'updateValueFromItems');
    directive.value = 'not-the-same';
    item1.value = 'test';
    item1.active = true;
    directive.updateValueFromItems();
    fixture.detectChanges();
    expect(directive._internalValue).toEqual(item1.value);
    expect(updateVal).toHaveBeenCalled();
  });

  it('should write value', () => {
    const value: (string | number)[] = ['test'];
    directive._internalValue = ['hello-world'];
    item1.value = 'test';
    directive.listItems.reset([item1, item2]);
    directive.writeValue(value);
    directive.listItems
      .filter((item) => value?.includes(item.value))
      .forEach((item) => {
        expect(item.active).toBeTruthy();
      });
    expect(directive._internalValue).toEqual(value);
  });

  it('should have an Array value if multiselect', () => {
    directive.multiselect = true;
    item1.value = 'test';
    item1.selectItem();
    directive.listItems.reset([item1, item2]);
    directive.updateValueFromItems();
    expect(Array.isArray(directive._internalValue)).toBeTruthy();
    expect(Array.isArray(directive.value)).toBeTruthy();
  });

  it('should have a string value if single select', () => {
    item1.active = true;
    item1.value = 'test';
    directive.listItems.reset([item1, item2]);
    directive.updateValueFromItems();
    expect(Array.isArray(directive._internalValue)).toBeFalsy();
    expect(Array.isArray(directive.value)).toBeFalsy();
  });

  it('should select all items if not all are selected', () => {
    directive.multiselect = true;
    novaLibService.deselectItems = jest.fn();
    novaLibService.detectAllItemsSelected = jest.fn();
    novaLibService.selectItems = jest.fn();

    novaLibService.detectAllItemsSelected.mockReturnValue(true);
    listboxService.selectAll(directive);
    expect(novaLibService.deselectItems).toHaveBeenCalled();

    novaLibService.detectAllItemsSelected.mockReturnValue(false);
    listboxService.selectAll(directive);
    expect(novaLibService.selectItems).toHaveBeenCalled();
  });

  it('should select contiguous items', () => {
    novaLibService.selectItems = jest.fn();
    directive.updateValueFromItems = jest.fn();
    directive._highlightIndex = 0;
    directive._recentSelectedIndex = 1;
    listboxService.selectContiguousItems(directive);
    expect(novaLibService.selectItems).toHaveBeenCalled();
    expect(directive.updateValueFromItems).toHaveBeenCalled();
    directive._highlightIndex = 1;
    directive._recentSelectedIndex = 1;
    listboxService.selectContiguousItems(directive);
  });

  describe('toggleSelectedState', () => {
    it('should deselect the right item', () => {
      const mockEvent: any = {
        shiftKey: true
      };

      directive.multiselect = true;
      directive._highlightIndex = 0;
      item1.active = true;
      directive.listItems.reset([item1, item2]);
      novaLibService.deselectItem = jest.fn();
      listboxService.toggleSelectedState(mockEvent, directive);
      expect(novaLibService.deselectItem).toHaveBeenCalled();
    });

    it('should select the right item', () => {
      const mockEvent: any = {
        shiftKey: true
      };
      directive.multiselect = true;
      directive._highlightIndex = 0;
      item1.active = false;
      directive.listItems.reset([item1, item2]);
      novaLibService.selectItem = jest.fn();
      listboxService.toggleSelectedState(mockEvent, directive);
      expect(novaLibService.selectItem).toHaveBeenCalled();
      expect(directive._recentSelectedIndex).toBe(0);
    });

    it('should select the right item with arrowkey', () => {
      const mockEvent2: any = {
        key: 'ArrowUp'
      };
      directive._highlightIndex = 1;
      directive.multiselect = false;
      listboxService.toggleSelectedState(mockEvent2, directive);
      expect(directive._highlightIndex).toBe(0);
    });
  });

  describe('handleKeyUp', () => {
    it('should do nothing if roleListboxVariant is false', () => {
      directive._isRoleListboxVariant.set(false);
      const event = new KeyboardEvent('keyup');
      const spy = jest.spyOn(listboxService, 'handleKeyUp');
      listboxService.handleKeyUp(event, directive);
      expect(spy).toHaveReturned();
    });

    it('should prevent default action for listed keys', () => {
      directive._isRoleListboxVariant.set(true);
      const keys = ['Enter', ' ', 'Home', 'End'];
      keys.forEach((key) => {
        const event = new KeyboardEvent('keyup', { key });
        let preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        listboxService.handleKeyUp(event, directive);
        expect(preventDefaultSpy).toHaveBeenCalled();

        const event2 = new KeyboardEvent('keyup', { key: 'A' });
        preventDefaultSpy = jest.spyOn(event2, 'preventDefault');
        listboxService.handleKeyUp(event, directive);
        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });
    });

    it('should update _recentSelectedIndex for Space key', () => {
      directive._isRoleListboxVariant.set(true);
      directive._highlightIndex = 1;
      const event = new KeyboardEvent('keyup', { key: ' ' });
      listboxService.handleKeyUp(event, directive);
      expect(directive._recentSelectedIndex).toBe(1);
    });
  });

  describe('handleKeyDown', () => {
    beforeEach(() => {
      directive._isRoleListboxVariant.set(true);
    });

    it('should do nothing if roleListboxVariant is false', () => {
      directive._isRoleListboxVariant.set(false);
      const event = new KeyboardEvent('keydown');
      const spy = jest.spyOn(listboxService, 'handleKeyDown');
      listboxService.handleKeyDown(event, directive);
      expect(spy).toHaveReturned();
    });

    it('should prevent default action for keys other than Tab', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      listboxService.handleKeyDown(event, directive);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not prevent default action for Tab key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      listboxService.handleKeyDown(event, directive);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should call updateFocusItem for Home and End keys', () => {
      const keys = ['Home', 'End'];
      keys.forEach((key) => {
        const event = new KeyboardEvent('keydown', { key });
        listboxService.updateFocusItem = jest.fn();
        listboxService.handleKeyDown(event, directive);
        expect(listboxService.updateFocusItem).toHaveBeenCalled();
      });
    });

    describe('should updateFocusItem', () => {
      it('should update _highlightIndex on home key correctly', () => {
        directive.multiselect = true;
        const mockEvent = {
          key: 'Home',
          metaKey: true,
          shiftKey: true
        } as any;
        item1.el.nativeElement.focus = jest.fn();
        directive._highlightIndex = -1;
        item1.disabled = false;
        item2.disabled = false;
        directive.updateValueFromItems = jest.fn();
        directive.listItems.reset([item1, item2]);
        listboxService.updateFocusItem(mockEvent, directive);
        directive._highlightIndex = 0; // test for two different scenarios
        listboxService.updateFocusItem(mockEvent, directive);
        expect(directive._highlightIndex).toBe(0);
        expect(directive.updateValueFromItems).toHaveBeenCalled();
      });

      it('should update _highlightIndex on end key correctly', () => {
        directive.multiselect = true;
        const mockEvent = {
          key: 'End',
          metaKey: true,
          shiftKey: true
        } as any;
        item1.disabled = false;
        item1.active = false;
        item2.disabled = false;
        item2.active = false;
        directive.listItems.reset([item1, item2]);
        directive._highlightIndex = 0;
        listboxService.updateFocusItem(mockEvent, directive);
        expect(directive.listItems.first.active).toBeTruthy();
        expect(directive.listItems.last.active).toBeTruthy();
        directive._highlightIndex = 2;
        listboxService.updateFocusItem(mockEvent, directive);
        expect(directive.listItems.first.active).toBeFalsy();
        expect(directive.listItems.last.active).toBeFalsy();
      });
    });

    it('should call searchKeyword for alphanumeric keys without metaKey', () => {
      const keys = ['a', 'A', 'z', 'Z', '0', '9'];
      keys.forEach((key) => {
        const event = new KeyboardEvent('keydown', { key });
        listboxService.searchKeyword = jest.fn();
        listboxService.handleKeyDown(event, directive);
        expect(listboxService.searchKeyword).toHaveBeenCalled();
      });
    });

    it('should implement searchKeyword correctly', fakeAsync(() => {
      item1.disabled = false;
      item1.key = 'a';
      item1.el.nativeElement.innerText = 'a';
      directive.listItems.reset([item1, item2]);
      const key = 'A';
      const event = new KeyboardEvent('keydown', { key });
      listboxService.searchKeyword(event, directive);

      expect(directive._keyword).toBe('a');
      expect(directive._highlightIndex).toBe(0);
      tick(1000);
      expect(directive._keyword).toBe('');
    }));

    it('should call toggleSelectedState for Up and Down arrow keys', () => {
      const keys = ['ArrowUp', 'ArrowDown'];
      keys.forEach((key) => {
        const event = new KeyboardEvent('keydown', { key });
        listboxService.toggleSelectedState = jest.fn();
        listboxService.handleKeyDown(event, directive);
        expect(listboxService.toggleSelectedState).toHaveBeenCalled();
      });
    });

    it('should call selectAll for A key with metaKey and multiselect', () => {
      directive.multiselect = true;
      const event = new KeyboardEvent('keydown', { key: 'A', metaKey: true });
      const event2 = new KeyboardEvent('keydown', { key: 'a', metaKey: true });
      listboxService.selectAll = jest.fn();
      listboxService.handleKeyDown(event, directive);
      listboxService.handleKeyDown(event2, directive);
      expect(listboxService.selectAll).toHaveBeenCalledTimes(2);
    });

    it('should call selectContiguousItems for Space key with shiftKey', () => {
      const event = new KeyboardEvent('keydown', { code: 'Space', shiftKey: true });
      listboxService.selectContiguousItems = jest.fn();
      listboxService.handleKeyDown(event, directive);
      expect(listboxService.selectContiguousItems).toHaveBeenCalled();
    });
  });

  it('should resetListbox', () => {
    item1.active = true;
    item2.active = true;
    directive.listItems.reset([item1, item2]);
    novaLibService.deselectItems = jest.fn();
    directive.resetListbox();
    expect(novaLibService.deselectItems).toHaveBeenCalled();
  });

  it('should set children disabled', () => {
    directive.listItems.forEach((item) => {
      item.checkbox = new CheckboxDirective(el, novaLibService, appReadyService);
    });
    directive.setChildrenDisabled();

    directive.listItems.forEach((item) => {
      expect(item.checkbox.disabled).toBe(directive.disabled);
    });

    directive.listItems.forEach((item) => {
      item.checkbox = null as any;
      item.radio = new RadioDirective(el, novaLibService, appReadyService);
    });

    directive.setChildrenDisabled();

    directive.listItems.forEach((item) => {
      expect(item.radio.disabled).toBe(directive.disabled);
    });
  });

  it('should set children invalid', () => {
    directive.listItems.forEach((item) => {
      item.checkbox = new CheckboxDirective(el, novaLibService, appReadyService);
    });
    directive.setChildrenInvalid();

    directive.listItems.forEach((item) => {
      expect(item.checkbox.invalid).toBe(directive.invalid);
    });

    directive.listItems.forEach((item) => {
      item.checkbox = null as any;
      item.radio = new RadioDirective(el, novaLibService, appReadyService);
    });

    directive.setChildrenInvalid();

    directive.listItems.forEach((item) => {
      expect(item.radio.invalid).toBe(directive.invalid);
    });
  });
  describe('addListItemsSubscription', () => {
    it('should subscribe to the onFocus event of each listItem', () => {
      directive.multiselect = true;
      directive._highlightIndex = 0;
      directive._isRoleListboxVariant.set(false);
      const spy = jest.spyOn(directive.listItems.first.onFocus, 'subscribe');
      directive.listItems.reset([item1, item2]);

      directive.addListItemSubscriptions();
      expect(directive._isRoleListboxVariant).toBeTruthy();
      expect(directive.multiselect).toBeTruthy();
      expect(directive.listItems.first.index).toBe(0);
      expect(spy).toHaveBeenCalled();
    });

    fit('should update highlighted index when new item is selected', () => {
      directive._highlightIndex = -1;
      directive.addListItemSubscriptions();
      item2.selectItem();
      directive.updateValueFromItems();
      fixture.detectChanges();
      expect(directive._highlightIndex).toBe(1);
      expect(directive._recentSelectedIndex).toBe(1);
    });
  });
});

describe('ListboxItemComponent', () => {
  let component: ListboxItemComponent;
  let el: ElementRef;
  let uuidService: UUIDService;
  let toggleControlService: ToggleControlService;

  beforeEach(() => {
    el = new ElementRef(document.createElement('li'));
    uuidService = TestBed.inject(UUIDService);
    toggleControlService = TestBed.inject(ToggleControlService);
    component = new ListboxItemComponent(el, uuidService, toggleControlService);
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should set invalid', () => {
    component.invalid = true;
    expect(component.invalid).toBe(true);
  });

  it('should set class', () => {
    component.class = 'test-class';
    expect(component.hostClass).toContain('test-class');
    expect(component.hostClass).toContain('v-listbox-item');
  });

  it('should set class when highlighted', () => {
    component.highlighted = true;
    expect(component.class).toContain('v-listbox-item-highlighted');
  });

  it('should set the right role', () => {
    component.role = null as any;
    expect(component.hostRole).toBe('option');
    component.role = 'test-role';
    expect(component.hostRole).toBe('test-role');
  });

  it('should set the right value', () => {
    component.value = 'test-value';
    expect(component.hostValue).toBe('test-value');
  });

  it('should set disabled', () => {
    component.disabled = true;
    expect(component.hostAriaDisabled).toBe('true');
    component.disabled = false;
    expect(component.hostAriaDisabled).toBeNull;
  });

  it('should set invalid', () => {
    component.invalid = true;
    expect(component.hostInvalid).toBe('invalid');
    component.invalid = false;
    expect(component.hostInvalid).toBeNull;
  });

  it('should set ariaSelected', () => {
    component.active = true;
    expect(component.hostAriaSelected).toBeTruthy();
  });

  it('should handle focus', () => {
    component.onFocus.emit = jest.fn();
    component.handleFocus(new FocusEvent('focus'));
    expect(component.onFocus.emit).toHaveBeenCalled();
  });

  it('should handle ngAfterContentInit', waitForAsync(() => {
    component.radio = new RadioDirective(el, uuidService, TestBed.inject(AppReadyService));
    component.radio.invalid = true;
    component.radio.disabled = true;
    const spy = jest.spyOn(component.radio._disabledEmitter, 'subscribe');

    component.ngAfterContentInit();
    expect(spy).toHaveBeenCalled();
    expect(component.invalid).toBeTruthy();
    expect(component.disabled).toBeTruthy();

    component.radio = null as any;
    component.checkbox = new CheckboxDirective(el, uuidService, TestBed.inject(AppReadyService));
    component.checkbox.invalid = true;
    component.checkbox.disabled = true;
    component.ngAfterContentInit();
    expect(component.invalid).toBeTruthy();
    expect(component.disabled).toBeTruthy();

    component.radio = null as any;
    component.checkbox = null as any;
    component.ngAfterContentInit();
    expect(component._isRoleOptionVariant).toBeTruthy();
  }));

  it('should handle onclick event', () => {
    component._isRoleOptionVariant = false;
    toggleControlService.toggleControl = jest.fn();
    component.onClick(new Event('click'));
    expect(toggleControlService.toggleControl).toHaveBeenCalled();

    component.clicked.emit = jest.fn();
    component.selectItem = jest.fn();
    component.onClick(new Event('click'));
    expect(component.clicked.emit).toHaveBeenCalled();
    expect(component.selectItem).toHaveBeenCalled();
  });

  it('should handleKeyup', () => {
    component._isRoleOptionVariant = false;
    const event = new KeyboardEvent('keyup');
    const spy = jest.spyOn(component, 'handleKeyup');
    component.handleKeyup(event);
    expect(spy).toHaveReturned();

    component._isRoleOptionVariant = true;
    const keys = ['Enter', ' '];
    keys.forEach((key) => {
      const event = new KeyboardEvent('keyup', { key });
      let preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      component.handleKeyup(event);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  it('should handleKeyDown', () => {
    component._isRoleOptionVariant = false;
    const event = new KeyboardEvent('keydown');
    const spy = jest.spyOn(component, 'handleKeyDown');
    component.handleKeyDown(event);
    expect(spy).toHaveReturned();

    component._isRoleOptionVariant = true;
    const keys = ['Enter', ' ', 'Home', 'End'];
    keys.forEach((key) => {
      const event = new KeyboardEvent('keydown', { key });
      let preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      component.handleKeyDown(event);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  it('should selectItem', () => {
    component._multi = true;
    component.active = false;
    component.selectItem();
    expect(component.active).toBeTruthy();

    component._multi = false;
    component.active = false;
    component.selectItem();
    expect(component.active).toBeTruthy();
  });
});

describe('ListboxContainerDirective', () => {
  let directive: ListboxContainerDirective;

  let el: ElementRef;
  let novaLibService: NovaLibService;
  let uuidService: UUIDService;
  let listboxService: ListboxService;
  let cdfRef: ChangeDetectorRef;
  let appReadyService: AppReadyService;

  beforeEach(() => {
    novaLibService = TestBed.inject(NovaLibService);
    uuidService = TestBed.inject(UUIDService);
    listboxService = TestBed.inject(ListboxService);
    appReadyService = TestBed.inject(AppReadyService);
    directive = new ListboxContainerDirective(uuidService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set the right class', () => {
    expect(directive.hostClass).toContain('v-listbox-container');
    directive._disabled = true;
    directive._invalid = true;
    directive.class = 'test-class';
    expect(directive.hostClass).toContain('v-listbox-disabled');
    expect(directive.hostClass).toContain('v-listbox-error');
    expect(directive.hostClass).toContain('v-listbox-disabled');
    expect(directive.hostClass).toContain('test-class');
  });

  it('should initialize the right content', () => {
    directive.listbox = new ListboxDirective(uuidService, novaLibService, listboxService, cdfRef, el, appReadyService);
    directive.listbox.disabled = true;
    directive.listbox.invalid = true;
    directive.listbox = { communicateState: of({ disabled: true, invalid: true }) } as any;

    directive.ngAfterContentInit();
    expect(directive._disabled).toBeTruthy();
    expect(directive._invalid).toBeTruthy();
  });
});
