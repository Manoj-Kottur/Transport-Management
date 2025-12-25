import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TransportNavigationComponent } from './transport-navigation.component';
import { TransportService } from '../transport.service';

describe('TransportNavigationComponent', () => {
  let component: TransportNavigationComponent;
  let fixture: ComponentFixture<TransportNavigationComponent>;
  let mockRouter: any;
  let mockTransportService: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn()
    };

    mockTransportService = {
      initializeRiderDetail: jest.fn().mockReturnValue({}),
      RIDE_TAB: 'Ride',
      PICKUP_TAB: 'Pick-up',
      DROP_TAB: 'Drop'
    };

    await TestBed.configureTestingModule({
      declarations: [ TransportNavigationComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: TransportService, useValue: mockTransportService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize rider details on init', () => {
    expect(mockTransportService.initializeRiderDetail).toHaveBeenCalled();
  });

  it('should set default tab to Ride on init', () => {
     expect(component.selectedTab).toBe('Ride');
     expect(mockRouter.navigate).toHaveBeenCalledWith(['/ride']);
  });

  it('should change navigation bar item', () => {
    component.onChangeNavBarItem('Drop');
    expect(component.selectedTab).toBe('Drop');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/drop']);
  });
});
