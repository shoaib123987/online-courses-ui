import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Data } from '../services/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-axis',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './course-axis.html',
  styleUrl: './course-axis.css'
})
export class CourseAxis implements OnInit {


vd_list: any[] = [];
  courseId!: number;
  hover = false;

  courses: any[] = [];
  filteredCourses: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public dataService: Data, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Course ID from URL:", this.courseId);

    this.dataService.getCourseVideoByCourseId(this.courseId).subscribe((data: any) => {
      this.vd_list = data;
      console.log("Videos loaded:", this.vd_list);
    });

    // const esId = Number(this.route.snapshot.paramMap.get('id'));
    // this.dataService.getCourses().subscribe((data: any[]) => {
    //   this.courses = data;
    //   this.filteredCourses = this.courses.filter(c => c.id === esId);
    //   console.log("Filtered:", this.filteredCourses);
    // });
  }

  setDuration(event: Event, index: number) {
    const videoElement = event.target as HTMLVideoElement;
    if (videoElement && videoElement.duration) {
      const minutes = Math.floor(videoElement.duration / 60);
      const seconds = Math.floor(videoElement.duration % 60);
      this.vd_list[index].duration = `${minutes} min ${seconds} sec`;
    }
  }


}
