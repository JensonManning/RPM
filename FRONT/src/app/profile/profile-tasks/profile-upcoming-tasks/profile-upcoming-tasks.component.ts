import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile-upcoming-tasks',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, NgIf, MatCheckboxModule, MatTooltipModule, MatSelectModule, MatInputModule, MatDatepickerModule],
  templateUrl: './profile-upcoming-tasks.component.html',
  styleUrl: './profile-upcoming-tasks.component.scss',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
]  
})
export class ProfileUpcomingTasksComponent {

  displayedColumns: string[] = ['select', 'taskID', 'taskDescription', 'assignedTo', 'dueDate', 'priority', 'status', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  openTaskDetail : boolean = false;

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

  openTaskDetails(){
    this.openTaskDetail = true;
        if (this.openTaskDetail = true) {
            console.log("openTaskDetail",this.openTaskDetail);
        }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
      if (!row) {
          return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.taskID + 1}`;
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

const ELEMENT_DATA: PeriodicElement[] = [
  {
      taskID: '#951',
      taskDescription: 'Hotel management system',
      assignedTo: 'Shawn Kennedy',
      dueDate: '15 Nov, 2024',
      priority: 'High',
      status: {
          inProgress: 'In Progress',
          // pending: 'Pending',
          // completed: 'Completed',
          // notStarted: 'Not Started',
      },
      action: {
          view: 'visibility',
          edit: 'edit',
          delete: 'delete'
      }
  },
  {
      taskID: '#587',
      taskDescription: 'Send proposal to APR Ltd',
      assignedTo: 'Roberto Cruz',
      dueDate: '14 Nov, 2024',
      priority: 'Medium',
      status: {
          // inProgress: 'In Progress',
          pending: 'Pending',
          // completed: 'Completed',
          // notStarted: 'Not Started',
      },
      action: {
          view: 'visibility',
          edit: 'edit',
          delete: 'delete'
      }
  },
  {
      taskID: '#618',
      taskDescription: 'Python upgrade',
      assignedTo: 'Juli Johnson',
      dueDate: '13 Nov, 2024',
      priority: 'High',
      status: {
          // inProgress: 'In Progress',
          // pending: 'Pending',
          completed: 'Completed',
          // notStarted: 'Not Started',
      },
      action: {
          view: 'visibility',
          edit: 'edit',
          delete: 'delete'
      }
  },
  {
      taskID: '#367',
      taskDescription: 'Schedule meeting with Daxa',
      assignedTo: 'Catalina Engles',
      dueDate: '12 Nov, 2024',
      priority: 'Low',
      status: {
          // inProgress: 'In Progress',
          // pending: 'Pending',
          // completed: 'Completed',
          notStarted: 'Not Started',
      },
      action: {
          view: 'visibility',
          edit: 'edit',
          delete: 'delete'
      }
  },
  {
      taskID: '#761',
      taskDescription: 'Engineering lite touch',
      assignedTo: 'Louis Nagle',
      dueDate: '11 Nov, 2024',
      priority: 'Medium',
      status: {
          inProgress: 'In Progress',
          // pending: 'Pending',
          // completed: 'Completed',
          // notStarted: 'Not Started',
      },
      action: {
          view: 'visibility',
          edit: 'edit',
          delete: 'delete'
      }
  }
];

export interface PeriodicElement {
  taskDescription: string;
  taskID: string;
  assignedTo: string;
  dueDate: string;
  priority: string;
  status: any;
  action: any;
}
