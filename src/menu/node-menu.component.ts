import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MenuComponent } from './menu.component';
import { ContextMenuService } from '../context-menu.service';

@Component({
    selector: 'ng-node-menu',
    templateUrl: './main-menu.component.html',
})
export class NodeMenuComponent extends MenuComponent implements AfterViewInit
{
    @ViewChild('menu', { static: true })
    public el!: ElementRef<HTMLDivElement>;

    @ViewChild('tpl', { static: true })
    public tplRef!: TemplateRef<any>

    constructor(
        public contextMenuService: ContextMenuService,
        public viewContainerRef: ViewContainerRef
        /* editor: NodeEditor, props, angularComponent, nodeItems */)
    {
        super(contextMenuService, viewContainerRef);
        // super(editor, props, angularComponent);

        // this.initialize(editor, nodeItems)
    }

    public ngAfterViewInit()
    {
        super.ngAfterViewInit();
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

    hide() { }

    show(...args) { }
}
