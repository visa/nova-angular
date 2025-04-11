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
import { ElementRef, EventEmitter, Injectable, Output, Renderer2, RendererFactory2, signal } from '@angular/core';
import { arrow, autoUpdate, computePosition, ComputePositionReturn, flip, offset, shift } from '@floating-ui/dom';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { UUIDService } from '../_utilities/services/uuid.service';
import { TooltipArrowDirective } from '../arrow/arrow.directive';
import { FloatingUIPlacements, FloatingUIVisibility, UIEventVisibilityPair } from './floating-ui.constants';

/**
 * This internal service is used by Combobox, Dropdown Menu, and Tooltip components. <br />
 * It can be used with generic FloatingUIContainer, FloatingUIElementDirective, and FloatingUITriggerDirective to create your own custom floating-ui. <br />
 * If you are using any of the components mentioned, you will typically not need to use this service directly. <br />
 * Derived from [Floating UI documentation](https://floating-ui.com/).
 */
@Injectable({
  providedIn: 'root'
})
export class FloatingUIService {
  constructor(
    private rendererFactory: RendererFactory2,
    private uuidService: UUIDService,
    private appReadyService: AppReadyService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  /** @ignore */
  private renderer: Renderer2;
  /** @ignore */
  trigger: Element;
  /** @ignore */
  floatingUI: ElementRef;
  /** @ignore */
  arrow: TooltipArrowDirective;
  /** @ignore */
  eventArray: UIEventVisibilityPair;
  /** @ignore */
  offset: number;
  /** @ignore */
  offsetDefault = 2;
  /** @ignore */
  comboboxMiddleware: any = [offset(0), flip(), shift()];
  /** @ignore */
  middlewareDefault: any = [offset(this.offsetDefault), flip(), shift()];
  /** @ignore */
  middleware: any = this.middlewareDefault;
  /** @ignore */
  placement: FloatingUIPlacements = FloatingUIPlacements.BOTTOM;
  /** @ignore */
  isShown = signal(false);

  /**
   * Displays property of the floating UI element.
   * @default 'flex'
   */
  display = 'flex';

  /**
   * Time in milliseconds to wait before hiding the floating UI element when the trigger is hovered over.
   * @default A factor of the offset middleware option if provided, otherwise 50.
   */
  hideOnHoverTimeout: number;

  /**
   * Emits true when this floating UI element is shown and false when hidden.
   */
  @Output() isShownEmitter = new EventEmitter();

  /**
   * The setUpFloatingUI method is required to initialize the floating element and its trigger. <br />
   * Called by default with FloatingUIContainer or ComboboxDirective.
   * @param referenceEl References element that will trigger floating UI.
   * @param floatingEl References floating UI element.
   * @param eventArray Array of events for the reference/trigger element to listen for. <br> i.e. <code>[new UIEvent('focus'), FloatingUIVisibility.SHOW]</code> <br> tells the element to show the floating UI when the triggering element is focused.
   */
  setUpfloatingUI(referenceEl: ElementRef | HTMLElement, floatingEl: ElementRef, eventArray: UIEventVisibilityPair) {
    this.trigger = this.nativeElement(referenceEl);
    this.floatingUI = floatingEl;

    this.renderer.setStyle(this.floatingUI.nativeElement, 'top', '0');
    this.renderer.setStyle(this.floatingUI.nativeElement, 'left', '0');
    this.renderer.setStyle(this.floatingUI.nativeElement, 'display', 'none');

    if (eventArray) {
      this.setUpTrigger(eventArray);
    } else {
      console.error('No events provided to trigger the Floating UI.');
    }
  }

  /**
   * The nativeElement method returns the Element type of the reference element.
   * @param element Element to be converted to Element type.
   * @returns Element
   */
  nativeElement(element: ElementRef<any> | HTMLElement): Element {
    if (element instanceof ElementRef) {
      return element.nativeElement;
    }
    return element;
  }

  /**
   * The customizeFloatingUI method allows you to provide custom placement and middleware options to the Floating UI service.
   * @param placement Optional. See <code>FloatingUIPlacements</code> enum.
   * @param middleware Optional. Visit the official Floating UI documentation for more on [middleware options](https://floating-ui.com/docs/computePosition#middleware).
   * @param display Optional. Sets CSS display property for the floating UI element.
   * @param tooltipArrow Optional. Directive reference to the arrow element. See TooltipArrowDirective.
   */
  customizeFloatingUI(
    placement?: FloatingUIPlacements,
    middleware?: any,
    display?: string,
    tooltipArrow?: TooltipArrowDirective
  ) {
    if (placement) {
      this.placement = placement;
    }
    if (middleware) {
      this.middleware = middleware;
      // save a custom offset
      const customOffset = (this.middleware.find((m: any) => m['name'] === 'offset') as any) || 2;
      this.offset = customOffset.options;
    }
    if (display) {
      this.display = display;
    }

    if (tooltipArrow) {
      this.arrow = tooltipArrow;
      // update the offset to factor in the arrow size if no custom offset was placed
      const floatingOffset = Math.ceil(Math.sqrt(2 * this.arrow.customSize ** 2) / 2);
      this.offset = this.offset ? floatingOffset + this.offset : floatingOffset + this.offsetDefault;
      this.middleware.push(arrow({ element: this.arrow.el.nativeElement }));
      const offsetIndex = this.middleware.findIndex((func: any) => func.name === 'offset');

      // START GENAI@CHATGPT4
      if (offsetIndex !== -1) {
        // Replace the old offset function with the new one
        this.middleware = [
          ...this.middleware.slice(0, offsetIndex),
          offset(this.offset),
          ...this.middleware.slice(offsetIndex + 1)
        ];
      } else {
        // If no old offset function is found, just add the new one
        this.middleware = [...this.middleware, offset(this.offset)];
      }
      // END GENAI@CHATGPT4
    }
  }

  /**
   * The positionFloatingUI method positions the Floating UI based on the given placement and middleware. <br />
   * For more details on the internal function, refer to Floating UI's [compute position documentation](https://floating-ui.com/docs/computePosition).
   * @param trigger The triggering element.
   * @param floatingUI The element that will "float" when triggered.
   * @param placement Reference FloatingUIPlacements.
   * @param middleware Visit the official Floating UI documentation for more on [middleware options](https://floating-ui.com/docs/computePosition#middleware).
   */
  positionFloatingUI(
    trigger: Element = this.trigger,
    floatingUI: HTMLElement = this.floatingUI.nativeElement,
    placement: FloatingUIPlacements = this.placement
  ) {
    autoUpdate(trigger, floatingUI, () => {
      computePosition(trigger, floatingUI, {
        placement: placement,
        middleware: this.middleware
      }).then(({ x, y, middlewareData, placement }: ComputePositionReturn) => {
        floatingUI.style.left = `${x}px`;
        floatingUI.style.top = `${y}px`;

        if (middlewareData.arrow) {
          // see: https://codesandbox.io/s/mystifying-kare-ee3hmh?file=/src/index.js
          if (this.arrow) {
            const { x, y } = middlewareData.arrow;

            this.renderer.setStyle(this.arrow.el.nativeElement, 'left', x != null ? `${x}px` : '');
            this.renderer.setStyle(this.arrow.el.nativeElement, 'top', y != null ? `${y}px` : '');
            this.renderer.setStyle(this.arrow.el.nativeElement, 'right', '');
            this.renderer.setStyle(this.arrow.el.nativeElement, 'bottom', '');

            const side = placement.split('-')[0];
            const staticSide = {
              top: 'bottom',
              bottom: 'top',
              left: 'right',
              right: 'left'
            }[side];

            if (staticSide) {
              this.renderer.setStyle(
                this.arrow.el.nativeElement,
                staticSide,
                -(this.arrow.el.nativeElement.offsetWidth / 2) + 'px'
              );
            }
          }
        }
      });
    });
  }

  /**
   * The showFloatingUI method displays the Floating UI element.
   */
  showfloatingUI() {
    if (this.appReadyService.isBrowserAndDomAvailable()) {
      const triggerDisabled = this.trigger.getAttribute('disabled');
      if (triggerDisabled) return;
    }
    this.positionFloatingUI();
    this.isShown.set(true);
    this.isShownEmitter.emit(this.isShown());
    this.renderer.setStyle(this.floatingUI.nativeElement, 'display', this.display);
  }

  /**
   * The hideFloatingUI method hides the Floating UI element.
   */
  hidefloatingUI() {
    this.renderer.setStyle(this.floatingUI.nativeElement, 'display', 'none');
    this.isShown.set(false);
    this.isShownEmitter.emit(this.isShown());
  }

  /**
   * The toggleFloatingUI method toggles the visibility of the Floating UI element.
   */
  toggleFloatingUI() {
    if (this.isShown()) {
      this.hidefloatingUI();
    } else {
      this.showfloatingUI();
    }
  }

  /**
   * The closeOnClickOut method closes the menu when a click occurs outside of the menu and the triggering element.
   * @param event Document click event.
   */
  closeOnClickOut(event: Event) {
    // listen for document click and close menu if click is outside of component
    if (this.isShown()) {
      const target = event.target as HTMLInputElement;
      if (!this.floatingUI.nativeElement.contains(event.target) && !this.trigger.contains(target)) {
        this.hidefloatingUI();
      }
    }
  }

  /**
   * The addCloseActions method adds default close actions to the Floating UI component. These actions include closing the menu when the escape key is pressed or when clicking outside of the floating element.
   */
  addCloseActions() {
    const document = this.appReadyService.checkDocumentExists();
    // close menu on escape key press or clicking outside of menu
    if (document) {
      this.renderer.listen(document, 'click', this.closeOnClickOut.bind(this));
      this.renderer.listen(document, 'keydown.esc', this.hidefloatingUI.bind(this));
    }
  }

  /**
   * The setUpTrigger method configures the triggering element by setting up the events to listen for and the actions to take when those events are triggered.
   * @param eventArray Array of events for the reference/trigger element to listen for.<br> i.e. <code>[new UIEvent('focus'), FloatingUIVisibility.SHOW]</code> <br> tells the element to show the floating UI when the triggering element is focused.
   */
  setUpTrigger(eventArray: UIEventVisibilityPair) {
    // add default actions to close menu
    this.addCloseActions();
    eventArray.forEach((pair) => {
      /**
       * if a custom eventArray is **not** typed as UIEventVisibilityPair[],<br />
       * Typescript will type the array as ((UIEvent | "show")[] | (UIEvent | "hide")[])[] <br />
       * because the passed arrays have different types, the type of the array is inferred as a union of the types of the passed arrays. <br />
       * The following code ensures the correct types are assigned to the event and listener variables.
       */
      const event: UIEvent | undefined | FloatingUIVisibility = pair.find((e) => e instanceof UIEvent);
      const listener: FloatingUIVisibility | undefined | UIEvent = pair.find(
        (e) => e === FloatingUIVisibility.SHOW || e === FloatingUIVisibility.HIDE
      );
      if (event instanceof UIEvent) {
        if (event.type === 'click') {
          this.renderer.listen(this.trigger, event.type, this.toggleFloatingUI.bind(this));
        } else if (event.type === 'mouseleave' && listener && listener === FloatingUIVisibility.HIDE) {
          this.keepOnHover();
        } else if (listener && listener === FloatingUIVisibility.SHOW) {
          this.renderer.listen(this.trigger, event.type, this.showfloatingUI.bind(this));
        } else if (listener && listener === FloatingUIVisibility.HIDE) {
          this.renderer.listen(this.trigger, event.type, this.hidefloatingUI.bind(this));
        }
      }
    });
  }

  // for keepOnHover
  /** @ignore */
  onTooltip = false;
  /** @ignore */
  onTrigger = false;

  /**
   * The keepOnHover method keeps the floating element visible when hovering over the trigger or the floating element.
   */
  keepOnHover() {
    let offset = this.middleware.find((m: any) => m['name'] === 'offset') as any;
    offset = this.hideOnHoverTimeout ? this.hideOnHoverTimeout : offset['options'] ? offset['options'] * 20 : 50;
    this.renderer.listen(this.trigger, 'mouseleave', () => {
      setTimeout(() => {
        this.onTrigger = false;
        if (!this.onTooltip) {
          this.hidefloatingUI();
        }
      }, offset);
    });
    this.renderer.listen(this.trigger, 'mouseenter', () => {
      this.onTrigger = true;
    });

    this.renderer.listen(this.floatingUI.nativeElement, 'mouseenter', () => {
      this.onTooltip = true;
    });
    this.renderer.listen(this.floatingUI.nativeElement, 'mouseleave', () => {
      setTimeout(() => {
        this.onTooltip = false;
        if (!this.onTrigger) {
          this.hidefloatingUI();
        }
      }, offset);
    });
  }
}
