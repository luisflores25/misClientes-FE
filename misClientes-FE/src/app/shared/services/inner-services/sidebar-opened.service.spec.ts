import { TestBed } from '@angular/core/testing';

import { SidebarOpenedService } from './sidebar-opened.service';

describe('SidebarOpenedService', () => {
  let service: SidebarOpenedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarOpenedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
