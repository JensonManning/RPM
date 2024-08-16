import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInProgressTasksComponent } from './profile-in-progress-tasks.component';

describe('ProfileInProgressTasksComponent', () => {
  let component: ProfileInProgressTasksComponent;
  let fixture: ComponentFixture<ProfileInProgressTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileInProgressTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileInProgressTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
