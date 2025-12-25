import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogDropComponent } from './log-drop.component';
import { TransportService } from '../transport.service';

describe('LogDropComponent', () => {
  let component: LogDropComponent;
  let fixture: ComponentFixture<LogDropComponent>;
  let mockTransportService: any;

  beforeEach(async () => {
    mockTransportService = {
      getDropDetails: jest.fn().mockReturnValue([]),
      initializeBookingDetail: jest.fn().mockReturnValue({ riderId: '', employeeId: '' }),
      getBookingDetails: jest.fn().mockReturnValue([]),
      setDropDetails: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ LogDropComponent ],
      providers: [
        { provide: TransportService, useValue: mockTransportService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize drop list on init', () => {
      expect(mockTransportService.getDropDetails).toHaveBeenCalled();
  });

  it('should open add ride dialog', () => {
      component.showAddRideDialog();
      expect(component.showDropDialog).toBe(true);
      expect(mockTransportService.initializeBookingDetail).toHaveBeenCalled();
      expect(mockTransportService.getBookingDetails).toHaveBeenCalled();
  });

  it('should close dialog', () => {
      component.showDropDialog = true;
      component.closeDialog();
      expect(component.showDropDialog).toBe(false);
  });

  it('should handle pagination next page', () => {
      component.currentPage = 1;
      component.totalItems = 20;
      component.pageSize = 10;
      component.nextPage();
      expect(component.currentPage).toBe(2);
  });

  it('should not go to next page if on last page', () => {
      component.currentPage = 1;
      component.totalItems = 10;
      component.pageSize = 10;
      component.nextPage();
      expect(component.currentPage).toBe(1);
  });

  it('should handle pagination prev page', () => {
      component.currentPage = 2;
      component.prevPage();
      expect(component.currentPage).toBe(1);
  });

   it('should not go to prev page if on first page', () => {
      component.currentPage = 1;
      component.prevPage();
      expect(component.currentPage).toBe(1);
  });

  it('should filter employees on rider select', () => {
      const mockRiders = [
          { riderId: 'R1', employeeId: 'E1' },
          { riderId: 'R1', employeeId: 'E2' },
          { riderId: 'R2', employeeId: 'E3' }
      ];
      component.filteredRiders = mockRiders;
      
      const event = { target: { value: 'R1' } };
      component.onRiderSelect(event);
      
      expect(component.filteredEmployees.length).toBe(2);
      expect(component.filteredEmployees[0].riderId).toBe('R1');
  });

  it('should not add drop if fields missing', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.dropDetails = { riderId: '', employeeId: '' };
      component.addDrop();
      expect(window.alert).toHaveBeenCalledWith('All fields are mandatory');
      expect(mockTransportService.setDropDetails).not.toHaveBeenCalled();
  });

  it('should add drop successfully', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.dropDetails = { riderId: 'R1', employeeId: 'E1' };
      component.dropList = [];
      
      component.addDrop();
      
      expect(component.dropList.length).toBe(1);
      expect(mockTransportService.setDropDetails).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Drop added successfully!');
      expect(component.showDropDialog).toBe(false);
  });
});
