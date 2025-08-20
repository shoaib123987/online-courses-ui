import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../services/data';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  constructor(public dataService: Data, private router: Router) {}

  registerData: any = {
    img: null,
    name: '',
    email: '',
    password: '',
    city: '',
    qualification: '',
  };

  // capture file from input
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerData.img = file;
    }
  }

  onSubmit() {
    const formData = new FormData();

    // IMPORTANT: key must be 'img' to match your controller param
    formData.append('img', this.registerData.img);

    formData.append('name', this.registerData.name);
    formData.append('email', this.registerData.email);
    formData.append('password', this.registerData.password);
    formData.append('city', this.registerData.city);
    formData.append('qualification', this.registerData.qualification);

    this.dataService.PostRegister(formData).subscribe(
      response => {
        console.log('Registration successful', response);
         this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}
