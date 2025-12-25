import { Component, OnInit } from '@angular/core';
import { TransportService } from '../transport.service';

@Component({
  selector: 'app-log-drop',
  templateUrl: './log-drop.component.html',
  styleUrls: ['./log-drop.component.css']
})
export class LogDropComponent implements OnInit {

  currentPage = 1;

  pageSize = 10;

  totalItems = 0;

  tempDropList: any[] = [];

  dropList: any[] = [];

  dropDetails: any = {};

  showDropDialog: boolean = false;

  filteredRiders: any[] = [];

  filteredEmployees: any[] = [];

  constructor(public transportService: TransportService) {}

  // Initialize component and load drop details
  ngOnInit() {
    this.dropList = this.transportService.getDropDetails();
    this.updateTempRideList();
    this.dropDetails = this.transportService.initializeBookingDetail();
  }

  // Open the add drop dialog
  showAddRideDialog() {
    this.dropDetails = this.transportService.initializeBookingDetail();
    this.filteredRiders = this.transportService.getBookingDetails();
    this.showDropDialog = true;
  }

  // Close the dialog and reset details
  closeDialog() {
    this.showDropDialog = false;
    this.dropDetails = this.transportService.initializeBookingDetail();
  }

  // Navigate to the next page
  nextPage() {
    if (this.currentPage * this.pageSize < this.totalItems) {
      this.currentPage++;
      this.updateTempRideList();
    }
  }

  // Navigate to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateTempRideList();
    }
  }

  // Update the list for pagination
  updateTempRideList() {
    this.tempDropList = this.dropList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    this.totalItems = this.dropList.length;
  }

  // Filter employees based on selected rider
  onRiderSelect(event: any) {
    const selectedRiderId = event.target.value;
    this.filteredEmployees = this.filteredRiders.filter(rider => rider.riderId === selectedRiderId);
  }

  // Add a new drop request
  addDrop() {
    if (!this.dropDetails.riderId || !this.dropDetails.employeeId) {
      alert("All fields are mandatory");
      return;
    }

    this.dropList.push(structuredClone(this.dropDetails));
    this.transportService.setDropDetails(this.dropList);
    alert("Drop added successfully!");
    this.updateTempRideList();
    this.closeDialog();
  }

}
