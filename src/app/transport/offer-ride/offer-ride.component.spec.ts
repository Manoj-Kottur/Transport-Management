import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfferRideComponent } from './offer-ride.component';
import { TransportService } from '../transport.service';

describe('OfferRideComponent', () => {
  let component: OfferRideComponent;
  let fixture: ComponentFixture<OfferRideComponent>;
  let mockTransportService: any;

  beforeEach(async () => {
    mockTransportService = {
      rideDetailProperties: [],
      getRideDetails: jest.fn().mockReturnValue([]),
      initializeRiderDetail: jest.fn().mockReturnValue({
          employeeId: '', vehicleNo: '', time: '', pickUpPoint: '', destination: '', vehicleType: 'Bike', vacantSeats: 1
      }),
      setRideDetails: jest.fn(),
      BIKE: 'Bike',
      CAR: 'Car'
    };

    await TestBed.configureTestingModule({
      declarations: [ OfferRideComponent ],
      providers: [
        { provide: TransportService, useValue: mockTransportService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize on init', () => {
      expect(mockTransportService.getRideDetails).toHaveBeenCalled();
  });

  it('should open dialog and set timer', () => {
      jest.useFakeTimers();
      component.showAddRideDialog();
      expect(component.showRideDialog).toBe(true);
      expect(mockTransportService.initializeRiderDetail).toHaveBeenCalled();
      
      jest.advanceTimersByTime(101);
      expect(component.minTime).toBeDefined();
  });

  it('should close dialog', () => {
      component.showRideDialog = true;
      component.closeDialog();
      expect(component.showRideDialog).toBe(false);
  });

  // Validation Tests
  it('should validate empty fields', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.rideDetail = { employeeId: '' }; // Missing others
      component.addNewRide();
      expect(window.alert).toHaveBeenCalledWith('All fields are mandatory');
  });

  it('should validate unique employee id', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.rideList = [{ employeeId: 'E1' }];
      component.rideDetail = { 
          employeeId: 'E1', vehicleNo: 'V1', time: '12:00', pickUpPoint: 'A', destination: 'B',
          vehicleType: 'Bike', vacantSeats: 1
      };
      component.addNewRide();
      expect(window.alert).toHaveBeenCalledWith('Employee ID must be unique for adding a ride.');
  });
  
  it('should validate time', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.rideDetail = { 
          employeeId: 'E2', vehicleNo: 'V1', time: '00:00', pickUpPoint: 'A', destination: 'B',
          vehicleType: 'Bike', vacantSeats: 1
      };
      
      jest.spyOn(component, 'validateTime').mockReturnValue(true);
      
      component.addNewRide();
      expect(window.alert).toHaveBeenCalledWith('Please select a future time');
  });

  it('should validate seats > 0', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.rideDetail = { 
          employeeId: 'E2', vehicleNo: 'V1', time: '23:59', pickUpPoint: 'A', destination: 'B',
          vehicleType: 'Bike', vacantSeats: 0
      };
      jest.spyOn(component, 'validateTime').mockReturnValue(false);

      component.addNewRide();
      expect(window.alert).toHaveBeenCalledWith('Vacant seats must be at least 1');
  });

  it('should validate Bike seats limit', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.rideDetail = { 
          employeeId: 'E2', vehicleNo: 'V1', time: '23:59', pickUpPoint: 'A', destination: 'B',
          vehicleType: 'Bike', vacantSeats: 2
      };
      jest.spyOn(component, 'validateTime').mockReturnValue(false);

      component.addNewRide();
      expect(window.alert).toHaveBeenCalledWith('Vacant seats cannot exceed 1 for Bike');
  });

   it('should validate Car seats limit', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.rideDetail = { 
          employeeId: 'E2', vehicleNo: 'V1', time: '23:59', pickUpPoint: 'A', destination: 'B',
          vehicleType: 'Car', vacantSeats: 5
      };
      jest.spyOn(component, 'validateTime').mockReturnValue(false);

      component.addNewRide();
      expect(window.alert).toHaveBeenCalledWith('Vacant seats cannot exceed 4 for Car');
  });

  it('should add ride successfully', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.rideDetail = { 
          employeeId: 'E2', vehicleNo: 'V1', time: '23:59', pickUpPoint: 'A', destination: 'B',
          vehicleType: 'Car', vacantSeats: 3
      };
      component.rideList = [];
      jest.spyOn(component, 'validateTime').mockReturnValue(false);

      component.addNewRide();
      expect(window.alert).toHaveBeenCalledWith('Ride added successfully!');
      expect(mockTransportService.setRideDetails).toHaveBeenCalled();
      expect(component.rideList.length).toBe(1);
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
