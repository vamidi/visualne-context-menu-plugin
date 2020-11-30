import { Component } from '@angular/core';

@Component({
    selector: 'ng-menu-item',
    templateUrl: 'item.component.html',
})
export class ItemComponent
{
    public item: { onClick: Function, title: string, subItems: any[] } = { onClick: () => {}, title: '', subItems: [] };
    public args: Object = {};
    public visibleSubItems: boolean = false;

    hasSubItems(): boolean {
        return !!this.item.subItems.length
    }

    showSubItems(): void {
        this.visibleSubItems = true;
        this.cancelHide();
    }

    public hideSubItems(): void {
        this.visibleSubItems = false;
    }

    public cancelHide(): void { }

    public onClick(event: any): void {
        event.stopPropagation();

        if(this.item.onClick)
            this.item.onClick(this.args);

        // this.$root.$emit('hide');
    }
}
