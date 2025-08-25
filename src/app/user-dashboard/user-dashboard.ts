import { Component, OnInit } from '@angular/core';
import { Data } from '../services/data';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboard implements OnInit {

  isLoggedIn = false;
  purchases: any[] = []; // User ke purchased courses store karenge
   vd_list: any[] = [];
   

  constructor(public dataService: Data,private route:   ActivatedRoute) {

 this.dataService.getCourseVideo().subscribe((data: any) => {
      this.vd_list= data; // Last course ka subject data fetch karna
    });

    
  }

  async ngOnInit(): Promise<void> {
    // ------------------ Check login ------------------
    const user = await firstValueFrom(this.dataService.currentUser$);
    if (user) {
      this.isLoggedIn = true;
      this.loadDashboard(user.id); // userId ke basis pe API call
    } else if (localStorage.getItem('currentUser')) {
      // Page reload case me localStorage se user fetch karo
      const savedUser = JSON.parse(localStorage.getItem('currentUser')!);
      this.isLoggedIn = true;
      this.loadDashboard(savedUser.id);
    } else {
      this.isLoggedIn = false;
    }

    

    
  }



  
  // ------------------ Load user purchases ------------------
  loadDashboard(userId: number) {
    this.dataService.getUserDashboard(userId).subscribe(res => {
      console.log('Dashboard Data:', res);
      this.purchases = res; // purchased courses + videos
    });
  }
}
