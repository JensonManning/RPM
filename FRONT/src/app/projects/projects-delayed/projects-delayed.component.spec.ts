import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDelayedComponent } from './projects-delayed.component';

describe('ProjectsDelayedComponent', () => {
  let component: ProjectsDelayedComponent;
  let fixture: ComponentFixture<ProjectsDelayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsDelayedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsDelayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
