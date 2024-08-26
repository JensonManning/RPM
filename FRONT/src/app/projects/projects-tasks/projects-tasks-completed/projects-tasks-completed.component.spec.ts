import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTasksCompletedComponent } from './projects-tasks-completed.component';

describe('ProjectsTasksCompletedComponent', () => {
  let component: ProjectsTasksCompletedComponent;
  let fixture: ComponentFixture<ProjectsTasksCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsTasksCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsTasksCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
