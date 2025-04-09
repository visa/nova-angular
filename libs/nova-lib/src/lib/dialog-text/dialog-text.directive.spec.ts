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
import { TestBed } from '@angular/core/testing';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogTextDirective } from './dialog-text.directive';

describe('DialogTextDirective', () => {
  let directive: DialogTextDirective;
  let mockDialogComponent: any;

  beforeEach(async () => {
    mockDialogComponent = {
      descriptionLabel: 'test-description'
    };

    await TestBed.configureTestingModule({
      imports: [DialogTextDirective],
      providers: [{ provide: DialogComponent, useValue: mockDialogComponent }]
    }).compileComponents();
  });

  beforeEach(() => {
    directive = new DialogTextDirective(mockDialogComponent);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have the right classes', () => {
    directive.class = 'test-class';
    expect(directive.hostClass).toContain('test-class');
  });

  it('should use provided id', () => {
    directive.id = 'provided-id';
    directive.ngOnInit();
    expect(directive.id).toEqual('provided-id');
  });

  it('should use dialog description label as id if no id is provided', () => {
    directive.id = '';
    directive.ngOnInit();
    expect(directive.id).toEqual('test-description');
  });

  it('should allow custom id', () => {
    directive.id = 'custom-id';
    expect(directive.hostId).toBe('custom-id');
  });
});
