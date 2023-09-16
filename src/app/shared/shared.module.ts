import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AlertComponent } from "./alert/alert.component";
import { ModalComponent } from "./modal/modal.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations: [
        AlertComponent,
        ModalComponent,
        PlaceholderDirective
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [
        ModalComponent
    ],
    exports: [
        AlertComponent,
        ModalComponent,
        PlaceholderDirective,
        CommonModule
    ]
})
export class SharedModule { }