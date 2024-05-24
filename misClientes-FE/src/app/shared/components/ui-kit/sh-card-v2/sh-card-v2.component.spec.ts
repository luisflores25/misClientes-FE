import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShCardV2Component } from './sh-card-v2.component';

describe('ShCardV2Component', () => {
  let component: ShCardV2Component;
  let fixture: ComponentFixture<ShCardV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShCardV2Component]
    });
    fixture = TestBed.createComponent(ShCardV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
