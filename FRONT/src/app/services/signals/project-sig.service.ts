import { Injectable, signal } from '@angular/core';
import { AllProjects } from '../../models/allprojects';

@Injectable({
  providedIn: 'root'
})
export class ProjectSigService {

  private _loadProjects = signal<AllProjects[]>([]);
  public get loadProjects() { return this._loadProjects };

  constructor() { }
}
