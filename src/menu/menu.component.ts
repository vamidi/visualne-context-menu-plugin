// import { NodeEditor } from 'visualne';

import { AfterViewInit, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { ContextMenuService } from '../context-menu.service';

export abstract class MenuComponent implements AfterViewInit
{
    public visible: boolean = true;

    abstract x: number = 0;
    abstract y: number = 0;

    abstract el: ElementRef<HTMLDivElement>;
    abstract tplRef: TemplateRef<any>

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

    public ngAfterViewInit()
    {
        this.contextMenuService.open({ x: this.x, y: this.y }, this.tplRef, this.viewContainerRef,{ data:'I\'m the button '+ 1 })
            .subscribe(res => {
                console.log(res)
            },
        );
    }

    abstract addItem(...args);

    abstract show(...args)

    abstract hide();
}
