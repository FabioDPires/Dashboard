import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-top-products-money',
  templateUrl: './top-products-money.component.html',
  styleUrls: ['./top-products-money.component.css'],
})
export class TopProductsMoneyComponent implements OnInit {
  productsTopMoney: any;
  displayedColumns: string[] = ['Código', 'Valor das Vendas(€)'];

  constructor(public rest: RestServiceService) {}

  ngOnInit(): void {
    this.rest.getProductsInfo().subscribe((data: any) => {
      this.productsTopMoney = data;

      this.productsTopMoney.productSalesMoney = this.productsTopMoney.productsSalesMoney.slice(
        0,
        5
      );
    });
  }
}
