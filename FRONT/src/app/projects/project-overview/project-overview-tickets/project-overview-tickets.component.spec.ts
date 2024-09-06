import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverviewTicketsComponent } from './project-overview-tickets.component';

describe('ProjectOverviewTicketsComponent', () => {
  let component: ProjectOverviewTicketsComponent;
  let fixture: ComponentFixture<ProjectOverviewTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectOverviewTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOverviewTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
