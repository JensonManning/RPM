import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverviewTeamComponent } from './project-overview-team.component';

describe('ProjectOverviewTeamComponent', () => {
  let component: ProjectOverviewTeamComponent;
  let fixture: ComponentFixture<ProjectOverviewTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectOverviewTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOverviewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
