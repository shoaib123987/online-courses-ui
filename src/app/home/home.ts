import { Component } from '@angular/core';
import { Data } from '../services/data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  courses: any[] = [];
  AboutData: any = {};
 subject: any[] = [];

 CourseDetails: any []= [];

 get popularCourses() {
  return this.CourseDetails.filter(course => course.popular === 'Popular');
}

  constructor(public dataService: Data) {

    this.dataService.getData().subscribe((data: any) => {
      this.courses = data;
    });

    this.dataService.getAboutData().subscribe((data: any) => {
      this.AboutData = data[0];
    });

    this.dataService.getSubject().subscribe((data: any) => {
      this.subject= data; // Last course ka subject data fetch karna
    });

this.dataService.getCourses().subscribe((data: any) => {
      this.CourseDetails = data; // Courses data fetch karna
    });

  }


}
