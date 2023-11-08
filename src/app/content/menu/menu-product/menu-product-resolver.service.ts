import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { switchMap } from "rxjs";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { MenuCategoryService } from "../menu-category/menu-category.service";
import { MenuProductService } from "./menu-product.service";
import { Product } from "./product";

export const MenuProductResolver: ResolveFn<Product[]> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    const categories = inject(MenuCategoryService).getCategories();
    if (categories.length === 0) {
        return inject(DataStorageService).fetchProductsByCategory(route.params['category'])
            .pipe(switchMap(e => { return e }))
    }
    const id = inject(MenuCategoryService).getCategoryId(route.params['category']);
    if (id === undefined) {
        return inject(MenuProductService).getProductsByCategory(0);
    } else {
        const products = inject(MenuProductService).getProductsByCategory(id);
        if (products.length === 0) {
            return inject(DataStorageService).fetchProductsByCategoryId(id);
        } else {
            return products;
        }
    }
}