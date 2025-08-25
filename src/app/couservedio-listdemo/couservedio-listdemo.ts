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
    // URL se courseId lena
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Course ID from URL:", this.courseId);

    // Load course videos
    this.dataService.getCourseVideoByCourseId(this.courseId).subscribe((data: any) => {
      this.vd_list = data;
      console.log("Videos loaded:", this.vd_list);
    });

    // Load all courses
   
  // URL se esId lena
    const esId = Number(this.route.snapshot.paramMap.get('id'));

    // Courses data fetch karna
    this.dataService.getCourses().subscribe((data: any[]) => {
      this.courses = data;
      // Filter lagana jiska esId match kare
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
      console.log("Current user inside buyCourse:", user);

      if (!user) {
        alert('Please login first.');
        this.router.navigate(['/login']);
        return;
      }

      // Check if course loaded
      if (!this.filteredCourses.length) {
        alert('Course not loaded or not found.');
        return;
      }

      // Use the filtered course
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
  status: 'Pending',
  transactionId: "",
  purchaseDate: new Date().toISOString(),
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    profileimg: user.profileimg,
    password: "",
    city: "",
    qualification: "",
    purchases: []
  },
  course: {
    id: course.id,
    esId: course.esId,
    courseImg: course.courseImg,
    duration: course.duration,
    price: course.price,
    popular: course.popular,
    subjects: course.subjects,
    courseVideos: course.videos || [],
    es: {},
    purchases: []
  }
};


  console.log("Creating order: ", purchase);

  // Correct endpoint
  this.dataService.createOrder(purchase).subscribe({
  next: (res: any) => {
    console.log("Order response:", res);

    const options: any = {
      key: 'rzp_test_R981BYlbaAJaFm',
      amount: Number(res.amount),   // paise me
      
      currency: 'INR',
      name: 'Online Course',
      description: 'Course Purchase',
      order_id: res.orderId,     // backend se aaya orderId
      handler: (response: any) => {
        console.log("Payment success:", response);

        // ✅ Payment hone ke baad backend ko status update karo
        this.dataService.updatePurchaseStatus(res.purchaseId, 'Paid').subscribe();
      },
      prefill: { name: user.name, email: user.email },
      theme: { color: '#FF6600' }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  },
  error: (err) => {
    console.error("Purchase failed:", err);
    alert('Something went wrong. Try again.');
  }
});
}

}
