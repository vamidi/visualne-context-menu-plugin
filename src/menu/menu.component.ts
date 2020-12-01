import { NodeEditor } from 'visualne';
import { ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { ContextMenuService } from '../context-menu.service';
import debounce from 'lodash.debounce';

interface DebouncedFunc<T extends (...args: any[]) => any> {
    /**
     * Call the original function, but applying the debounce rules.
     *
     * If the debounced function can be run immediately, this calls it and returns its return
     * value.
     *
     * Otherwise, it returns the return value of the last invokation, or undefined if the debounced
     * function was not invoked yet.
     */
    (...args: Parameters<T>): ReturnType<T> | undefined;

    /**
     * Throw away any pending invokation of the debounced function.
     */
    cancel(): void;

    /**
     * If there is a pending invokation of the debounced function, invoke it immediately and return
     * its return value.
     *
     * Otherwise, return the value from the last invokation, or undefined if the debounced function
     * was never invoked.
     */
    flush(): ReturnType<T> | undefined;
}

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

    protected timeoutHide!: DebouncedFunc<(event: any) => void>;

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
