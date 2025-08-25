import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token'); // login hone par token save karo

    if (isLoggedIn) {
      return true; // allow dashboard
    } else {
      this.router.navigate(['/login']); // login nahi hai → redirect
      return false;
    }
  }
}
