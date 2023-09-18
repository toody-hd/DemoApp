import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AlertComponent } from "./alert/alert.component";
import { ModalComponent } from "./modal/modal.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { ToastComponent } from './toast/toast.component';

@NgModule({
    declarations: [
        AlertComponent,
        PlaceholderDirective,
        ModalComponent,
        ToastComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        NgbModule
    ],
    providers: [
        ModalComponent,
        ToastComponent,
        CommonModule
    ],
    exports: [
        AlertComponent,
        PlaceholderDirective,
        ModalComponent,
        ToastComponent,
        CommonModule
    ]
})
export class SharedModule { }