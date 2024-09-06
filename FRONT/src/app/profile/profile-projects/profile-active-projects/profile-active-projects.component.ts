import { Component, computed, inject, input, Input, signal } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor } from '@angular/common';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { CommonModule, NgIf } from '@angular/common';
import { ProjectService } from '../../../services/project/project.service';
import { AsyncLocalStorage } from 'async_hooks';
import { RpmService } from '../../../services/rpm.service';
import { AllProjects } from '../../../models/projects/projects';



@Component({
  selector: 'app-profile-active-projects',
  standalone: true,
  imports: [CommonModule, NgIf, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatProgressBarModule, MatTabsModule, MatTabsModule, MatExpansionModule, NgFor],
  templateUrl: './profile-active-projects.component.html',
  styleUrl: './profile-active-projects.component.scss'
})
export class ProfileActiveProjectsComponent {

    private rpmService = inject(RpmService);
    userID = localStorage.getItem('appUserID')?.toString().replace('"', '').replace('"', '');

    initActiveProjects : AllProjects[] = [];
    initActiveProjectNames : any[] = [];
    activeProjects = signal(this.initActiveProjects);
    activeProjectNames = signal(this.initActiveProjectNames);

  // isToggled
  isToggled = false;

  constructor(
      private router: Router, public themeService: CustomizerSettingsService, private projectService: ProjectService
  ) {
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }

  goToProjects(id: number) {
      this.router.navigate(['/project/' + id]);
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
      this.themeService.toggleRTLEnabledTheme();
  }

  // Active Projects
  initProjects() {
    return this.projectService.getProjectsByUserIDAndStatus(this.userID ?? '', "Active").subscribe((data: AllProjects[]) => {
        console.log("DATA: " + data);
        this.initActiveProjects = data;
        this.activeProjects.set(this.initActiveProjects);
        this.initActiveProjectNames.map((activeProject: { projectName: any; }) => activeProject.projectName);
        this.activeProjectNames.set(this.initActiveProjectNames);
    });
  }
  ngOnInit() {
    return this.initProjects() && console.log("ACTIVE PROJECTS: " + this.activeProjects() + "USER ID: " + this.userID);
  }
}
