import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {
  info: any;
  constructor(public rest: RestServiceService) {}

  ngOnInit(): void {
    this.rest.getCompanyInfo().subscribe((data: any) => {
      this.info = data;
      console.log(this.info);
    });
  }
}
