import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCreatedTasksComponent } from './profile-created-tasks.component';

describe('ProfileCreatedTasksComponent', () => {
  let component: ProfileCreatedTasksComponent;
  let fixture: ComponentFixture<ProfileCreatedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCreatedTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCreatedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
