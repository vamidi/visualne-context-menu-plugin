import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentItem, DebouncedFunc } from '../../utils';
import debounce from 'lodash.debounce';

@Component({
    selector: 'ng-component-menu-item',
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.sass'],
})
export class ItemComponent implements OnInit
{
    @Input()
    public item!: ComponentItem;

    @Input()
    public delay: number = 500;

    @Output()
    public onItemClick: EventEmitter<Object> = new EventEmitter<Object>();

    public args: Object = {};
    public visibleSubItems: boolean = false;

    public timeoutHide!: DebouncedFunc<(event: any) => void>;

    public get hasSubItems(): boolean {
        if(!this.item.subItems) return false;
        return this.item.subItems.length !== 0
    }

    public ngOnInit()
    {
        this.timeoutHide = debounce(this.hideSubItems, this.delay);
    }

    showSubItems(): void {
        this.visibleSubItems = true;
        this.cancelHide();
    }

    public hideSubItems(): void
    {
        this.visibleSubItems = false;
    }

    public cancelHide(): void {
        const hide = this.timeoutHide;

        if (hide && hide.cancel)
            this.timeoutHide.cancel();
    }

    public onClick(event: any): void
    {
        event.stopPropagation();

        if(this.item.onClick)
            this.item.onClick(this.args);

        this.onItemClick.emit(this.args);
    }

    public onSubItemClick(event: any): void { this.onItemClick.emit(event); }
}
