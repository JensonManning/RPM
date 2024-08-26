import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUpcomingProjectsComponent } from './profile-upcoming-projects.component';

describe('ProfileUpcomingProjectsComponent', () => {
  let component: ProfileUpcomingProjectsComponent;
  let fixture: ComponentFixture<ProfileUpcomingProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileUpcomingProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUpcomingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
