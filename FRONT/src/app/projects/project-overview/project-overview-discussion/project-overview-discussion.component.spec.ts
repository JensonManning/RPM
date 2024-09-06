import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverviewDiscussionComponent } from './project-overview-discussion.component';

describe('ProjectOverviewDiscussionComponent', () => {
  let component: ProjectOverviewDiscussionComponent;
  let fixture: ComponentFixture<ProjectOverviewDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectOverviewDiscussionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOverviewDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
