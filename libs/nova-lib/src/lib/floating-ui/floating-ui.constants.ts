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
export const FloatingUIPlacements = {
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  RIGHT: 'right',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  LEFT: 'left',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end'
} as const;
export type FloatingUIPlacements = (typeof FloatingUIPlacements)[keyof typeof FloatingUIPlacements];

export const FloatingUIVisibility = {
  SHOW: 'show',
  HIDE: 'hide'
} as const;
export type FloatingUIVisibility = (typeof FloatingUIVisibility)[keyof typeof FloatingUIVisibility];

export type UIEventVisibilityPair =
  | [UIEvent, FloatingUIVisibility?][]
  | ((UIEvent | 'show')[] | (UIEvent | 'hide')[])[];
