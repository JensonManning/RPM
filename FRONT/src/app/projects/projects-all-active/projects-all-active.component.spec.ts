import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAllActiveComponent } from './projects-all-active.component';

describe('ProjectsAllActiveComponent', () => {
  let component: ProjectsAllActiveComponent;
  let fixture: ComponentFixture<ProjectsAllActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsAllActiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsAllActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
