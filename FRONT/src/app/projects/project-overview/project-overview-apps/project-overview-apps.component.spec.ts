import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverviewAppsComponent } from './project-overview-apps.component';

describe('ProjectOverviewAppsComponent', () => {
  let component: ProjectOverviewAppsComponent;
  let fixture: ComponentFixture<ProjectOverviewAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectOverviewAppsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOverviewAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
