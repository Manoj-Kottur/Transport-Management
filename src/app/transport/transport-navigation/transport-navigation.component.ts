import { Component, OnInit } from '@angular/core';
import { TransportService } from '../transport.service';

@Component({
  selector: 'app-transport-navigation',
  templateUrl: './transport-navigation.component.html',
  styleUrls: ['./transport-navigation.component.css']
})
export class TransportNavigationComponent implements OnInit {


  riderDetail: any;

  constructor(public transportService: TransportService) {}

  // Initialize component and rider details
  ngOnInit() {
    this.riderDetail = this.transportService.initializeRiderDetail();
  }

}
