import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';

import { NodeMenuComponent, MainMenuComponent, ItemComponent } from './menu';
import { CustomComponent } from './custom.component';
import { ContextMenuService } from './context-menu.service';

@NgModule({
    declarations: [
        NodeMenuComponent,
        MainMenuComponent,
        CustomComponent,
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
        CustomComponent,
        ItemComponent,
    ],
    entryComponents: [
      MainMenuComponent,
      NodeMenuComponent,
      CustomComponent,
    ],
})
export class VisualNEContextModule {
    constructor(injector: Injector) {
        const CustomElement = createCustomElement(CustomComponent, { injector });
        if (!customElements.get('visualne-context-element')) customElements.define('visualne-context-element', CustomElement);
    }
}
