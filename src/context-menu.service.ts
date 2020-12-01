import { ComponentRef, Injectable } from '@angular/core';
import {
    Overlay,
    ConnectionPositionPair,
    PositionStrategy,
    OverlayConfig,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FlexibleConnectedPositionStrategyOrigin } from '@angular/cdk/overlay/position/flexible-connected-position-strategy';
import { ComponentType } from '@angular/cdk/portal/portal';
import { OverlayRef } from '@angular/cdk/overlay/overlay-ref';

@Injectable({
    providedIn: 'root',
})
export class ContextMenuService
{
    private overlayRef: OverlayRef | null = null;

    constructor(private overlay: Overlay) { }

    public open<T>(origin: FlexibleConnectedPositionStrategyOrigin, menuComponent: ComponentType<T>): ComponentRef<T>
    {
        // this.close(null);
        this.overlayRef = this.overlay.create(
            this.getOverlayConfig(origin),
        );
        return this.overlayRef.attach(new ComponentPortal(menuComponent));

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
    }

    public close()
    {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }

    private getOverlayPosition(origin: FlexibleConnectedPositionStrategyOrigin): PositionStrategy {
        return this.overlay
            .position()
            .flexibleConnectedTo(origin)
            .withPositions(ContextMenuService.getPositions())
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
    private static getPositions(): ConnectionPositionPair[] {
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
