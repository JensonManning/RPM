import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileToDoTasksComponent } from './profile-to-do-tasks.component';

describe('ProfileToDoTasksComponent', () => {
  let component: ProfileToDoTasksComponent;
  let fixture: ComponentFixture<ProfileToDoTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileToDoTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileToDoTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
