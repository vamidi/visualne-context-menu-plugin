import {
    ChangeDetectionStrategy,
    Component, ElementRef,
    Input, OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { MenuComponent } from '../menu/menu.component';
import { Component as VisualNEComponent, NodeEditor } from 'visualne';
import { ContextMenuService } from '../context-menu.service';
import { ComponentItem, createNode, traverse } from '../utils';

@Component({
    selector: 'ng-main-menu',
    templateUrl: '../menu/main-menu.component.html',
    styleUrls: ['../menu/main-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent extends MenuComponent implements OnInit
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
    public searchKeep!: (title: string) => false;

    @Input()
    public items: { [key: string]: ComponentItem } = {};

    @Input()
    public nodeItems: {} = {};

    @Input()
    public args: Object = {};

    @Input()
    public allocate!: (component) => string[];

    @Input()
    public rename!: (component) => string;

    @Input()
    public angularComponent!: ComponentType<Component>;

    @ViewChild('menu', { static: true })
    public el!: ElementRef<HTMLDivElement>;

    constructor(
        public contextMenuService: ContextMenuService,
        public viewContainerRef: ViewContainerRef)
    {
        super(contextMenuService, viewContainerRef /* editor, props, angularComponent */);
    }

    public ngOnInit()
    {
        super.ngOnInit();

        const mouse = this.calculateMousePos();

        if(this.editor)
        {
            this.editor.on('mousemove', ({ x, y }) => {
                mouse.x = x;
                mouse.y = y;
            });

            for (const component of this.editor.components.values())
            {
                const path = this.allocate(component);

                if (Array.isArray(path)) { // add to the menu if path is array
                    this.addItem(this.rename(component), async () => {
                        this.editor.addNode(await createNode(<VisualNEComponent>component, mouse));
                    }, path);
                }
            }

            traverse(this.items, (name, func, path) => this.addItem(name, func, path));
        }
    }

    protected calculateMousePos(): { x: number, y: number }
    {
        const clientX = this.x, clientY = this.y;
        const rect = this.editor.view.area.el.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const k = this.editor.view.area.transform.k;

        return { x: x / k, y: y / k };
    }
}
