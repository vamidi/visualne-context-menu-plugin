import {
    Component,
    Input,
    OnInit,
    ChangeDetectionStrategy,
} from '@angular/core';
import { ContextMenuService } from './context-menu.service';
import { ComponentType } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';

@Component({
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponent implements OnInit
{
    @Input() el: HTMLElement | null = null;
    @Input() component!: ComponentType<Component>;
    @Input() props!: { [key: string]: unknown };

    private closeSub!: Subscription;

    constructor(
        private contextMenuService: ContextMenuService,
    ) {}

    ngOnInit()
    {
        this.closeSub = this.contextMenuService.afterClosed.subscribe(() => this.onMenuClosed());

        const { props } = this;
        const componentRef = this.contextMenuService.open({ x: <number>props.x, y: <number>props.y }, this.component);
        for(const key in props) {
            if(props.hasOwnProperty(key)) {
                Object.defineProperty(componentRef.instance, key, {
                    get() { return props[key]; },
                    set(val) { props[key] = val; }
                })
            }
        }
    }

    onMenuClosed()
    {
        this.closeSub.unsubscribe();

        if(this.el)
            this.el.remove();
    }
}
