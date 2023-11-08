import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Category } from "./category";
import { MenuCategoryService } from "./menu-category.service";

export const MenuCategoryResolver: ResolveFn<Category[]> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    const categories = inject(MenuCategoryService).getCategories();
    if (categories.length === 0) {
        return inject(DataStorageService).fetchCategories();
    } else {
        return categories;
    }
}