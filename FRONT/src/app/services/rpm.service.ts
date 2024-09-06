import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AllProjects } from '../models/projects/projects';
import { catchError, map, throwError } from 'rxjs';
import { ProjectTasks } from '../models/tasks/projectTasks';

@Injectable({
  providedIn: 'root'
})
export class RpmService {

  private apiURL = `${environment.apiURL}/Projects`
  private apiPhasesURL = `${environment.apiURL}/Projects/phases`
  private apiTasksURL = `${environment.apiURL}/projects/tasks`
  private apiUsersURL = `${environment.apiURL}/account`
  private apiUsersCreateURL = `${environment.apiURL}/account/register`

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef); 


  // PROJECTS CALLS
  private apiProjectsURL = `${environment.apiURL}/Projects`
  private apiProjectTasksURL = `${environment.apiURL}/ProjectTasks`
  private apiProjectPhasesURL = `${environment.apiURL}/ProjectPhases`
  private apiRolesURL = `${environment.apiURL}/Roles`
  private apiAccountURL = `${environment.apiURL}/Account`

  // Variables
  active : string = "Active";


  // TASK CALLS

  // PHASES CALLS

  // ALL PROJECTS INITIALIZATION & SIGNALS //
  initAllProjects : AllProjects[] = [];
  allProjects = signal(this.initAllProjects);

  initAllActiveProjectNames : AllProjects[] = [];
  allActiveProjectNames = signal(this.initAllActiveProjectNames);

  initAllProjectsByProjectID : AllProjects[] = [];
  allProjectsByProjectID = signal(this.initAllProjectsByProjectID);

  initAllProjectsByStatus : AllProjects[] = [];
  allProjectsByStatus = signal(this.initAllProjectsByStatus);

  initAllProjectsByAppUserID : AllProjects[] = [];
  allProjectsByAppUserID = signal(this.initAllProjectsByAppUserID);

  initAllProjectsByStatusAndAppUserID : AllProjects[] = [];
  allProjectsByStatusAndAppUserID = signal(this.initAllProjectsByStatusAndAppUserID);

  initActiveProjectsByAppUserID : AllProjects[] = [];
  activeProjectsByAppUserID = signal(this.initActiveProjectsByAppUserID);

  initUpcomingProjectsByAppUserID : AllProjects[] = [];
  upcomingProjectsByAppUserID = signal(this.initUpcomingProjectsByAppUserID);


  // TASKS CALLS
  initAllProjectTasks : ProjectTasks[] = [];
  allProjectTasks = signal(this.initAllProjectTasks);

  initProjectTaskByProjectTaskID : ProjectTasks[] = [];
  projectTaskByProjectTaskID = signal(this.initProjectTaskByProjectTaskID);

  initAllProjectTasksByUserID : ProjectTasks[] = [];
  allProjectTasksByUserID = signal(this.initAllProjectTasksByUserID);

  initAllProjectTasksByProjectID : ProjectTasks[] = [];
  allProjectTasksByProjectID = signal(this.initAllProjectTasksByProjectID);

  initSllProjectTasksByStatusAndAppUserID : ProjectTasks[] = [];
  allProjectTasksByStatusAndAppUserID = signal(this.initSllProjectTasksByStatusAndAppUserID);



  // ALL PROJECTS API CALLS
  // ------------------ //

    // -GET ALL PROJECTS
    getAllProjects() {
      return this.httpClient.get<AllProjects[]>(this.apiProjectsURL).subscribe({
        next: (data) => {
          this.allProjects.set(data);
          console.log("SIGNAL ALL PROJECTS: " + this.allProjects());
        }
      });
    }

    //  -GET ALL ACTIVE PROJECTS NAME ONLY
    getAllActiveProjectsNames(id : string, status : string) {
      return this.httpClient.get<AllProjects[]>(this.apiProjectsURL).pipe(
        map((data: AllProjects[]) => data.map((project) => project.projectName))
      ).subscribe({
        next: (data) => {
          this.allActiveProjectNames.set(data as unknown as AllProjects[]);
          console.log("SIGNAL ALL ACTIVE PROJECT NAMES: " + this.allActiveProjectNames());
        }
      });
    }

    // -GET ALL BY PROJECT ID
    getAllProjectsById(id : number) {
      return this.httpClient.get<AllProjects[]>(`${this.apiProjectsURL}/ProjectID/${id}`).subscribe({
        next: (data) => {
          this.allProjectsByProjectID.set(data);
          console.log("SIGNAL ALL PROJECTS BY ID: " + this.allProjectsByProjectID());
        }
      });
    }

    // -GET ALL PROJECTS STATUS
    getAllActiveProjects(status : string) {
      return this.httpClient.get<AllProjects[]>(`${this.apiTasksURL}/ProjectStatus/${status}`).subscribe({
        next: (data) => {
          this.allProjectsByStatus.set(data as AllProjects[]);
          console.log("All PROJECTS STATUS SIGNAL: " + this.allProjectsByStatus());
        }
      });
    }

    // -GET ALL PROJECTS BY USER ID
    getAllProjectsByUserId(id : string) {
      return this.httpClient.get<AllProjects[]>(`${this.apiProjectsURL}/${id}`).subscribe({
        next: (data) => {
          this.allProjectsByAppUserID.set(data);
          console.log("SIGNAL ALL PROJECTS BY USER ID: " + this.allProjectsByAppUserID());
        }
      });
    }

    // -GET ALL PROJECTS BY USER ID AND PROJECT STATUS
    getAllProjectsByUserIdAndStatus(id : string, status : string) {
      return this.httpClient.get<AllProjects[]>(`${this.apiProjectsURL}/${id}/${status}`).subscribe({
        next: (data) => {
          this.allProjectsByStatusAndAppUserID.set(data);
          console.log("SIGNAL ALL PROJECTS BY USER ID AND STATUS: " + this.allProjectsByStatusAndAppUserID());
        }
      });
    }

    // -GET ACTIVE PROJECTS BY USER ID
    getActiveProjectsByUserId(id : string, status : string) {
      return this.httpClient.get<AllProjects[]>(`${this.apiProjectsURL}/${id}/${status}`).subscribe({
        next: (data) => {
          this.activeProjectsByAppUserID.set(data);
          console.log("SIGNAL ACTIVE PROJECTS BY USER ID: " + this.activeProjectsByAppUserID());
        }
      });
    }

    // -GET UPCOMING PROJECTS BY USER ID
    getUpcomingProjectsByUserId(id : string, status : string) {
      return this.httpClient.get<AllProjects[]>(`${this.apiProjectsURL}/${id}/${status}`).subscribe({
        next: (data) => {
          this.upcomingProjectsByAppUserID.set(data);
          console.log("SIGNAL UPCOMING PROJECTS BY USER ID: " + this.upcomingProjectsByAppUserID());
        }
      });
    }

  // ------------------ //



    // PHASES API CALLS
    // ------------------ //

    // ------------------ //

  // TASKS API CALLS
  // ------------------ //

    // -GET ALL TASKS
    getAllProjectTasks() {
      return this.httpClient.get<ProjectTasks[]>(this.apiTasksURL).subscribe({
        next: (data) => {
          this.allProjectTasks.set(data);
          console.log("SIGNAL ALL TASKS: " + this.allProjectTasks);
        }
      });
    }

    // -GET TASK BY PROJECT TASK ID
    getProjectTaskByProjectTaskID(id : number) {
      return this.httpClient.get<ProjectTasks[]>(`${this.apiTasksURL}/${id}`).subscribe({
        next: (data) => {
          this.projectTaskByProjectTaskID.set(data);
          console.log("SIGNAL ALL TASKS BY ID: " + this.projectTaskByProjectTaskID);
        }
      });
    }

    // -GET ALL TASKS BY USER ID
    getAllProjectTasksByUserID(id : string) {
      return this.httpClient.get<ProjectTasks[]>(`${this.apiTasksURL}/${id}`).subscribe({
        next: (data) => {
          this.allProjectTasksByUserID.set(data);
          console.log("SIGNAL ALL TASKS BY USER ID: " + this.allProjectTasksByUserID);
        }
      });
    }

    // -GET ALL TASKS BY PROJECT ID
    getAllProjectTasksByProjectID(id : number) {
      return this.httpClient.get<ProjectTasks[]>(`${this.apiTasksURL}/${id}`).subscribe({
        next: (data) => {
          this.allProjectTasksByProjectID.set(data);
          console.log("SIGNAL ALL TASKS BY PROJECT ID: " + this.allProjectTasksByProjectID);
        }
      });
    }

    // -GET ALL TASKS BY STATUS AND USER ID
    getAllProjectTasksByStatusAndUserID(status : string, id : string) {
      return this.httpClient.get<ProjectTasks[]>(`${this.apiTasksURL}/${status}/${id}`).subscribe({
        next: (data) => {
          this.allProjectTasksByStatusAndAppUserID.set(data);
          console.log("SIGNAL ALL TASKS BY STATUS AND USER ID: " + this.allProjectTasksByStatusAndAppUserID);
        }
      });
    }

    // -SET PROJECT TASK STATUS TO COMPLETE
    setProjectTaskStatusToComplete(id: number, projectTaskStatus: string) {
      const requestBody = { projectTaskStatus };
      return this.httpClient.put(`${this.apiTasksURL}/${id}`, requestBody)
    }

  // ------------------ //

    // USERS API CALLS
    // ------------------ //

    // ------------------ //
}
