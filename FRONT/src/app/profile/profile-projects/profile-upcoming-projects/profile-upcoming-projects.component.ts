import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { AllProjects } from '../../../models/allprojects';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-profile-upcoming-projects',
  standalone: true,
  imports: [CommonModule, NgIf, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatProgressBarModule, MatTabsModule, MatTabsModule, MatExpansionModule, NgFor],
  templateUrl: './profile-upcoming-projects.component.html',
  styleUrl: './profile-upcoming-projects.component.scss'
})
export class ProfileUpcomingProjectsComponent {

  @Input() upcomingProjects?: AllProjects[];
  @Input() upcomingProjectNames?: any[];  
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
