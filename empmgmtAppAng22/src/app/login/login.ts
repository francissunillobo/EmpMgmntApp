import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { IUser } from '../core/model/interface/User.Model';
import { GlobalConstants } from '../core/globalConstants/Global.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [CommonModule, FormsModule],
})
export class Login {
  loginObj: any = {
    userName: '',
    password: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    if (!this.loginObj.userName || !this.loginObj.password) {
      alert('Please enter username and password.');
      return;
    }

    this.http.post(environment.API_URL + 'login', this.loginObj).subscribe({
      next: (response: any) => {
        try {
          if (response.result === true) {
            if (!response.data) {
              alert('Login succeeded but no user data was returned.');
              return;
            }
            const userData: IUser = response.data;
            localStorage.setItem(GlobalConstants.LOGIN_LOCAL_STORAGE_KEY, JSON.stringify(userData));
            this.router.navigate(['/admin/dashboard']);
          } else {
            alert(response.message || 'Invalid username or password.');
          }
        } catch (e) {
          console.error('Error processing login response:', e);
          alert('An unexpected error occurred. Please try again.');
        }
      },
      error: (err: any) => {
        console.error('Login HTTP error:', err);
        if (err.status === 0) {
          alert('Unable to reach the server. Please check your connection.');
        } else if (err.status === 401) {
          alert('Invalid username or password.');
        } else if (err.status === 500) {
          alert('Server error. Please try again later.');
        } else {
          alert('Login failed. Please try again.');
        }
      },
    });
  }
}
