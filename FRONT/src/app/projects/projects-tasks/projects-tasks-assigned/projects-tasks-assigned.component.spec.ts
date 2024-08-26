import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTasksAssignedComponent } from './projects-tasks-assigned.component';

describe('ProjectsTasksAssignedComponent', () => {
  let component: ProjectsTasksAssignedComponent;
  let fixture: ComponentFixture<ProjectsTasksAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsTasksAssignedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsTasksAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
