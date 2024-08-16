import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompletedTasksComponent } from './profile-completed-tasks.component';

describe('ProfileCompletedTasksComponent', () => {
  let component: ProfileCompletedTasksComponent;
  let fixture: ComponentFixture<ProfileCompletedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCompletedTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCompletedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
