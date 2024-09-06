import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AllProjects } from '../../models/allprojects';
import { RpmService } from '../../services/rpm.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule, NgFor } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { map } from 'rxjs';

@Component({
  selector: 'app-projects-all-active',
  standalone: true,
  imports: [CommonModule, NgFor, MatTableModule],
  templateUrl: './projects-all-active.component.html',
  styleUrl: './projects-all-active.component.scss'
})
export class ProjectsAllActiveComponent implements OnInit {

  projects = signal<AllProjects[] | undefined>(undefined);
  


  isFetching = signal(false); //false;
  error = signal<string | undefined>(undefined);
  private rpmService = inject(RpmService);
  private httpClient = inject(HttpClient);
  private apiURL = `${environment.apiURL}/projects`;
  private destroyRef = inject(DestroyRef); 

  //activeProjects = signal(this.rpmService.allActiveProjects().filter((project: AllProjects) => project.projectStatus === 'active'));
  //activeProjectsNames = signal(this.rpmService.allActiveProjects().filter((project: AllProjects) => project.projectStatus === 'active').map((project: AllProjects) => project.projectName));
  //projectsDataSource: MatTableDataSource<any> = new MatTableDataSource(this.activeProjects());

  initActiveProjects() {
    //return this.rpmService.getAllActiveProjects(); 
  }

  setDataSource() {
    //this.projectsDataSource = new MatTableDataSource(this.activeProjects());
  }

  /*activeProjects() {
    //this.initActiveProjects();
    return this.projects.update(this.initActiveProjects());
  }

  setActiveProjects() {
    this.projects.computed(() => this.activeProjects());
    this.projectsDataSource = new MatTableDataSource(this.projects());
  }
  
  */
  ngOnInit() {
    this.isFetching.set(true);
    this.setDataSource();
    return this.initActiveProjects();
    //this.projectsDataSource = new MatTableDataSource(this.activeProjects());
    //console.log("ACTIVE PROJECTS SIGNAL: " + this.activeProjects);
    /*const sub = this.httpClient.get<AllProjects[]>(this.apiURL).subscribe({
      next: (data) => {
        this.projects.set(data as AllProjects[]);
        console.log("NEW SIGNAL: " + this.projects);
        this.projectsDataSource = new MatTableDataSource(this.projects());
      },
      error: (err) => {
        console.log(err);
        this.error.set(err.message);
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });

    */
  }

}
