import { Component } from '@angular/core';
import { Data } from '../services/data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-uploadcdetails',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  templateUrl: './uploadcdetails.html',
  styleUrl: './uploadcdetails.css'
})
export class Uploadcdetails {

 
  subject: any[] = [];


constructor(public dataService: Data, private router: Router) {
  this.dataService.getSubject().subscribe((data: any) => {
    this.subject = data;
 
  });
}


   
   courseData: any = {
     img: null,
      esId: '',
     cName: '',
     duration: '',
     price: '',
     popular: '',
     subjects: ''
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

  // Image
  if (this.courseData.img) {
    formData.append('img', this.courseData.img);
  }

  formData.append('esId', this.courseData.esId);
  // Course Name
  formData.append('cName', this.courseData.cName);

  // Duration
  formData.append('duration', this.courseData.duration);

  // Price
  formData.append('price', this.courseData.price);

  // Popular
  formData.append('popular', this.courseData.popular);

  // Subjects
  formData.append('subjects', this.courseData.subjects);

  this.dataService.setCourse(formData).subscribe(
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


