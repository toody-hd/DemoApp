import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable, map } from "rxjs";
import { symmetricDiff } from "src/app/helper/diff";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { MenuProductService } from "../../menu-product/menu-product.service";
import { Product } from "../../menu-product/product";
import { ProductDetail } from "./productDetail";

@Component({
    selector: 'app-category-details',
    templateUrl: 'menu-category-details.component.html',
    styleUrls: ['menu-category-details.component.css']
})

export class MenuCategoryDetailsComponent implements OnInit, AfterViewInit {

    data$: Observable<any> = new Observable;
    productId: string = '';
    modified: boolean = false;
    changes: Partial<Product> = {};
    initialState!: ProductDetail

    form!: FormGroup;

    constructor(
        private menuProductService: MenuProductService,
        private dataStorageService: DataStorageService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit() {
        this.data$ = this.activatedRoute.data
            .pipe(
                map(
                    ({ details }) => {
                        this.productId = details.id;
                        this.form = this.formBuilder.group({
                            'name': [details.name, [Validators.required]],
                            'selectedIngredients': [details.ingredients, [Validators.required]],
                            'selectedCategory': [String(details.category.id), [Validators.required]],
                            'categories': [details.categories, [Validators.required]],
                            'ingredients': [details.ingredientsList, [Validators.required]],
                        });
                        return details;
                    }
                )
            );
    }

    ngAfterViewInit() {
        this.initialState = this.form.value;
        this.form.valueChanges.subscribe((data: ProductDetail) => {
            let changes: Partial<ProductDetail> = {};
            Object.entries(data)
                .filter(([key, value]: [string, string | [{ id: number, name: string }]]) => {
                    if (typeof value === 'string') {
                        return value !== this.initialState[key as keyof typeof this.initialState];
                    } else {
                        const initValues = (this.initialState[key as keyof typeof this.initialState] as [{ id: number, name: string }]).map(({ name }) => name);
                        const modValues = value.map(({ name }) => name);
                        return symmetricDiff(initValues, modValues).length > 0;
                    }
                })
                .map(([key, value]) => { changes = { ...changes, [key]: value }; });
            this.changes =
                Object.entries(changes).length > 0 ?
                    this.productDetailToProduct(changes) :
                    {};
            this.modified = Object.entries(this.changes).length > 0;
        })
    }

    onSubmitForm() {
        this.menuProductService.getProducts().length ?
            this.menuProductService.updateProduct(+this.productId, this.changes) :
            this.dataStorageService.updateProduct(this.productId, this.changes);
        this.initialState = this.form.value;
        this.modified = false;
        this.changes = {};
    }

    productDetailToProduct({ name, selectedCategory, selectedIngredients }: Partial<ProductDetail>): Partial<Product> {
        let prod: Partial<Product> = {};
        name && (prod.name = name);
        selectedCategory && (prod.category = +selectedCategory);
        selectedIngredients && (prod.ingredients = selectedIngredients.map(({ id }) => id));
        return { ...prod }
    }
}