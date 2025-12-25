import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransportService } from '../transport.service';

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css']
})
export class OfferRideComponent implements OnInit, OnDestroy {

  rideList: any = [];

  tempRideList: any = [];

  rideDetailProperties: string[] = [];

  rideDetail: any = {};

  showRideDialog: boolean = false;

  minTime: any = new Date().toISOString().substring(11, 16);

  currentPage = 1;

  pageSize = 10;

  totalItems = 0;

  minTimeSetTimeout: any;

  constructor(public transportService: TransportService) { }

  // Initialize component and load ride properties
  ngOnInit() {
    this.rideDetailProperties = this.transportService.rideDetailProperties;
    this.rideList = this.transportService.getRideDetails();
    this.tempRideList = this.rideList.slice(0, this.pageSize);
    this.totalItems = this.rideList.length;
  }

  // Open the add ride dialog
  showAddRideDialog() {
    this.rideDetail = this.transportService.initializeRiderDetail();
    this.minTimeSetTimeout = setTimeout(() => {
      this.minTime = new Date().toISOString().substring(11, 16);
    }, 100);
    this.showRideDialog = true;
  }

  // Close the dialog and reset details
  closeDialog() {
    this.showRideDialog = false;
    this.rideDetail = this.transportService.initializeRiderDetail();
    clearTimeout(this.minTimeSetTimeout);
  }

  // Validate and add a new ride
  addNewRide() {
    let msg = '';
    if (!this.rideDetail.employeeId || !this.rideDetail.vehicleNo || !this.rideDetail.time ||
      !this.rideDetail.pickUpPoint || !this.rideDetail.destination) {
      msg = 'All fields are mandatory';
    } else if (this.rideList.some((ride: any) => ride.employeeId.toLowerCase() === this.rideDetail.employeeId.toLowerCase())) {
      msg = 'Employee ID must be unique for adding a ride.';
    } else if (this.validateTime()) {
      msg = "Please select a future time";
      this.rideDetail.time = "";
    } else if (this.rideDetail.vacantSeats <= 0) {
      msg = "Vacant seats must be at least 1";
    } else if (this.rideDetail.vehicleType == this.transportService.BIKE
      && this.rideDetail.vacantSeats > 1) {
      msg = "Vacant seats cannot exceed 1 for Bike";
    } else if (this.rideDetail.vehicleType == this.transportService.CAR
      && this.rideDetail.vacantSeats > 4) {
      msg = "Vacant seats cannot exceed 4 for Car";
    }

    if (msg !== '') {
      alert(msg);
      return;
    }

    this.rideList.push(structuredClone(this.rideDetail));
    this.transportService.setRideDetails(this.rideList);
    alert("Ride added successfully!");
    this.updateTempRideList();
    this.closeDialog();
  }

  // Check if the selected time is in the future
  validateTime() {
    const now = new Date();
    const current = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
    return this.rideDetail.time < current;
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
    this.tempRideList = this.rideList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    this.totalItems = this.rideList.length;
  }

  // Cleanup resources on destroy
  ngOnDestroy() {
    clearTimeout(this.minTimeSetTimeout);
  }

}
