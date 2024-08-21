import { Component, Input } from '@angular/core';
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
import { ProjectsService } from '../../../services/projects.service';
import { AllProjects } from '../../../models/allprojects';



@Component({
  selector: 'app-profile-active-projects',
  standalone: true,
  imports: [CommonModule, NgIf, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatProgressBarModule, MatTabsModule, MatTabsModule, MatExpansionModule, NgFor],
  templateUrl: './profile-active-projects.component.html',
  styleUrl: './profile-active-projects.component.scss'
})
export class ProfileActiveProjectsComponent {

    @Input() project?: AllProjects[];
    @Input() projectNames?: any[];  
  // isToggled
  isToggled = false;

  constructor(
      private router: Router, public themeService: CustomizerSettingsService, private projectsService: ProjectsService
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
}
