import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth/auth.guard";
import { NotFoundComponent } from "src/app/not-found/not-found.component";
import { MenuResolver } from "./menu-category/menu-category-resolver.service";
import { MenuCategoryComponent } from "./menu-category/menu-category.component";
import { MenuProductComponent } from "./menu-product/menu-product.component";
import { MenuComponent } from "./menu.component";

const routes: Routes = [
    {
        path: 'menu', component: MenuComponent, canActivate: [AuthGuard], resolve: { categories: MenuResolver }, children: [
            { path: '', component: MenuComponent },
            { path: ':category', component: MenuCategoryComponent, resolve: { categories: MenuResolver } },
            { path: ':category/:product', component: MenuProductComponent }
        ]
    },
    { path: '**', pathMatch: 'full', component: NotFoundComponent }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MenuRoutingModule { }