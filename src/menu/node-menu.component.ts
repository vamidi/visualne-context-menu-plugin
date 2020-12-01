import { Component, ElementRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MenuComponent } from './menu.component';
import { ContextMenuService } from '../context-menu.service';
import { NodeEditor } from 'visualne';

@Component({
    selector: 'ng-node-menu',
    templateUrl: './main-menu.component.html',
})
export class NodeMenuComponent extends MenuComponent
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
        /* editor: NodeEditor, props, angularComponent, nodeItems */)
    {
        super(contextMenuService, viewContainerRef);
        // super(editor, props, angularComponent);

        // this.initialize(editor, nodeItems)
    }

    /*
    initialize(editor: NodeEditor, nodeItems)
    {
        if (nodeItems['Delete'] !== false) {
            this.addItem('Delete', ({ node }) => editor.removeNode(node));
        }
        if (nodeItems['Clone'] !== false) {
            this.addItem('Clone', async (args) => {
                const { name, position: [x, y], ...params } = args.node;
                const component: VisualNEComponent = <VisualNEComponent>editor.components.get(name);
                const node = await createNode(component, { ...params, x: x + 10, y: y + 10 });

                editor.addNode(node);
            });
        }

        traverse(nodeItems, (name, func, path) => this.addItem(name, func, path));
    }
 */

    addItem(...args) { }

    show(...args) { }
}
