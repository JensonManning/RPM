import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTasksDelayedComponent } from './projects-tasks-delayed.component';

describe('ProjectsTasksDelayedComponent', () => {
  let component: ProjectsTasksDelayedComponent;
  let fixture: ComponentFixture<ProjectsTasksDelayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsTasksDelayedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsTasksDelayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
