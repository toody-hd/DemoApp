import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';
import { AuthComponent } from 'src/app/auth/auth.component';


@Component({
    selector:'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {
    @Input() functionality: string = '';
    @Input() inputs: string[] = [];
    @Input() error: string = '';
    @Input() logedin: boolean = false;
    @Input() parentRef!: AuthComponent;
    @Output() onSubmitData = new EventEmitter<ModalData>();

    message: string = '';

	constructor(public activeModal: NgbActiveModal) {}

    onSubmit(form: NgForm) {
        this.error = '';
        this.onSubmitData.emit({ 
            functionality: this.functionality,
            data: Object.entries<string>(form.value).map((parameter) => {
                return { parameter: parameter[0], value: parameter[1] }
            })
        });
        this.parentRef.loggedin.pipe(take(1)).subscribe(e => {
            if (e) {
                form.reset();
                this.activeModal.close('Modal Submit')
            }
            else {
                this.parentRef.error.pipe(take(1)).subscribe(e => {
                    this.error = e;
                })
            }
        })
        this.parentRef.message.pipe(take(1)).subscribe(e => {
            this.message = e;
        })
    }
}

export interface ModalData {
    functionality: string,
    data: {
        parameter: string,
        value: string
    }[]
}