import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Ingredient } from "./Ingredient";
import { MenuIngredientService } from "./menu-ingredient.service";

export const MenuIngredientResolver: ResolveFn<Ingredient[]> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    const ingredients = inject(MenuIngredientService).getIngredients();
    if (ingredients.length === 0) {
        return inject(DataStorageService).fetchIngredients();
    } else {
        return ingredients;
    }
}