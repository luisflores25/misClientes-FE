import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesManagementComponent } from './viajes-management.component';

describe('ViajesManagementComponent', () => {
  let component: ViajesManagementComponent;
  let fixture: ComponentFixture<ViajesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViajesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
