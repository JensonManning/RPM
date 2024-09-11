import { SelectionModel } from '@angular/cdk/collections';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { ProjectsService } from '../../services/projects.service';
import { ProjectTasks } from '../../models/tasks/projectTasks';
import { AllProjects } from '../../models/allprojects';
import { AsyncLocalStorage } from 'async_hooks';
import { ProjectPhase } from '../../models/phases/projectPhase';

@Component({
  selector: 'app-profile-tasks',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, NgIf, MatCheckboxModule, MatTooltipModule, MatSelectModule, MatInputModule, MatDatepickerModule],
  templateUrl: './profile-tasks.component.html',
  styleUrl: './profile-tasks.component.scss',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
]   
})
export class ProfileTasksComponent {
  id = localStorage.getItem('appUserID')?.toString().replace('"', '').replace('"', ''); // user id

  // isToggled
  isToggled = false;

  constructor(
      public themeService: CustomizerSettingsService
  ) {
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }
  // RTL Mode
  toggleRTLEnabledTheme() {
      this.themeService.toggleRTLEnabledTheme();
  }

}

