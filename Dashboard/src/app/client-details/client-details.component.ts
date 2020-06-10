import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit {
  clientInfo: any;
  constructor(
    public rest: RestServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let idTemp = this.route.snapshot.params['id'];
    this.rest.getClientDetails(idTemp).subscribe((data: any) => {
      this.clientInfo = data;
      console.log('INFORMAÇAO CLIENTE:', this.clientInfo);
    });
  }
}
