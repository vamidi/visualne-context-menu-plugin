import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, ElementRef,
    Input,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { MenuComponent } from './menu.component';
import { NodeEditor } from 'visualne';
import { ContextMenuService } from '../context-menu.service';

@Component({
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent extends MenuComponent implements AfterViewInit
{
    @Input()
    public x: number = 0;
    @Input()
    public y: number = 0;

    // public args: Object = {};
    // public filter: string = '';
    // public items: any[] = [];

    @ViewChild('menu', { static: true })
    public el!: ElementRef<HTMLDivElement>;

    @ViewChild('tpl', { static: true })
    public tplRef!: TemplateRef<any>

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

    // protected nodeItems: any[] = [];
    @Input() editor!: NodeEditor;

    public ngAfterViewInit()
    {
        super.ngAfterViewInit();
    }

    addItem(...args) {
        // this.menu.$emit('additem', ...args);
    }

    show(...args) {
        // this.menu.$emit('show', ...args);
    }

    hide(...args) {
        // this.menu.$emit('hide');
    }
}
