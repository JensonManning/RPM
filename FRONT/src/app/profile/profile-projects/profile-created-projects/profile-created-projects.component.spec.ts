import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCreatedProjectsComponent } from './profile-created-projects.component';

describe('ProfileCreatedProjectsComponent', () => {
  let component: ProfileCreatedProjectsComponent;
  let fixture: ComponentFixture<ProfileCreatedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCreatedProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCreatedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
