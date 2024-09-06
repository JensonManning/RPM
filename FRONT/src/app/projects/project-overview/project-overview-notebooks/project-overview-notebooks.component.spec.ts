import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverviewNotebooksComponent } from './project-overview-notebooks.component';

describe('ProjectOverviewNotebooksComponent', () => {
  let component: ProjectOverviewNotebooksComponent;
  let fixture: ComponentFixture<ProjectOverviewNotebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectOverviewNotebooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOverviewNotebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
