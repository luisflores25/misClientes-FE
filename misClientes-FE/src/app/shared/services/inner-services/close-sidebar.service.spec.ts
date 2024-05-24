import { TestBed } from '@angular/core/testing';

import { CloseSidebarService } from './close-sidebar.service';

describe('CloseSidebarService', () => {
  let service: CloseSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
