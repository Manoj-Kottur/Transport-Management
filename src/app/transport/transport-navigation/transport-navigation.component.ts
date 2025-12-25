import { Component, OnInit } from '@angular/core';
import { TransportService } from '../transport.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transport-navigation',
  templateUrl: './transport-navigation.component.html',
  styleUrls: ['./transport-navigation.component.css']
})
export class TransportNavigationComponent implements OnInit {

  selectedTab: string = '';

  riderDetail: any;

  constructor(public transportService: TransportService, private router: Router) {}

  // Initialize component and rider details
  ngOnInit() {
    this.riderDetail = this.transportService.initializeRiderDetail();
    this.onChangeNavBarItem(this.transportService.RIDE_TAB);
  }

  // Handle tab selection change
  onChangeNavBarItem(tab: string) {
    this.selectedTab = tab;
    this.router.navigate(['/' + tab.toLowerCase()]);
  }

}
