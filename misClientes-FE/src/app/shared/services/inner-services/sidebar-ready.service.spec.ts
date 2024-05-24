import { TestBed } from '@angular/core/testing';

import { SidebarReadyService } from './sidebar-ready.service';

describe('SidebarReadyService', () => {
  let service: SidebarReadyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarReadyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
