import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportNavigationComponent } from './transport-navigation.component';
import { TransportService } from '../transport.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TransportNavigationComponent', () => {
  let component: TransportNavigationComponent;
  let fixture: ComponentFixture<TransportNavigationComponent>;
  let mockTransportService: any;

  beforeEach(async () => {
    mockTransportService = {
      initializeRiderDetail: jest.fn().mockReturnValue({}),
      RIDE_TAB: 'Ride',
      PICKUP_TAB: 'Pick-up',
      DROP_TAB: 'Drop'
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ TransportNavigationComponent ],
      providers: [
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
});
