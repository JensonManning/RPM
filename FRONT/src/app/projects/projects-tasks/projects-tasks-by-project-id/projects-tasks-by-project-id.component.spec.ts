import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTasksByProjectIdComponent } from './projects-tasks-by-project-id.component';

describe('ProjectsTasksByProjectIdComponent', () => {
  let component: ProjectsTasksByProjectIdComponent;
  let fixture: ComponentFixture<ProjectsTasksByProjectIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsTasksByProjectIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsTasksByProjectIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
