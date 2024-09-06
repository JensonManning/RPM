import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProfileActiveProjectsComponent } from "../../profile/profile-projects/profile-active-projects/profile-active-projects.component";
import { ProjectOverviewTimelineComponent } from "./project-overview-timeline/project-overview-timeline.component";
import { ProjectOverviewDiscussionComponent } from "./project-overview-discussion/project-overview-discussion.component";
import { ProjectOverviewTeamComponent } from "./project-overview-team/project-overview-team.component";
import { ProjectOverviewNotebooksComponent } from "./project-overview-notebooks/project-overview-notebooks.component";
import { ProjectOverviewTaskListComponent } from "./project-overview-task-list/project-overview-task-list.component";
import { ProjectOverviewAppsComponent } from "./project-overview-apps/project-overview-apps.component";

@Component({
  selector: 'app-project-overview',
  standalone: true,
  imports: [MatCardModule, ProfileActiveProjectsComponent, ProjectOverviewTimelineComponent, ProjectOverviewDiscussionComponent, ProjectOverviewTeamComponent, ProjectOverviewNotebooksComponent, ProjectOverviewTaskListComponent, ProjectOverviewAppsComponent],
  templateUrl: './project-overview.component.html',
  styleUrl: './project-overview.component.scss'
})
export class ProjectOverviewComponent {

}
