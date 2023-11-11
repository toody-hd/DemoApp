import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Category } from "../content/menu/menu-category/category";
import { MenuCategoryService } from "../content/menu/menu-category/menu-category.service";
import { Ingredient } from "../content/menu/menu-ingredient/Ingredient";
import { MenuIngredientService } from "../content/menu/menu-ingredient/menu-ingredient.service";
import { MenuProductService } from "../content/menu/menu-product/menu-product.service";
import { Product } from "../content/menu/menu-product/product";

const API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient,
        private menuCategoryService: MenuCategoryService,
        private menuProductService: MenuProductService,
        private menuIngredientService: MenuIngredientService
    ) { }

    fetchCategories() {
        return this.http.get<Category[]>(API_URL + '/categories')
            .pipe(
                map(categories => {
                    return categories.map(category => {
                        return { ...category }
                    });
                }),
                tap((categories: Category[]) => {
                    this.menuCategoryService.setCategories(categories);
                })
            )
    }

    fetchProductsByCategoryId(category: number) {
        return this.http.get<Product[]>(API_URL + '/products')
            .pipe(
                map(products => {
                    return products.filter(product => product.category === category)
                })
            )
    }

    fetchProductsByCategory(category: string) {
        return this.http.get<Category[]>(API_URL + '/categories')
            .pipe(
                map(categories => {
                    return this.http.get<Product[]>(API_URL + '/products').pipe(
                        map(products => {
                            return products.filter(prod => prod.category === categories.find(cat => cat.name === category)!.id)
                        })
                    )
                })
            )
    }

    fetchProducts() {
        return this.http.get<Product[]>(API_URL + '/products')
            .pipe(
                map(products => {
                    return products.map(product => {
                        return { ...product }
                    })
                }),
                tap((products: Product[]) => {
                    this.menuProductService.setProducts(products);
                })
            )
    }

    fetchCategory(category: string) {
        return this.http.get<Category[]>(API_URL + '/categories')
            .pipe(
                map(categories => {
                    return categories.find(cat => cat.name === category)!
                }),
                tap(category => {
                    this.menuCategoryService.categorySelected.emit(category)
                })
            )
    }

    fetchProduct(product: string) {
        return this.http.get<Product[]>(API_URL + '/products')
            .pipe(
                map(products => {
                    return products.find(prod => prod.name === product)!
                }),
                tap(product => {
                    this.menuProductService.productSelected.emit(product)
                })
            )
    }

    fetchIngredients() {
        return this.http.get<Ingredient[]>(API_URL + '/ingredients')
            .pipe(
                map(ingredients => {
                    return ingredients.map(ingredient => {
                        return { ...ingredient }
                    });
                }),
                tap((ingredients: Ingredient[]) => {
                    this.menuIngredientService.setIngredients(ingredients);
                })
            )
    }

    fetchIngredientsByProduct(product: string) {
        return this.http.get<Product[]>(API_URL + '/products')
            .pipe(
                map(products => {
                    return this.http.get<Ingredient[]>(API_URL + '/ingredients').pipe(
                        map(ingredients => {
                            return ingredients.filter(ingr => products.find(prod => prod.name === product)!.ingredients.includes(ingr.id!))
                        })
                    )
                })
            )
    }

    fetchIngredient(ingredient: string) {
        return this.http.get<Ingredient[]>(API_URL + '/ingredients')
            .pipe(
                map(ingredients => {
                    return ingredients.find(ingr => ingr.name === ingredient)!
                }),
                tap(ingredient => {
                    this.menuIngredientService.ingredientSelected.emit(ingredient)
                })
            )
    }

    storeCategory() {
        const categories = this.menuCategoryService.getCategories();
        this.http.post(API_URL + '/categories', categories)
            .subscribe(response => {
                // TO DO
            })
    }

    storeProduct() {
        const products = this.menuProductService.getProducts();
        this.http.post(API_URL + '/products', products)
            .subscribe(response => {
                // TO DO
            })
    }

    storeIngredient() {
        const ingredients = this.menuIngredientService.getIngredients();
        this.http.post(API_URL + '/ingredients', ingredients)
            .subscribe(response => {
                // TO DO
            })
    }

    updateProduct(productId: string, partialProduct: Partial<Product>) {
        this.http.patch(API_URL + `/products/${productId}`, partialProduct)
            .subscribe(response => {
                // TO DO
            })
    }
}