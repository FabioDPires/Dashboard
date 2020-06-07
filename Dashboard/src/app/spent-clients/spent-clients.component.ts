import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-spent-clients',
  templateUrl: './spent-clients.component.html',
  styleUrls: ['./spent-clients.component.css'],
})
export class SpentClientsComponent implements OnInit {
  chartInfo: any;
  constructor(public rest: RestServiceService) {}

  ngOnInit(): void {
    this.rest.getSalesInfo().subscribe((data: any) => {
      this.chartInfo = data;

      let chartData = this.chartInfo.clientsSales;
      console.log('Informação:', chartData);
      let chart3 = new CanvasJS.Chart('piechart', {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Montante Gasto Por Cliente(com imposto)',
        },
        data: [
          {
            type: 'pie',
            showInLegend: true,
            toolTipContent: '<b>{name}</b>: €{y} (#percent%)',
            indexLabel: '{name} - #percent%',
            dataPoints: [
              { y: parseFloat(chartData[0].valor), name: chartData[0].nome },
              { y: parseFloat(chartData[1].valor), name: chartData[1].nome },
              { y: parseFloat(chartData[2].valor), name: chartData[2].nome },
              { y: parseFloat(chartData[3].valor), name: chartData[3].nome },
              { y: parseFloat(chartData[4].valor), name: chartData[4].nome },
              { y: parseFloat(chartData[5].valor), name: chartData[5].nome },
              { y: parseFloat(chartData[6].valor), name: chartData[6].nome },
            ],
          },
        ],
      });

      chart3.render();
    });
  }
}
