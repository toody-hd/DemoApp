import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Category } from "../content/menu/menu-category/category";
import { Product } from "../content/menu/menu-product/product";
import { MenuService } from "../content/menu/menu.service";

const API_URL = 'http://localhost:3000';

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient, private menuService: MenuService) {}

    fetchCategories() {
        return this.http.get<Category[]>(API_URL + '/categories')
        .pipe(
            map(categories => {
                return categories.map(category => {
                    return { ...category }
                })
            })
        )
    }

    fetchProduct() {
        return this.http.get<Product[]>(API_URL + '/products')
        .pipe(
            map(products => {
                return products.map(product => {
                    return { ...product }
                })
            })
        )
    }

    storeCategory() {
        const categories = this.menuService.category.getCategories();
        this.http.post(API_URL + '/categories', categories)
        .subscribe(response => {
            // TO DO
        })
    }

    storeProduct() {
        const products = this.menuService.product.getProducts();
        this.http.post(API_URL + '/products', products)
        .subscribe(response => {
            // TO DO
        })
    }
}