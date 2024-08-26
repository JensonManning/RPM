import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileActiveTasksComponent } from './profile-active-tasks.component';

describe('ProfileActiveTasksComponent', () => {
  let component: ProfileActiveTasksComponent;
  let fixture: ComponentFixture<ProfileActiveTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileActiveTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileActiveTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
