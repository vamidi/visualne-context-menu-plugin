import {
    ChangeDetectionStrategy,
    Component, ElementRef,
    Input,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { MenuComponent } from './menu.component';
import { NodeEditor } from 'visualne';
import { ContextMenuService } from '../context-menu.service';

@Component({
    selector: 'ng-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent extends MenuComponent
{
    @Input()
    public editor!: NodeEditor;

    @Input()
    public x: number = 0;
    @Input()
    public y: number = 0;

    @Input()
    public delay!: number;

    @Input()
    public searchBar!: boolean;

    @Input()
    public searchKeep!: () => false;

    // items: {},
    // nodeItems: {},
    // allocate: () => [],
    // rename: (component) => string,
    // angularComponent: null

    @ViewChild('menu', { static: true })
    public el!: ElementRef<HTMLDivElement>;

    constructor(
        public contextMenuService: ContextMenuService,
        public viewContainerRef: ViewContainerRef
        /* editor: NodeEditor, props, angularComponent, { items, allocate, rename } */)
    {
        super(contextMenuService, viewContainerRef /* editor, props, angularComponent */);

        /*
        const mouse = { x: 0, y: 0 };

        editor.on('mousemove', ({ x, y }) => {
            mouse.x = x;
            mouse.y = y;
        });

        for(const component of editor.components.values()) {
            const path = allocate(component);

            if (Array.isArray(path)) { // add to the menu if path is array
                this.addItem(rename(component), async () => {
                    editor.addNode(await createNode(<VisualNEComponent>component, mouse));
                }, path);
            }
        }

        traverse(items, (name, func, path) => this.addItem(name, func, path));
        */
    }

    addItem(...args) {
        // this.menu.$emit('additem', ...args);
    }

    show(...args) {
        // this.menu.$emit('show', ...args);
    }
}
