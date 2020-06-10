import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productInfo: any;
  constructor(
    public rest: RestServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let idTemp = this.route.snapshot.params['id'];
    this.rest.getProductDetails(idTemp).subscribe((data: any) => {
      this.productInfo = data;
      console.log('INFORMAÇAO PRODUTO:', this.productInfo);
    });
  }
}
