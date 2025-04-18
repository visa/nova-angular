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
import { PaginationDirective } from './pagination.directive';
import { PaginationService } from './pagination.service';

describe('PaginationDirective', () => {
  let directive: PaginationDirective;
  let paginationService: PaginationService;

  beforeEach(() => {
    paginationService = new PaginationService();
    directive = new PaginationDirective(paginationService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set hostClasses correctly', () => {
    directive.class = 'test-class';
    expect(directive.hostClasses).toBe('test-class v-pagination');
  });
});
