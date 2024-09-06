import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverviewTaskListComponent } from './project-overview-task-list.component';

describe('ProjectOverviewTaskListComponent', () => {
  let component: ProjectOverviewTaskListComponent;
  let fixture: ComponentFixture<ProjectOverviewTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectOverviewTaskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOverviewTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
