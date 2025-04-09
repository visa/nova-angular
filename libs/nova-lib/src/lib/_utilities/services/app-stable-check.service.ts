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
import { ApplicationRef, Injectable, Inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
/**
 * This service is used internally by the library and can optionally be used directly. <br />
 * It’s required for SSR integration but not necessary for functions behind Angular's renderer.
 */
@Injectable({
  providedIn: 'root'
})
export class AppReadyService {
  /**
   * Signal to indicate if the application is stable.
   */
  appStable: WritableSignal<boolean> = signal(false);
  /** @ignore */
  _browserAndDomReady = false;

  constructor(
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.appRef.isStable.subscribe((isStable) => {
      this.appStable.set(isStable);
    });
  }

  /**
   * The checkDocumentExists method checks and returns the document object if applicable.
   */
  checkDocumentExists(): Document | boolean {
    if (this.document) {
      return this.document;
    } else return false;
  }

  /**
   * The checkIsPlatformBrowser method checks if the platform is a browser (as opposed to server).
   * @returns boolean
   */
  checkIsPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * The isBrowserAndDomAvailable method checks for both the document and the browser platform.
   * @returns boolean
   */
  isBrowserAndDomAvailable(): boolean {
    if (this._browserAndDomReady) return true; // prevent calling the functions every time
    this._browserAndDomReady = this.checkDocumentExists() && this.checkIsPlatformBrowser();
    return this._browserAndDomReady;
  }
}
