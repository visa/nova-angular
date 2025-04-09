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
import { ContentChildren, Directive, QueryList, Renderer2, RendererFactory2 } from '@angular/core';
import { DropdownItemDirective } from '../../dropdown-item/dropdown-item.directive';
import { DOWN_ARROW_KEY, ESCAPE_KEY, LEFT_ARROW_KEY, RIGHT_ARROW_KEY, UP_ARROW_KEY } from '../../nova-lib.constants';
import { NovaLibService } from '../../nova-lib.service';

@Directive({
  standalone: true,
  selector: '[vAddArrowKeys]'
})
export class AddArrowKeysDirective {
  removeTabNavigation: boolean = false;
  constructor(
    private novaLibService: NovaLibService,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  private renderer: Renderer2;
  @ContentChildren(DropdownItemDirective, { descendants: true }) items: QueryList<DropdownItemDirective>;
  itemsArray: DropdownItemDirective[] = [];

  ngAfterContentInit() {
    this.itemsArray = this.items.toArray();
    this.itemsArray = this.itemsArray.filter((item) => !item.el.nativeElement.disabled);

    if (this.itemsArray?.length > 0) {
      this.itemsArray.forEach((item: DropdownItemDirective, index: number) => {
        if (!item.el || !item.el.nativeElement) return;
        item.listeners.push(
          // for each button, add an event listener for arrow "keydown"
          this.renderer.listen(item.el.nativeElement, 'keydown', (event) => {
            if (event.key === ESCAPE_KEY) {
              return;
            }
            // right and down arrow keys should go to next focusable item
            if (event.key === DOWN_ARROW_KEY || event.key === RIGHT_ARROW_KEY) {
              event.preventDefault();
              const nextItem = index + 1 < this.itemsArray.length ? this.itemsArray[index + 1] : this.itemsArray[0];
              nextItem.el.nativeElement.focus();
            } else if (event.key === UP_ARROW_KEY || event.key === LEFT_ARROW_KEY) {
              // left and up arrow keys should go to previous focusable item
              event.preventDefault();
              const nextItem = index !== 0 ? this.itemsArray[index - 1] : this.itemsArray[this.itemsArray.length - 1];
              nextItem.el.nativeElement.focus();
            }
          })
        );
      });
    }
  }
}
