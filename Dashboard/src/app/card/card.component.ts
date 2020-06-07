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

  constructor(public rest: RestServiceService) {}

  ngOnInit(): void {
    this.rest.getSalesInfo().subscribe((data: any) => {
      this.salesValue = parseFloat(data.TotalCredit);
      this.rest.getPurchasesInfo().subscribe((data: any) => {
        this.purchasesValue = parseFloat(data.purchases);
        console.log('TOTAL VENDAS:', this.salesValue);
        console.log('TOTAL COMPRAS:', this.purchasesValue);
        this.difference = this.salesValue - this.purchasesValue;
        this.difference = parseFloat(this.difference.toFixed(2));
        console.log('Diferença:', this.difference);
      });
    });
  }
}
