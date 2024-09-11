import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AllProjects } from '../../models/projects/projects';
import { ProjectService } from '../../services/project/project.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileActiveTasksComponent } from "../profile-tasks/profile-active-tasks/profile-active-tasks.component";
import { ProfileNotebooksComponent } from "../profile-notebooks/profile-notebooks.component";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-profile-projects',
  standalone: true,
  imports: [CommonModule, NgIf, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatProgressBarModule, MatTabsModule, MatTabsModule, MatExpansionModule, NgFor, ProfileActiveTasksComponent, ProfileNotebooksComponent, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, NgIf, MatCheckboxModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './profile-projects.component.html',
  styleUrl: './profile-projects.component.scss'
})
export class ProfileProjectsComponent {
  activeProjects = signal<AllProjects[]>([]);
  userID = signal<string>('');
  isToggled = false;

    displayedColumns: string[] = ['select', 'taskID', 'taskName', 'assignedTo', 'dueDate', 'priority', 'status', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

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

  constructor(private projectService: ProjectService, activeRoute : ActivatedRoute, public themeService: CustomizerSettingsService) {
    this.userID.set(activeRoute.snapshot.params['currentUser']);
    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
  });
  } 

  initActiveProjects() {
    console.log("User ID: " + this.userID());
    return this.projectService.getAllProjects().subscribe((data: AllProjects[]) => {
        console.log("Loop Projects: " + data);
        this.activeProjects.set(data);
    });
  }

  ngOnInit() {
    this.initActiveProjects();
  }
}
  const ELEMENT_DATA: PeriodicElement[] = [
    {
        taskID: '#951',
        taskName: 'Hotel management system',
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
        taskName: 'Send proposal to APR Ltd',
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
        taskName: 'Python upgrade',
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
        taskName: 'Schedule meeting with Daxa',
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
        taskName: 'Engineering lite touch',
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
    },
    {
        taskID: '#431',
        taskName: 'Refund bill payment',
        assignedTo: 'Michael Marquez',
        dueDate: '10 Nov, 2024',
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
        taskID: '#421',
        taskName: 'Public beta release',
        assignedTo: 'James Andy',
        dueDate: '09 Nov, 2024',
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
        taskID: '#624',
        taskName: 'Fix platform errors',
        assignedTo: 'Alina Smith',
        dueDate: '08 Nov, 2024',
        priority: 'Medium',
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
        taskID: '#513',
        taskName: 'Launch our mobile app',
        assignedTo: 'David Warner',
        dueDate: '07 Nov, 2024',
        priority: 'Low',
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
    }
];


export interface PeriodicElement {
    taskName: string;
    taskID: string;
    assignedTo: string;
    dueDate: string;
    priority: string;
    status: any;
    action: any;
}

