import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Projects } from '../models/project';
import { Phases } from '../models/phases';
import { AllProjects } from '../models/allprojects';
import { Tasks } from '../models/tasks';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from '../models/users';
import { CreateUsers } from '../models/createUsers';

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
    createProjects(project: Projects): Observable<Projects> {
      return this.http.post<Projects>(this.apiURL, project);
    }
    getProjectById(id: number): Observable<Projects> {
      return this.http.get<Projects>(`${this.apiURL}/${id}`);
    }

    getPhases(): Observable<Phases[]> {
      return this.http.get<Phases[]>(this.apiPhasesURL);
    }
    createPhases(id: number, phases : Phases): Observable<Phases> {
      return this.http.post<Phases>(`${this.apiPhasesURL}/${id}`, phases);
    }

    getTasks(): Observable<Tasks[]> {
      return this.http.get<Tasks[]>(this.apiTasksURL);
    }
    createTasks(id: number, tasks : Tasks): Observable<Tasks> {
      return this.http.post<Tasks>(`${this.apiTasksURL}/${id}`, tasks);
    }

    getUsers(): Observable<Users[]> {
      return this.http.get<Users[]>(this.apiUsersURL);
    }

    createUsers(): Observable<CreateUsers[]> {
      return this.http.get<CreateUsers[]>(this.apiUsersURL);
    }
}
