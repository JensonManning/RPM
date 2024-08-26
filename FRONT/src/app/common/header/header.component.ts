import { NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { ToggleService } from '../sidebar/toggle.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ProjectsService } from '../../services/projects.service';
import { AllProjects } from '../../models/allprojects';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
  } from '@angular/material/dialog';
import { ProfileTasksComponent } from '../../profile/profile-tasks/profile-tasks.component';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgFor, NgClass, MatMenuModule, MatButtonModule, RouterLink, RouterLinkActive, MatFormFieldModule, MatSelectModule, MatOptionModule, FormsModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

    allProjects ?: AllProjects[];
    userProjects : AllProjects[] = [];
    id = localStorage.getItem('appUserID')?.toString().replace('"', '').replace('"', ''); // user id
    // isSidebarToggled
    isSidebarToggled = false;

    readonly dialog = inject(MatDialog);
    openDialogTasks() {
        this.dialog.open(ProfileTasksComponent);
    };

    // isToggled
    isToggled = false;

    selectedProject: string = '';


    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        public projectService: ProjectsService
    ) {
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // Mat Search
    

    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Header Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Sidebar Dark
    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    // Right Sidebar
    toggleRightSidebarTheme() {
        this.themeService.toggleRightSidebarTheme();
    }

    // Hide Sidebar
    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    // Header Dark Mode
    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    // Card Border
    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }


    // get all projects
    getProjects() {
        return this.projectService.getProjects()
        .subscribe((data: AllProjects[]) => {
          this.allProjects = data;
          console.log(this.allProjects);
        });
      }

    getProjectsByUserId(id: string) {
        return this.projectService.getProjectsByUserId(id).subscribe((data: AllProjects[]) => {
          console.log("data: " + data);
          this.userProjects = data;
          console.log("this.userProjects: " + this.userProjects);
        });
    }

    trackById(index: number, project: AllProjects): number {
        return project.projectID;
    }

    ngOnInit() {
        return this.getProjectsByUserId(this.id ?? '') && this.getProjects();
    }
}