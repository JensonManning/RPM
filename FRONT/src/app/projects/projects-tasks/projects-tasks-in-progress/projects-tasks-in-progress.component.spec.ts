import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTasksInProgressComponent } from './projects-tasks-in-progress.component';

describe('ProjectsTasksInProgressComponent', () => {
  let component: ProjectsTasksInProgressComponent;
  let fixture: ComponentFixture<ProjectsTasksInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsTasksInProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsTasksInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
