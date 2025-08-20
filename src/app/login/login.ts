import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from '../services/data';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private dataService: Data, private router: Router) {}

  loginData = {
    email: '',
    password: ''
  };

  onLogin() {
    this.dataService.loginUser(this.loginData).subscribe(
      response => {
        this.dataService.currentUser = response.user;
        console.log('Login successful', response);
        this.router.navigate(['/home']); // ya jis page pe le jaana hai
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
