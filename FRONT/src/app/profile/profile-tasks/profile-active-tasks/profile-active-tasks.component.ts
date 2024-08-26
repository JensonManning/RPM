import { SelectionModel } from '@angular/cdk/collections';
import { NgIf } from '@angular/common';
import { Component, Input, input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { ProjectsService } from '../../../services/projects.service';
import { ProjectTasks } from '../../../models/projectTasks';
import { AllProjects } from '../../../models/allprojects';
import { AsyncLocalStorage } from 'async_hooks';
import { ProjectPhase } from '../../../models/projectPhase';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-profile-active-tasks',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, NgIf, MatCheckboxModule, MatTooltipModule, MatSelectModule, MatInputModule, MatDatepickerModule],
  templateUrl: './profile-active-tasks.component.html',
  styleUrl: './profile-active-tasks.component.scss',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
]
})
export class ProfileActiveTasksComponent {

  @Input() set activeProjects(p: AllProjects[] | undefined) {
    if (p) {
        console.log(p);
            this.dataSource = new MatTableDataSource<AllProjects>(p);
            this.dataSource.paginator = this.paginator;
    } else {
        console.log('p is undefined');
    }
   }



   @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  displayedColumns: string[] = ['select', 'projectName', 'taskName', 'endDate',  'status', 'action'];
  dataSource = new MatTableDataSource<AllProjects>();
  selection = new SelectionModel<AllProjects>(true, []);

  id = localStorage.getItem('appUserID')?.toString().replace('"', '').replace('"', ''); // user id


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
      if (this.isAllSelected()) {
          this.selection.clear();
          return;
      }
      this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AllProjects): string {
      if (!row) {
          return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.projectTasks[0].projectTasksID + 1}`;
  }

  // Search Filter
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Popup Trigger
  classApplied = false;
  toggleClass() {
      this.classApplied = !this.classApplied;
  }

  // isToggled
  isToggled = false;

  constructor(
      public themeService: CustomizerSettingsService, public projectService: ProjectsService
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
