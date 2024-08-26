import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsCompletedComponent } from './projects-completed.component';

describe('ProjectsCompletedComponent', () => {
  let component: ProjectsCompletedComponent;
  let fixture: ComponentFixture<ProjectsCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
