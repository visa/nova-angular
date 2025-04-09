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
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { render } from '@testing-library/angular';
import { axe } from 'jest-axe';
import { configureTestSuite } from '../../test-helper';
import { TableDirective } from './table.directive';

@Component({
  template: `
    <table
      v-table
      [keyValue]="keyValue"
      [subtle]="subtle"
      [horizontalDividerLines]="horizontalDividerLines"
      [dividerLines]="dividerLines"
      [alternate]="alternate"
      [tableSize]="tableSize"
    ></table>
  `
})
class TestComponent {
  keyValue = false;
  subtle = false;
  horizontalDividerLines = false;
  dividerLines = false;
  alternate = false;
  tableSize = 'medium';
}

describe('TableDirective', () => {
  describe('class', () => {
    it('should create an instance', () => {
      const directive = new TableDirective();
      expect(directive).toBeTruthy();
    });

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directiveDebugElement: any;
    let directiveInstance: TableDirective;

    configureTestSuite();

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [TableDirective]
      });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      directiveDebugElement = fixture.debugElement.query(By.directive(TableDirective));
      directiveInstance = directiveDebugElement.injector.get(TableDirective);

      fixture.detectChanges();
    });

    it('should have set the right subtle property', () => {
      expect(directiveInstance.subtle).toBe(false);
      component.subtle = true;
      fixture.detectChanges();
      expect(directiveInstance.subtle).toBe(true);
    });

    it('should have set the right dividerLines property', () => {
      expect(directiveInstance.dividerLines).toBe(false);
      component.dividerLines = true;
      fixture.detectChanges();
      expect(directiveInstance.dividerLines).toBe(true);
    });

    it('should have set the right horizontalDividerLines property', () => {
      expect(directiveInstance.horizontalDividerLines).toBe(false);
      component.horizontalDividerLines = true;
      fixture.detectChanges();
      expect(directiveInstance.horizontalDividerLines).toBe(true);
    });

    it('should have set the right keyValue property', () => {
      expect(directiveInstance.keyValue).toBe(false);
      component.keyValue = true;
      fixture.detectChanges();
      expect(directiveInstance.keyValue).toBe(true);
    });

    it('should have set the right alternate property', () => {
      expect(directiveInstance.alternate).toBe(false);
      component.alternate = true;
      fixture.detectChanges();
      expect(directiveInstance.alternate).toBe(true);
    });

    it('should have default tableSize property as medium', () => {
      expect(directiveInstance.tableSize).toBe('medium');
    });

    it('should return correct hostClasses', () => {
      directiveInstance.class = 'test-class';
      directiveInstance.keyValue = true;
      directiveInstance.alternate = true;
      directiveInstance.subtle = true;
      directiveInstance.dividerLines = true;
      directiveInstance.horizontalDividerLines = true;
      fixture.detectChanges();
      expect(directiveInstance.hostClasses).toBe(
        'test-class v-table v-table-key-value v-table-alt v-table-subtle v-table-border v-table-border-block'
      );
    });

    it('should return correct hostTableSize for each tableSize', () => {
      component.tableSize = 'compact';
      fixture.detectChanges();
      expect(directiveInstance.hostTableBlockDefault).toBe('var(--v-table-data-block-small)');

      component.tableSize = 'medium';
      fixture.detectChanges();
      expect(directiveInstance.hostTableBlockDefault).toBe('');

      component.tableSize = 'large';
      fixture.detectChanges();
      expect(directiveInstance.hostTableBlockDefault).toBe('var(--v-table-data-block-large)');
    });

    it('should return correct hostTablePadding for each tableSize', () => {
      component.tableSize = 'compact';
      fixture.detectChanges();
      expect(directiveInstance.hostTablePaddingBlock).toBe('var(--v-table-data-padding-block-small)');

      component.tableSize = 'medium';
      fixture.detectChanges();
      expect(directiveInstance.hostTablePaddingBlock).toBe('');

      component.tableSize = 'large';
      fixture.detectChanges();
      expect(directiveInstance.hostTablePaddingBlock).toBe('var(--v-table-data-padding-block-large)');
    });
  });

  describe('rendering', () => {
    it('should pass axe', async () => {
      const { container } = await render('<table v-table></table>', {
        imports: [TableDirective]
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("shouldn't render any block styles on unknown tableSize", async () => {
      const { container } = await render('<table v-table tableSize="tiny"></table>', {
        imports: [TableDirective]
      });
      expect(container.firstElementChild?.getAttribute('style')).toBe(null);
    });
  });
});
