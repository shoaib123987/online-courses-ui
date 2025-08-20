import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../services/data';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-uploadcourses',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  templateUrl: './uploadcourses.html',
  styleUrl: './uploadcourses.css'
})
export class Uploadcourses {

 constructor(public dataService: Data, private router: Router) {}

  courseData: any = {
    img: null,
    cName: '',
  
  };

  // capture file from input
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.courseData.img = file;
    }
  }

  onSubmit() {
    const formData = new FormData();

    // IMPORTANT: key must be 'img' to match your controller param
    formData.append('img', this.courseData.img);

    formData.append('cName', this.courseData.cName);


    this.dataService.setSubject(formData).subscribe(
      response => {
        console.log('Course uploaded successfully', response);
         this.router.navigate(['/home']);
      },
      error => {
        console.error('Course upload failed', error);
      }
    );
  }


}
