import { Component, inject } from '@angular/core';
import { DashboardComponent } from '../../dashboard.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-all-active-tasks-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './all-active-tasks-dialog.component.html',
  styleUrl: './all-active-tasks-dialog.component.scss'
})
export class AllActiveTasksDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DashboardComponent>);


}
