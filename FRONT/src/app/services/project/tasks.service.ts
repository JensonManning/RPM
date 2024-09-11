import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectTasks } from '../../models/tasks/projectTasks';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiProjectTaskData = new BehaviorSubject<ProjectTasks[]>([]);
  public apiProjectTasksData$ = this.apiProjectTaskData.asObservable();

  private apiURL = `${environment.apiURL}/ProjectTasks`

  constructor(private http: HttpClient) { 
    
  }

  getAllProjectTasks(): Observable<ProjectTasks[]> {
    return this.http.get<ProjectTasks[]>(this.apiURL);
  }

  getProjectTasksByProjectID(id: number): Observable<ProjectTasks[]> {
    return this.http.get<ProjectTasks[]>(this.apiURL + "/" + id);
  }

  getProjectTasksByProjectIDAndStatus(status: string, id: string): Observable<ProjectTasks[]> {
    return this.http.get<ProjectTasks[]>(this.apiURL + "/" + status + "/" + id);
  }

  getProjectTasksByUserID(id: string): Observable<ProjectTasks[]> {
    return this.http.get<ProjectTasks[]>(this.apiURL + "/User/" + id);
  }

  getActiveProjectTasksByUserID(id: string): Observable<ProjectTasks[]> {
    return this.http.get<ProjectTasks[]>(this.apiURL + "/activetasks/" + id);
  }

  getUpcomingProjectTasksByUserID(id: string): Observable<ProjectTasks[]> {
    return this.http.get<ProjectTasks[]>(this.apiURL + "/upcomingtasks/" + id);
  }

  editCurrentProjectTask(projectTask: number): Observable<ProjectTasks> {
    return this.http.put<ProjectTasks>(this.apiURL, projectTask);
  }

}
