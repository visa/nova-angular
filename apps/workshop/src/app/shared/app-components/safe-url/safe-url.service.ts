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
// START GENAI
import { Injectable } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UrlSanitizerService {
  private trustedDomains = ['examples/']; // Replace with your trusted domains

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isValidUrl(url: string): boolean {
    try {
      if (isPlatformBrowser(this.platformId)) {
        const baseUrl = window.location.origin;
        const parsedUrl = new URL(baseUrl + '/' + url);
        return this.trustedDomains.some((domain) => parsedUrl.pathname.includes(domain));
      }
      return false;
    } catch (e) {
      console.log('error: ', e);
      return false;
    }
  }

  sanitizeUrl(url: string): string {
    return this.isValidUrl(url) ? url : 'about:blank';
  }
}

// END GENAI
