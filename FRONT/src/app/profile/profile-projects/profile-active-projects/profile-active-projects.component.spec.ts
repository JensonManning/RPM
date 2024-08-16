import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileActiveProjectsComponent } from './profile-active-projects.component';

describe('ProfileActiveProjectsComponent', () => {
  let component: ProfileActiveProjectsComponent;
  let fixture: ComponentFixture<ProfileActiveProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileActiveProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileActiveProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
