import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clientsInfo: any;
  displayedColumns: string[] = ['Nome', 'NIF', 'Morada'];
  constructor(public rest: RestServiceService) {}

  ngOnInit(): void {
    this.rest.getClientsInfo().subscribe((data: any) => {
      this.clientsInfo = data;
      console.log(this.clientsInfo);
    });
  }
}
