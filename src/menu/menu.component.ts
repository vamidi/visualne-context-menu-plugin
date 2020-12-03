import { Component, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { NodeEditor } from 'visualne';
import { ContextMenuService } from '../context-menu.service';
import { ComponentItem, DebouncedFunc } from '../utils';
import debounce from 'lodash.debounce';

export abstract class MenuComponent implements OnInit
{
    public visible: boolean = true;
    public timeoutHide!: DebouncedFunc<(event: any) => void>;

    abstract editor: NodeEditor;
    abstract delay: number;
    abstract x: number = 0;
    abstract y: number = 0;
    abstract searchBar: boolean;
    abstract searchKeep: (title: string) => false;
    // Custom items that we receive from the user.
    abstract items: { [key: string]: ComponentItem } = { };
    abstract nodeItems: {} = {};
    abstract allocate: (component) => string[];
    abstract rename: (component) => string;

    abstract angularComponent: ComponentType<Component>;

    abstract el: ElementRef<HTMLDivElement>;
    protected filter: string = '';
    // Actual items we need to show in the list
    protected _items: ComponentItem[] = [];

    public get filtered(): ComponentItem[] {
        if(!this.filter) return this._items;
        const regex = new RegExp(this.filter, 'i');

        return this.extractLeafs(this._items)
            .filter(({ title }) => {
                return this.searchKeep(title) || title.match(regex)
            }
        );
    }

    protected constructor(
        protected contextMenuService: ContextMenuService,
        protected viewContainerRef: ViewContainerRef
    ) { }

    public ngOnInit()
    {
        this.timeoutHide = debounce(this.hide, this.delay);
    }

    abstract addItem(...args);

    abstract show(...args)

    public hide(event: any)
    {
        this.contextMenuService.close();
    }

    public contextMenu(e: any)
    {
        console.log(e);
        e.preventDefault();
    }

    public cancelHide() {
        const hide = this.timeoutHide;

        if (hide && hide.cancel)
            this.timeoutHide.cancel();
    }

    protected extractLeafs(items: ComponentItem[] | undefined) {
        if(!items) return [];
        const leafs: ComponentItem[] = [];
        items.map(item => {
            if(!item.subItems) leafs.push(item)
            leafs.push(...this.extractLeafs(item.subItems))
        })
        return leafs;
    }
}
