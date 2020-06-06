import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit {
  suppliersInfo: any;
  displayedColumns: string[] = ['Nome', 'NIF', 'Morada'];
  constructor(public rest: RestServiceService) {}

  ngOnInit(): void {
    this.rest.getSuppliersInfo().subscribe((data: any) => {
      this.suppliersInfo = data;
      console.log(this.suppliersInfo);
    });
  }
}
