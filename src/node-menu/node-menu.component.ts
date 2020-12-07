import { Component, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ContextMenuService } from '../context-menu.service';
import { Component as VisualNEComponent, NodeEditor } from 'visualne';
import { ComponentItem, createNode, traverse } from '../utils';
import { ComponentType } from '@angular/cdk/overlay';

@Component({
    selector: 'ng-node-menu',
    templateUrl: '../menu/main-menu.component.html',
    styleUrls: ['../menu/main-menu.component.scss'],
})
export class NodeMenuComponent extends MenuComponent implements OnInit
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
        public viewContainerRef: ViewContainerRef
        /* editor: NodeEditor, props, angularComponent, nodeItems */)
    {
        super(contextMenuService, viewContainerRef);
        // super(editor, props, angularComponent);
    }

    ngOnInit(): void
    {
        super.ngOnInit();

        if (this.nodeItems['Delete'] !== false) {
            this.addItem('Delete', ({ node }) => this.editor.removeNode(node));
        }
        if (this.nodeItems['Clone'] !== false) {
            this.addItem('Clone', async (args) => {
                const { name, position: [x, y], ...params } = args.node;
                const component: VisualNEComponent = <VisualNEComponent>this.editor.components.get(name);
                const node = await createNode(component, { ...params, x: x + 10, y: y + 10 });

                this.editor.addNode(node);
            });
        }

        traverse(this.nodeItems, (name, func, path) => this.addItem(name, func, path));
    }
}
