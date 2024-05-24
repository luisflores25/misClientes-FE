import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLayoutComponent } from './table-layout.component';

describe('TableLayoutComponent', () => {
  let component: TableLayoutComponent;
  let fixture: ComponentFixture<TableLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableLayoutComponent]
    });
    fixture = TestBed.createComponent(TableLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
