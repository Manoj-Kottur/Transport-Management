import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookRideComponent } from './book-ride.component';
import { TransportService } from '../transport.service';

describe('BookRideComponent', () => {
  let component: BookRideComponent;
  let fixture: ComponentFixture<BookRideComponent>;
  let mockTransportService: any;

  beforeEach(async () => {
    mockTransportService = {
      getRideDetails: jest.fn().mockReturnValue([]),
      getBookingDetails: jest.fn().mockReturnValue([]),
      initializeBookingDetail: jest.fn().mockReturnValue({ riderId: '', employeeId: '' }),
      setBookingDetails: jest.fn(),
      setRideDetails: jest.fn(),
      ALL: 'All'
    };

    await TestBed.configureTestingModule({
      declarations: [ BookRideComponent ],
      providers: [
        { provide: TransportService, useValue: mockTransportService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should initialize lists on init', () => {
      expect(mockTransportService.getRideDetails).toHaveBeenCalled();
      expect(mockTransportService.getBookingDetails).toHaveBeenCalled();
  });

  it('should open booking dialog with filtered riders', () => {
      const now = new Date();
      // Riders within 1 hour
      mockTransportService.getRideDetails.mockReturnValue([
          { time: now.getHours() + ':' + now.getMinutes(), employeeId: 'R1' }
      ]);
      
      component.showAddRideDialog();
      expect(component.showBookingDialog).toBe(true);
      expect(mockTransportService.initializeBookingDetail).toHaveBeenCalled();
  });

  it('should close dialog', () => {
      component.showBookingDialog = true;
      component.closeDialog();
      expect(component.showBookingDialog).toBe(false);
  });

  it('should filter riders by vehicle type', () => {
      component.timeMatchingRiders = [
          { vehicleType: 'Car', employeeId: 'R1' },
          { vehicleType: 'Bike', employeeId: 'R2' }
      ];
      component.filterRiderId('Car');
      expect(component.filteredRiders.length).toBe(1);
      expect(component.filteredRiders[0].vehicleType).toBe('Car');
  });

   it('should reset filter when ALL is selected', () => {
      component.timeMatchingRiders = [
          { vehicleType: 'Car', employeeId: 'R1' },
          { vehicleType: 'Bike', employeeId: 'R2' }
      ];
      component.filterRiderId('All');
      expect(component.filteredRiders.length).toBe(2);
  });

  // Booking Logic Tests
  it('should validate empty fields', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.bookingDetails = { riderId: '', employeeId: '' };
      component.bookRide();
      expect(window.alert).toHaveBeenCalledWith('Please fill all fields');
  });

  it('should validate invalid rider id', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.rides = [{ employeeId: 'R1' }];
      component.bookingDetails = { riderId: 'INVALID', employeeId: 'E1' };
      component.bookRide();
      expect(window.alert).toHaveBeenCalledWith('Rider ID not found');
  });

   it('should validate employee id same as current user', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.rides = [{ employeeId: 'R1' }];
      component.bookingDetails = { riderId: 'R1', employeeId: 'UNKNOWN' };
      component.bookRide();
      expect(window.alert).toHaveBeenCalledWith('Employee ID not found'); 
  });

  it('should validate self booking', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.rides = [{ employeeId: 'R1' }];
      component.bookingDetails = { riderId: 'R1', employeeId: 'R1' };
      component.bookRide();
      expect(window.alert).toHaveBeenCalledWith('You cannot book your own ride');
  });

  it('should validate duplicate booking', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.rides = [{ employeeId: 'R1', vacantSeats: 1 }, { employeeId: 'E1' }];
      component.bookingList = [{ riderId: 'R1', employeeId: 'E1' }];
      component.bookingDetails = { riderId: 'R1', employeeId: 'E1' };
      
      component.bookRide();
      expect(window.alert).toHaveBeenCalledWith('You cannot book the same ride twice');
  });
  
  it('should validate no seats', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.rides = [{ employeeId: 'R1', vacantSeats: 0 }, { employeeId: 'E1' }];
      component.bookingDetails = { riderId: 'R1', employeeId: 'E1' };
      
      component.bookRide();
      expect(window.alert).toHaveBeenCalledWith('No seats available');
  });

  it('should book ride successfully', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      const rider = { employeeId: 'R1', vacantSeats: 1 };
      const booker = { employeeId: 'E1' };
      component.rides = [ rider, booker ];
      component.bookingList = [];
      component.bookingDetails = { riderId: 'R1', employeeId: 'E1' };
      
      component.bookRide();
      
      expect(window.alert).toHaveBeenCalledWith('Ride booked successfully!');
      expect(mockTransportService.setBookingDetails).toHaveBeenCalled();
      expect(mockTransportService.setRideDetails).toHaveBeenCalled();
      expect(rider.vacantSeats).toBe(0);
  });

  it('should handle pagination', () => {
      component.currentPage = 1;
      component.totalItems = 20;
      component.pageSize = 10;
      component.nextPage();
      expect(component.currentPage).toBe(2);
      
      component.prevPage();
      expect(component.currentPage).toBe(1);
  });
});
