import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/shared/card/card';
import { MenuCategoryService } from './menu-category.service';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css']
})
export class MenuCategoryComponent implements OnInit {
  categories: Card[] = [];

  constructor(private menuCategoryService: MenuCategoryService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.menuCategoryService.categoryChanged
      .subscribe(
        (categories: Card[]) => {
          this.categories = categories;
        }
      )
    this.activatedRoute.data.subscribe(
      ({ categories }) => {
        this.categories = categories;
      });
  }

}
