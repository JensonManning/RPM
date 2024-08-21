import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { ProjectPhase } from '../models/projectPhase';
import { AllProjects } from '../models/allprojects';
import { ProjectTasks } from '../models/projectTasks';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from '../models/users';
import { CreateUsers } from '../models/createUsers';
import { AppUserDetail } from '../models/appUserDetail';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiProjectData = new BehaviorSubject<AllProjects[]>([]);
  public apiProjectData$ = this.apiProjectData.asObservable();

  private apiURL = `${environment.apiURL}/projects`
  private apiPhasesURL = `${environment.apiURL}/projects/phases`
  private apiTasksURL = `${environment.apiURL}/projects/tasks`
  private apiUsersURL = `${environment.apiURL}/account/users`
  private apiUsersCreateURL = `${environment.apiURL}/account/register`

  constructor(private http: HttpClient) { 
    }

    fetchProjectData() {
      return this.http.get(this.apiURL).pipe(
        map((data: any) => {
          this.apiProjectData.next(data as AllProjects[]);
        })
      );
    }
    setProjectData(data: AllProjects[]) {
      this.apiProjectData.next(data)
    }
    
    getProjects(): Observable<AllProjects[]> {
      return this.http.get<AllProjects[]>(this.apiURL);
    }
    getAllProjects(): Observable<AllProjects[]> {
      return this.http.get<AllProjects[]>(this.apiURL);
    }
    getProjectsByUserId(id: string): Observable<AllProjects[]> {
      return this.http.get<AllProjects[]>(this.apiURL).pipe(
        map((projects: AllProjects[]) => {
          return projects.filter((project: AllProjects) => {
            return project.appUsers.some((appUserID : AppUserDetail) => {
              console.log("app id " + id);
              return appUserID.id === id;
            });
          });
        })
      );
    }
    createProjects(project: Project): Observable<Project> {
      return this.http.post<Project>(this.apiURL, project);
    }
    getProjectById(id: number): Observable<Project> {
      return this.http.get<Project>(`${this.apiURL}/${id}`);
    }

    getPhases(): Observable<ProjectPhase[]> {
      return this.http.get<ProjectPhase[]>(this.apiPhasesURL);
    }
    createPhases(id: number, projectPhase : ProjectPhase): Observable<ProjectPhase> {
      return this.http.post<ProjectPhase>(`${this.apiPhasesURL}/${id}`, projectPhase);
    }

    getTasks(): Observable<ProjectTasks[]> {
      return this.http.get<ProjectTasks[]>(this.apiTasksURL);
    }
    createTasks(id: number, projectTasks : ProjectTasks): Observable<ProjectTasks> {
      return this.http.post<ProjectTasks>(`${this.apiTasksURL}/${id}`, projectTasks);
    }

    getUsers(): Observable<Users[]> {
      return this.http.get<Users[]>(this.apiUsersURL);
    }

    createUsers(): Observable<CreateUsers[]> {
      return this.http.get<CreateUsers[]>(this.apiUsersURL);
    }
}
