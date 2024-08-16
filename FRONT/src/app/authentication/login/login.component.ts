import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from '../../models/users';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, NgIf, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // isToggled
  isToggled = false;

  currentUser: Users = {} as Users;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      public themeService: CustomizerSettingsService
  ) {
      this.authForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(8)]],
      });
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }

  // Password Hide
  hide = true;

  // Login 
  login() {
    this.authService.login(this.authForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.authService.userLoggedIn = true;
        this.matSnackBar.open(response.message, 'Close', {
          duration: 10000,
          horizontalPosition: 'center',
        });
        this.authService.getUserDetails().subscribe((data: Users) => {
          this.currentUser = data;
          console.log(this.currentUser);
        })
        this.router.navigate(['/profile-dashboard']);
      },
      error: (error) => {
        console.log(error);
        this.authService.userLoggedIn = false;
        this.matSnackBar.open(error.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
  }
  // Form
  authForm: FormGroup;

  onSubmit() {
      if (this.authForm.valid) {
          this.login();
      } else {
          console.log('Form is invalid. Please check the fields.');
      }
  }

authService = inject(AuthService);
matSnackBar = inject(MatSnackBar);

}
