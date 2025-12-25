import { TestBed } from '@angular/core/testing';
import { TransportService } from './transport.service';

describe('TransportService', () => {
  let service: TransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportService);
    
    // Mock localStorage
    const store: { [key: string]: string } = {};
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    getItemSpy.mockImplementation((key: string) => store[key] || null);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    setItemSpy.mockImplementation((key: string, value: string) => {
      store[key] = value + '';
    });
    
    // Using simple mock object for clear or could spy on it too if used
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize rider detail correctly', () => {
    const detail = service.initializeRiderDetail();
    expect(detail.vehicleType).toBe('Bike');
    expect(detail.vacantSeats).toBe(1);
    expect(detail.employeeId).toBe('');
  });

  it('should initialize booking detail correctly', () => {
    const detail = service.initializeBookingDetail();
    expect(detail.riderId).toBe('');
    expect(detail.employeeId).toBe('');
  });

  it('should set and get ride details', () => {
    const mockRides = [{ employeeId: '123', vehicleType: 'Bike' }];
    service.setRideDetails(mockRides);
    
    expect(service.rideDetailList).toEqual(mockRides);
    expect(localStorage.setItem).toHaveBeenCalledWith('rideDetailList', JSON.stringify(mockRides));
    
    const retrieved = service.getRideDetails();
    expect(retrieved).toEqual(mockRides);
  });

  it('should set and get booking details', () => {
    const mockBookings = [{ riderId: '123', employeeId: '456' }];
    service.setBookingDetails(mockBookings);
    
    expect(service.bookingDetailList).toEqual(mockBookings);
    expect(localStorage.setItem).toHaveBeenCalledWith('bookingList', JSON.stringify(mockBookings));
    
    const retrieved = service.getBookingDetails();
    expect(retrieved).toEqual(mockBookings);
  });

  it('should set and get drop details', () => {
    const mockDrops = [{ employeeId: '789', pickUpPoint: 'A' }];
    service.setDropDetails(mockDrops);
    
    expect(service.dropDetailList).toEqual(mockDrops);
    expect(localStorage.setItem).toHaveBeenCalledWith('dropDetailList', JSON.stringify(mockDrops));
    
    const retrieved = service.getDropDetails();
    expect(retrieved).toEqual(mockDrops);
  });
  
  it('should return existing list if localStorage is empty for getRideDetails', () => {
      service.rideDetailList = [{ id: 1 }];
      (localStorage.getItem as jest.Mock).mockReturnValue(null);
      expect(service.getRideDetails()).toEqual([{ id: 1 }]);
  });

  it('should return existing list if localStorage is empty for getBookingDetails', () => {
      service.bookingDetailList = [{ id: 1 }];
      (localStorage.getItem as jest.Mock).mockReturnValue(null);
      expect(service.getBookingDetails()).toEqual([{ id: 1 }]);
  });

   it('should return existing list if localStorage is empty for getDropDetails', () => {
      service.dropDetailList = [{ id: 1 }];
      (localStorage.getItem as jest.Mock).mockReturnValue(null);
      expect(service.getDropDetails()).toEqual([{ id: 1 }]);
  });
});
