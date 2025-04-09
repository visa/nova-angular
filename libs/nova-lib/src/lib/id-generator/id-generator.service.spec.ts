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
import { APP_ID, Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';

import { IdGenerator } from './id-generator.service';

@Component({
  imports: [],
  providers: [IdGenerator],
  selector: 'test-component',
  standalone: true,
  template: `<div [id]="id1"></div>
    <div [id]="id2"></div>`
})
class TestComponent {
  readonly idGenerator = inject(IdGenerator);

  readonly id1 = this.idGenerator.newId();
  readonly id2 = this.idGenerator.newId();
}

describe('IdGenerator', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({
      providers: [IdGenerator, { provide: APP_ID, useValue: 'testApp' }]
    });
    const service = TestBed.inject(IdGenerator);
    expect(service).toBeTruthy();
  });

  it('should generate unique IDs with a specific prefix', () => {
    TestBed.configureTestingModule({
      providers: [IdGenerator, { provide: APP_ID, useValue: 'testApp' }]
    });
    const service = TestBed.inject(IdGenerator);
    const prefix = 'testPrefix';
    const id1 = service.newId(prefix);
    const id2 = service.newId(prefix);
    expect(id1).toBe('testApp-testPrefix-0');
    expect(id2).toBe('testApp-testPrefix-1');
  });

  it('should generate unique IDs without a specific prefix', () => {
    TestBed.configureTestingModule({
      providers: [IdGenerator, { provide: APP_ID, useValue: 'testApp' }]
    });
    const service = TestBed.inject(IdGenerator);
    const id1 = service.newId();
    const id2 = service.newId();
    expect(id1).toBe('testApp--0');
    expect(id2).toBe('testApp--1');
  });

  it('should omit the app ID if it is "ng"', () => {
    TestBed.configureTestingModule({
      providers: [IdGenerator, { provide: APP_ID, useValue: 'ng' }]
    });
    const service = TestBed.inject(IdGenerator);
    const prefix = 'testPrefix';
    const id1 = service.newId(prefix);
    const id2 = service.newId(prefix);
    expect(id1).toBe('testPrefix-0');
    expect(id2).toBe('testPrefix-1');
  });

  it('should generate IDs independently for different prefixes', () => {
    TestBed.configureTestingModule({
      providers: [IdGenerator, { provide: APP_ID, useValue: 'testApp' }]
    });
    const service = TestBed.inject(IdGenerator);
    const prefix1 = 'prefix1';
    const prefix2 = 'prefix2';
    const id1 = service.newId(prefix1);
    const id2 = service.newId(prefix2);
    const id3 = service.newId(prefix1);
    const id4 = service.newId(prefix2);
    expect(id1).toBe('testApp-prefix1-0');
    expect(id2).toBe('testApp-prefix2-0');
    expect(id3).toBe('testApp-prefix1-1');
    expect(id4).toBe('testApp-prefix2-1');
  });

  it('should handle empty prefix', () => {
    TestBed.configureTestingModule({
      providers: [IdGenerator, { provide: APP_ID, useValue: 'ng' }]
    });
    const service = TestBed.inject(IdGenerator);
    const prefix = '';
    const id1 = service.newId(prefix);
    const id2 = service.newId(prefix);
    expect(id1).toBe('-0');
    expect(id2).toBe('-1');
  });

  it('should allow for deterministic snapshots ids 1', async () => {
    const { container } = await render('<test-component/>', {
      imports: [TestComponent]
    });
    expect(container).toMatchSnapshot();
  });
  it('should allow for deterministic snapshots ids 2', async () => {
    const { container } = await render('<test-component/>', {
      imports: [TestComponent]
    });
    expect(container).toMatchSnapshot();
  });
});
