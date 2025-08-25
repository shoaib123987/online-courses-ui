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
  styleUrls: ['./login.css']
})
export class Login {

  constructor(public dataService: Data, private router: Router) {}

  loginData = {
    email: '',
    password: ''
  };

  onLogin() {
    this.dataService.loginUser(this.loginData).subscribe(
      response => {
        if(response && response.user) {
          this.dataService.setLogin(true);
          this.dataService.setUser(response.user);
          console.log('Login successful', response);
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
