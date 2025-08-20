import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Data } from '../services/data'; // Importing the Data service to access currentUser
import { Router } from '@angular/router'; // Importing Router for navigation
@Component({
  selector: 'app-header',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  constructor(public dataService: Data, private router: Router) {} // Injecting the Data service to access currentUser

  // You can add more methods or properties if needed

  dropdownOpen = false;

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

closeDropdown() {
  this.dropdownOpen = false;
}

logout() {
  localStorage.removeItem('user'); // or clear your login token
  this.closeDropdown();
  this.router.navigate(['/home']);
}



}
