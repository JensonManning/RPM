import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTasksArchivedComponent } from './projects-tasks-archived.component';

describe('ProjectsTasksArchivedComponent', () => {
  let component: ProjectsTasksArchivedComponent;
  let fixture: ComponentFixture<ProjectsTasksArchivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsTasksArchivedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsTasksArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
