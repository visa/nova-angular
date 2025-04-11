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
import { TableWrapperDirective } from './table-wrapper.directive';

describe('TableWrapperDirective', () => {
  let wrapperDirective: TableWrapperDirective;

  beforeEach(() => {
    wrapperDirective = new TableWrapperDirective();
  });

  it('should create an instance', () => {
    expect(wrapperDirective).toBeTruthy();
  });

  it('should return correct hostClasses', () => {
    wrapperDirective.class = 'test-class';
    expect(wrapperDirective.hostClasses).toBe('test-class v-table-wrapper');
  });

  it('should handle scrollInlineSize correctly', () => {
    wrapperDirective.scrollInlineSize = '100';
    expect(wrapperDirective.scrollInlineSize).toBe('100px');
  });

  it('should handle scrollBlockSize correctly', () => {
    wrapperDirective.scrollBlockSize = '200';
    expect(wrapperDirective.scrollBlockSize).toBe('200px');
  });

  it('should return correct hostStyles when only scrollBlockSize is set', () => {
    wrapperDirective.scrollBlockSize = '200';
    expect(wrapperDirective.hostStylesBlockSize).toBe('200px');
  });

  it('should return correct hostStyles when only scrollInlineSize is set', () => {
    wrapperDirective.scrollInlineSize = '100';
    expect(wrapperDirective.hostStylesInlineSize).toBe('100px');
  });

  it('should return empty string for hostStyles when neither scrollBlockSize nor scrollInlineSize is set', () => {
    expect(wrapperDirective.hostStylesBlockSize).toBe('unset');
    expect(wrapperDirective.hostStylesInlineSize).toBe('unset');
  });
});
