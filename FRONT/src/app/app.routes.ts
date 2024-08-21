import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ProfileDashboardComponent } from './profile/profile-dashboard/profile-dashboard.component';
import { AuthgaurdService } from './services/authgaurd.service';


export const routes: Routes = [

   
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // default route
    { path: 'login', component: LoginComponent },
    { path: 'profile-dashboard/:currentUser', component: ProfileDashboardComponent, canActivate: [AuthgaurdService] }

];

