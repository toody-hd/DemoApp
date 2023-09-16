import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { AlertComponent } from "../alert/alert.component";
import { PlaceholderDirective } from "../placeholder/placeholder.directive";

@Component({
    selector:'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})

export class ModalComponent {
    @Input() functionality: string = '';
    @Input() inputs: string[] = [];
    @Output() onSubmitData = new EventEmitter<ModalData>();
    @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

    private closeSub: Subscription = new Subscription;

    constructor() {}

    onSubmit(form: NgForm) {
        this.onSubmitData.emit({ 
            functionality: this.functionality,
            data: Object.entries<string>(form.value).map((parameter) => {
                return { parameter: parameter[0], value: parameter[1] }
            })
        });
    }
    
    showErrorAlert(message: string) {
        //const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViwContainerRef = this.alertHost.viewContainerRef;
    
        hostViwContainerRef.clear();
        const componentRef = hostViwContainerRef.createComponent(AlertComponent);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViwContainerRef.clear();
        });
    }
}

export interface ModalData {
    functionality: string,
    data: {
        parameter: string,
        value: string
    }[]
}