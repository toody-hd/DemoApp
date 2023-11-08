import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Category } from "../content/menu/menu-category/category";
import { MenuCategoryService } from "../content/menu/menu-category/menu-category.service";
import { MenuProductService } from "../content/menu/menu-product/menu-product.service";
import { Product } from "../content/menu/menu-product/product";

const API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient, private menuCategoryService: MenuCategoryService, private menuProductService: MenuProductService) { }

    fetchCategories() {
        return this.http.get<Category[]>(API_URL + '/categories')
            .pipe(
                map(categories => {
                    return categories.map(category => {
                        return { ...category }
                    });
                }),
                tap(categories => {
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
        return this.http.get<Product[]>(API_URL + '/categories')
            .pipe(
                map(categories => {
                    return this.http.get<Product[]>(API_URL + '/products').pipe(
                        map(products => {
                            return products.filter(prod => prod.category === categories.find(cat => cat.name.toLowerCase() === category)!.id)
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
                tap(products => {
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
}