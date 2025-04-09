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
/** This was inspired by materials id-generator: https://github.com/angular/components/blob/main/src/cdk/a11y/id-generator.ts */
import { APP_ID, inject, Injectable } from '@angular/core';

/**
 * Keeps track of the ID count per prefix. This helps us make the IDs a bit more deterministic.
 */
const counters: Record<string, number> = {};

/**
 * Service that generates unique IDs for DOM nodes.
 * Note that this service should not be used inside templates and should only be used within classes.
 * @docs {@link https://design.visa.com/angular/services/id-generator | See docs}
 */
@Injectable({ providedIn: 'root' })
export class IdGenerator {
  private appId: null | string = inject(APP_ID, { optional: true });

  /**
   * Generates a unique ID with a specific prefix.
   * @param prefix Prefix to add to the ID.
   */
  public newId(prefix: string = ''): string {
    // Omit the app ID if it's the default `ng`. Since the vast majority of pages have one
    // Angular app on them, we can reduce the amount of breakages by not adding it.
    if (this.appId && this.appId !== 'ng') prefix = `${this.appId}-${prefix}`;
    if (!counters.hasOwnProperty(prefix)) counters[prefix] = 0;
    return `${prefix}-${counters[prefix]++}`;
  }
}
