import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverviewTimelineComponent } from './project-overview-timeline.component';

describe('ProjectOverviewTimelineComponent', () => {
  let component: ProjectOverviewTimelineComponent;
  let fixture: ComponentFixture<ProjectOverviewTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectOverviewTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOverviewTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
