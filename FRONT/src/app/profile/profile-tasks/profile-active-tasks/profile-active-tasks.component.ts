import { SelectionModel } from '@angular/cdk/collections';
import { NgIf } from '@angular/common';
import { Component, Input, input, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { ProjectsService } from '../../../services/projects.service';
import { ProjectTasks } from '../../../models/tasks/projectTasks';
import { AllProjects } from '../../../models/allprojects';
import { AsyncLocalStorage } from 'async_hooks';
import { ProjectPhase } from '../../../models/phases/projectPhase';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectTasksService } from '../../../services/tasks/project-tasks.service';
import { TasksService } from '../../../services/project/tasks.service';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';


@Component({
  selector: 'app-profile-active-tasks',
  standalone: true,
  imports: [MatIconModule, MatExpansionModule ,MatAccordion ,MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, NgIf, MatCheckboxModule, MatTooltipModule, MatSelectModule, MatInputModule, MatDatepickerModule],
  templateUrl: './profile-active-tasks.component.html',
  styleUrl: './profile-active-tasks.component.scss',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
]
})
export class ProfileActiveTasksComponent {

   initActiveUserTasks: ProjectTasks[] = [];
   activeUserTasks = signal<ProjectTasks[]>(this.initActiveUserTasks);


   @ViewChild('menuTrigger')
    menuTrigger!: MatMenuTrigger;
   @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  displayedColumns: string[] = ['select', 'projectName', 'taskName', 'endDate',  'status', 'phase', 'action'];
  dataSource = new MatTableDataSource<ProjectTasks>();
  selection = new SelectionModel<ProjectTasks>(true, []);

  userID = localStorage.getItem('appUserID')?.toString().replace('"', '').replace('"', '') ?? '';




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
  checkboxLabel(row?: ProjectTasks): string {
      if (!row) {
          return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.projectTasksID + 1}`;
  }

  // Search Filter
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Popup Trigger
  classApplied = false ;
  toggleClass() {
      this.classApplied = !this.classApplied;
  }

  // isToggled
  isToggled = false;

  constructor(
      public themeService: CustomizerSettingsService, public projectTasksService: TasksService, public dialog: MatDialog
  ) { // user id
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.projectTasksService.getActiveProjectTasksByUserID(this.userID).subscribe((data) => {
            this.initActiveUserTasks = data;
            this.activeUserTasks.set(this.initActiveUserTasks);
            this.dataSource = new MatTableDataSource<ProjectTasks>(this.activeUserTasks());
            console.log("TASKS DATA : ", this.activeUserTasks());
        });  
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogFromMenuExampleDialog, {restoreFocus: false});
    
        // Manually restore focus to the menu trigger since the element that
        // opens the dialog won't be in the DOM any more when the dialog closes.
        dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
    }
  // RTL Mode
  toggleRTLEnabledTheme() {
      this.themeService.toggleRTLEnabledTheme();
  }

}


@Component({
    selector: 'profile-active-tasks-dialog',
    templateUrl: './profile-active-tasks-dialog.html',
    standalone: true,
    imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DialogFromMenuExampleDialog {}
