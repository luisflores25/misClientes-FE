import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShLoaderComponent } from './sh-loader.component';

describe('ShLoaderComponent', () => {
  let component: ShLoaderComponent;
  let fixture: ComponentFixture<ShLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShLoaderComponent]
    });
    fixture = TestBed.createComponent(ShLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
