import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth/auth.guard";
import { NotFoundComponent } from "src/app/not-found/not-found.component";
import { MenuCategoryDetailsResolver } from "./menu-category/menu-category-details/menu-category-details-resolver.service";
import { MenuCategoryDetailsComponent } from "./menu-category/menu-category-details/menu-category-details.component";
import { MenuCategoryResolver } from "./menu-category/menu-category-resolver.service";
import { MenuProductResolver } from "./menu-product/menu-product-resolver.service";
import { MenuProductComponent } from "./menu-product/menu-product.component";
import { MenuComponent } from "./menu.component";

const routes: Routes = [
    { path: 'menu', component: MenuComponent, title: 'Menu', resolve: { categories: MenuCategoryResolver }, canActivate: [AuthGuard] },
    { path: 'menu/:category', component: MenuProductComponent, resolve: { products: MenuProductResolver }, canActivate: [AuthGuard] },
    { path: 'menu/:category/:product', component: MenuCategoryDetailsComponent, resolve: { details: MenuCategoryDetailsResolver }, canActivate: [AuthGuard] },
    { path: '**', pathMatch: 'full', component: NotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MenuRoutingModule { }