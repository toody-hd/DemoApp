import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { MenuCategoryComponent } from "./menu-category/menu-category.component";
import { MenuCategoryService } from "./menu-category/menu-category.service";
import { MenuProductComponent } from "./menu-product/menu-product.component";
import { MenuProductService } from "./menu-product/menu-product.service";
import { MenuRoutingModule } from "./menu-routing.module";
import { MenuComponent } from "./menu.component";

@NgModule({
    declarations: [
        MenuComponent,
        MenuCategoryComponent,
        MenuProductComponent
    ],
    imports: [RouterModule, MenuRoutingModule, SharedModule],
    providers:[MenuCategoryService, MenuProductService]
})
export class MenuModule {

}