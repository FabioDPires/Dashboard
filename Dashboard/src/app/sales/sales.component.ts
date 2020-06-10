import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';
import * as CanvasJS from '../canvasjs.min';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  salesInfo: any;
  displayedColumns: string[] = ['Mês', 'Valor Líquido'];
  constructor(public rest: RestServiceService) {}

  ngOnInit(): void {
    this.rest.getSalesInfo().subscribe((data: any) => {
      this.salesInfo = data;
      console.log(this.salesInfo);
      let chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Vendas Mensais(€)',
        },
        data: [
          {
            type: 'column',
            dataPoints: [
              { y: this.salesInfo.monthSales[0].vendas, label: 'Janeiro' },
              { y: this.salesInfo.monthSales[1].vendas, label: 'Fevereiro' },
              { y: this.salesInfo.monthSales[2].vendas, label: 'Março' },
              { y: this.salesInfo.monthSales[3].vendas, label: 'Abril' },
              { y: this.salesInfo.monthSales[4].vendas, label: 'Maio' },
              { y: this.salesInfo.monthSales[5].vendas, label: 'Junho' },
              { y: this.salesInfo.monthSales[6].vendas, label: 'Julho' },
              { y: this.salesInfo.monthSales[7].vendas, label: 'Agosto' },
              { y: this.salesInfo.monthSales[8].vendas, label: 'Setembro' },
              { y: this.salesInfo.monthSales[9].vendas, label: 'Outubro' },
              { y: this.salesInfo.monthSales[10].vendas, label: 'Novembro' },
              { y: this.salesInfo.monthSales[11].vendas, label: 'Dezembro' },
            ],
          },
        ],
      });

      chart.render();
    });
  }
}
