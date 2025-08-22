import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../services/data';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css'
})
export class CourseDetails implements OnInit {

  courses: any[] = [];
  filteredCourses: any[] = [];
   vd_list: any[] = [];

  constructor(private route: ActivatedRoute,public dataService: Data // public kiya taki HTML me access ho sake
  ) {

 this.dataService.getCourseVideo().subscribe((data: any) => {
      this.vd_list= data; // Last course ka subject data fetch karna
    });




  }

  

  ngOnInit(): void {
    // URL se esId lena
    const esId = Number(this.route.snapshot.paramMap.get('id'));

    // Courses data fetch karna
    this.dataService.getCourses().subscribe((data: any[]) => {
      this.courses = data;
      // Filter lagana jiska esId match kare
      this.filteredCourses = this.courses.filter(c => c.esId === esId);
      console.log("Filtered:", this.filteredCourses);
    });
  }




}
    