import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css'],
})
export class SupplierDetailsComponent implements OnInit {
  supplierInfo: any;
  constructor(
    public rest: RestServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let idTemp = this.route.snapshot.params['id'];
    this.rest.getSupplierDetails(idTemp).subscribe((data: any) => {
      this.supplierInfo = data;
      console.log('INFORMAÇAO PRODUTO:', this.supplierInfo);
    });
  }
}
