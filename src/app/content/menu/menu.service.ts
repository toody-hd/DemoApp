import { Injectable, OnInit } from "@angular/core";
import { MenuCategoryService } from "./menu-category/menu-category.service";
import { MenuProductService } from "./menu-product/menu-product.service";

@Injectable()
export class MenuService implements OnInit {
    category!: MenuCategoryService;
    product!: MenuProductService;

    constructor(private menuCategoryService: MenuCategoryService, private menuProductService: MenuProductService) {}

    ngOnInit() {
        this.category = this.menuCategoryService;
        this.product = this.menuProductService;
    }
}