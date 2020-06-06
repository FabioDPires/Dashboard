import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';
import * as CanvasJS from '../canvasjs.min';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {
  purchasesInfo: any;
  displayedColumns: string[] = ['Mês', 'Valor'];
  constructor(public rest: RestServiceService) {}

  ngOnInit(): void {
    this.rest.getPurchasesInfo().subscribe((data: any) => {
      this.purchasesInfo = data;
      console.log(this.purchasesInfo);
      let chart2 = new CanvasJS.Chart('chartContainer2', {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Compras Mensais',
        },
        data: [
          {
            type: 'column',
            dataPoints: [
              {
                y: this.purchasesInfo.purchasesPerMonth[0].compras,
                label: 'Janeiro',
              },
              {
                y: this.purchasesInfo.purchasesPerMonth[1].compras,
                label: 'Fevereiro',
              },
              {
                y: this.purchasesInfo.purchasesPerMonth[2].compras,
                label: 'Março',
              },
              {
                y: this.purchasesInfo.purchasesPerMonth[3].compras,
                label: 'Abril',
              },
              {
                y: this.purchasesInfo.purchasesPerMonth[4].compras,
                label: 'Maio',
              },
              {
                y: this.purchasesInfo.purchasesPerMonth[5].compras,
                label: 'Junho',
              },
              {
                y: this.purchasesInfo.purchasesPerMonth[6].compras,
                label: 'Julho',
              },
              {
                y: this.purchasesInfo.purchasesPerMonth[7].compras,
                label: 'Agosto',
              },
              {
                y: this.purchasesInfo.purchasesPerMonth[8].compras,
                label: 'Setembro',
              },
              {
                y: this.purchasesInfo.purchasesPerMonth[9].compras,
                label: 'Outubro',
              },
              {
                y: this.purchasesInfo.purchasesPerMonth[10].compras,
                label: 'Novembro',
              },
              {
                y: this.purchasesInfo.purchasesPerMonth[11].compras,
                label: 'Dezembro',
              },
            ],
          },
        ],
      });

      chart2.render();
    });
  }
}
