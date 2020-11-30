import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import {
    Overlay,
    OverlayContainer,
    ConnectionPositionPair,
    PositionStrategy,
    OverlayConfig,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { /*fromEvent,*/ Subscription, Subject } from 'rxjs';
import { /* filter, */ take } from 'rxjs/operators';
import { FlexibleConnectedPositionStrategyOrigin } from '@angular/cdk/overlay/position/flexible-connected-position-strategy';

@Injectable({
    providedIn: 'root',
})
export class ContextMenuService {
    overlayRef: any;
    sub!: Subscription;
    private afterClosed = new Subject<any>();
    onClosed = this.afterClosed.asObservable();

    constructor(
        private overlay: Overlay, private overlayContainer:OverlayContainer) { }

    open(origin: FlexibleConnectedPositionStrategyOrigin,
         menu: TemplateRef<any>, viewContainerRef: ViewContainerRef, data: any)
    {
        // this.close(null);
        this.overlayRef = this.overlay.create(
            this.getOverlayConfig(origin),
        );
        this.overlayRef.attach(new TemplatePortal(menu, viewContainerRef, {
            $implicit: data, close:this.close,
        }));
        setTimeout(()=>{
            console.log(this.overlayContainer.getContainerElement().getBoundingClientRect())
        });

        /*
        this.sub = fromEvent<MouseEvent>(document, 'click')
            .pipe(
                filter(event => {
                    const clickTarget = event.target as HTMLElement;
                    return (
                        clickTarget !== origin &&
                        (!!this.overlayRef &&
                            !this.overlayRef.overlayElement.contains(clickTarget))
                    );
                }),
                take(1),
            )
            .subscribe(() => {
                this.close(null);
            });
         */
        return this.onClosed.pipe(take(1));
    }

    close = (data: any) => {
        console.log('closing');
        this.sub && this.sub.unsubscribe();
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
            this.afterClosed.next(data)
        }
    }
    private getOverlayPosition(origin: FlexibleConnectedPositionStrategyOrigin): PositionStrategy {
        return this.overlay
            .position()
            .flexibleConnectedTo(origin)
            .withPositions(this.getPositions())
            .withPush(false);
    }
    private getOverlayConfig(origin: FlexibleConnectedPositionStrategyOrigin): OverlayConfig {
        return new OverlayConfig({
            hasBackdrop: false,
            backdropClass: 'popover-backdrop',
            positionStrategy: this.getOverlayPosition(origin),
            scrollStrategy: this.overlay.scrollStrategies.close(),
        });
    }
    private getPositions(): ConnectionPositionPair[] {
        return [
            {
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top',
            },
        ];
    }
}
