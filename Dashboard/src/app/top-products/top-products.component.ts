import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.css'],
})
export class TopProductsComponent implements OnInit {
  productsTop: any;
  displayedColumns: string[] = ['Código', 'Quantidade Vendida(unidades)'];
  constructor(public rest: RestServiceService) {}

  ngOnInit(): void {
    this.rest.getProductsInfo().subscribe((data: any) => {
      this.productsTop = data;

      this.productsTop.productSales = this.productsTop.productSales.slice(0, 5);
    });
  }
}
