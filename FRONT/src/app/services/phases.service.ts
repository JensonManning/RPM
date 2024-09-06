import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Phases } from '../models/phases/projectPhase';

@Injectable({
  providedIn: 'root'
})
export class PhasesService {

  private apiURL = `${environment.apiURL}/project/phases`

  constructor(private http: HttpClient) { 
    }
    getPhases(): Observable<Phases[]> {
      return this.http.get<Phases[]>(this.apiURL);
    }
    createPhases(phases: Phases): Observable<Phases> {
      return this.http.post<Phases>(this.apiURL, phases);
    }

}
