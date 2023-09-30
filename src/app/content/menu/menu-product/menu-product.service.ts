import { EventEmitter, Injectable } from "@angular/core";
import { Product } from "./product";

@Injectable()
export class MenuProductService {
    productSelected = new EventEmitter<Product>();
    productChanged = new EventEmitter<Product[]>();
    private products: Product[] = [];

    getProducts() {
        return this.products.slice();
    }

    setProducts(products: Product[]) {
        this.products = products;
        this.productChanged.emit(this.products.slice());
    }

    getProduct(index: number) {
        return this.products[index];
    }

    addProduct(product: Product) {
        this.products.push(product);
        this.productChanged.emit(this.products.slice());
    }

    updateProduct(index: number, newProduct: Product) {
        this.products[index] = newProduct;
        this.productChanged.emit(this.products.slice());
    }

    deleteProduct(index: number) {
        this.products.splice(index, 1);
        this.productChanged.emit(this.products.slice());
    }
}