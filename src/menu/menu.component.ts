import { NodeEditor } from 'visualne';
import { ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { ContextMenuService } from '../context-menu.service';
import debounce from 'lodash.debounce';

export abstract class MenuComponent implements OnInit
{
    public visible: boolean = true;

    abstract editor: NodeEditor;
    abstract delay: number;
    abstract x: number = 0;
    abstract y: number = 0;
    abstract searchBar: boolean;
    abstract searchKeep: () => false;

    abstract el: ElementRef<HTMLDivElement>;

    protected timeoutHide!: { cancel: Function; flush: Function; };

    protected constructor(
        protected contextMenuService: ContextMenuService,
        protected viewContainerRef: ViewContainerRef
    ) {
        // const el = document.createElement('div');

        // editor.view.container.appendChild(el);


        // this.menu = new Vue({
        //     render: h => h(vueComponent || MenuView, { props })
        // }).$mount(el);
    }

    public ngOnInit()
    {
        console.log('attaching timeout');
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
        e.preventDefault();
    }

    public cancelHide() {
        const hide = this.timeoutHide;

        if (hide && hide.cancel)
            this.timeoutHide.cancel();
    }
}
