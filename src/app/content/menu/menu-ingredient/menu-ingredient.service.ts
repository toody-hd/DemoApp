import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Ingredient } from "./Ingredient";

@Injectable()
export class MenuIngredientService implements OnInit {
    ingredientSelected = new EventEmitter<Ingredient>();
    ingredientChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [];

    ngOnInit() {

    }

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredientsByProduct(product: string) {
        return this.ingredients.slice().filter(ingredient => ingredient.name === product);
    }

    setIngredients(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    geIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.emit(this.ingredients.slice());
    }
}