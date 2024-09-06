import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ProjectService } from '../../../services/project/project.service';
import { AllProjects } from '../../../models/projects/projects';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-project-overview-timeline',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, MatProgressBarModule, NgFor],
  templateUrl: './project-overview-timeline.component.html',
  styleUrl: './project-overview-timeline.component.scss'
})
export class ProjectOverviewTimelineComponent {
  projectID : number = 0;
  initProjectDetails : AllProjects | undefined; 
  projectDetails = signal<any>({});
  // isToggled
  isToggled = false;

  constructor( public themeService: CustomizerSettingsService, private activatedRoute: ActivatedRoute, private projectService: ProjectService) {
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
      this.activatedRoute = activatedRoute;
  }

  getProjectID() {
    console.log();
    this.projectID = this.activatedRoute.snapshot.params['projectID'];
  }
  getProjectDetails(id: number) {
    return this.projectService.getAllProjectsByID(id).subscribe((data: AllProjects) => {
      // You might need to adjust this line depending on what you're trying to do
      this.initProjectDetails = data;
      console.log("initProjectDetails: " + this.initProjectDetails);
      this.projectDetails.set(this.initProjectDetails);
      this.projectID = this.activatedRoute.snapshot.params['projectID'];
    });
  }

  ngOnInit() {
    return this.getProjectDetails(this.activatedRoute.snapshot.params['projectID']);
  }

}
