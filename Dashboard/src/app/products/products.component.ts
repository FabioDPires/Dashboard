import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productsInfo: any;
  displayedColumns: string[] = ['Código', 'Nome'];

  constructor(public rest: RestServiceService) {}

  ngOnInit(): void {
    this.rest.getProductsInfo().subscribe((data: any) => {
      this.productsInfo = data;
      console.log(this.productsInfo);
    });
  }
}
