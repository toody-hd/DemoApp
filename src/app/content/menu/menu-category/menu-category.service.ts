import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Category } from "./category";

@Injectable()
export class MenuCategoryService implements OnInit {
    categorySelected = new EventEmitter<Category>();
    categoryChanged = new EventEmitter<Category[]>();
    private categories: Category[] = [];

    ngOnInit() {
        // this.categorySelected.subscribe(e => {
        //     this.getCategoryId(e.name);
        // })
    }

    getCategories() {
        return this.categories.slice();
    }

    getCategoryId(category: string) {
        return this.categories.find(e => e.name.toLocaleLowerCase() === category)?.id;
    }

    setCategories(categories: Category[]) {
        this.categories = categories;
        this.categoryChanged.emit(this.categories.slice());
    }

    getCategory(index: number) {
        return this.categories[index];
    }

    addCategory(category: Category) {
        this.categories.push(category);
        this.categoryChanged.emit(this.categories.slice());
    }

    updateCategory(index: number, newCategory: Category) {
        this.categories[index] = newCategory;
        this.categoryChanged.emit(this.categories.slice());
    }

    deleteCategory(index: number) {
        this.categories.splice(index, 1);
        this.categoryChanged.emit(this.categories.slice());
    }
}