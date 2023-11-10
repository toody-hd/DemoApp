import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Ingredient } from "../../menu-ingredient/Ingredient";
import { MenuIngredientService } from "../../menu-ingredient/menu-ingredient.service";
import { Product } from "../../menu-product/product";
import { Category } from "../category";
import { ProductDetail } from "./productDetail";

@Component({
    selector: 'app-category-details',
    templateUrl: 'menu-category-details.component.html',
    styleUrls: ['menu-category-details.component.css']
})

export class MenuCategoryDetailsComponent implements OnInit, AfterViewInit {

    id: number = -1;
    name: string = 'Prod Name';
    categories: Category[] = [];
    ingredients: Ingredient[] = [];
    selectedCategory: string = 'Side';
    selectedIngredients = [{ name: 'Tomatoes' }];
    modified = false;
    changes: Partial<Product> = {};

    form!: FormGroup;

    constructor(
        private menuCategoryService: MenuIngredientService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit() {
        this.menuCategoryService.ingredientChanged
            .subscribe(
                (ingredients: Ingredient[]) => {
                    this.ingredients = ingredients;
                }
            )
        this.activatedRoute.data.subscribe(
            ({ details }) => {
                this.id = details.id;
                this.name = details.name;
                this.selectedIngredients = details.ingredients;
                this.selectedCategory = details.category;
                this.categories = details.categories;
                this.ingredients = details.ingredientsList;

                this.form = this.formBuilder.group({
                    'name': [this.name, [Validators.required]],
                    'selectedIngredients': [this.selectedIngredients, [Validators.required]],
                    'selectedCategory': [this.selectedCategory, [Validators.required]],
                    'categories': [this.categories, [Validators.required]],
                    'ingredients': [this.ingredients, [Validators.required]],
                });
            });
    }

    ngAfterViewInit() {
        const initialState: ProductDetail = this.form.value;
        this.form.valueChanges.subscribe((data: ProductDetail) => {
            let changes: Partial<ProductDetail> = {};
            Object.entries(data)
                .filter(([key, value]: [string, string | [{ id: number, name: string }]]) => {
                    if (typeof value === 'string') {
                        return value !== initialState[key as keyof typeof initialState];
                    } else {
                        return (initialState[key as keyof typeof initialState] as [{ id: number, name: string }])
                            .filter(({ name }) =>
                                !value.map(({ name }) => name).includes(name))
                                .concat(value
                                    .filter(({ name })=> 
                                        !(initialState[key as keyof typeof initialState] as [{ id: number, name: string }])
                                            .map(({ name })=> name).includes(name)))
                                .length > 0;
                    }
                })
                .map(([key, value]) => { changes = { ...changes, [key]: value }; });
            this.changes = Object.entries(changes).length > 0 ? this.productDetailToProduct(changes) : {};
            this.modified = Object.entries(this.changes).length > 0;
        })
    }

    onSubmitForm() {
        console.log('submit', this.changes);
    }

    productDetailToProduct(productDetail: Partial<ProductDetail>): Product {
        return {
            id: this.id,
            name: productDetail.name ? productDetail.name : this.name,
            category: productDetail.selectedCategory ? this.categories.find(e => productDetail.selectedCategory === e.name)!.id : this.categories.find(e => this.selectedCategory === e.name)!.id,
            ingredients: productDetail.selectedIngredients ? this.ingredients.filter(({ name }) => productDetail.selectedIngredients!.map(x => x.name).includes(name)).map(i => i.id) : this.ingredients.filter(({ name }) => this.selectedIngredients.map(x => x.name).includes(name)).map(i => i.id)
        }
    }
}