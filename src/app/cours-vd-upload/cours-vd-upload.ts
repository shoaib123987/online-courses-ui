import { Component } from '@angular/core';
import { Data } from '../services/data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cours-vd-upload',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cours-vd-upload.html',
  styleUrl: './cours-vd-upload.css'
})
export class CoursVdUpload {
 
  course: any[] = [];


constructor(public dataService: Data, private router: Router) {
  this.dataService.getCourses().subscribe((data: any) => {
    this.course = data;
 
  });
}


   
   courseData: any = {
    ved: null,
      id: '',
     heading: '',
     title: ''
     
   };

   



  // capture file from input
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.courseData.ved = file;
    }
  }

 onSubmit() {
  const formData = new FormData();

  // Video
  if (this.courseData.ved) {
    formData.append('ved', this.courseData.ved);
  }

  formData.append('id', this.courseData.id);
  // Course Name
  formData.append('heading', this.courseData.heading);

  // Duration
  formData.append('title', this.courseData.title);



  this.dataService.setCourseVideo(formData).subscribe(
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
