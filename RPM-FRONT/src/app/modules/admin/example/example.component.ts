import { Component, ViewEncapsulation } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None,
    imports      : [
        MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
        MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ]
})
export class ExampleComponent
{
    readonly dialogRef = inject(MatDialogRef<DashboardComponent>);

    onNoClick(): void {
        this.dialogRef.close();
    }

    /**
     * Constructor
     */
    constructor()
    {
    }
}
function inject(arg0: any) {
    throw new Error('Function not implemented.');
}

