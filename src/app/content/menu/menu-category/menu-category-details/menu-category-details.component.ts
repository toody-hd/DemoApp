import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ingredient } from "../../menu-ingredient/Ingredient";
import { MenuIngredientService } from "../../menu-ingredient/menu-ingredient.service";
import { Category } from "../category";

@Component({
    selector: 'app-category-details',
    templateUrl: 'menu-category-details.component.html',
    styleUrls: ['menu-category-details.component.css']
})

export class MenuCategoryDetailsComponent implements OnInit {

    name: string = 'Prod Name';
    categories: Category[] = [];
    ingredients: Ingredient[] = [];
    selectedCategory = 'Side';
    selectedIngredients = [{ name: 'Tomatoes' }];

    constructor(private menuCategoryService: MenuIngredientService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.menuCategoryService.ingredientChanged
            .subscribe(
                (ingredients: Ingredient[]) => {
                    this.ingredients = ingredients;
                }
            )
        this.activatedRoute.data.subscribe(
            ({ details }) => {
                //console.log(details)
                this.name = details.name;
                this.selectedIngredients = details.ingredients;
                this.selectedCategory = details.category;
                this.categories = details.categories;
                this.ingredients = details.ingredientsList;
            });
    }
}