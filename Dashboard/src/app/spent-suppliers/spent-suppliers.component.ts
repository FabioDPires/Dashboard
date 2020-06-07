import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-spent-suppliers',
  templateUrl: './spent-suppliers.component.html',
  styleUrls: ['./spent-suppliers.component.css'],
})
export class SpentSuppliersComponent implements OnInit {
  pieChartInfo: any;
  constructor(public rest: RestServiceService) {}

  ngOnInit(): void {
    this.rest.getPurchasesInfo().subscribe((data: any) => {
      this.pieChartInfo = data;

      let pieChartData = this.pieChartInfo.suppliersPurchases;
      console.log('Informação Fornecedores:', this.pieChartInfo);
      let chart4 = new CanvasJS.Chart('piechart2', {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Montante Gasto Com Cada Fornecedor',
        },
        data: [
          {
            type: 'pie',
            showInLegend: true,
            toolTipContent: '<b>{name}</b>: €{y} (#percent%)',
            indexLabel: '{name} - #percent%',
            dataPoints: [
              {
                y: parseFloat(pieChartData[0].valor),
                name: pieChartData[0].nome,
              },
              {
                y: parseFloat(pieChartData[1].valor),
                name: pieChartData[1].nome,
              },
              {
                y: parseFloat(pieChartData[2].valor),
                name: pieChartData[2].nome,
              },
              {
                y: parseFloat(pieChartData[3].valor),
                name: pieChartData[3].nome,
              },
              {
                y: parseFloat(pieChartData[4].valor),
                name: pieChartData[4].nome,
              },
              {
                y: parseFloat(pieChartData[5].valor),
                name: pieChartData[5].nome,
              },
              {
                y: parseFloat(pieChartData[6].valor),
                name: pieChartData[6].nome,
              },
            ],
          },
        ],
      });

      chart4.render();
    });
  }
}
