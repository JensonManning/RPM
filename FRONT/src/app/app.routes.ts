import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ProfileDashboardComponent } from './profile/profile-dashboard/profile-dashboard.component';
import { AuthgaurdService } from './services/authgaurd.service';
import { CreateProjectComponent } from './forms/create-project/create-project.component';
import { ProfileTasksComponent } from './profile/profile-tasks/profile-tasks.component';


export const routes: Routes = [

   
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // default route
    { path: 'login', component: LoginComponent },
    { path: 'profile-dashboard/:currentUser', component: ProfileDashboardComponent, canActivate: [AuthgaurdService] },
    { path: "project-management/create-project", component: CreateProjectComponent, canActivate: [AuthgaurdService] },
    { path: "profile-dashboard/:currentUser/profile-active-tasks", component: ProfileTasksComponent, canActivate: [AuthgaurdService] }

];

