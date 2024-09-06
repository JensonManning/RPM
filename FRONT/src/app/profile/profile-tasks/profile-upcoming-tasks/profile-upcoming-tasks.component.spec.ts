import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUpcomingTasksComponent } from './profile-upcoming-tasks.component';

describe('ProfileUpcomingTasksComponent', () => {
  let component: ProfileUpcomingTasksComponent;
  let fixture: ComponentFixture<ProfileUpcomingTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileUpcomingTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUpcomingTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
