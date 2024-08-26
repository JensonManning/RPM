import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTasksCreatedComponent } from './projects-tasks-created.component';

describe('ProjectsTasksCreatedComponent', () => {
  let component: ProjectsTasksCreatedComponent;
  let fixture: ComponentFixture<ProjectsTasksCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsTasksCreatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsTasksCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
