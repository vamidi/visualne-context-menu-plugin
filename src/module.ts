import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';

import { ContextComponent } from './context.component';
import { NodeMenuComponent } from './node-menu/node-menu.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ItemComponent } from './item/item.component';
import { ContextMenuService } from './context-menu.service';

@NgModule({
    declarations: [
        NodeMenuComponent,
        MainMenuComponent,
        ContextComponent,
        ItemComponent,
    ],
    imports: [
        CommonModule
    ],
    providers: [
        ContextMenuService,
    ],
    exports: [
        MainMenuComponent,
        NodeMenuComponent,
        ContextComponent,
        ItemComponent,
    ],
    entryComponents: [
        MainMenuComponent,
        NodeMenuComponent,
        ContextComponent,
        ItemComponent,
    ],
})
export class VisualNEContextModule {
    constructor(injector: Injector) {
        const CustomElement = createCustomElement(ContextComponent, { injector });
        if (!customElements.get('visualne-context-element')) customElements.define('visualne-context-element', CustomElement);
    }
}
