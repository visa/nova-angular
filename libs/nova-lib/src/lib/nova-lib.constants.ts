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
export const A_LOWERCASE_KEY = 'a';
export const DOWN_ARROW_KEY = 'ArrowDown';
export const END_KEY = 'End';
export const ESCAPE_KEY = 'Escape';
export const HOME_KEY = 'Home';
export const LEFT_ARROW_KEY = 'ArrowLeft';
export const PAGE_DOWN_KEY = 'PageDown';
export const PAGE_UP_KEY = 'PageUp';
export const RIGHT_ARROW_KEY = 'ArrowRight';
export const SPACE_KEY = ' ';
export const SPACE_CODE = 'Space';
export const TAB_KEY = 'Tab';
export const UP_ARROW_KEY = 'ArrowUp';
export const ALT_KEY = 'Alt';
export const SHIFT_KEY = 'Shift';
export const ENTER_KEY = 'Enter';
export const BACKSPACE_KEY = 'Backspace';
export const DELETE_KEY = 'Delete';
export const CTRL_KEY = 'Control';
export const META_KEY = 'Meta'; // command key on macs
// Internet Explorer (tested on release 9 and 11) and Firefox 36 and earlier use "Del" instead of "Delete" for the Del key.
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
export const DEL_KEY = 'Del';

export const SpacingProperties = {
  INHERIT: 'inherit',
  NORMAL: 'normal',
  AUTO: 'auto'
} as const;
export type SpacingProperties = (typeof SpacingProperties)[keyof typeof SpacingProperties];
