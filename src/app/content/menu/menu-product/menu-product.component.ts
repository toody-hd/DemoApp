import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Card } from 'src/app/shared/card/card';
import { MenuProductService } from './menu-product.service';

@Component({
  selector: 'app-menu-product',
  templateUrl: './menu-product.component.html',
  styleUrls: ['./menu-product.component.css']
})
export class MenuProductComponent implements OnInit {
  products$: Observable<Card[]> = new Observable;

  constructor(private menuProductService: MenuProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.products$ = this.menuProductService.productChanged;
    this.products$ = this.activatedRoute.data.pipe(map(({ products }) => products));
  }
}
