import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Card } from 'src/app/shared/card/card';
import { MenuCategoryService } from './menu-category.service';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css']
})
export class MenuCategoryComponent implements OnInit {
  //categories: Card[] = [];
  categories$: Observable<Card[]> = new Observable;

  constructor(private menuCategoryService: MenuCategoryService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.categories$ = this.menuCategoryService.categoryChanged;
    this.categories$ = this.activatedRoute.data.pipe(map(({ categories }) => categories));
  }

}
