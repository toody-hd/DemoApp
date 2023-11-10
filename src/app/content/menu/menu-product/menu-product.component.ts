import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/shared/card/card';
import { MenuProductService } from './menu-product.service';

@Component({
  selector: 'app-menu-product',
  templateUrl: './menu-product.component.html',
  styleUrls: ['./menu-product.component.css']
})
export class MenuProductComponent implements OnInit {
  products: Card[] = [];

  constructor(private menuProductService: MenuProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.menuProductService.productChanged
      .subscribe(
        (products: Card[]) => {
          this.products = products;
        }
      )
    this.activatedRoute.data.subscribe(
      ({ products }) => {
        this.products = products;
      });
  }
}
