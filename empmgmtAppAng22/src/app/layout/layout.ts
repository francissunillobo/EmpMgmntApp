import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { IUser } from '../core/model/interface/User.Model';
import { GlobalConstants } from '../core/globalConstants/Global.constants';

@Component({
  imports: [RouterOutlet],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  isSidebarCollapsed = false;
  loggedInUser: IUser | null = null;

  constructor(private router: Router) {
    this.loadUser();
  }

  private loadUser(): void {
    try {
      const raw = localStorage.getItem(GlobalConstants.LOGIN_LOCAL_STORAGE_KEY);
      if (!raw) {
        this.router.navigate(['/login']);
        return;
      }
      this.loggedInUser = JSON.parse(raw) as IUser;
    } catch (e) {
      console.error('Failed to load user from storage:', e);
      this.router.navigate(['/login']);
    }
  }

  get avatarLetter(): string {
    return this.loggedInUser?.employeeName?.charAt(0).toUpperCase() || 'U';
  }

  logout(): void {
    try {
      localStorage.removeItem(GlobalConstants.LOGIN_LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
    this.router.navigate(['/login']);
  }
}
