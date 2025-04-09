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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UUIDService } from '../_utilities/services/uuid.service';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let mockUUIDService: any;

  beforeEach(async () => {
    mockUUIDService = {
      getUUID: jest.fn().mockReturnValue('test-uuid')
    };

    await TestBed.configureTestingModule({
      imports: [DialogComponent],
      providers: [{ provide: UUIDService, useValue: mockUUIDService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default values in ngOnInit', () => {
    component.ngOnInit();
    expect(component.id).toEqual('test-uuid');
    expect(component.label).toEqual('test-uuid-title');
    expect(component.descriptionLabel).toEqual('test-uuid-description');
  });

  it('should have the right classes', () => {
    expect(component.hostClass).toContain('v-dialog');
    component.messageType = 'information';
    fixture.detectChanges();
    expect(component.hostClass).toContain('v-dialog-default');
  });

  it('should use provided id, label and descriptionLabel', () => {
    component.id = 'provided-id';
    component.label = 'provided-label';
    component.descriptionLabel = 'provided-descriptionLabel';
    component.ngOnInit();
    expect(component.id).toEqual('provided-id');
    expect(component.label).toEqual('provided-label');
    expect(component.descriptionLabel).toEqual('provided-descriptionLabel');
  });
});
