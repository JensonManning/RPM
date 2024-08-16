import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileArchivedTasksComponent } from './profile-archived-tasks.component';

describe('ProfileArchivedTasksComponent', () => {
  let component: ProfileArchivedTasksComponent;
  let fixture: ComponentFixture<ProfileArchivedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileArchivedTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileArchivedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
