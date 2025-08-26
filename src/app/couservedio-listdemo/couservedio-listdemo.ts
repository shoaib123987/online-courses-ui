import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Data, Purchase, User } from '../services/data';
import { take } from 'rxjs/operators';

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

    const esId = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getCourses().subscribe((data: any[]) => {
      this.courses = data;
      this.filteredCourses = this.courses.filter(c => c.id === esId);
      console.log("Filtered:", this.filteredCourses);
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

  buyCourse() {
    console.log("Buy button clicked!");
    this.dataService.currentUser$.pipe(take(1)).subscribe((user: User | null) => {
      if (!user) {
        alert('Please login first.');
        this.router.navigate(['/login']);
        return;
      }

      if (!this.filteredCourses.length) {
        alert('Course not loaded or not found.');
        return;
      }

      const course = this.filteredCourses[0];
      this.startPayment(user, course);
    });
  }

  startPayment(user: User, course: any) {
    const amount = Number(course.price.toString().replace(/[^0-9.-]+/g,""));
    if (isNaN(amount) || amount <= 0) {
      alert('Invalid course price.');
      return;
    }

    const purchase = {
      purchaseId: 0,
      userId: user.id,
      CnameId: course.id,
      courseId: course.id, 
      amount: amount,
      status: 'Pending'
    };

    console.log("Creating order: ", purchase);

    this.dataService.createOrder(purchase).subscribe({
      next: (res: any) => {
        console.log("Order response:", res);

        // Razorpay options
        const options: any = {
          key: 'rzp_test_R981BYlbaAJaFm',
          amount: Number(res.amount),   // paise me
          currency: 'INR',
          name: 'Online Course',
          description: 'Course Purchase',
          order_id: res.orderId,
          handler: (response: any) => {
            console.log("Payment success:", response);
            this.dataService.updatePurchaseStatus(res.purchaseId, 'Paid').subscribe({
              next: () => alert('Payment successful!'),
              error: (err) => console.error('Status update failed:', err)
            });
          },
          prefill: { name: user.name, email: user.email },
          theme: { color: '#FF6600' }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      },
      error: (err) => {
        console.error("Purchase failed:", err);
        // Backend se message dikhao
        if (err.error?.message) {
          alert(err.error.message); 
        } else {
          alert('Something went wrong. Try again.');
        }
      }
    });
  }
}
