import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { forkJoin, map, of, switchMap } from "rxjs";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Ingredient } from "../../menu-ingredient/Ingredient";
import { MenuIngredientService } from "../../menu-ingredient/menu-ingredient.service";
import { MenuProductService } from "../../menu-product/menu-product.service";
import { Category } from "../category";
import { MenuCategoryService } from "../menu-category.service";

export const MenuCategoryDetailsResolver: ResolveFn<{ categories: Category[], ingredients: Ingredient[] }> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    return forkJoin({
        id: getproductId(),
        name: of(route.params['product']),
        categories: getCategories(),
        category: getCategory(),
        ingredientsList: getIngredients(),
        ingredients: getProductIngredients()
    });

    function getCategory() {
        return getCategories().pipe(map(e => e.find(i => i.name === route.params['category'])!));
    }

    function getCategories() {
        const categories = inject(MenuCategoryService).getCategories();
        if (categories.length === 0) {
            return inject(DataStorageService).fetchCategories();
        } else {
            return of(categories);
        }
    }

    function getproductId() {
        const product = inject(MenuProductService).getProductByName(route.params['product']);
        if (!product) {
            return inject(DataStorageService).fetchProduct(route.params['product'])
                .pipe(map(e => e.id));
        } else {
            return of(product.id);
        }
    }

    function getIngredients() {
        const ingredients = inject(MenuIngredientService).getIngredients();
        if (ingredients.length === 0) {
            return inject(DataStorageService).fetchIngredients();
        } else {
            return of(ingredients);
        }
    }

    function getProductIngredients() {
        const selectedIngredients = inject(MenuIngredientService).getIngredientsByProduct(route.params['product']);
        if (selectedIngredients === undefined || selectedIngredients.length === 0) {
            return inject(DataStorageService).fetchIngredientsByProduct(route.params['product'])
                .pipe(switchMap(e => { return e }));
        } else {
            return of(selectedIngredients);
        }
    }
}