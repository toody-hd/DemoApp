import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { forkJoin, of, switchMap } from "rxjs";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Ingredient } from "../../menu-ingredient/Ingredient";
import { MenuIngredientService } from "../../menu-ingredient/menu-ingredient.service";
import { Category } from "../category";
import { MenuCategoryService } from "../menu-category.service";

export const MenuCategoryDetailsResolver: ResolveFn<{ categories: Category[], ingredients: Ingredient[] }> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {

    return forkJoin({
        name: of(route.params['product']),
        categories: getCategories(),
        category: of(route.params['category']),
        ingredientsList: getIngredients(),
        ingredients: getProductIngredients()
        //products: getproducts(),
    });

    function getCategories() {
        const categories = inject(MenuCategoryService).getCategories();
        if (categories.length === 0) {
            return inject(DataStorageService).fetchCategories();
            //.pipe<Category[]>(map(e => { getSelectedCategory(e); return e }));
        } else {
            return of(categories);
        }
    }

    // function getproducts() {
    //     const products = inject(MenuProductService).getProductByName(route.params['product']);
    //     if (products) {
    //         return inject(DataStorageService).fetchProduct(route.params['product']);
    //     } else {
    //         return of(products);
    //     }
    // }

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