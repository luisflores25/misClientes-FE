import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShCardsGroupV2Component } from './sh-cards-group-v2.component';

describe('ShCardsGroupV2Component', () => {
  let component: ShCardsGroupV2Component;
  let fixture: ComponentFixture<ShCardsGroupV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShCardsGroupV2Component]
    });
    fixture = TestBed.createComponent(ShCardsGroupV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
