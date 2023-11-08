import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Product } from "./product";

@Injectable()
export class MenuProductService implements OnInit {
    productSelected = new EventEmitter<Product>();
    productChanged = new EventEmitter<Product[]>();
    private products: Product[] = [];

    ngOnInit() {
        // this.productSelected.subscribe(e => {
        //     this.getProductsByCategory(e.id)
        // })
    }

    getProducts() {
        return this.products.slice();
    }

    getProductsByCategory(category: number) {
        return this.products.filter(product => product.category === category).slice();
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