import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "src/app/shared/shared.module";
import { MenuCategoryDetailsComponent } from "./menu-category/menu-category-details/menu-category-details.component";
import { MenuCategoryComponent } from "./menu-category/menu-category.component";
import { MenuCategoryService } from "./menu-category/menu-category.service";
import { MenuIngredientService } from "./menu-ingredient/menu-ingredient.service";
import { MenuProductComponent } from "./menu-product/menu-product.component";
import { MenuProductService } from "./menu-product/menu-product.service";
import { MenuRoutingModule } from "./menu-routing.module";
import { MenuComponent } from "./menu.component";

@NgModule({
    declarations: [
        MenuComponent,
        MenuCategoryComponent,
        MenuProductComponent,
        MenuCategoryDetailsComponent
    ],
    imports: [MenuRoutingModule, NgSelectModule, FormsModule, ReactiveFormsModule, SharedModule],
    providers: [MenuCategoryService, MenuProductService, MenuIngredientService]
})
export class MenuModule {

}