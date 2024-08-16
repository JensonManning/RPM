import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileArchivedProjectsComponent } from './profile-archived-projects.component';

describe('ProfileArchivedProjectsComponent', () => {
  let component: ProfileArchivedProjectsComponent;
  let fixture: ComponentFixture<ProfileArchivedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileArchivedProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileArchivedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
