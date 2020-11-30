import {
    Component,
    Input,
    OnInit,
    Injector,
    ComponentFactoryResolver,
    ViewContainerRef,
    Type,
    ChangeDetectionStrategy,
    OnDestroy
} from '@angular/core';

@Component({
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponent implements OnInit, OnDestroy {
    @Input() component!: Type<Component>;

    constructor(
        private vcr: ViewContainerRef,
        private injector: Injector,
        private factoryResolver: ComponentFactoryResolver
    ) {}

    ngOnInit() {
        const factory = this.factoryResolver.resolveComponentFactory(this.component);
        const componentRef = factory.create(this.injector);

        this.vcr.insert(componentRef.hostView);

    }

    ngOnDestroy() {
        this.vcr.detach(0);
    }
}
