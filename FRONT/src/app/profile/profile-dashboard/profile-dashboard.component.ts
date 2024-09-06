import { Component, inject, input, output, signal } from '@angular/core';
import { ProfileActiveProjectsComponent } from "../profile-projects/profile-active-projects/profile-active-projects.component";
import { ProfileUpcomingProjectsComponent } from "../profile-projects/profile-upcoming-projects/profile-upcoming-projects.component";
import { ProfileActiveTasksComponent } from '../profile-tasks/profile-active-tasks/profile-active-tasks.component';
import { ProjectsAllActiveComponent } from "../../projects/projects-all-active/projects-all-active.component";
import { RpmService } from '../../services/rpm.service';
import { ProjectService } from '../../services/project/project.service';
import { AllProjects } from '../../models/projects/projects';
import { ProfileUpcomingTasksComponent } from "../profile-tasks/profile-upcoming-tasks/profile-upcoming-tasks.component";

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [ProfileActiveProjectsComponent, ProfileUpcomingProjectsComponent, ProfileActiveTasksComponent, ProjectsAllActiveComponent, ProfileUpcomingTasksComponent],
  templateUrl: './profile-dashboard.component.html',
  styleUrl: './profile-dashboard.component.scss'
})
export class ProfileDashboardComponent {

  userID = localStorage.getItem('appUserID')?.toString().replace('"', '').replace('"', '');
  initActiveProjects : AllProjects[] = [];
  initUpcomingProjects : AllProjects[] = [];
  initActiveProjectNames : any[] = [];
  initUpcomingProjectNames : any[] = [];
  sigActiveProjects = signal(this.initActiveProjects);
  sigUpcomingProjects = signal(this.initUpcomingProjects);
  sigActiveProjectNames = signal(this.initActiveProjectNames);
  sigUpcomingProjectNames = signal(this.initUpcomingProjectNames);

  constructor(private projectService: ProjectService) {

  }

  getActiveProjects(){
    return this.projectService.getActiveProjectsByUserID(this.userID ?? '').subscribe((data: AllProjects[]) => {
      this.sigActiveProjects.set(data);
      this.sigActiveProjectNames.set(
        this.sigActiveProjects().map((activeProject: { projectName: any; }) => activeProject.projectName)
      );
    });
  }
  getUpcomingProjects(){
    return this.projectService.getUpcomingProjectsByUserID(this.userID ?? '').subscribe((data: AllProjects[]) => {
      this.sigUpcomingProjects.set(data);
      this.sigUpcomingProjectNames.set(
        this.sigUpcomingProjects().map((upcomingProject: { projectName: any; }) => upcomingProject.projectName)
      )
    });
  }

  // ACTIVE TASKS

  // UPCOMING TASKS

  ngOnInit(){
    
  }
}

  /*
  id : string = '';
  projectPhase: ProjectPhase[] = [];
  project: AllProjects[] = []; // call <-- need to push this to child components
  projectNames: any[] = [];

  userID = localStorage.getItem('appUserID')?.toString().replace('"', '').replace('"', '');

  private rpmService = inject(RpmService);
  
  sigActiveProjects = signal(this.rpmService.activeProjectsByAppUserID());
  sigUpcomingProjects = signal(this.rpmService.upcomingProjectsByAppUserID());

  activeProjects: AllProjects[] = [];
  activeProjectNames: any[] = [];
  activeProjectsLocal: void | undefined;
  upcomingProjects: AllProjects[] = [];
  upcomingProjectNames: any[] = [];
  upcomingProjectsLocal: void | undefined;

  

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {
   }

  getAllProjects() {
    return this.rpmService.getAllActiveProjects();
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

  ngAfterViewInit() {
    return this.getAllProjects();
  }
*/



  