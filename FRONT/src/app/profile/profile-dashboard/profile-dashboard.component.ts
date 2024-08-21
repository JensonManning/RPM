import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileActiveProjectsComponent } from "../profile-projects/profile-active-projects/profile-active-projects.component";
import { ProjectPhase } from '../../models/projectPhase';
import { AllProjects } from '../../models/allprojects';
import { ProjectsService } from '../../services/projects.service';
import { ProjectTeam } from '../../models/projectTeam';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [ProfileActiveProjectsComponent],
  templateUrl: './profile-dashboard.component.html',
  styleUrl: './profile-dashboard.component.scss'
})
export class ProfileDashboardComponent {
  id : string = '';
  projectPhase: ProjectPhase[] = [];
  project: AllProjects[] = []; // call <-- need to push this to child components
  projectNames: any[] = [];


  constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {
    projectsService.apiProjectData$.subscribe(data => this.project = data);
   }

  getPhases() {
    return this.projectsService
    .getPhases()
    .subscribe((phasesData: ProjectPhase[]) => {
      this.projectPhase = phasesData;
    });
  }

  getProjectsByUserId(id: string) {
    /*return this.projectsService.getProjects()
    .subscribe((data: AllProjects[]) => {
      this.project = data.filter((project: AllProjects) => {
        return project.appUsers.some((teamMember: ProjectTeam) => {
          return teamMember.appUserID === this.id; // assuming this.id is the current user's ID
        });
      });*/
      return this.projectsService.getProjectsByUserId(id).subscribe((data: AllProjects[]) => {
        console.log("data: " + data);
        this.project = data;
        console.log("this.project: " + this.project);
        this.projectNames = this.project.map((project: { projectName: any; }) => project.projectName);
        console.log(this.projectNames);
        for(let i = 0; i < this.projectPhase.length; i++) {
          this.project[i].projectPhase = this.projectPhase;
        }
        console.log(this.projectPhase);
    });
  };

  ngOnInit(): Subscription {
    /*this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '';
      console.log("urlparam: " + this.id);
      return this.getProjectsByUserId(this.id);
    });*/

    const url = new URL(window.location.href);
    const uid = url.pathname.split('/').pop();
    this.id = uid ?? '';
    console.log("urlparam: " + this.id);
    return this.getProjectsByUserId(this.id);
    
  }
}

  