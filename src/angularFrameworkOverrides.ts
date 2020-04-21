import {Injectable, NgZone} from "@angular/core";
import {VanillaFrameworkOverrides} from "@ag-grid-community/core";

@Injectable()
export class AngularFrameworkOverrides extends VanillaFrameworkOverrides {
    constructor(private _ngZone: NgZone) {
        super();
    }

    public setTimeout(action: any, timeout?: any): void {
        const nativeSetTimeout = window[(window as any).Zone.__symbol__('setTimeout')] as any;
        nativeSetTimeout(() => {
            action();
        }, timeout);
    }

    addEventListenerOutsideAngular(element: HTMLElement, type: string, listener: EventListener | EventListenerObject, useCapture?: boolean): void {
        this._ngZone.runOutsideAngular(() => {
            super.addEventListenerOutsideAngular(element, type, listener, useCapture);
        });
    }
}
