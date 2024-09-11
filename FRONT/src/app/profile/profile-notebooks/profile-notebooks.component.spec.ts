import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNotebooksComponent } from './profile-notebooks.component';

describe('ProfileNotebooksComponent', () => {
  let component: ProfileNotebooksComponent;
  let fixture: ComponentFixture<ProfileNotebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileNotebooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileNotebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
