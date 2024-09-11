import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActiveTasksDialogComponent } from './all-active-tasks-dialog.component';

describe('AllActiveTasksDialogComponent', () => {
  let component: AllActiveTasksDialogComponent;
  let fixture: ComponentFixture<AllActiveTasksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllActiveTasksDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllActiveTasksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
