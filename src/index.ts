import { /* NodeMenuComponent, */ MainMenuComponent } from './menu';
import { NodeEditor, Plugin } from 'visualne';
import { PluginParams } from 'visualne/types/core/plugin';
import { EventsTypes } from 'visualne/types/events';
import { Context } from 'visualne/types/core/context';
// import isFunction from 'lodash.isfunction';

export interface ContextMenuEvents extends EventsTypes
{
    hidecontextmenu: void,
    showcontextmenu: void,
}

export declare type ContextMenuPluginParams = PluginParams & {
    searchBar?: boolean,
    searchKeep?: () => false,
    delay?: number,
    items?: {},
    nodeItems?: {},
    allocate?: (component) => string[],
    rename?: (component) => string,
    angularComponent?: null
};

class ContextMenu extends Plugin
{
    name: string = 'context-menu';

    constructor(editor: Context<ContextMenuEvents & EventsTypes>, params: ContextMenuPluginParams = {
        searchBar: true,
        searchKeep: () => false,
        delay: 1000,
        items: {},
        nodeItems: {},
        allocate: () => [],
        rename: component => component.name,
        angularComponent: null
    }) {
        super(editor);

        this.initialize(editor, params);
    }

    private initialize(editor: Context<ContextMenuEvents & EventsTypes>, { searchBar, searchKeep, delay, items, nodeItems, allocate, rename, angularComponent }: ContextMenuPluginParams)
    {
        // lets add bindings for the editor
        editor.bind('hidecontextmenu');
        editor.bind('showcontextmenu');

        // context to hide menu
        editor.on('hidecontextmenu', () => {
            // TODO hide the menu
            // if (menu) menu.hide();
        });

        editor.on(['click', 'contextmenu'], () => {
            editor.trigger('hidecontextmenu');
        });

        editor.on('contextmenu', ({ e, node }) =>
        {
            e.preventDefault();
            e.stopPropagation();

            if (!editor.trigger('showcontextmenu', { e, node })) return;

            // const [x, y] = [e.clientX, e.clientY];

            const element = document.createElement('visualne-context-element');
            const props = element as any;
            /*if(node) {
                props.component = NodeMenuComponent;
                props.props = Object.assign({}, {
                    editor,
                    searchBar: false,
                    delay,
                    x: e.clientX,
                    y: e.clientY,
                });
            } else {
             */
                props.component = MainMenuComponent;
                props.props = Object.assign({}, {
                    editor,
                    searchKeep,
                    searchBar,
                    delay,
                    x: e.clientX,
                    y: e.clientY,
                });
            // }

            (<NodeEditor>(editor)).view.container.appendChild(element);

            /*
            if(node) {
                menu = new NodeMenu(this.context, { searchBar: false, delay }, angularComponent,  isFunction(nodeItems) ? nodeItems(node) : nodeItems);
                menu.show(x, y, { node });
            } else {
                menu = new MainMenu(this.context, { searchBar, searchKeep, delay }, angularComponent, { items, allocate, rename });
                menu.show(x, y);
            }
             */
        });
    }
}

export const ContextMenuPlugin = ContextMenu;

export { VisualNEContextModule } from './module';
