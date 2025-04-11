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
import { AfterContentInit, computed, ContentChild, Directive, HostBinding, Input, Signal, signal } from '@angular/core';
import { UUIDService } from '../_utilities/services/uuid.service';
import { ListboxDirective } from '../listbox/listbox.directive';

@Directive({
  standalone: true,
  selector: '[v-listbox-container] '
})
export class ListboxContainerDirective implements AfterContentInit {
  @ContentChild(ListboxDirective) listbox: ListboxDirective;
  _disabled = false;
  _invalid = false;
  _isRoleListboxVariant: Signal<boolean | null> = signal(null);
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-listbox-container
   */
  @Input()
  get class(): string {
    return [
      this._class,
      'v-listbox-container',
      this._invalid ? 'v-listbox-error' : '',
      this._disabled ? 'v-listbox-disabled' : ''
    ].join(' ');
  }
  set class(value: string) {
    this._class = value;
  }
  _class: string = '';
  @HostBinding('class')
  get hostClass(): string {
    return this.class;
  }

  /**
   * Sets custom role.
   * @default 'listbox' if no child list item contains a child radio or checkbox.
   * @default not present if child list item contains a child radio or checkbox.
   * @builtin true
   */
  @Input() role: string;
  @HostBinding('attr.role')
  get hostRole(): string {
    if (this._isRoleListboxVariant() && !this.role) {
      this.role = 'listbox';
    }
    return this.role;
  }

  _multiselect = false;
  @HostBinding('attr.aria-multiselectable')
  get hostAriaMultiselectable(): string | void {
    if (this._multiselect && this._isRoleListboxVariant()) {
      return 'true';
    }
  }

  @HostBinding('attr.aria-invalid')
  get hostAriaInvalid(): string | null {
    return this._invalid ? 'true' : null;
  }

  _required: boolean = false;
  @HostBinding('attr.aria-required')
  get hostAriaRequired(): string | null {
    return this._required ? 'true' : null;
  }

  _inCombobox = false;
  /**
   * Aria attribute relaying what active element the listbox container refers to.
   * @builtin true
   */
  @Input('aria-activedescendant') ariaActiveDescendant: Signal<string | null> = signal(null);
  @HostBinding('attr.aria-activedescendant')
  get hostAriaActiveDescendant(): string | null | void {
    if (this.ariaActiveDescendant() && !this._inCombobox) {
      return this.ariaActiveDescendant();
    }
  }

  /**
   * Sets custom id.
   * @default uuidService.getUUID('v-listbox-container-')
   * @builtin true
   */
  @Input()
  id: string = this.uuidService.getUUID('v-listbox-container-');
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  constructor(private uuidService: UUIDService) {}

  ngAfterContentInit(): void {
    if (this.listbox) {
      this._multiselect = this.listbox.multiselect;
      this._required = this.listbox.required;
      this._disabled = this.listbox.disabled;
      this._invalid = this.listbox.invalid;
      this._inCombobox = this.listbox._inCombobox;
      // update invalid and disabled classes based on listbox
      this.listbox.communicateState.subscribe((state) => {
        this._disabled = state.disabled;
        this._invalid = state.invalid;
      });

      this._isRoleListboxVariant = computed(() => this.listbox?._isRoleListboxVariant());
      this.ariaActiveDescendant = computed(() => this.listbox?.ariaActiveDescendant());
    }
  }
}
