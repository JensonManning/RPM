import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAllUpcomingComponent } from './projects-all-upcoming.component';

describe('ProjectsAllUpcomingComponent', () => {
  let component: ProjectsAllUpcomingComponent;
  let fixture: ComponentFixture<ProjectsAllUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsAllUpcomingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsAllUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
