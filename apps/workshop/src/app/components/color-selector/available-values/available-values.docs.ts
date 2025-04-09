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
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaAccessibilityTiny } from '@visa/nova-icons-angular';

/** #custom */
@Component({
  imports: [CommonModule, NovaLibModule, VisaAccessibilityTiny],
  standalone: true,
  selector: 'nova-workshop-color-selector-available-values',
  templateUrl: './available-values.docs.html'
})
export class AvailableValuesColorSelectorComponent implements OnInit {
  hex = '#a4afe0';
  RGB: { r: number; g: number; b: number };
  HSL: { h: number; s: number; l: number };

  ngOnInit(): void {
    this.getColors(this.hex);
  }

  /**
   * Convert hex color value to RGB value
   * Credit to (Learners Bucket)[https://learnersbucket.com/examples/interview/convert-hex-color-to-rgb-in-javascript/]
   * @param hex string of hex value to convert
   */
  hexToRGB(hex: string) {
    // hex.length < 6 means we were given a short form hex (ie. #fff)
    const isShortForm: boolean = hex.length < 6;
    const firstSplit = isShortForm ? 2 : 3;
    const secondSplit = isShortForm ? 3 : 5;

    let r = hex.slice(1, firstSplit);
    let g = hex.slice(firstSplit, secondSplit);
    let b = hex.slice(secondSplit, hex.length);

    this.RGB = isShortForm
      ? { r: parseInt(r + r, 16), g: parseInt(g + g, 16), b: parseInt(b + b, 16) }
      : { r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16) };
  }

  /**
   * Convert hex color value to HSL value
   * Credit to (CSS Tricks)[https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hex-to-hsl]
   * @param hex string of hex value to convert
   */
  hexToHSL(hex: string) {
    this.hexToRGB(hex);
    let r = this.RGB.r / 255;
    let g = this.RGB.g / 255;
    let b = this.RGB.b / 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    this.HSL = { h, s, l };
  }

  getColors(hex: string) {
    this.hexToHSL(hex); // just call hexToHSL as this function calls hexToRGB
  }
}
