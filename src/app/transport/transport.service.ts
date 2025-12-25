
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TransportService {
  RIDE_TAB = 'offer-ride';
  PICKUP_TAB = 'book-ride';
  DROP_TAB = 'log-drop';
  BIKE = 'Bike';
  CAR = 'Car';
  ALL = 'All';

  rideDetailList: any[] = [];

  bookingDetailList: any[] = [];

  dropDetailList: any[] = [];

  rideDetailProperties: string[] = [
    'employeeId',
    'vehicleType',
    'vehicleNo',
    'vacantSeats',
    'time',
    'pickUpPoint',
    'destination'
  ];

  tabsMap = new Map<string, string>([
    [this.RIDE_TAB, 'Ride'],
    [this.PICKUP_TAB, 'Pick-up'],
    [this.DROP_TAB, 'Drop']
  ]);

  // Initialize a new rider detail object
  initializeRiderDetail() {
    let riderDetail = {
      employeeId: '',
      vehicleType: 'Bike',
      vehicleNo: '',
      vacantSeats: 1,
      time: '',
      pickUpPoint: '',
      destination: ''
    };
    return riderDetail;
  }

  // Initialize a new booking detail object
  initializeBookingDetail() {
    let bookingDetail = {
      riderId: '',
      employeeId: ''
    };
    return bookingDetail;
  }

  // Set and persist ride details
  setRideDetails(rideList: any) {
    this.rideDetailList = rideList;
    localStorage.setItem('rideDetailList', JSON.stringify(this.rideDetailList));
  }

  // Retrieve ride details
  getRideDetails() {
    const storedRides = localStorage.getItem('rideDetailList');
    if (storedRides) {
      this.rideDetailList = JSON.parse(storedRides);
    }
    return this.rideDetailList;
  }

  // Set and persist booking details
  setBookingDetails(bookingList: any) {
    this.bookingDetailList = bookingList;
    localStorage.setItem('bookingList', JSON.stringify(this.bookingDetailList));
  }

  // Retrieve booking details
  getBookingDetails() {
    const storedBookings = localStorage.getItem('bookingList');
    if (storedBookings) {
      this.bookingDetailList = JSON.parse(storedBookings);
    }
    return this.bookingDetailList;
  }

  // Set and persist drop details
  setDropDetails(dropList: any) {
    this.dropDetailList = dropList;
    localStorage.setItem('dropDetailList', JSON.stringify(dropList));
  }

  // Retrieve drop details
  getDropDetails() {
    const storedDrops = localStorage.getItem('dropDetailList');
    if (storedDrops) {
      this.dropDetailList = JSON.parse(storedDrops);
    }
    return this.dropDetailList;
  }
}
