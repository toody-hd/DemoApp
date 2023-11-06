import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from './category';
import { MenuCategoryService } from './menu-category.service';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css']
})
export class MenuCategoryComponent implements OnInit {
  categories: Category[] = [{ name: 'Test1' }];

  constructor(private menuCategoryService: MenuCategoryService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.menuCategoryService.categoryChanged
      .subscribe(
        (categories: Category[]) => {
          this.categories = categories;
        }
      )
    this.activatedRoute.data.subscribe(
      ({ categories }) => {
        this.categories = categories;
      });
  }

  onProductList() {

  }

}
