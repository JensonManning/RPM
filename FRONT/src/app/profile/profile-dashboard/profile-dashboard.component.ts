import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileActiveProjectsComponent } from "../profile-projects/profile-active-projects/profile-active-projects.component";
import { ProjectPhase } from '../../models/projectPhase';
import { AllProjects } from '../../models/allprojects';
import { ProjectsService } from '../../services/projects.service';
import { ProjectTeam } from '../../models/projectTeam';
import { Subscription } from 'rxjs';
import { ProfileUpcomingProjectsComponent } from "../profile-projects/profile-upcoming-projects/profile-upcoming-projects.component";
import { ProfileActiveTasksComponent } from '../profile-tasks/profile-active-tasks/profile-active-tasks.component';

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [ProfileActiveProjectsComponent, ProfileUpcomingProjectsComponent, ProfileActiveTasksComponent],
  templateUrl: './profile-dashboard.component.html',
  styleUrl: './profile-dashboard.component.scss'
})
export class ProfileDashboardComponent {
  id : string = '';
  projectPhase: ProjectPhase[] = [];
  project: AllProjects[] = []; // call <-- need to push this to child components
  projectNames: any[] = [];

  userID = localStorage.getItem('appUserID')?.toString().replace('"', '').replace('"', '');

  activeProjects: AllProjects[] = [];
  activeProjectNames: any[] = [];
  activeProjectsLocal: void | undefined;
  upcomingProjects: AllProjects[] = [];
  upcomingProjectNames: any[] = [];
  upcomingProjectsLocal: void | undefined;




  constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {
   }

  getPhases() {
    return this.projectsService
    .getPhases()
    .subscribe((phasesData: ProjectPhase[]) => {
      this.projectPhase = phasesData;
    });
  }

  getProjectsByUserId(id: string) {
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

  getActiveProjectsByUserId(id: string) {
    return this.projectsService.getActiveProjectsByUserId(id).subscribe((data: AllProjects[]) => {
      this.activeProjects = data;
      console.log("dashboard active project : " + this.activeProjects);
      this.activeProjectNames = this.activeProjects.map((activeProject: { projectName: any; }) => activeProject.projectName);
      for(let i = 0; i < this.projectPhase.length; i++) {
        this.project[i].projectPhase = this.projectPhase;
      }
    });
  };

  getUpcomingProjectsByUserId(id: string) {
    return this.projectsService.getUpcomingProjectsByUserId(id).subscribe((data: AllProjects[]) => {
      this.upcomingProjects = data;
      console.log("dashboard upcomingproject : " + this.upcomingProjects);
      this.upcomingProjectNames = this.upcomingProjects.map((upcomingProject: { projectName: any; }) => upcomingProject.projectName);
      for(let i = 0; i < this.projectPhase.length; i++) {
        this.project[i].projectPhase = this.projectPhase;
      }
    });
  };
  
  ngOnInit(): Subscription { 
    const id = localStorage.getItem('appUserID')?.toString().replace('"', '').replace('"', '');
    this.id = id ?? '';
    console.log("const id : " + this.id);
    return this.getProjectsByUserId(this.id) && this.getActiveProjectsByUserId(this.id) && this.getUpcomingProjectsByUserId(this.id); 
  } 
}

  