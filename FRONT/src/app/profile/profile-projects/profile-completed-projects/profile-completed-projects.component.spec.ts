import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompletedProjectsComponent } from './profile-completed-projects.component';

describe('ProfileCompletedProjectsComponent', () => {
  let component: ProfileCompletedProjectsComponent;
  let fixture: ComponentFixture<ProfileCompletedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCompletedProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCompletedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
