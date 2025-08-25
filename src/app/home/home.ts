import { Component } from '@angular/core';
import { Data } from '../services/data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  carousel: any[] = [];



  AboutData: any = {};
 subject: any[] = [];
   filteredCourses: any[] = [];
   courses : any[] = [];

 CourseDetails: any []= [];
 // carousel




 get popularCourses() {
  return this.CourseDetails.filter(course => course.popular === 'Popular');
}

  constructor(public dataService: Data,private route: ActivatedRoute) {

    this.dataService.getData().subscribe((data: any) => {
      this.carousel = data;
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




    this.dataService.getSubject().subscribe((subjects: any[]) => {
      const subj = subjects.find(s => s.esId === this.filteredCourses[0]?.esId);
      this.subject = subj || {};
    });
  }




  

}
