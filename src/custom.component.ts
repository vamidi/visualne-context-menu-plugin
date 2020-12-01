import {
    Component,
    Input,
    OnInit,
    ChangeDetectionStrategy,
} from '@angular/core';
import { ContextMenuService } from './context-menu.service';
import { ComponentType } from '@angular/cdk/overlay';

@Component({
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponent implements OnInit {
    @Input() component!: ComponentType<Component>;
    @Input() props!: { [key: string]: unknown };

    constructor(
        private contextMenuService: ContextMenuService,
    ) {}

    ngOnInit() {
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
}
