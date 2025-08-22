import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Data } from '../services/data';

@Component({
  selector: 'app-couservedio-listdemo',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './couservedio-listdemo.html',
  styleUrls: ['./couservedio-listdemo.css']
})
export class CouservedioListdemo implements OnInit {

  vd_list: any[] = [];
  courseId!: number;

  constructor(private route: ActivatedRoute, public dataService: Data) {}

  ngOnInit(): void {
    // URL se id uthao
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    // API call karo courseId ke basis pe
    this.dataService.getCourseVideoByCourseId(this.courseId).subscribe((data: any) => {
      this.vd_list = data;
      console.log("Videos from API: ", this.vd_list);
    });
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