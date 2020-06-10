import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  salesValue: number;
  purchasesValue: number;
  difference: number;
  taxSales: number;
  faturas: number;
  vfa: number;
  ecf: number;

  constructor(public rest: RestServiceService) {}

  ngOnInit(): void {
    this.rest.getSalesInfo().subscribe((data: any) => {
      this.salesValue = parseFloat(data.TotalCredit);
      this.taxSales = data.taxSales;
      this.faturas = data.numberOfSales;
      this.taxSales = parseFloat(this.taxSales.toFixed(2));
      this.rest.getPurchasesInfo().subscribe((data: any) => {
        this.purchasesValue = parseFloat(data.purchases);
        console.log('TOTAL VENDAS:', this.salesValue);
        this.ecf = 8;
        this.vfa = data.numberOfPurchases - this.ecf;
        console.log('TOTAL COMPRAS:', this.purchasesValue);
        this.difference = this.salesValue - this.purchasesValue;
        this.difference = parseFloat(this.difference.toFixed(2));
        console.log('Diferença:', this.difference);
      });
    });
  }
}
