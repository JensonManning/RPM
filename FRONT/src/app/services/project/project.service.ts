import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AllProjects } from '../../models/projects/projects';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiProjectData = new BehaviorSubject<AllProjects[]>([]);
  public apiProjectData$ = this.apiProjectData.asObservable();

  private apiURL = `${environment.apiURL}/projects`

  constructor(private http: HttpClient) { 
    
  }

  getAllProjects(): Observable<AllProjects[]> {
    return this.http.get<AllProjects[]>(this.apiURL);
  }

  getAllProjectsByID(id: number): Observable<AllProjects> {
    return this.http.get<AllProjects>(this.apiURL + "/ProjectID/" + id);
  }

  getAllProjectsByStatus(status: string): Observable<AllProjects[]> {
    return this.http.get<AllProjects[]>(this.apiURL + "/ProjectStatus/" + status);
  }

  getAllProjectsByUserID(id: string): Observable<AllProjects[]> {
    return this.http.get<AllProjects[]>(this.apiURL + "/" + id);
  }

  getActiveProjectsByUserID(id: string): Observable<AllProjects[]> {
    return this.http.get<AllProjects[]>(this.apiURL + "/UserActive/" + id);
  }

  getUpcomingProjectsByUserID(id: string): Observable<AllProjects[]> {
    return this.http.get<AllProjects[]>(this.apiURL + "/UserUpcoming/" + id);
  }

  getProjectsByUserIDAndStatus(id: string, status: string): Observable<AllProjects[]> {
    return this.http.get<AllProjects[]>(this.apiURL + "/" + id + "/" + status);
  }

  getProjectNamesByUserIDAndStatus(id: string, status: string): Observable<string[]> {
    return this.http.get<string[]>(this.apiURL + "/names/" + id + "/" + status);
  }

  createProject(project: AllProjects): Observable<AllProjects> {
    return this.http.post<AllProjects>(this.apiURL, project);
  }



}
