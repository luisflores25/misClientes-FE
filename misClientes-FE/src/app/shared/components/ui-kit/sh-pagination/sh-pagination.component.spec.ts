import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShPaginationComponent } from './sh-pagination.component';

describe('ShPaginationComponent', () => {
  let component: ShPaginationComponent;
  let fixture: ComponentFixture<ShPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShPaginationComponent]
    });
    fixture = TestBed.createComponent(ShPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
