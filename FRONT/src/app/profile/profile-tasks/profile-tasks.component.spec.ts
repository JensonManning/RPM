import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTasksComponent } from './profile-tasks.component';

describe('ProfileTasksComponent', () => {
  let component: ProfileTasksComponent;
  let fixture: ComponentFixture<ProfileTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
