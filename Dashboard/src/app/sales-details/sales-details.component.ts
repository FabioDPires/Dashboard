import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css'],
})
export class SalesDetailsComponent implements OnInit {
  saleDetail: any[];
  constructor(
    public rest: RestServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let idTemp = this.route.snapshot.params['id'];
    this.rest.getSaleDetails(idTemp).subscribe((data: any) => {
      this.saleDetail = data.vendas;
      console.log('VENDA:', this.saleDetail);
    });
  }
}
