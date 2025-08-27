import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Data } from '../services/data';
import { CommonModule } from '@angular/common';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  dropdownOpen = false;
  user$: Observable<any>;
   isCollapsed = true; // by default collapse closed

  

  constructor(public dataService: Data, private router: Router) {
    this.user$ = this.dataService.currentUser$;
  }

  // ---------------- Dropdown ----------------
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }
  // ---------------- Logout ----------------
  logout() {
    this.dataService.logout();
    this.closeDropdown();
    this.router.navigate(['/home']);
  }

  // ---------------- Dashboard Redirect ----------------
  async goToDashboard() {
    const user = await firstValueFrom(this.dataService.currentUser$);
    if (user) {
      // ✅ Navigate to dashboard and pass userId via state
      this.router.navigate(['/user_db'], { state: { userId: user.id } });
    } else {
      this.router.navigate(['/home']);
    }
  }
}
