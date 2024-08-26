import { TestBed } from '@angular/core/testing';

import { ProjectSigService } from './project-sig.service';

describe('ProjectSigService', () => {
  let service: ProjectSigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectSigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
