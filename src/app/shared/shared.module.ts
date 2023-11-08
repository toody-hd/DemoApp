import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AlertComponent } from "./alert/alert.component";
import { CardComponent } from "./card/card.component";
import { ModalComponent } from "./modal/modal.component";
import { ToastComponent } from './toast/toast.component';
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        AlertComponent,
        CardComponent,
        ModalComponent,
        ToastComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        NgbModule,
        RouterModule
    ],
    providers: [
        ModalComponent,
        ToastComponent,
        CommonModule
    ],
    exports: [
        AlertComponent,
        CardComponent,
        ModalComponent,
        ToastComponent,
        CommonModule
    ]
})
export class SharedModule { }