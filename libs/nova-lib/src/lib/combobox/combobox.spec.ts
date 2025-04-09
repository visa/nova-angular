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
import { ChangeDetectorRef, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from '../../test-helper';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { ButtonIconDirective } from '../button-icon/button-icon.directive';
import { ButtonDirective } from '../button/button.directive';
import { FloatingUIContainer } from '../floating-ui-container/floating-ui-container.directive';
import { FloatingUIElementDirective } from '../floating-ui-element/floating-ui-element.directive';
import { FloatingUITriggerDirective } from '../floating-ui-trigger/floating-ui-trigger.directive';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputDirective } from '../input/input.directive';
import { LabelDirective } from '../label/label.directive';
import { ListboxContainerDirective } from '../listbox-container/listbox-container.directive';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { ListboxDirective } from '../listbox/listbox.directive';
import { ListboxService } from '../listbox/listbox.service';
import { NovaLibService } from '../nova-lib.service';
import { ComboboxDirective } from './combobox.directive';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';

@Component({
  template: ` <div v-combobox>
    <label v-label>Label</label>
    <div v-input-container v-floating-ui-trigger vMY="4">
      <input v-input />
      <button v-button-icon (click)="toggle()"></button>
    </div>
    <div v-listbox-container v-floating-ui-element>
      <ul v-listbox>
        <li v-listbox-item value="option-a">Option A</li>
        <li v-listbox-item value="option-b" disabled>Option B</li>
        <li v-listbox-item value="option-c">Option C</li>
        <li v-listbox-item value="option-d">Option D</li>
        <li v-listbox-item value="option-e">Option E</li>
      </ul>
    </div>
  </div>`,
  imports: [
    ComboboxDirective,
    LabelDirective,
    InputContainerComponent,
    FloatingUITriggerDirective,
    InputDirective,
    ButtonIconDirective,
    ButtonDirective,
    FloatingUIElementDirective,
    ListboxContainerDirective,
    ListboxDirective,
    ListboxItemComponent
  ],
  providers: [NovaLibService, ListboxService, AppReadyService, FloatingUIContainer]
})
class TestComponent {
  @ViewChild(InputDirective) input: InputDirective;
  @ViewChildren(ListboxItemComponent) listboxItem: QueryList<ListboxItemComponent>;
  toggle() {
    console.log('did something');
  }
}

describe('ComboboxDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let componentDebugElement: any;
  let componentInstance: ComboboxDirective;
  let listboxService: ListboxService;
  let appReadyService: AppReadyService;

  configureTestSuite();

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        ComboboxDirective,
        LabelDirective,
        InputContainerComponent,
        FloatingUITriggerDirective,
        InputDirective,
        ButtonIconDirective,
        ButtonDirective,
        FloatingUIElementDirective,
        ListboxContainerDirective,
        ListboxDirective,
        ListboxItemComponent
      ],
      providers: [NovaLibService, ListboxService, AppReadyService, FloatingUIContainer]
    }).createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    componentDebugElement = fixture.debugElement.query(By.directive(ComboboxDirective));
    componentInstance = componentDebugElement.injector.get(ComboboxDirective);
    listboxService = TestBed.inject(ListboxService);
    appReadyService = TestBed.inject(AppReadyService);
    componentInstance.onChange = jest.fn();
    componentInstance.onTouched = jest.fn();
  });

  // Test if component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the right class', () => {
    expect(componentInstance.hostClass).toContain('');
    componentInstance.class = 'test-class';
    expect(componentInstance.hostClass).toContain('test-class');
    expect(componentInstance.hostClass).toContain('v-combobox');
  });

  // Test for 'disabled' state
  it('should update disabled state', () => {
    componentInstance.disabled = true;
    expect(componentInstance.hostDisabled).toBe('disabled');

    componentInstance.setDisabledState(false);
    expect(componentInstance.disabled).toBe(false);
  });

  // Test for 'invalid' state
  it('should update invalid state', () => {
    componentInstance.invalid = true;
    expect(componentInstance.ariaInvalid).toBe(true);
  });

  // Test for 'required' state
  it('should update required state', () => {
    componentInstance.required = true;
    expect(componentInstance.required).toBe(true);
  });

  it('should add and remove readonly label based on readonly prop', () => {
    // add when true
    componentInstance.readonly = true;
    const readonlyText = fixture.nativeElement.querySelector('.v-label > .v-sr');
    expect(readonlyText).toBeTruthy();

    // remove when false
    componentInstance.readonly = false;
    fixture.detectChanges();
    const readonlyTextAfter = fixture.nativeElement.querySelector('.v-label > .v-sr');
    expect(readonlyTextAfter).toBeFalsy();
  });

  describe('should get and set the value correctly with all the logic', () => {
    it('should set the right value', () => {
      componentInstance.value = { label: 'test', value: 'test' };
      expect(componentInstance.val).toEqual(componentInstance.value);
    });

    beforeEach(() => {
      // Arrange
      const mockInput = { value: 'old-value' };
      componentInstance.input = mockInput as InputDirective;
      componentInstance.onChange = jest.fn();
      componentInstance.getList = jest.fn().mockReturnValue([{ value: 'test' }]);
      componentInstance.selectItem = jest.fn();
      componentInstance.clearCombobox = jest.fn();
    });

    it('should return right value when input value and label do not match', () => {
      // Act
      const testValue = { label: 'test', value: 'test' };
      componentInstance.value = testValue;

      // Assert
      expect(componentInstance.value).toEqual(testValue);
      expect(componentInstance.getList).toHaveBeenCalled();
      expect(componentInstance.selectItem).toHaveBeenCalled();
      expect(componentInstance.onChange).toHaveBeenCalledWith(testValue);
    });

    it('should return right value when listbox value and value do not match', () => {
      // Act
      const testValue = { label: 'test', value: 'test' };
      const mockInput = { value: 'test' };
      componentInstance.input = mockInput as InputDirective;
      componentInstance.value = testValue;

      //Assert
      expect(componentInstance.value).toEqual(testValue);
      expect(componentInstance.getList).toHaveBeenCalled();
      expect(componentInstance.selectItem).toHaveBeenCalled();
      expect(componentInstance.onChange).toHaveBeenCalledWith(testValue);
    });

    it('should not select items when the item is not found', () => {
      // Act
      componentInstance.getList = jest.fn().mockReturnValue([]);
      componentInstance._activeIndex = 1;
      componentInstance.novaLibService.deselectItem = jest.fn();
      const testValue = { label: 'test', value: 'test' };
      componentInstance.value = testValue;

      // Assert
      expect(componentInstance._activeIndex).toBeNull();
      expect(componentInstance.novaLibService.deselectItem).toHaveBeenCalled();
    });

    it('should clear combobox when value is null', () => {
      // Act
      componentInstance.value = null;

      // Assert
      expect(componentInstance.clearCombobox).toHaveBeenCalled();
      expect(componentInstance.onChange).toHaveBeenCalledWith(null);
    });
  });

  it('should handle focus correctly', () => {
    const testEvent = new Event('focus');
    componentInstance.onTouched = jest.fn();
    componentInstance.handleFocus(testEvent);
    expect(componentInstance.onTouched).toHaveBeenCalledWith(testEvent);
  });

  it('should register onChange and onTouched functions correctly', () => {
    const testFn = jest.fn();
    componentInstance.registerOnChange(testFn);
    componentInstance.registerOnTouched(testFn);
    expect(componentInstance.onChange).toBe(testFn);
    expect(componentInstance.onTouched).toBe(testFn);
  });

  it('should write value correctly', () => {
    const testValue = { label: 'test', value: 'test' };
    componentInstance.onChange = jest.fn();
    componentInstance.writeValue(testValue);
    expect(componentInstance.value).toEqual(testValue);
    expect(componentInstance.onChange).toHaveBeenCalledWith(testValue);
  });

  it('should return the correct list items', () => {
    const testItems = [{ value: 'test1' }, { value: 'test2' }] as ListboxItemComponent[];
    componentInstance.currentListItems = {
      toArray: () => testItems
    } as QueryList<ListboxItemComponent>;
    expect(componentInstance.getList()).toEqual(testItems);
  });

  it('should set up input correctly', () => {
    componentInstance.filter.emit = jest.fn();
    componentInstance.writeValue = jest.fn();
    componentInstance.listbox.value = '';

    componentInstance.input.inputEvent.emit('test');
    componentInstance.setUpInput();

    expect(componentInstance.input._inCombobox).toBeTruthy();
    expect(componentInstance.input.ariaOwns).toBe(componentInstance.listboxContainer.id);
    expect(componentInstance.input.role).toBe('combobox');
    expect(componentInstance.writeValue).toHaveBeenCalled();
  });

  it('should set ngOnInit correctly', () => {
    componentInstance.ngOnInit();

    expect(componentInstance.floatingContainer?._isCombobox).toBeTruthy();
    expect(componentInstance.floatingContainer?.eventsArray.length).toBe(0);
  });

  it('should set ngAfterContentInit correctly', () => {
    componentInstance.setUpInput = jest.fn();
    componentInstance.setUpListItems = jest.fn();
    componentInstance.setUpFloatingContainer = jest.fn();
    componentInstance.setState = jest.fn();

    if (componentInstance.floatingContainer) {
      componentInstance.floatingContainer.floatingUIService.toggleFloatingUI = jest.fn();
      componentInstance.floatingContainer.floatingUIService.hidefloatingUI = jest.fn();
    }

    fixture.detectChanges();

    componentInstance.inputContainer.buttons.last.clicked.emit();
    componentInstance.listbox.listItems.changes;
    componentInstance.ngAfterContentInit();

    expect(componentInstance.setUpInput).toHaveBeenCalled();
    expect(componentInstance.listbox.value).toEqual('');
    expect(componentInstance.initialListItems).toEqual(componentInstance.listbox.listItems.toArray());
    expect(componentInstance.currentListItems).toEqual(componentInstance.listbox.listItems);
    expect(componentInstance.setUpListItems).toHaveBeenCalled();
    expect(componentInstance.inputContainer.buttons.last._inCombobox).toBeTruthy();
    expect(componentInstance.floatingContainer?.floatingUIService.toggleFloatingUI).toHaveBeenCalled();
    expect(componentInstance.setUpFloatingContainer).toHaveBeenCalled();
    expect(componentInstance.setState).toHaveBeenCalled();
  });

  it('should set up list items correctly', () => {
    componentInstance.listbox.valueUpdated.subscribe = jest.fn();

    fixture.detectChanges();

    componentInstance.listbox.valueUpdated.emit([]);
    componentInstance.setUpListItems();

    expect(componentInstance.listbox._inCombobox).toBeTruthy();
    expect(componentInstance.listbox.valueUpdated.subscribe).toHaveReturned();

    componentInstance.listbox.multiselect = true;
    componentInstance.listbox.valueUpdated.emit([{ label: 'test', value: 'test' }]);
    fixture.detectChanges();

    componentInstance.setUpListItems();

    expect(componentInstance.listbox.valueUpdated.subscribe).toHaveReturned();

    componentInstance.listbox.multiselect = false;
    componentInstance.writeValue = jest.fn();
    componentInstance.setInitialValue = jest.fn();
    componentInstance.filter.emit = jest.fn();
    componentInstance.itemSelected.emit = jest.fn();

    componentInstance.novaLibService.deselectItems = jest.fn();
    const mockListItem = [{ label: 'test', value: 'test' }] as unknown as ListboxItemComponent;
    componentInstance.listbox.valueUpdated.emit(mockListItem);
    componentInstance.listbox.listItems.forEach((item) => {
      item.clicked.subscribe = jest.fn();
      item.itemChanged.subscribe = jest.fn();

      item.clicked.emit();
      item.itemChanged.emit();
    });
    fixture.detectChanges();
    componentInstance.setUpListItems();

    expect(componentInstance.writeValue).toHaveBeenCalled();
    expect(componentInstance.filter.emit).toHaveBeenCalled();
    expect(componentInstance.itemSelected.emit).toHaveBeenCalled();
    componentInstance.listbox.listItems.forEach((item) => {
      expect(item.clicked.subscribe).toHaveBeenCalled();
      expect(item.itemChanged.subscribe).toHaveBeenCalled();
    });
    expect(componentInstance.setInitialValue).toHaveBeenCalled();
  });

  describe('setInitialValue', () => {
    it('should select item based on combobox value', () => {
      componentInstance.value = { value: 'testValue', label: 'testLabel' };
      componentInstance.listbox = { value: 'listboxValue' } as unknown as ListboxDirective;
      const getListSpy = jest
        .spyOn(componentInstance, 'getList')
        .mockReturnValue([
          { value: 'testValue', active: false } as unknown as ListboxItemComponent,
          { value: 'otherValue', active: false } as unknown as ListboxItemComponent
        ]);
      const selectItemSpy = jest.spyOn(componentInstance, 'selectItem');

      componentInstance.setInitialValue();

      expect(getListSpy).toHaveBeenCalled();
      expect(selectItemSpy).toHaveBeenCalledWith(0);
      expect(componentInstance.input.value).toBeUndefined();
    });

    it('should set input value if combobox value does not match with any listbox item', () => {
      componentInstance.value = { value: 'nonexistentValue', label: 'testLabel' };
      componentInstance.listbox = { value: 'listboxValue' } as unknown as ListboxDirective;
      const getListSpy = jest
        .spyOn(componentInstance, 'getList')
        .mockReturnValue([
          { value: 'testValue', active: false } as unknown as ListboxItemComponent,
          { value: 'otherValue', active: false } as unknown as ListboxItemComponent
        ]);
      const selectItemSpy = jest.spyOn(componentInstance, 'selectItem');

      componentInstance.setInitialValue();

      expect(getListSpy).toHaveBeenCalled();
      expect(selectItemSpy).not.toHaveBeenCalled();
      expect(componentInstance.input.value).toEqual('testLabel');
    });

    it('should select item based on input value', () => {
      componentInstance.input = { value: 'inputValue' } as unknown as InputDirective;
      const findListItemSpy = jest.spyOn(componentInstance, 'findListItem').mockReturnValue(1);
      const selectItemSpy = jest.spyOn(componentInstance, 'selectItem');

      componentInstance.setInitialValue();

      expect(findListItemSpy).toHaveBeenCalledWith('inputValue');
      expect(selectItemSpy).toHaveBeenCalledWith(1);
    });

    it('should select active item from listbox', () => {
      componentInstance.listbox = { value: 'listboxValue', multiselect: false } as unknown as ListboxDirective;
      const getListSpy = jest
        .spyOn(componentInstance, 'getList')
        .mockReturnValue([
          { value: 'testValue', active: false } as unknown as ListboxItemComponent,
          { value: 'otherValue', active: true } as unknown as ListboxItemComponent
        ]);
      const selectItemSpy = jest.spyOn(componentInstance, 'selectItem');

      componentInstance.setInitialValue();

      expect(getListSpy).toHaveBeenCalled();
      expect(selectItemSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('setState', () => {
    it('should set input and listbox to readonly when readonly is true', () => {
      componentInstance.readonly = true;

      componentInstance.setState();

      expect(componentInstance.input.readonly).toBe(true);
    });

    it('should set input and listbox to disabled when disabled is true', () => {
      componentInstance.disabled = true;

      componentInstance.setState();

      expect(componentInstance.input.disabled).toBe(true);
      expect(componentInstance.listbox.disabled).toBe(true);
    });

    it('should set input and listbox to invalid when invalid is true', () => {
      componentInstance.invalid = true;

      componentInstance.setState();

      expect(componentInstance.input.invalid).toBe(true);
      expect(componentInstance.listbox.invalid).toBe(true);
    });

    it('should set input and listbox to required when required is true', () => {
      componentInstance.required = true;

      componentInstance.setState();

      expect(componentInstance.input.required).toBe(true);
      expect(componentInstance.listbox.required).toBe(true);
    });
  });

  describe('highlightNextPrevItem', () => {
    beforeEach(() => {
      jest.spyOn(componentInstance.novaLibService, 'nextEnabledItem').mockReturnValue(1);
      jest.spyOn(componentInstance.novaLibService, 'previousEnabledItem').mockReturnValue(0);
      jest.spyOn(componentInstance, 'getListItem').mockReturnValue({
        id: 'test_id'
      } as ListboxItemComponent);
    });

    it('should set activeIndex correctly', () => {
      componentInstance._activeIndex = 0;
      componentInstance.highlightIndex = jest.fn();

      componentInstance.highlightNextPrevItem('next');

      expect(componentInstance.highlightIndex).toHaveBeenCalledWith(0);
    });

    it('should set filteredIndex when highlight is null and type is next correctly', () => {
      componentInstance._highlightedIndex = null;
      fixture.detectChanges();
      const spy = jest.spyOn(componentInstance.novaLibService, 'nextEnabledItem').mockReturnValue(1);

      componentInstance.highlightNextPrevItem('next');

      expect(spy).toHaveReturnedWith(1);
    });

    it('should set filteredIndex when highlight is null and type is prev correctly', () => {
      componentInstance._highlightedIndex = null;
      fixture.detectChanges();
      const spy = jest.spyOn(componentInstance.novaLibService, 'previousEnabledItem').mockReturnValue(1);

      componentInstance.highlightNextPrevItem('prev');

      expect(spy).toHaveReturnedWith(1);
    });

    it('should highlight next item', () => {
      componentInstance._highlightedIndex = 0;

      componentInstance.highlightNextPrevItem('next');

      expect(componentInstance._highlightedIndex).toEqual(1);
      expect(componentInstance.input.ariaActiveDescendant).toEqual('test_id');
      expect(componentInstance.listbox.ariaActiveDescendant()).toEqual('test_id');
    });

    it('should highlight previous item', () => {
      componentInstance._highlightedIndex = 1;

      componentInstance.highlightNextPrevItem('prev');

      expect(componentInstance._highlightedIndex).toEqual(0);
      expect(componentInstance.input.ariaActiveDescendant).toEqual('test_id');
      expect(componentInstance.listbox.ariaActiveDescendant()).toEqual('test_id');
    });
  });

  describe('clearCombobox', () => {
    it('should set values to null', () => {
      componentInstance.clearCombobox();
      expect(componentInstance._activeIndex).toBeNull();
      expect(componentInstance._highlightedIndex).toBeNull();
      expect(componentInstance._prevActiveItem).toBeNull();
      expect(componentInstance.input._ariaActiveDescendant).toBeNull();
      expect(componentInstance.listbox.ariaActiveDescendant()).toBeNull();
      expect(componentInstance.listbox.value).toBeNull();
    });

    it('should check if listbox value is an array and set to empty', () => {
      fixture.detectChanges();
      componentInstance.clearCombobox();
      expect(componentInstance.listbox.value).toBeNull();
    });
  });

  describe('setUpFloatingContainer function', () => {
    it('should correctly set up the floating container', fakeAsync(() => {
      const floatingUIService = componentInstance.floatingContainer!.floatingUIService;
      const spy = jest.spyOn(floatingUIService.isShownEmitter, 'subscribe');
      componentInstance.setUpFloatingContainer();
      expect(spy).toHaveBeenCalled();

      floatingUIService.isShownEmitter.emit(true);
      tick();
      expect(componentInstance.input?.ariaExpanded).toBe(true);
      expect(componentInstance.input?.ariaControls).toEqual(componentInstance.listbox?.id);

      floatingUIService.isShownEmitter.emit(false);
      tick();
      expect(componentInstance.input?.ariaExpanded).toBe(false);
      expect(componentInstance.input?.ariaControls).toBe(null);

      componentInstance._highlightedIndex = 0;
      floatingUIService.isShownEmitter.emit(false);
      tick();
      expect(componentInstance._lastHighlightedOnClose).toBe(0);

      componentInstance._activeIndex = 0;
      floatingUIService.isShownEmitter.emit(false);
      tick();
      expect(componentInstance.input.ariaActiveDescendant).toBe(
        componentInstance.getListItem(componentInstance._activeIndex)?.id
      );
      expect(componentInstance.listbox.ariaActiveDescendant()).toBe(
        componentInstance.getListItem(componentInstance._activeIndex)?.id
      );
    }));
  });

  describe('keyup event', () => {
    it('should handle keyup event correctly', () => {
      componentInstance.listbox.multiselect = false;
      componentInstance.input.value = '';
      componentInstance.value = 'test';
      const event = new KeyboardEvent('keydown', { key: 'Backspace' });

      componentInstance.hostKeyup(event);
      expect(componentInstance.value).toBe('');
    });
    it('should clear active items', () => {
      const mockList = [{ active: true }, { active: false }, { active: true }];
      componentInstance.getList = jest.fn().mockReturnValue(mockList);
      const event = new KeyboardEvent('keydown', { key: 'Backspace' });

      componentInstance.hostKeyup(event);
      expect(mockList[0].active).toBe(false);
      expect(mockList[2].active).toBe(false);
      expect(componentInstance.listbox.value).toBeNull();
    });
  });

  describe('keydown event', () => {
    it('should return keydown event correctly', () => {
      // put focus on input before hitting keys
      componentInstance.input.el.nativeElement.focus();
      const event = new KeyboardEvent('keydown');
      const spy = jest.spyOn(componentInstance, 'hostKeyDown');

      componentInstance.input.readonly = true;
      componentInstance.hostKeyDown(event);
      expect(spy).toHaveReturned();

      componentInstance.input.readonly = false;
      componentInstance.input.disabled = true;
      componentInstance.hostKeyDown(event);
      expect(spy).toHaveReturned();

      componentInstance.input.readonly = false;
      componentInstance.input.disabled = false;
      componentInstance.floatingContainer = undefined;
      componentInstance.hostKeyDown(event);
      expect(spy).toHaveReturned();
    });

    it('should return down/right event correctly', () => {
      const event1 = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const event2 = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      const spy = jest.spyOn(componentInstance, 'hostKeyDown');
      componentInstance.highlightNextPrevItem = jest.fn();
      if (componentInstance.floatingContainer) {
        componentInstance.floatingContainer.isShown = false;
        componentInstance.floatingContainer.floatingUIService.showfloatingUI = jest.fn();
      }
      const listboxSpy = jest
        .spyOn(componentInstance['listboxService'], 'scrollItemIntoView')
        .mockImplementation(() => {});
      componentInstance._highlightedIndex = 0;

      // focus on input and then hit down arrow
      componentInstance.input.el.nativeElement.focus();
      componentInstance.hostKeyDown(event1);
      expect(componentInstance.highlightNextPrevItem).toHaveBeenCalledWith('next');

      componentInstance.hostKeyDown(event2);
      expect(componentInstance.highlightNextPrevItem).toHaveBeenCalledWith('next');

      expect(componentInstance.floatingContainer?.floatingUIService.showfloatingUI).toHaveBeenCalled();
      expect(listboxSpy).toHaveBeenCalledTimes(2);
    });

    it('should return up/left event correctly', () => {
      const event1 = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const event2 = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      const spy = jest.spyOn(componentInstance, 'hostKeyDown');
      componentInstance.highlightNextPrevItem = jest.fn();
      if (componentInstance.floatingContainer) {
        componentInstance.floatingContainer.isShown = false;
        componentInstance.floatingContainer.floatingUIService.showfloatingUI = jest.fn();
      }
      const listboxSpy = jest
        .spyOn(componentInstance['listboxService'], 'scrollItemIntoView')
        .mockImplementation(() => {});
      componentInstance._highlightedIndex = 0;

      // focus on input and then hit down arrow
      componentInstance.input.el.nativeElement.focus();
      componentInstance.hostKeyDown(event1);
      expect(componentInstance.highlightNextPrevItem).toHaveBeenCalledWith('prev');

      componentInstance.hostKeyDown(event2);
      expect(componentInstance.highlightNextPrevItem).toHaveBeenCalledWith('prev');

      expect(componentInstance.floatingContainer?.floatingUIService.showfloatingUI).toHaveBeenCalled();
      expect(listboxSpy).toHaveBeenCalledTimes(2);
    });

    it('should return enter event correctly', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      const spy = jest.spyOn(componentInstance, 'hostKeyDown');
      if (componentInstance.floatingContainer) {
        componentInstance.floatingContainer.isShown = true;
      }
      componentInstance.selectItem = jest.fn();
      componentInstance.getListItem = jest.fn();
      componentInstance._highlightedIndex = 0;

      // focus on input and then hit down arrow
      componentInstance.input.el.nativeElement.focus();
      componentInstance.hostKeyDown(event);

      expect(componentInstance.selectItem).toHaveBeenCalled();
      expect(componentInstance.getListItem).toHaveBeenCalled();
    });
  });

  describe('findListItem', () => {
    it('should return -1 if browser is not ready', () => {
      const spy = jest.spyOn(componentInstance['appReadyService'], 'isBrowserAndDomAvailable').mockReturnValue(false);
      expect(componentInstance.findListItem('test')).toBe(-1);
    });

    it('should correct item', () => {
      componentInstance.currentListItems.toArray()[0].el.nativeElement.innerText = 'option a';
      fixture.detectChanges();
      const result = componentInstance.findListItem('option a');
      expect(result).toBe(0);
    });
  });
});

@Component({
  template: `<div v-combobox>
    <label v-label for="multiselect-default" id="multiselect-default-label">Label</label>
    <div v-input-container v-floating-ui-trigger vMY="4" vSurface vFlexRow vPL="3" vPR="6" vPY="3">
      <div vFlex vGap="2" vFlexShrink="1" vFlexGrow>
        <div v-chip vFlex vFlexShrink0 compact *ngFor="let item of chipArray; index as i">
          <label v-label [for]="'default-' + item.value + '-' + i">{{ item.label }}</label>
          <button
            v-button-icon
            buttonColor="tertiary"
            subtle
            [attr.aria-label]="'Remove ' + item.label"
            aria-describedby="multiselect-default-label"
            [id]="'default-' + item.value + '-' + i"
            (click)="deleteChip(item.value)"
          >
            <svg v-icon-visa-clear-alt-tiny></svg>
          </button>
        </div>
        <input
          v-input
          id="multiselect-default"
          name="multiselect-default"
          aria-describedby="multiselect-default-no-results"
        />
      </div>
      <button v-button-icon buttonColor="tertiary" buttonSize="small" aria-label="toggle">
        <v-icon-visa-toggle>
          <svg v-toggle-default-template v-icon-visa-chevron-down-tiny></svg>
          <svg v-toggle-rotated-template v-icon-visa-chevron-up-tiny></svg>
        </v-icon-visa-toggle>
      </button>
    </div>
    <div v-listbox-container v-floating-ui-element>
      <ul v-listbox multiselect>
        <li
          *ngIf="filteredItems.length === 0"
          id="multiselect-default-no-results"
          aria-atomic="true"
          aria-live="assertive"
        >
          <p>No results found</p>
        </li>
        <ng-container *ngIf="filteredItems.length > 0">
          <li v-listbox-item *ngFor="let item of filteredItems; index as i" [value]="item.value">{{ item.label }}</li>
        </ng-container>
      </ul>
    </div>
  </div> `,
  imports: [
    ComboboxDirective,
    IconToggleComponent,
    LabelDirective,
    InputContainerComponent,
    FloatingUITriggerDirective,
    InputDirective,
    ButtonIconDirective,
    ButtonDirective,
    FloatingUIElementDirective,
    ListboxContainerDirective,
    ListboxDirective,
    ListboxItemComponent
  ],
  providers: [NovaLibService, ListboxService, AppReadyService, FloatingUIContainer]
})
class TestMultiselectComponent {
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;

  chipArray = Array();

  public optionTypes = [
    {
      label: 'Option A',
      value: 'option-a'
    },
    {
      label: 'Option B',
      value: 'option-b'
    },
    {
      label: 'Option C',
      value: 'option-c'
    },
    {
      label: 'Option D',
      value: 'option-d'
    },
    {
      label: 'Option E',
      value: 'option-e'
    }
  ];
  filteredItems = this.optionTypes;

  ngAfterViewInit(): void {
    if (this.combobox) {
      this.combobox.itemSelected.subscribe((event) => {
        this.updateChipArray();
      });
    }
    this.updateChipArray();
  }

  updateChipArray() {
    const selectedValues = this.combobox.value?.value || [];
    this.chipArray = selectedValues
      .map((value: string) => this.optionTypes.find((option) => option.value === value))
      .filter((option: { label: string; value: string }) => option);
    this.cdr.detectChanges(); // required to update the view
  }

  deleteChip(value: string) {
    this.combobox?.listbox?.listItems?.find((item) => item.value === value)?.selectItem();
    if (this.combobox?.chips?.length) {
      this.combobox?.chips.last.button?.el.nativeElement.focus();
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}
}

describe('ComboboxDirective as multiselect', () => {
  let component: TestMultiselectComponent;
  let fixture: ComponentFixture<TestMultiselectComponent>;
  let componentDebugElement: any;
  let componentInstance: ComboboxDirective;
  let listboxService: ListboxService;
  let appReadyService: AppReadyService;

  configureTestSuite();

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestMultiselectComponent],
      imports: [
        ComboboxDirective,
        IconToggleComponent,
        LabelDirective,
        InputContainerComponent,
        FloatingUITriggerDirective,
        InputDirective,
        ButtonIconDirective,
        ButtonDirective,
        FloatingUIElementDirective,
        ListboxContainerDirective,
        ListboxDirective,
        ListboxItemComponent
      ],
      providers: [NovaLibService, ListboxService, AppReadyService, FloatingUIContainer]
    }).createComponent(TestMultiselectComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    componentDebugElement = fixture.debugElement.query(By.directive(ComboboxDirective));
    componentInstance = componentDebugElement.injector.get(ComboboxDirective);
    listboxService = TestBed.inject(ListboxService);
    appReadyService = TestBed.inject(AppReadyService);
    componentInstance.onChange = jest.fn();
    componentInstance.onTouched = jest.fn();
  });

  // Test if component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should recognize as multiselect', () => {
    expect(componentInstance.listbox.multiselect).toBeTruthy();
  });

  it('should write value as an array', () => {
    const testValue = { label: 'test', value: 'test' };
    componentInstance.writeValue(testValue);
    // expect(componentInstance.value).toEqual([testValue]);
  });
});
