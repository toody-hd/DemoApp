import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Product } from "./product";

@Injectable()
export class MenuProductService implements OnInit {
    productSelected = new EventEmitter<Product>();
    productChanged = new EventEmitter<Product[]>();
    private products: Product[] = [];

    ngOnInit() {

    }

    getProducts() {
        return this.products.slice();
    }

    getProductsByCategory(category: number) {
        return this.products.slice().filter(product => product.category === category);
    }

    setProducts(products: Product[]) {
        this.products = products;
        this.productChanged.emit(this.products.slice());
    }

    getProductByName(name: string) {
        return this.products.slice().find(product => product.name === name)
    }

    getProduct(index: number) {
        return this.products[index];
    }

    addProduct(product: Product) {
        this.products.push(product);
        this.productChanged.emit(this.products.slice());
    }

    updateProduct(index: number, updates: Partial<Product>) {
        console.log('prods', this.products)
        console.log('this prod', this.products[index])
        this.products[index] = { ...this.products[index], ...updates };
        this.productChanged.emit(this.products.slice());
    }

    deleteProduct(index: number) {
        this.products.splice(index, 1);
        this.productChanged.emit(this.products.slice());
    }
}